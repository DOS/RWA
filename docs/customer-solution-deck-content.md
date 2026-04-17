# Customer Solution Deck - DOS Chain for Shinhan Securities Vietnam

> Draft content for PDF generation. Copy to Claude Chat with prompt:
> "Generate a professional Customer Solution Deck PDF (16:9 slides) from this content.
> Brand colors: primary red #DC2626, white background, dark text.
> Include diagrams where indicated. Modern fintech/banking style. Clean, professional."

---

## Slide 1: Cover

**DOS Chain - Digital Assets & Tokenized Securities Infrastructure**

Next-generation financial infrastructure for Shinhan Securities Vietnam - ERC-3643 compliant tokenization powered by Qwen AI.

doschain.com | DOS Labs

---

## Slide 2: The Opportunity

**$26.4B tokenized real-world assets on-chain** (03/2026, growing 300% YoY)

- South Korea passed STO legislation (01/2026) - tokenized securities on DLT now legal
- Vietnam's Digital Technology Industry Law (01/2026) - digital assets recognized as property
- Resolution 05/2025 - 5-year nationwide pilot for tokenized assets
- Korea STO market projected at **367 trillion won (~$250B) by 2030** (BCG)

**Shinhan's position:** STO Alliance in Korea, Lambda256/Luniverse PoC, KDAC custody - but **zero tokenization infrastructure in Vietnam**.

**The window is open. The question is: who moves first?**

---

## Slide 3: Who's Already Doing This

[DIAGRAM: Bank logos with scale numbers]

| Bank | What they tokenized | Scale |
|------|-------------------|-------|
| **BlackRock** | US Treasuries (BUIDL fund) | **$2.5B AUM** across 9 chains incl. Avalanche |
| **JPMorgan** | Deposits, Intraday Repo (Kinexys) | **$1.5T+ processed**, ~$2B/day |
| **HSBC** | Digital native bonds (Orion) | **$3.5B+**, UK sovereign bond pilot |
| **DBS** | Structured notes on Ethereum | **$1B+** H1/2025 |
| **Goldman Sachs** | Bonds, MMFs (GS DAP) | Spinning out as platform 2026 |
| **UBS** | MMF token, fixed rate notes | First Chainlink DTA workflow |
| **Franklin Templeton** | US Gov Money Fund (BENJI) | **$732M AUM** on 8 chains incl. Avalanche |

**The institutional migration to on-chain securities is not "if" - it's "how fast."**

---

## Slide 4: The Solution - DOS Chain STO Platform

A **full-stack tokenized securities platform** on a sovereign Avalanche L1 blockchain:

| Capability | What it does |
|-----------|-------------|
| **ERC-3643 Token Issuance** | Industry standard for tokenized securities (DTCC joined, SEC recognized) |
| **ONCHAINID Identity** | On-chain KYC/AML - every investor verified before every transfer |
| **Modular Compliance** | Pluggable rules: country restrictions, investor limits, lock-up periods |
| **AI Document Processing** | Qwen-VL reads prospectus → extracts params → deploys token |
| **AI Compliance Engine** | RAG over VN/KR regulations - automated compliance checking |
| **AI Investment Advisor** | Natural language Q&A about securities in Vietnamese/English/Korean |
| **DOS.Me ID Login** | Email/passkey login - no wallet needed. Banking-grade UX |
| **Cross-chain Settlement** | ICTT bridge: DOS Chain ↔ Avalanche C-Chain ↔ Ethereum |

---

## Slide 5: Use Case - Tokenized Corporate Bond

[DIAGRAM: End-to-end flow]

```
ISSUANCE                          INVESTMENT                      COMPLIANCE
────────                          ──────────                      ──────────
1. Shinhan uploads bond           1. Investor logs in via         1. Every transfer checked
   prospectus (PDF)                  DOS.Me ID (email/passkey)       on-chain automatically
2. Qwen AI extracts:             2. KYC onboarding →             2. Non-compliant transfers
   - Face value: 1M VND          3. Browse marketplace              blocked at contract level
   - Coupon: 8.5%                4. Ask Qwen: "which bond        3. AI generates compliance
   - Maturity: 2028                 suits my risk profile?"         reports for regulators
   - Restrictions                 5. Buy 10 units of SCB26A      4. Full audit trail on
3. Compliance engine checks       6. Compliance auto-checks:        DOScan explorer
   VN + KR regulations              KYC? ✓ Country? ✓
4. One-click deploy                  Lock-up? ✓ Limit? ✓
   ERC-3643 token                 7. Tokens in wallet
5. Token live on DOScan
```

---

## Slide 6: Why ERC-3643 (T-REX Standard)

**The industry standard for tokenized securities - not a custom solution.**

