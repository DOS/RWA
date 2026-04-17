# DOS Chain RWA - Regulated Digital Securities Platform

> **Qwen AI Build Day x Shinhan Bank Hackathon 2026** - Track SS6: Digital Assets & Tokenized Securities

**Live Demo:** [rwa.doschain.com](https://rwa.doschain.com)
**Explorer:** [doscan.io](https://doscan.io)

## What is this?

A full-stack Security Token Offering (STO) platform on DOS Chain (Avalanche L1) that enables financial institutions to issue, manage, and trade tokenized securities with AI-powered compliance.

Upload a bond prospectus PDF, AI extracts parameters, checks regulatory compliance (Vietnam + Korea), and deploys an ERC-3643 security token on-chain - all in one flow.

## Architecture

```
User -> DOS.Me SSO Login -> Upload PDF
  -> Qwen AI (document extraction) -> Review & Edit
  -> Qwen AI (compliance check VN/KR) -> Compliance Report
  -> Backend wallet -> TREXFactory.deployTREXSuite() -> On-chain token
  -> DOScan (verify on explorer)
```

## Key Features

- **AI Document Processing** - Qwen 3.5-35B extracts bond parameters from PDF prospectuses
- **Automated Compliance** - AI checks against Vietnam Digital Technology Law 2025, Resolution 05/2025, and Korea Capital Markets Act
- **Real On-Chain Deployment** - Backend wallet deploys ERC-3643 tokens via TREXFactory on DOS Chain mainnet
- **On-Chain Identity (ONCHAINID)** - Each investor gets ERC-734/735 smart contract identity with signed KYC/AML claims
- **Gasless Transactions** - ERC-4337 paymaster for whitelisted investors
- **Cross-Chain** - ICTT bridge to Avalanche C-Chain and Ethereum
- **Full On-Premise** - Everything can be self-hosted (blockchain nodes, AI models, identity services)
- **Bilingual** - Vietnamese / English

## Technology Stack

| Technology | Purpose |
|-----------|---------|
| [ERC-3643 (T-REX)](https://erc3643.org) | Security token standard - DTCC & SEC recognized |
| [ONCHAINID](https://github.com/onchain-id/solidity) | On-chain identity with signed claims (ERC-734/735) |
| [DOS Chain](https://doscan.io) | Avalanche L1 - Chain ID 7979, 1s blocks, gasless |
| [Qwen 3.5-35B](https://huggingface.co/Qwen) | AI document processing & compliance checking |
| [DOS.Me ID](https://id.dos.me) | SSO authentication - no crypto wallet needed |
| [ICTT Bridge](https://github.com/ava-labs/icm-contracts) | Cross-chain token transfers |
| [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) | Account abstraction - gasless for investors |
| Next.js 16 | Web application framework |

## Deployed Contracts (Mainnet - Chain ID 7979)

| Contract | Address |
|----------|---------|
| TREXFactory | [`0x7979539f...3643`](https://doscan.io/address/0x7979539fb9eb7f1c92221f278a92812967303643) |
| Token Implementation | [`0x6233...037D`](https://doscan.io/address/0x6233276430d0607a4a4A16D74bA3DeE415CB037D) |
| Identity Registry | [`0x8a59...0C39`](https://doscan.io/address/0x8a59C023cE011ea102DAE48DC30f712F8d970A39) |
| Modular Compliance | [`0x9BCD...234c`](https://doscan.io/address/0x9BCD85733b1372A13D6f3A2dE83c13eA1E59234c) |
| IdFactory | [`0xcCA7...4C0`](https://doscan.io/address/0xcCA7dA18982a8d3941c95E91449122C85B04F4C0) |

See [contracts/deployments/](contracts/deployments/) for full deployment details.

## Project Structure

```
app/                          # Next.js 16 DApp
  src/
    app/
      page.tsx                # Landing page
      issuer/page.tsx         # Issuer portal
      investor/page.tsx       # Investor portal + AI chat
      compliance/page.tsx     # Compliance dashboard
      api/
        process-document/     # PDF extraction via unpdf + Qwen AI
        check-compliance/     # Regulatory compliance via Qwen AI
        deploy-token/         # Backend wallet deploys ERC-3643
        chat/                 # AI investment advisor (Qwen 3.5-35B)
    components/
      upload-prospectus.tsx   # 4-step upload/review/compliance/deploy flow
      auth-button.tsx         # DOS.Me SSO login
      lang-switcher.tsx       # VI/EN toggle
    lib/
      i18n.ts                 # Full VI/EN translations
      ai-client.ts            # AI service client
      auth-context.tsx        # Supabase auth state
  public/
    samples/                  # Sample prospectus PDFs for demo
contracts/
  script/                     # Foundry deployment scripts
  deployments/                # Deployed contract addresses
docs/
  hackathon-about.md          # Devpost submission content
  customer-solution-deck-content.md  # Pitch deck
```

## Getting Started

```bash
cd app
cp .env.example .env.local
# Edit .env.local with your keys
pnpm install
pnpm dev
```

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=         # Supabase auth URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=  # Supabase publishable key
NEXT_PUBLIC_API_URL=              # DOS.Me API URL
DOS_AI_API_KEY=                   # Qwen AI API key (dos.ai gateway)
DEPLOYER_PRIVATE_KEY=             # Backend wallet for token deployment
```

## Sample Files

The demo includes 4 sample prospectus PDFs:
- **Corporate Bond** (VI) - Shinhan Securities Vietnam, 9.5%, compliant
- **Government Bond** (VI) - State Treasury, 7.2%, compliant
- **REIT Fund** (VI) - Shinhan Real Estate, 11.5%, compliant
- **Non-Compliant** (VI) - Cayman Islands entity, 24%, blocked by AI

## Regulatory Framework

The AI compliance engine checks against:
- Vietnam Digital Technology Industry Law 2025 (effective 01/01/2026)
- Vietnam Resolution 05/2025 (5-year pilot for tokenized assets)
- Vietnam Securities Law 2019 & AML Law 2022
- Korea Capital Markets Act amendment (passed 01/2026, effective 02/2027)

## Team

- **DOS** ([dos.ai](https://dos.ai)) - Blockchain infrastructure & AI

## License

MIT
