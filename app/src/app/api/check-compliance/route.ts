import { NextRequest, NextResponse } from 'next/server';

const DOS_AI_URL = 'https://api.dos.ai/v1/chat/completions';
const DOS_AI_KEY = process.env.DOS_AI_API_KEY;

const COMPLIANCE_PROMPT = `You are a regulatory compliance engine for tokenized securities issuance in Vietnam.
IMPORTANT: Always respond in Vietnamese. All check names, details, and summary must be in Vietnamese.

REGULATORY FRAMEWORK (Vietnam):
- Luật Công nghệ Số 2025 (effective 01/01/2026)
- Nghị quyết 05/2025 - thí điểm token hóa tài sản thực
- Nghị định 153/2020 - trái phiếu doanh nghiệp riêng lẻ, tối đa 200 NĐT
- Luật Chứng khoán 2019
- Luật Phòng chống rửa tiền 2022

INTERPRETATION RULES (CRITICAL):
- BE GENEROUS with Vietnamese regulated entities. Examples that are COMPLIANT:
  * Shinhan Securities/Bank Vietnam: Vietnamese-registered subsidiary, fully compliant
  * Kho Bạc Nhà Nước / State Treasury: government body, sovereign-backed → always compliant
  * Known state banks (Vietcombank, BIDV, etc.): fully compliant
  * Licensed fund management companies: compliant
- Government bonds are INHERENTLY compliant - sovereign credit backing, no need for separate collateral
- REIT/Real Estate Funds: the underlying property portfolio IS the tangible asset backing
- Corporate bonds with "tài sản đảm bảo" explicitly mentioned: compliant
- If "restrictions" field mentions KYC/AML/secured/Vietnam-only: PASS those checks
- ONLY mark NON_COMPLIANT for CLEAR violations: foreign unregistered entity (Cayman, BVI, offshore), no KYC, unlimited cross-border, yields >20% (Ponzi signal)
- Avoid NEEDS_REVIEW unless truly ambiguous - default to COMPLIANT if issuer is clearly a legitimate Vietnamese entity

COMPLIANCE CHECKS TO RUN (all in Vietnamese):
1. Tư cách pháp lý tổ chức phát hành (Việt Nam)
2. Tài sản đảm bảo / Tính hợp pháp của tài sản token hóa
3. Yêu cầu KYC/AML
4. Giới hạn số lượng nhà đầu tư
5. Hạn chế quốc gia (chỉ trong nước)
6. Tính hợp lý của lãi suất/lợi suất

Read ALL input fields carefully: issuer, restrictions, description, maxInvestors, lockUpDays, couponRate.

Return ONLY valid JSON:
{
  "status": "compliant" | "non_compliant" | "needs_review",
  "checks": [
    { "name": "...", "passed": true/false, "details": "..." }
  ],
  "summary": "..."
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