| Milestone | Significance |
|-----------|-------------|
| **DTCC joined** (03/2025) | World's largest securities settlement system endorses the standard |
| **SEC recognized** (07/2025) | US regulator acknowledges ERC-3643 for compliant token transfers |
| Used by **Tokeny, SkyBridge, Avalanche RWA** | Battle-tested in production |
| **11 compliance modules** available | Country restrict, investor limit, lock-up, transfer fees, etc. |
| **ONCHAINID** built-in | On-chain identity per investor - KYC/AML enforced at smart contract level |

**vs alternatives:**

| | ERC-3643 | ERC-1400 | ERC-20 |
|--|---------|----------|--------|
| Compliance | Automatic, modular | Manual, partition-based | None |
| Identity | ONCHAINID built-in | None | None |
| Status | Official ERC | Never finalized | Generic |
| Regulatory fit | Designed for securities | Draft | Not designed for securities |

---

## Slide 7: Shinhan Alignment

[DIAGRAM: Mapping Shinhan Korea initiatives to DOS Chain Vietnam platform]

**Shinhan already has the Korea playbook. DOS Chain provides the Vietnam infrastructure.**

| Shinhan Korea Asset | DOS Chain Vietnam Equivalent |
|--------------------|-----------------------------|
| STO Alliance (industry standards) | ERC-3643 - global industry standard |
| Lambda256/Luniverse (blockchain infra) | DOS Chain - Avalanche L1, production-ready |
| KDAC (digital asset custody) | DOS Chain validator-level custody + ONCHAINID identity infrastructure |
| KB-NH-Shinhan consortium (shared ledger) | Sovereign L1 - Shinhan can run validator node |
| Won-pegged stablecoin (8 banks) | ICTT bridge - cross-chain settlement ready |

**CEO Lee Sun-hoon:** *"Vietnam is a strategic starting point for global digital innovation."*

DOS Chain makes that concrete.

---

## Slide 8: Why Avalanche L1 (DOS Chain) vs Alternatives

[DIAGRAM: Comparison matrix]

| Criteria | DOS Chain (Avalanche L1) | Avalanche C-Chain | Ethereum | Private (Quorum) |
|----------|-------------------------|-------------------|----------|-------------------|
| **Sovereign control** | Shinhan runs validator | Cannot | Cannot | Full but isolated |
| **Throughput** | Dedicated 100M gas | Shared | Shared + congestion | Dedicated |
| **Cost** | ~0.001 VND/tx | ~$0.01-0.10/tx | $5-50/tx | Free (high infra) |
| **Interoperability** | ICTT → C-Chain → ETH | Native Avalanche | Bridges (risk) | **Isolated silo** |
| **Ecosystem** | Same as BlackRock BUIDL | Same | Largest | Enterprise only |
| **Compliance std** | ERC-3643 + ONCHAINID | ERC-3643 | ERC-3643 | Custom |
| **Explorer** | DOScan (dedicated) | Snowtrace (shared) | Etherscan (shared) | None |
| **Regulatory narrative** | "Dedicated chain with validator control" | "Shared public chain" | "Shared public chain" | "Private, isolated" |
| **On-premise** | **Full self-hosted** - all components | Cannot | Cannot | Yes but isolated |

**Best of both worlds:** Sovereign control of a private chain + interoperability of a public chain.

**Dedicated L1 option:** If required, we deploy a completely separate permissioned Avalanche L1 exclusively for Shinhan - running entirely on Shinhan's servers. Same contracts, same AI, same DApp - private chain. Optional bridge to public chain when needed.

---

## Slide 9: Technical Architecture

[DIAGRAM: 4-layer architecture]

```
┌─ Presentation Layer ────────────────────────────────────┐
│  Issuer Portal       Investor Portal    Compliance      │
│  (Shinhan)           (DOS.Me login)     Dashboard       │
│  Deploy tokens       KYC + invest       Reports + audit │
└────────────────────────────┬────────────────────────────┘
                             │
┌─ Qwen AI Layer ────────────▼────────────────────────────┐
│  Alibaba Cloud Model Studio (Qwen3.5)                   │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────────┐  │
│  │Doc Processor│ │ Compliance   │ │ Investment       │  │
│  │PDF → struct │ │ VN/KR law    │ │ Advisor          │  │
│  │data →       │ │ RAG check    │ │ Risk + recommend │  │
│  │contract     │ │ + AML screen │ │ VI / EN / KR     │  │
│  └─────────────┘ └──────────────┘ └──────────────────┘  │
└────────────────────────────┬────────────────────────────┘
                             │
┌─ Smart Contract Layer ─────▼────────────────────────────┐
│  DOS Chain (Avalanche L1, Chain ID 7979)                │
│                                                         │
│  ERC-3643: Token │ IdentityRegistry │ Compliance Module │
│  ONCHAINID       │ ClaimVerifier    │ TrustedIssuers    │
│  TokenFactory    │ EAS Attestations │ DOS Names         │
└────────────────────────────┬────────────────────────────┘
                             │
┌─ Infrastructure Layer ─────▼────────────────────────────┐
│  4 Validators │ DOScan Explorer │ ICTT Bridge           │
│  1s blocks    │ Full indexing   │ Cross-chain settlement│
│  100M gas     │ doscan.io       │                       │
└─────────────────────────────────────────────────────────┘
```

