# DOS Chain - Digital Assets & Tokenized Securities

> Hackathon: **Qwen AI Build Day** | Track: **[SS6] Digital Assets & Tokenized Securities** (Shinhan Future's Lab)
> Deadline: 17 Apr 2026 | Live Event: 21 Apr 2026 @ Riverside Palace, HCM | Final Showcase: 22 Apr 2026 @ Alibaba Cloud SME AI Growth Day VN

**Elevator Pitch**: Vietnam's first tokenized securities infrastructure - ERC-3643 issuance, on-chain KYC/AML, AI-powered compliance & investment advisory, running on a sovereign Avalanche L1

---

## Inspiration

In January 2026, South Korea's parliament passed amendments to the Capital Markets Act and Electronic Securities Act - creating the first legal framework for tokenized securities on distributed ledgers. The global RWA (Real World Asset) market has crossed **$26.4 billion**, growing 300% year-over-year. BlackRock's tokenized Treasury fund BUIDL holds **$2.5 billion** across 9 chains including Avalanche. JPMorgan's Kinexys processes **$2 billion daily** in tokenized transactions. DBS launched tokenized structured notes on Ethereum. The institutional migration to on-chain securities is no longer a question of "if" - it's "how fast."

Shinhan Financial Group has been preparing: the **STO Alliance** (2023) set industry standards, the **KB-NH-Shinhan consortium** built shared distributed ledger infrastructure, and Shinhan-backed **KDAC** became Korea's first institutional digital asset custodian. Korea's STO market alone is projected to reach **367 trillion won (~$250B) by 2030**.

But Shinhan's Vietnam subsidiary - 5 companies, 51 branches, present since 1993 - has **zero blockchain or tokenization infrastructure**. Meanwhile, Vietnam just unlocked the opportunity: the **Digital Technology Industry Law** (effective 01/01/2026) recognizes digital assets as property, and **Resolution 05/2025** launched a 5-year nationwide pilot for tokenized assets, with the Ministry of Finance accepting license applications since January 2026.

Shinhan VN CEO Lee Sun-hoon called Vietnam *"a strategic starting point for global digital innovation."* We built the infrastructure to make that happen.

## What it does

DOS Chain Digital Assets & Tokenized Securities is a **full-stack STO platform** that enables Shinhan Securities Vietnam to issue, manage, and trade tokenized securities on a sovereign Avalanche L1 blockchain, with AI-powered compliance and investment advisory.

**For Shinhan (Issuer Portal):**

| Capability | How |
|-----------|-----|
| **Issue tokenized securities** | Upload bond prospectus → Qwen AI extracts all parameters (face value, coupon, maturity, restrictions) → review → one-click deploy ERC-3643 compliant token |
| **Automated compliance** | Qwen AI checks issuance against VN Digital Asset Law, KR STO regulations, generates compliance reports for regulators |
| **Lifecycle management** | Pause/unpause tokens, freeze investor accounts (regulatory order), force transfers, distribute coupon payments |

**For Investors (Investor Portal):**

| Capability | How |
|-----------|-----|
| **KYC onboarding** | Upload ID → ONCHAINID identity contract deployed with signed claims (KYC, AML, country, accredited status) |
| **Browse & invest** | Marketplace of tokenized securities - filter by type, yield, maturity, risk rating |
| **AI investment advisor** | Chat with Qwen AI: "explain this bond," "compare SCB26A vs SCB26B," "recommend bonds for conservative profile" - in Vietnamese, English, or Korean |
| **Portfolio management** | Holdings, P&L tracking, coupon payment history, transfer records |

**On-chain compliance (automatic, every transaction):**

Every token transfer passes through the ERC-3643 compliance module - it checks the investor's ONCHAINID claims (KYC verified? AML cleared? Country allowed? Lock-up period passed? Investor limit reached?) **before the transfer executes**. Non-compliant transfers are automatically blocked at the smart contract level. No off-chain enforcement needed.

**For Regulators (Compliance Dashboard + DOScan):**

Full transparency - AI-generated compliance reports per token, investor registry with claim status, complete transfer audit trail, PDF export. All on-chain data independently verifiable through DOScan explorer.

## How we built it

| Layer | Technology |
|-------|-----------|
| Blockchain | **DOS Chain** - Avalanche L1, Chain ID 7979, 4 validators, 1s blocks, 100M gas limit |
| Smart contracts | **ERC-3643 (T-REX)** - Token, Identity Registry, ONCHAINID, Compliance Module, Claim Verifier, Trusted Issuers Registry, Token Factory. Foundry, Solidity 0.8.17 (T-REX) + ^0.8.28 (DOS contracts) |
| AI inference | **Qwen3.5** via Alibaba Cloud Model Studio - 3 agents: Doc Processor (Qwen-VL), Compliance Engine (RAG), Investment Advisor |
| User auth | **DOS.Me ID** - login via id.dos.me (Supabase Auth), no wallet required for end users |
| Issuer Portal | Next.js 16 + viem, backend wallet signs deployments on behalf of issuers (no crypto wallet needed) |
| Investor Portal | Next.js 16 + DOS.Me SSO login, live marketplace auto-populates from on-chain TREXFactory events, embedded Qwen AI chat widget |
| Localization | Vietnamese (default) + English, switchable |
| Explorer | **DOScan** - enhanced token pages with securities metadata |
| Identity | **ONCHAINID** (ERC-3643 standard) - 1 identity contract per investor, claims signed by Shinhan as Trusted Issuer |
| Attestations | **EAS** (Ethereum Attestation Service) - existing deployment on DOS Chain, feeds trust scores and broader identity data |
| Cross-chain | **ICTT bridge** - DOS Chain ↔ Avalanche C-Chain settlement |

**Qwen AI is core to the solution - not bolted on:**

1. **Document Processor** - Qwen-VL reads prospectus PDFs and extracts structured data (security name, face value, coupon rate, maturity, restrictions). This directly populates the TokenFactory deployment parameters. Without AI, an issuer would manually fill 15+ fields per security.

2. **Compliance Engine** - RAG over Vietnamese and Korean regulatory documents. Checks every issuance against Digital Technology Industry Law 2025, Resolution 05/2025, and Korean Capital Markets Act. Generates compliance reports that a regulator can actually read.

3. **Investment Advisor** - Reads on-chain data (token metadata, holder distribution, transfer volume) + investor's portfolio, provides natural language investment guidance in Vietnamese/English/Korean.

**Why Avalanche L1 (DOS Chain) instead of C-Chain or Ethereum?**

Shinhan can **run its own validator node** on DOS Chain - impossible on C-Chain or Ethereum. This gives the same sovereign control as JPMorgan's Kinexys or a private Hyperledger, but with full Avalanche ecosystem interoperability (ICTT bridge to C-Chain, same ecosystem as BlackRock BUIDL). Dedicated throughput, sub-cent transaction costs, and a regulatory narrative that works: "Shinhan validates transactions on a dedicated chain" beats "we deployed a contract alongside meme coins."

**Full on-premise / self-hosted capability - a banking requirement in Vietnam:**

Vietnamese banking regulations require that financial infrastructure can be deployed entirely on-premise within the bank's own data center. Every component in our stack supports this:

| Component | Self-hosted? | How |
|-----------|-------------|-----|
| **DOS Chain** (blockchain) | Yes | AvalancheGo binary, run validators on bank's own servers |
| **DOScan** (explorer) | Yes | Docker containers (backend + frontend + PostgreSQL) |
| **Qwen AI** (3 agents) | Yes | Self-hosted via vLLM on bank's GPU servers, no cloud dependency |
| **DApp** (web portals) | Yes | Next.js, deploy on any Node.js server or Docker |
| **DOS.Me ID** (auth) | Yes | Supabase self-hosted (already running on our own infrastructure) |
| **EAS** (attestations) | Yes | Smart contracts on DOS Chain - no external dependency |

**Zero cloud dependency.** The entire stack - blockchain nodes, explorer, AI inference, web app, authentication, custody - can run inside Shinhan's data center on Shinhan's hardware. No data leaves the bank's network. This is not a theoretical capability - DOS Chain already runs on self-managed VMs, DOScan runs self-hosted Docker, Qwen runs on self-hosted GPU, and Supabase runs self-hosted.

**Dedicated permissioned L1 option.** If required, we can deploy a completely separate permissioned Avalanche L1 exclusively for Shinhan - running entirely on Shinhan's servers with Shinhan-controlled validators. Same ERC-3643 contracts, same AI agents, same DApp - but on a private chain where Shinhan controls 100% of the infrastructure. This chain can still bridge to the public DOS Chain or Avalanche C-Chain via ICTT when cross-chain settlement is needed, or operate fully isolated if regulation demands it. Spinning up a new Avalanche L1 takes hours, not months - the tooling and deployment scripts are already built.

## Institutional Validation - We Use What the Giants Use

We didn't invent anything new. Every technical choice we made is already proven at institutional scale by major banks and asset managers. When Shinhan Vietnam adopts DOS Chain, they're adopting the same standards as JPMorgan, BlackRock, DTCC, and their own Korea parent company.

**ERC-3643 (T-REX) - the token standard we use:**

| Institution | What they tokenized on ERC-3643 | Scale |
|-------------|--------------------------------|-------|
| **DTCC** | Joined the ERC-3643 Association (03/2025) as founding member | World's largest securities settlement system - $2.5 quadrillion/year |
| **US SEC** | Publicly recognized ERC-3643 as compliant for tokenized securities (07/2025) | Regulatory validation |
| **Tokeny** | Platform powering banks, asset managers, exchanges | $32B+ in securities issued via T-REX |
| **Archax** | FCA-regulated digital asset exchange | First UK-regulated STO platform on T-REX |
| **K3 Capital** | Tokenized pre-IPO equity | Backed by major institutional investors |
| **CMTA** (Swiss bankers) | Adopted T-REX for Swiss digital securities | Swiss regulatory framework |

**Sovereign/dedicated L1 blockchain - our architectural choice:**

| Institution | Their sovereign chain | Why they did it |
|-------------|----------------------|-----------------|
| **JPMorgan** | Kinexys (Quorum → Canton) | $2B/day in tokenized transactions, $1.5T+ processed |
| **Goldman Sachs** | GS DAP (Canton/Daml) | Tokenized bonds, MMFs, spinning out as platform in 2026 |
| **HSBC** | Orion (private DLT) | $3.5B+ digital native bonds, UK sovereign bond pilot |
| **Citi** | Citi Token Services (permissioned) | Cross-border 24/7 settlement across US/UK/SG/HK/IE |
| **Shinhan (Korea)** | Lambda256/Luniverse + KDAC | Same playbook we're replicating for Vietnam |

**Tokenized assets on public-adjacent chains (our interop story):**

| Asset | Platform | Chain(s) | Scale |
|-------|----------|---------|-------|
| **BlackRock BUIDL** | Securitize | 9 chains incl. Avalanche | **$2.5B+ AUM, 40% of tokenized treasury market** |
| **Franklin Templeton BENJI** | Proprietary + Stellar | 8 chains incl. Avalanche | $732M AUM |
| **Ondo Finance OUSG** | Ondo | Ethereum + Sui + Solana | $650M+ TVL in tokenized treasuries |
| **Hamilton Lane SCOPE** | Securitize | Polygon + Avalanche | Tokenized private equity fund |
| **Apollo Global ACRED** | Securitize | Ethereum + Solana | Tokenized credit fund |
| **WisdomTree Prime** | Proprietary + Stellar | Multi-chain | Tokenized MMF, gold, etc. |

**The pattern is unmistakable:** every major institutional tokenization initiative uses (a) dedicated/permissioned chains with sovereign validator control, (b) on-chain identity + compliance at the smart contract level, and (c) interoperability bridges to public chains. DOS Chain + ERC-3643 + ONCHAINID + ICTT gives Shinhan Vietnam exactly this architecture, in production, today.

**Why this matters for Shinhan:** the market research is done. The standards are set. The regulatory precedents exist. Shinhan doesn't need to pioneer a new approach - they need to execute on the proven one, first in Vietnam. That's a 6-month project, not a 3-year one.

## Challenges we ran into

**ERC-3643 on a fresh chain.** The T-REX reference implementation assumes Ethereum mainnet tooling. Deploying the full 6-contract system (Token, Identity Registry, ONCHAINID, Compliance Module, Claim Verifier, Trusted Issuers Registry) plus the Token Factory on DOS Chain required adapting deployment scripts and verifying contract interactions work correctly with Avalanche L1's consensus model.

**Compliance is not a checkbox.** Building the RAG pipeline for the Compliance Engine meant sourcing, parsing, and chunking Vietnamese legal documents (Digital Technology Industry Law - 80+ articles) and Korean STO legislation. Legal text is dense, cross-referencing, and full of exceptions. Getting Qwen to produce accurate compliance assessments - not hallucinated ones - required careful prompt engineering and structured output validation.

**Gasless onboarding for investors.** Deploying a full ONCHAINID identity contract per investor costs $50-100 on Ethereum. On DOS Chain, the cost is fractions of a cent - and we can go further: DOS Chain supports **gasless transactions for whitelisted contracts and users**, meaning investors pay zero gas for KYC onboarding and identity deployment. This turns a challenge on other chains into a competitive advantage.

**Bridging securities across chains.** Tokenized securities aren't like fungible tokens - a cross-chain transfer must preserve compliance state. The investor on the destination chain must also have valid ONCHAINID claims. We designed the ICTT bridge integration to enforce this, but it added complexity to what's normally a simple bridge call.

## Accomplishments that we're proud of

- **Full ERC-3643 live on mainnet** - not a testnet demo. 6-contract T-REX system + TREXFactory at vanity `0x7979...3643` (Rust miner, 49M hashes/sec, 108s).
- **PDF → token in <10 seconds** - Qwen extracts params, AI validates compliance, backend wallet fires 4 transactions (deploy + register + unpause + mint). Real supply on-chain.
- **Live marketplace from on-chain events** - Investor Portal queries `TREXSuiteDeployed` from the factory. No database, blockchain is the source of truth.
- **4 sample prospectuses** - Corporate Bond, Government Bond, REIT Fund, and a non-compliant Cayman crypto fund. AI correctly blocks the bad one.
- **Compliance enforced at contract level** - every transfer checked against ONCHAINID claims. Non-compliant = reverts. No off-chain trust.
- **Zero-friction UX** - DOS.Me SSO login (no MetaMask), gasless for whitelisted users (ONCHAINID deployment costs the investor $0 vs $50-100 on Ethereum).
- **On-premise ready** - every component self-hostable on bank hardware. Required by Vietnamese banking regulations.
- **Built on live infrastructure** - EAS, DOScan, ICTT, DOS Names, Faucet - all in production. We integrated, didn't reinvent.

## What we learned

1. **Standards > innovation in regulated finance.** Banks want ERC-3643 + ONCHAINID (DTCC & SEC endorsed), not custom cleverness.
2. **Avalanche L1 is the institutional sweet spot.** Sovereign validators + interop + near-zero cost. What JPMorgan built Kinexys toward, we had on day one.
3. **AI compliance is a force multiplier.** Manual VN/KR regulatory review takes a legal team days. Qwen does the first 90% in seconds - lawyers review the rest.
4. **Vietnam is ready.** Law 2025, Resolution 05/2025, MoF license applications open. The missing piece is infrastructure, not permission.
5. **On-premise is non-negotiable.** Shinhan's webinar (15/04/2026) confirmed VN banks need full on-premise. This eliminates SaaS-only competitors (Securitize, Tokeny).
6. **Korea playbook maps to VN.** Shinhan's STO Alliance + Lambda256 + KDAC model all translate - DOS Chain is the Vietnam-ready equivalent.

## What's next for DOS Chain Digital Assets & Tokenized Securities

**Known gaps in the hackathon build (documented honesty):**

These are built into the demo as wireframes/placeholders but not fully wired to the blockchain yet. Production work:
- **Investor KYC onboarding UI** - currently investors log in via DOS.Me SSO, but the full KYC → ONCHAINID deployment → claim signing flow is demoed in the issuer path only (issuer's own ONCHAINID). Investor-side KYC wizard + ONCHAINID creation per investor is the next piece.
- **Buy/sell marketplace UX** - marketplace lists deployed tokens live from on-chain events, but the "Buy N units" button is not yet wired. Needs: token allowance flow, gasless meta-transaction via ERC-4337 paymaster, settlement against issuer balance.
- **Compliance Dashboard data** - currently shows hardcoded demo rows. Needs: query all deployed tokens + aggregate holder/country/audit metadata from Identity Registry events.
- **AI Investment Advisor on-chain data integration** - Qwen chat works but currently answers from its training + hardcoded context. Should read live token metadata, holder distribution, transfer volume from DOS Chain.
- **Coupon payment distribution** - smart contract support exists (ERC-3643 has `forcedTransfer`) but no scheduled distribution UI yet.
- **Multi-investor test** - demo is single-wallet (deployer/issuer mints to themselves). Need: register a second investor wallet, add KYC claim, demonstrate compliant transfer.
- **Token metadata on DOScan** - face value, coupon rate, maturity date are in the prospectus but not stored on-chain yet. Need either a MetadataRegistry contract or off-chain JSON pinned to IPFS.
- **Safe multisig for institutional custody** - currently backend wallet signs deployments; production would route through a Shinhan-controlled Gnosis Safe on DOS Chain for multi-signature approval.
- **Token factory verification on DOScan** - TREXFactory deployed but not Etherscan-verified on DOScan yet (source code verification).

**Immediate next steps (PoC with Shinhan via InnoBoost):**
- Pilot tokenized corporate bond issuance with Shinhan Securities Vietnam
- On-premise deployment of full stack in Shinhan's data center (blockchain nodes, DOScan, AI, DApp)
- Integrate with Shinhan's existing KYC/AML systems for ONCHAINID claim issuance
- Connect to Shinhan's SOL app for investor access
- Close the gaps above (investor KYC, buy/sell, coupon distribution, multisig custody)

**Short-term (6 months):**
- Multi-asset support: corporate bonds → government bonds → fund certificates → structured notes
- Secondary market trading with on-chain order book or AMM designed for securities
- Coupon payment automation - smart contract distributes yield to token holders on schedule
- Shinhan runs validator node on DOS Chain - full sovereign participation

**Medium-term (12 months):**
- Cross-border STO: leverage ICTT bridge for DOS Chain ↔ C-Chain ↔ Ethereum settlement
- Integration with Shinhan's Korean STO infrastructure (Lambda256/Luniverse) via bridge
- Won-pegged stablecoin settlement (8 Korean banks consortium)
- Expand to other Shinhan subsidiaries: Shinhan Bank VN (tokenized deposits), Shinhan Finance (tokenized lending)

**Long-term:**
- Full RWA platform: real estate, commodities, private credit tokenization
- Regulatory sandbox participation under VN Resolution 05/2025
- Connect to Chainlink DTA for Swift messaging integration (following UBS model)
- Open the Token Factory to other Vietnamese securities firms - DOS Chain becomes the national STO infrastructure

---

## Live Links

| Resource | URL |
|----------|-----|
| **DApp** | [rwa.doschain.com](https://rwa.doschain.com) |
| **Explorer** | [doscan.io](https://doscan.io) |
| **Token SCB26A** | [doscan.io/token/0x2720...](https://doscan.io/token/0x27202027046E614E159329d9cdf8c35a197CC7b5) |
| **TREXFactory** | [doscan.io/address/0x7979...3643](https://doscan.io/address/0x7979539fb9eb7f1c92221f278a92812967303643) |
| **DOS.Me Login** | [id.dos.me](https://id.dos.me) |
| **GitHub (submission)** | [github.com/DOS/RWA](https://github.com/DOS/RWA) |
| **GitHub (full monorepo)** | [github.com/DOS/DOS-Chain](https://github.com/DOS/DOS-Chain) |

---

## Design Spec

### Overview

**DOS Securities** is a full-stack Security Token Offering (STO) platform on DOS Chain (Avalanche L1) combining ERC-3643 compliant tokenization with Qwen AI for compliance automation, document processing, and investment advisory - enabling Shinhan Securities Vietnam to become the first mover in tokenized securities in Vietnam.

**Pitch**: Shinhan has an STO roadmap in Korea (STO Alliance, Lambda256, KDAC) but **zero blockchain/tokenization initiative in Vietnam**. Vietnam just opened up - Digital Technology Industry Law (01/2026) + Resolution 05/2025 (5-year pilot for tokenized assets). The global RWA market is $26.4B growing 300% YoY. DOS Securities gives Shinhan VN the tools to issue, manage, and trade tokenized securities on a sovereign Avalanche L1 chain with AI-powered compliance.

### Architecture - 4 Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                         │
│                                                                 │
│  Issuer Portal        Investor Portal      Compliance Dashboard │
│  (Shinhan internal)   (Public)             (Regulator view)     │
│  - Upload prospectus  - KYC onboarding     - AI compliance      │
│  - Deploy tokens      - Browse securities    reports per token  │
│  - Manage lifecycle   - Buy/sell tokens    - Investor registry  │
│  - Distribute coupons - Qwen AI advisor    - Transfer audit log │
│                         chat widget        - PDF export         │
├─────────────────────────────────────────────────────────────────┤
│                        QWEN AI LAYER                            │
│                                                                 │
│  Qwen AI Gateway (Alibaba Cloud Model Studio)                   │
│                                                                 │
│  Agent 1: Doc Processor     Agent 2: Compliance    Agent 3:     │
│  - PDF prospectus/term      Engine                 Investment   │
│    sheet → structured       - RAG over VN/KR       Advisor      │
│    JSON → contract params     regulatory docs      - Risk       │
│  - Qwen-VL for document    - Check issuance         analysis   │
│    understanding              compliance           - Portfolio  │
│                             - Transfer eligibility   recommend  │
│                             - AML screening        - NL Q&A     │
│                             - Generate reports     - VI/EN/KR   │
├─────────────────────────────────────────────────────────────────┤
│                    SMART CONTRACT LAYER                          │
│                     (DOS Chain 7979)                             │
│                                                                 │
│  ERC-3643 T-REX System (industry standard):                     │
│  ┌──────────┐ ┌────────────────┐ ┌───────────────────────┐      │
│  │ Token    │ │ Identity       │ │ Compliance Module     │      │
│  │ (T-REX)  │ │ Registry       │ │ - CountryRestrict     │      │
│  │ ERC-20 + │ │ wallet →       │ │ - InvestorLimit       │      │
│  │ transfer │ │ ONCHAINID      │ │ - LockUpPeriod        │      │
│  │ hooks    │ │                │ │ - MinDenomination     │      │
│  └──────────┘ └────────────────┘ └───────────────────────┘      │
│  ┌──────────┐ ┌────────────────┐ ┌───────────────────────┐      │
│  │ Claim    │ │ Token Factory  │ │ Trusted Issuers       │      │
│  │ Verifier │ │ deploy new     │ │ Registry              │      │
│  │ (KYC/AML │ │ securities     │ │ Shinhan = trusted     │      │
│  │ claims)  │ │                │ │ issuer                │      │
│  └──────────┘ └────────────────┘ └───────────────────────┘      │
│                                                                 │
│  Existing DOS Chain infrastructure:                              │
│  EAS (attestations) | ICTT Bridge | Multicall3 | DOS Names      │
├─────────────────────────────────────────────────────────────────┤
│                    INFRASTRUCTURE LAYER                          │
│                                                                 │
│  DOS Chain Mainnet    DOScan Explorer   ICM Relayer              │
│  4 validators         Full indexing     Cross-chain settlement   │
│  1s blocks            Regulator view                             │
│  100M gas limit                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Identity Architecture

**ONCHAINID** (ERC-3643 standard) is the identity layer for securities compliance.
**EAS** (existing on DOS Chain) provides broader attestation data (trust scores, reputation).

```
Investor onboard
       │
       ▼
  Shinhan KYC process
  (Qwen AI assists with document verification)
       │
       ▼
  ONCHAINID deployed (1 contract per investor)
  Claims added (signed by Shinhan as Trusted Issuer):
    - Topic 1: KYC verified ✓
    - Topic 2: AML cleared ✓
    - Topic 3: Accredited investor ✓
    - Topic 4: Country = VN ✓
       │
       ▼
  Identity Registry links wallet → ONCHAINID
       │
       ▼
  ERC-3643 Compliance Module
  reads ONCHAINID claims before every transfer
       │
  Meanwhile, EAS attestations (existing):
    - Trust scores → feed Qwen AI risk analysis
    - Social/blockchain identity → DOS.Me ecosystem
    - Broader data layer, not required for transfer compliance
```

**Why ONCHAINID (not custom)**: ERC-3643 + ONCHAINID is the industry standard - DTCC joined (03/2025), SEC recognized (07/2025). For a banking hackathon, using the exact standard the industry has converged on is the strongest narrative.

### Smart Contracts - ERC-3643 T-REX Components

#### 1. Token (T-REX)
- ERC-20 compatible with transfer hooks
- `canTransfer()` checks compliance before EVERY transfer
- `decimals: 0` for whole-unit securities (bonds)
- Metadata: face value, coupon rate, maturity date, ISIN

#### 2. Identity Registry
- Maps investor wallet address → ONCHAINID contract
- Only registered investors can hold tokens
- Shinhan = registry agent (add/remove investors)

#### 3. ONCHAINID (per investor)
- Holds signed claims from Trusted Issuers
- Claims: KYC level, AML status, accredited status, country, expiry
- Self-sovereign: investor owns their identity contract

#### 4. Compliance Module
- Pluggable rules engine, checked on every transfer:
  - `CountryRestrict` - only VN, KR residents
  - `InvestorLimit` - max 200 holders per token
  - `LockUpPeriod` - e.g., 6 months post-issuance
  - `MinDenomination` - e.g., 1M VND minimum
- Modular: Shinhan can add/remove rules per security

#### 5. Claim Verifier (ClaimTopicsRegistry)
- Defines required claim topics per token
- e.g., "This bond requires KYC (topic 1) + AML (topic 2) + Accredited (topic 3)"

#### 6. Trusted Issuers Registry
- Who can sign claims: Shinhan Securities VN, Shinhan Bank VN
- Future: third-party KYC providers can be added

#### 7. Token Factory
- One-click deploy new tokenized security:
  ```
  deploySecurityToken(
    name: "Shinhan Corp Bond 2026-A",
    symbol: "SCB26A",
    complianceModules: [country, lockup, investorLimit],
    claimTopics: [KYC, AML, ACCREDITED],
    trustedIssuers: [shinhan.dos],
    initialSupply: 10000,
    metadata: {
      faceValue: "1000000",    // 1M VND per unit
      couponRate: "850",       // 8.50% in basis points
      maturityDate: 1798761600,
      issuer: "Shinhan Securities Vietnam"
    }
  )
  ```

### Qwen AI Layer - 3 Agents

#### Agent 1: Document Processor
- **Input**: PDF/image of prospectus, term sheet
- **Process**: Qwen-VL (vision) reads document → extracts structured fields
- **Output**: JSON ready for TokenFactory deployment
- **Fields extracted**: security name, type, ISIN, face value, currency, coupon rate, payment frequency, maturity date, min denomination, investor restrictions, issuer info

#### Agent 2: Compliance Engine
- **Knowledge base (RAG)**:
  - VN Digital Technology Industry Law 2025
  - VN Resolution 05/2025 (tokenized asset pilot)
  - KR Capital Markets Act (STO amendments)
  - KR Electronic Securities Act
  - Shinhan internal compliance guidelines
- **Functions**:
  - `checkIssuanceCompliance(tokenParams)` → compliant/issues/report
  - `checkTransferEligibility(from, to, amount)` → eligible/reason
  - `generateComplianceReport(tokenAddress)` → PDF for regulators
  - `screenAML(investorAddress)` → clean/riskScore

#### Agent 3: Investment Advisor
- **Context**: all tokenized securities on DOS Chain, on-chain data, investor portfolio, market data
- **Capabilities**:
  - "Explain this bond in simple terms"
  - "Compare SCB26A vs SCB26B"
  - "What's my portfolio risk?"
  - "Recommend bonds for conservative investor"
- **Languages**: Vietnamese + English + Korean
- **Interface**: Chat widget in Investor Portal

### Presentation Layer - 3 DApps

#### 1. Issuer Portal (Shinhan internal)
- Upload prospectus → Qwen extracts params → review & edit → backend wallet deploys ERC-3643 token (4 transactions: deploy + register + unpause + mint)
- Token management: pause/unpause, freeze investor, force transfer (regulatory order), update compliance rules, distribute coupon payments
- Compliance dashboard: AI reports per token, investor registry, transfer audit log, PDF export

#### 2. Investor Portal (Public)
- KYC onboarding: upload ID → Qwen verify → ONCHAINID created with claims
- Marketplace: browse tokenized securities, filter by type/yield/maturity/risk
- Portfolio: holdings, P&L, coupon payments, transfer history
- Qwen AI chat widget for investment advice

#### 3. DOScan Integration (Enhanced)
- Token pages show metadata: face value, coupon, maturity, compliance status
- Investor registry visible (addresses + claim status)
- Transfer events with compliance check results

### Why DOS Chain (Avalanche L1) vs Alternatives

| Criteria | DOS Chain (Avalanche L1) | Avalanche C-Chain | Ethereum L1 | Permissioned (Quorum/Canton) |
|----------|---|---|---|---|
| **Who uses similar** | - | BlackRock BUIDL ($500M) | BlackRock BUIDL ($2B), DBS, UBS | JPMorgan Kinexys, Citi, Goldman |
| **Throughput** | **Dedicated** - 100M gas, 1s blocks | Shared with all dApps | Shared, congestion | Dedicated but isolated |
| **Cost** | ~0.001 VND/tx | ~$0.01-0.10/tx | $5-50/tx | Free (high infra cost) |
| **Permissioning** | **Flexible** - PoA validators (Shinhan can run node) | Permissionless only | Permissionless only | Fully permissioned |
| **Compliance** | ERC-3643 + ONCHAINID + EAS | ERC-3643 | ERC-3643 | Custom, non-standard |
| **Interop** | ICTT bridge → C-Chain → Ethereum | Native Avalanche | Bridges (risk) | Isolated silo |
| **Validator control** | **Shinhan can run validator** (like KDAC on Polymesh) | Cannot | Cannot | Must host everything |
| **Data privacy** | Configurable - encrypt sensitive data | Fully public | Fully public | Full privacy |
| **Explorer** | DOScan (dedicated, full indexing) | Snowtrace (shared) | Etherscan (shared) | No public explorer |
| **On-premise** | **Full self-hosted** - all components | Cannot | Cannot | Yes but isolated |
| **Existing infra** | EAS, Names, Bridge, Faucet - ALL LIVE | Deploy from scratch | Deploy from scratch | Build from scratch |

**Key argument**: DOS Chain gives Shinhan the **best of both worlds** - sovereign control like a private chain (run validators, custom gas economics, dedicated throughput) but interoperable like a public chain (Avalanche ecosystem, ICTT bridge to Ethereum). Like JPMorgan building Kinexys as a sovereign platform but bridging to Canton Network - we already have that architecture live.

**Regulatory narrative**: "Shinhan runs validator on dedicated chain" >> "deployed contract on public chain alongside meme coins" when talking to regulators.

### Deployed Contracts (DOS Chain Mainnet - Chain ID 7979)

| Contract | Address | Note |
|----------|---------|------|
| **TREXFactory** | `0x7979539fb9eb7f1c92221f278a92812967303643` | Vanity `7979...3643`, CreateX CREATE2 |
| TREXImplementationAuthority | `0xeB898726dD4aa5750056B4aCe32668C85a9bf3a8` | Manages all T-REX implementations |
| IdFactory | `0xcCA7dA18982a8d3941c95E91449122C85B04F4C0` | ONCHAINID identity factory |
| IAFactory | `0xEf739759A738BD025403F8fa96113e6e09C1d0D0` | Implementation Authority factory |
| **Token (SCB26A)** | `0x27202027046E614E159329d9cdf8c35a197CC7b5` | Shinhan Corp Bond 2026-A |
| IdentityRegistry | `0xA02d42F345B4a96a756292b1b8818137898A90c1` | Wallet → ONCHAINID mapping |
| ModularCompliance | `0xd0CCa4Ec671b5c08f211c94FCF39007114DCbb1e` | Transfer rules engine |
| TrustedIssuersRegistry | `0x91117325e1DbcB79F1A507F744571EC14fcF1500` | Shinhan = trusted KYC issuer |
| ClaimTopicsRegistry | `0x5D156DfFae379eD3dD283d948fD3CEb5997a2593` | KYC claim topic required |
| ClaimIssuer (Shinhan) | `0x726B089560bd88059c804c3F0895A6023CDE3C73` | Signs KYC claims |
| Deployer ONCHAINID | `0x3a55529D46EF3C82D48A3D4f6685892662B2AD10` | Identity for deployer wallet |
| Investor ONCHAINID | `0xB02aA81454b79893FFA311272EC88D4e8b0e82A2` | Identity for test investor |

**On-chain verification:** Deployer balance = 90 SCB26A, Investor balance = 10 SCB26A. Transfer to unregistered address reverts with "Transfer not possible" - compliance enforced at smart contract level.

### Demo Flow for Judges

**Scene 1: Issuance** (Issuer Portal - 4-step wizard)
1. Shinhan uploads bond prospectus PDF (4 built-in samples: Corporate Bond, Government Bond, REIT Fund, Non-compliant Cayman entity)
2. **Step 1 - Upload**: Drag-and-drop or sample picker
3. **Step 2 - Review**: Qwen AI extracts 15+ fields (name, symbol, face value, coupon, maturity, restrictions, max investors, lock-up). All fields editable inline before submit.
4. **Step 3 - Compliance**: Qwen AI checks against VN Digital Technology Law 2025, Resolution 05/2025, Decree 153/2020. Non-compliant issuances (Cayman entity, no KYC, >20% yield) are blocked - deploy button disabled.
5. **Step 4 - Deploy**: Backend wallet signs 4 transactions on DOS Chain mainnet:
   - `TREXFactory.deployTREXSuite()` → creates Token + Identity Registry + Compliance Module + Claim Registry + Trusted Issuers Registry
   - `IdentityRegistry.registerIdentity()` → registers issuer with existing ONCHAINID + VN country code
   - `Token.unpause()` → enables transfers
   - `Token.mint(issuer, totalSupply)` → mints exact supply from prospectus (e.g., 500 bonds for SHVN26A)
6. Token live on DOScan with real supply, links to all component contracts

**Scene 2: Investor Marketplace** (Investor Portal)
1. Investor logs in with DOS.Me ID (email/Google SSO - no crypto wallet needed)
2. Marketplace auto-populates by querying `TREXSuiteDeployed` events from factory - every deployed token appears automatically with name, symbol, total supply, on-chain address
3. Qwen AI chat: "explain SHVN26A bond", "compare yields", "is this safe for me?" - natural language in Vietnamese

**Scene 3: Compliance View** (Compliance Dashboard)
1. Token compliance status table - all issued tokens, investor counts, countries, last audit
2. Transfer audit trail - every transfer checked on-chain against ONCHAINID claims
3. ERC-3643 enforces: transfer to unregistered address reverts with "Transfer not possible"

---

## Research & Key Insights

### Market Landscape (03/2026)

| Metric | Value |
|--------|-------|
| Total RWA on-chain (ex stablecoins) | $26.4B |
| Tokenized Treasuries | $7B+ |
| Tokenized Equities | $963M (2,878% YoY growth) |
| Avalanche RWA TVL | $1.33B (949% YoY growth) |
| Forecast 2028 (Standard Chartered) | $2 trillion |
| Korea STO market forecast 2030 (BCG) | 367T won (~$250B) |

### Major Banks Already Doing This

| Bank | Platform | Chain | Product | Scale |
|------|----------|-------|---------|-------|
| JPMorgan | Kinexys | Quorum → Canton | Tokenized deposits, Intraday Repo | $1.5T+ processed, ~$2B/day |
| BlackRock | BUIDL (Securitize) | 9 chains incl. Avalanche | Tokenized US Treasury fund | $2.5B+ AUM, 40% market share |
| Goldman Sachs | GS DAP | Canton/Daml | Tokenized bonds, MMF | Spinning out as platform 2026 |
| HSBC | Orion | DLT | Digital native bonds | $3.5B+ bonds, UK DIGIT sovereign bond pilot |
| DBS | DDEx | Ethereum public | Tokenized structured notes | $1B+ H1/2025 |
| UBS | UBS Tokenize | Ethereum | MMF token, fixed rate notes | First end-to-end Chainlink DTA |
| Franklin Templeton | BENJI | 8 chains incl. Avalanche | Tokenized US Gov Money Fund | $732M AUM |
| Citi | Citi Token Services | Permissioned | Tokenized deposits, cross-border 24/7 | US, UK, SG, HK, IE |
| Standard Chartered | - | - | Tokenized deposits (SGD/USD/HKD/CNH) | - |

### Shinhan Specific

- **STO Alliance** (02/2023) - consultative body for tokenized securities ecosystem
- **Lambda256/Luniverse** - PoC STO platform (blockchain infra, wallet, token issuance)
- **KDAC** (Shinhan invested) - first institutional digital asset custodian in Korea, Polymesh node operator
- **Consortium KB + NH + Shinhan** - shared distributed ledger for STO
- **8 Korean banks** (incl. Shinhan) developing **won-pegged stablecoin**
- **Vietnam**: 5 subsidiaries, present since 1993, CEO says "Vietnam is strategic starting point for global digital innovation" - **NO blockchain/tokenization initiative in VN yet** = greenfield opportunity
- **InnoBoost**: winner gets priority for up to **VND 200M PoC funding**

### Token Standard: ERC-3643 (T-REX)

**Why ERC-3643 over alternatives:**

| Feature | ERC-3643 | ERC-1400 | ERC-20 |
|---------|----------|----------|--------|
| Status | Official ERC, DTCC joined (03/2025), SEC recognized (07/2025) | Draft, never finalized | Standard |
| On-chain identity | ONCHAINID built-in | None | None |
| Compliance | Modular compliance module, automatic transfer restrictions | Partition-based | None (off-chain only) |
| KYC/AML | Identity Registry + Claim Verifier | Manual | Manual |
| Best for | Regulated securities (our use case) | US equity/bonds | Simple tokens |
| Used by | Tokeny, Avalanche RWA, SkyBridge, DTCC | Polymath | BUIDL/BENJI (with wrapper) |

ERC-3643 is the winning standard for tokenized securities - on-chain compliance, identity registry, transfer restrictions built-in. Perfect fit for VN regulation requiring KYC/AML.

### Vietnam Regulatory (Favorable Timing)

- **Digital Technology Industry Law 2025**: effective 01/01/2026 - recognizes digital assets as property
- **Resolution 05/2025**: 5-year pilot program for tokenized assets nationwide
- Requirements: only crypto assets **backed by tangible assets**, only VN companies can issue
- Tax: 0.1% per transaction (from 2026)
- Ministry of Finance accepting license applications since 20/01/2026

### Korea STO Regulatory

- **01/2026**: Parliament passed amendments to Capital Markets Act + Electronic Securities Act
- **02/2027**: Takes effect - legal framework for issuing tokenized securities on DLT
- Allows tokenization of: real estate, music copyrights, art, livestock
- "Qualified issuers" can directly issue and manage tokenized securities on blockchain

### Key Platforms/Protocols

| Platform | Role | Scale |
|----------|------|-------|
| Securitize | Tokenization-as-a-service | $4.6B+ AUM, 20% RWA market |
| Ondo Finance | Tokenized treasuries + equities | $650M+ TVL |
| Tokeny | ERC-3643 compliance platform | Creator of T-REX standard |
| Centrifuge | Private credit tokenization | Pioneer |
| Polymath/Polymesh | Security token infrastructure | ERC-1400 creator |
| Chainlink | Oracle + DTA standard | Swift integration, UBS/JPM partner |
