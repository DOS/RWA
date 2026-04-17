import { NextRequest, NextResponse } from 'next/server';
import { extractText } from 'unpdf';

const DOS_AI_URL = 'https://api.dos.ai/v1/chat/completions';
const DOS_AI_KEY = process.env.DOS_AI_API_KEY;

const EXTRACTION_PROMPT = `You are a financial document processor for tokenized securities.
Extract the following fields from this bond/security prospectus document.

Required fields (return as JSON):
- name: Full security name
- type: bond | fund | equity | structured_note
- symbol: Suggested ticker symbol
- faceValue: Face value per unit (number)
- currency: Currency code
- couponRate: Coupon rate as percentage string (e.g., "9.50%")
- paymentFrequency: annual | semi_annual | quarterly | monthly
- maturityDate: Date string
- minDenomination: Minimum investment amount (number)
- totalSupply: Total number of units (number)
- issuer: Issuer name
- isin: ISIN code or null
- restrictions: Array of restrictions
- maxInvestors: Max investors (number or null)
- lockUpDays: Lock-up days (number or null)
- description: One-sentence summary

Return ONLY valid JSON. No markdown, no explanation, no code fences.`;

export async function POST(request: NextRequest) {
  if (!DOS_AI_KEY) {
    return NextResponse.json({ error: 'AI service not configured' }, { status: 503 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    let text: string;

    try {
      const result = await extractText(new Uint8Array(buffer));
      text = Array.isArray(result.text) ? result.text.join('\n\n') : String(result.text);
    } catch (e) {
      return NextResponse.json({
        error: `PDF parsing failed: ${e instanceof Error ? e.message : 'unknown'}`
      }, { status: 422 });
    }

    if (!text || text.trim().length < 30) {
      return NextResponse.json({
        error: 'PDF contains no extractable text.'
      }, { status: 422 });
    }

    const truncated = text.slice(0, 8000);

    const res = await fetch(DOS_AI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DOS_AI_KEY}`,
      },
      body: JSON.stringify({
        model: 'dos-ai',
        messages: [
          { role: 'system', content: EXTRACTION_PROMPT },
          { role: 'user', content: `Document: ${file.name}\n\nContent:\n${truncated}` },
        ],
        temperature: 0.1,
        max_tokens: 2048,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'AI processing failed' }, { status: 502 });
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || '';
    const jsonStr = content.replace(/```json?\n?/g, '').replace(/```/g, '').trim();

    try {
      return NextResponse.json(JSON.parse(jsonStr));
    } catch {
      return NextResponse.json({ error: 'Failed to parse AI response', raw: content }, { status: 422 });
    }
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