---

## Slide 10: Qwen AI Integration

**3 AI agents - deeply integrated, not bolted on:**

| # | Agent | Model | What it does |
|---|-------|-------|-------------|
| 1 | **Doc Processor** | Qwen-VL (vision) | Reads bond prospectus PDF → extracts all parameters (face value, coupon, maturity, restrictions) → JSON ready for smart contract deployment |
| 2 | **Compliance Engine** | Qwen3.5 + RAG | Checks issuance against VN Digital Technology Industry Law 2025, Resolution 05/2025, KR Capital Markets Act. Generates compliance reports. AML screening. |
| 3 | **Investment Advisor** | Qwen3.5 | Reads on-chain data (token metadata, holder distribution, transfer volume). Answers "which bond suits me?" in Vietnamese, English, or Korean. |

**Why Qwen?**
- Multi-language (Vietnamese + Korean + English) - essential for Shinhan VN
- Vision capability (Qwen-VL) - reads prospectus documents directly
- Self-hostable - data sovereignty for banking (voice/document data never leaves infrastructure)
- Alibaba Cloud Model Studio as production fallback

---

## Slide 11: Existing Infrastructure - Production Ready

**DOS Chain is not a prototype. It's a live production network.**

| Component | Status | Relevance |
|-----------|--------|-----------|
| **DOS Chain Mainnet** | LIVE - 4 validators, 1s blocks, Chain ID 7979 | Settlement layer for all token operations |
| **DOScan Explorer** | LIVE - doscan.io | Full transparency for regulators and investors |
| **EAS (Attestation Service)** | DEPLOYED - 5 schemas | KYC/AML attestation infrastructure |
| **ICTT Bridge** | LIVE - DOS Chain ↔ C-Chain | Cross-chain settlement capability |
| **DOS Names** | LIVE - .dos domain service | Human-readable identities (shinhan.dos) |
| **Multicall3** | DEPLOYED | Batch read operations for portfolio queries |
| **Faucet** | LIVE - faucet.doschain.com | Zero-friction onboarding for demo |

**ERC-3643 T-REX (deployed on mainnet):**

| Contract | Address |
|----------|---------|
| **TREXFactory** | `0x7979539f...67303643` (vanity) |
| Token (SCB26A) | `0x27202027...197CC7b5` |
| IdentityRegistry | `0xA02d42F3...a756292b` |
| ClaimIssuer (Shinhan) | `0x726B0895...CDE3C73` |

**Compliance verified on-chain:** registered investor transfer OK, unregistered transfer REVERT.

**Time-to-demo: days, not months.**

---

## Slide 12: Full On-Premise / Self-Hosted Deployment

**Vietnamese banking regulations require full on-premise capability. We deliver it.**

| Component | Self-hosted? | How |
|-----------|-------------|-----|
| **DOS Chain** (blockchain) | Yes | AvalancheGo binary on bank's servers |
| **DOScan** (explorer) | Yes | Docker containers |
| **Qwen AI** (3 agents) | Yes | vLLM on bank's GPU servers |
| **DApp** (web portals) | Yes | Next.js on any Node.js server |
| **DOS.Me ID** (auth) | Yes | Supabase self-hosted |
| **EAS** (attestations) | Yes | Smart contracts on-chain |

**Zero cloud dependency. No data leaves the bank's network.**

**Dedicated L1 option:** We can spin up a completely separate permissioned Avalanche L1 exclusively for Shinhan - running 100% on Shinhan's hardware with Shinhan-controlled validators. Same ERC-3643 stack, private chain, optional ICTT bridge to public chain when needed. Deployment takes hours, not months.

---

## Slide 13: Vietnam Regulatory Alignment

**The legal framework just arrived. The infrastructure is ready.**

