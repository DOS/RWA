import { NextRequest, NextResponse } from 'next/server';

const DOS_AI_URL = 'https://api.dos.ai/v1/chat/completions';
const DOS_AI_KEY = process.env.DOS_AI_API_KEY;

const SYSTEM_PROMPT = `You are an AI investment advisor for tokenized securities on DOS Chain - an Avalanche L1 blockchain for regulated digital assets.

You have access to these tokenized securities on DOS Chain mainnet:

1. SCB26A (Shinhan Corp Bond 2026-A)
   - Face value: 1,000,000 VND per unit
   - Coupon rate: 8.50% per annum
   - Maturity: December 2026
   - Issuer: Shinhan Securities Vietnam
   - Token address: 0x27202027046E614E159329d9cdf8c35a197CC7b5
   - Total supply: 10,000 units
   - ERC-3643 compliant with on-chain KYC/AML

2. SGB26 (Government Bond 2026)
   - Face value: 10,000,000 VND per unit
   - Coupon rate: 7.20% per annum
   - Maturity: June 2026
   - Issuer: State General Treasury
   - Total supply: 20,000 units
   - ERC-3643 compliant

Key facts about DOS Chain:
- Avalanche L1, Chain ID 7979, 1s block time
- ERC-3643 (T-REX) standard - DTCC joined, SEC recognized
- ONCHAINID identity - on-chain KYC/AML per investor
- TREXFactory at 0x7979...3643 (vanity address)
- Full on-premise deployment capability
- DOScan explorer at doscan.io
- Cross-chain bridge to Avalanche C-Chain via ICTT

Rules:
- Respond in the same language the user writes in (Vietnamese, English, or Korean)
- Be factual and specific - cite numbers from token data
- Keep responses concise (2-3 paragraphs max)
- Always state: this is AI analysis, not financial advice
- If asked about topics outside tokenized securities, politely redirect`;

export async function POST(request: NextRequest) {
  if (!DOS_AI_KEY) {
    return NextResponse.json({ error: 'AI service not configured' }, { status: 503 });
  }

  try {
    const { question } = await request.json();

    const res = await fetch(DOS_AI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DOS_AI_KEY}`,
      },
      body: JSON.stringify({
        model: 'dos-ai',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: question },
        ],
        temperature: 0.3,
        max_tokens: 1024,
      }),
    });

    if (!res.ok) {
      const err = await res.text().catch(() => 'unknown');
      return NextResponse.json({ error: `AI error: ${res.status}` }, { status: 502 });
    }

    const data = await res.json();
    const answer = data.choices?.[0]?.message?.content || 'No response';

    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json({ error: 'AI service unavailable' }, { status: 503 });
  }
}
