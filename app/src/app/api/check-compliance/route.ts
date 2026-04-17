import { NextRequest, NextResponse } from 'next/server';

const DOS_AI_URL = 'https://api.dos.ai/v1/chat/completions';
const DOS_AI_KEY = process.env.DOS_AI_API_KEY;

const COMPLIANCE_PROMPT = `You are a regulatory compliance engine for tokenized securities issuance.
You have expertise in both Vietnamese and Korean securities regulations.
IMPORTANT: Always respond in Vietnamese. All check names, details, and summary must be in Vietnamese.

REGULATORY KNOWLEDGE:

Vietnam:
- Digital Technology Industry Law 2025 (effective 01/01/2026) - digital assets recognized as property
- Resolution 05/2025 - 5-year pilot program for tokenized assets
- Only crypto-assets backed by tangible assets are permitted
- Only Vietnamese-registered companies may issue
- KYC/AML mandatory for all investors
- Tax: 0.1% per transaction

Korea:
- Capital Markets Act amendment (passed 01/2026, effective 02/2027)
- Tokenized securities on DLT now legal
- Qualified issuers can directly issue on blockchain
- Investor protection same as traditional securities

Given the token parameters, check compliance against BOTH jurisdictions.

Return ONLY valid JSON with this structure:
{
  "status": "compliant" | "non_compliant" | "needs_review",
  "checks": [
    { "name": "check name", "passed": true/false, "details": "explanation" }
  ],
  "summary": "one paragraph summary for compliance officer"
}`;

export async function POST(request: NextRequest) {
  if (!DOS_AI_KEY) {
    return NextResponse.json({ error: 'AI service not configured' }, { status: 503 });
  }

  try {
    const params = await request.json();

    const res = await fetch(DOS_AI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DOS_AI_KEY}`,
      },
      body: JSON.stringify({
        model: 'dos-ai',
        messages: [
          { role: 'system', content: COMPLIANCE_PROMPT },
          { role: 'user', content: `Token parameters:\n${JSON.stringify(params, null, 2)}` },
        ],
        temperature: 0.1,
        max_tokens: 2048,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: `AI error: ${res.status}` }, { status: 502 });
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || '';
    const jsonStr = content.replace(/```json?\n?/g, '').replace(/```/g, '').trim();

    try {
      return NextResponse.json(JSON.parse(jsonStr));
    } catch {
      return NextResponse.json({ error: 'Failed to parse', raw: content }, { status: 422 });
    }
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