| Regulation | Date | Implication for DOS Chain |
|-----------|------|--------------------------|
| **Digital Technology Industry Law 2025** | Effective 01/01/2026 | Digital assets = property under Civil Code |
| **Resolution 05/2025** | Active | 5-year pilot program for tokenized assets nationwide |
| **Tokenized asset requirements** | Now | Must be backed by tangible assets - ERC-3643 enforces this |
| **KYC/AML mandatory** | Now | ONCHAINID + EAS attestations = on-chain compliance |
| **Tax: 0.1% per transaction** | From 2026 | Transparent, auditable on DOScan |
| **License applications** | Open since 20/01/2026 | Ministry of Finance accepting applications |

**Korea alignment:** Capital Markets Act + Electronic Securities Act amendments (01/2026) - tokenized securities on DLT legal from 02/2027. Same standard (ERC-3643), same compliance model, cross-border ready via ICTT bridge.

---

## Slide 14: Live Demo Flow

**Demo scenario: Shinhan issues a tokenized corporate bond**

1. **Upload** - Shinhan uploads bond prospectus PDF (or picks from 4 built-in samples: Corporate Bond, Government Bond, REIT Fund, Non-compliant Cayman fund)
2. **AI Extract** - Qwen reads document, extracts 15+ parameters, shows structured preview (all fields editable inline)
3. **Compliance** - Qwen checks VN regulations (Digital Technology Law 2025, Resolution 05/2025, Decree 153/2020), generates compliance report. Non-compliant issuances auto-blocked.
4. **Deploy** - One click triggers 4 transactions from backend wallet: `deployTREXSuite` → `registerIdentity` → `unpause` → `mint(totalSupply)`. Real supply on-chain in under 10 seconds.
5. **Verify** - Token immediately visible on DOScan with full metadata and real supply
6. **Login** - Investor logs in via DOS.Me ID (email/Google SSO - no wallet needed)
7. **Marketplace** - Investor Portal auto-populates by querying `TREXSuiteDeployed` events from factory - every deployed token appears live with name, symbol, supply
8. **Advisor** - Investor asks Qwen "which bond suits me?" in Vietnamese - AI responds with analysis based on on-chain data
9. **Compliance** - Every transfer enforced at smart contract level: unregistered wallet = transfer reverts automatically
10. **Transparency** - Everything visible on DOScan, compliance dashboard shows token status + transfer audit

**Live at:** rwa.doschain.com

---

## Slide 15: Competitive Advantage

| Feature | DOS Chain | Securitize | Tokeny | Polymath | Lambda256 |
|---------|-----------|------------|--------|----------|-----------|
| ERC-3643 standard | Yes | No (custom) | Yes (creator) | No (ERC-1400) | Unclear |
| Sovereign chain | **Yes (Avalanche L1)** | No | No | Yes (Polymesh) | No |
| AI compliance | **Qwen-powered** | No | No | No | No |
| AI document processing | **Qwen-VL** | No | No | No | No |
| AI investment advisor | **Qwen multilingual** | No | No | No | No |
| Cross-chain bridge | **ICTT native** | Limited | No | Limited | No |
| Vietnam regulatory fit | **Designed for VN law** | US-focused | EU-focused | Global | Korea |
| Production infrastructure | **All live** | Yes | Yes | Yes | PoC only |
| Gasless onboarding | **Yes (whitelisted)** | No | No | No | No |
| DOS.Me ID login | **Yes (no wallet needed)** | No | No | No | No |
| Full on-premise | **Yes - all components** | No (SaaS) | No (SaaS) | No (SaaS) | Partial |
| Dedicated L1 option | **Yes - private chain** | No | No | No | No |
| Cost per transaction | **~0.001 VND** | Varies | Varies | Low | Varies |

**Only platform combining ERC-3643 + sovereign L1 + AI compliance + full on-premise + Vietnam regulatory alignment.**

---

## Slide 16: Roadmap

| Phase | Timeline | Deliverables |
|-------|----------|-------------|
| **PoC** (InnoBoost) | Q2 2026 | Pilot tokenized bond + on-premise deployment in Shinhan data center |
| **MVP** | Q3 2026 | Multi-asset: corporate bonds + fund certificates |
| **Production** | Q4 2026 | Secondary market, coupon automation, Shinhan validator node |
| **Scale** | 2027 | Cross-border STO (KR ↔ VN via ICTT), Lambda256 integration |
| **Platform** | 2027+ | Open to other Vietnamese securities firms |

---

## Slide 17: Contact & Next Steps

**DOS Labs**
- DApp: rwa.doschain.com
- Explorer: doscan.io
- DOS.Me: id.dos.me
- Email: joy@dos.ai

**Next steps:**
1. PoC engagement via Shinhan InnoBoost 2026 (up to VND 200M funding)
2. On-premise deployment of full stack in Shinhan data center
3. Pilot tokenized bond issuance on dedicated permissioned L1
4. Shinhan validator node setup
5. Integration with Shinhan's existing KYC/AML systems

---
