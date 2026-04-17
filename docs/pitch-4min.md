# DOS Chain RWA - 4-Minute Pitch

**Hackathon:** Qwen AI Build Day x Shinhan Future's Lab
**Track:** SS6 - Digital Assets & Tokenized Securities
**Format:** 4 minutes, 6 slides, no Q&A time budgeted
**Target WPM:** 150-160 (natural pace, enough for clarity + buffer)
**Total words:** ~600

---

## Slide 1 - Title / Hook (20s, ~50 words)

### Slide content

> **DOS Chain RWA**
> *Vietnam's first tokenized securities infrastructure*
>
> ERC-3643 + Qwen AI + Avalanche L1
>
> Team: DOS Labs
> Demo: rwa.doschain.com

### Script (say this)

"Xin chào ban giám khảo. Tôi là [tên], đại diện DOS Labs.

Trong 4 phút tới, tôi sẽ cho các anh chị thấy nền tảng chứng khoán token hóa đầu tiên tại Việt Nam - đã chạy live trên mainnet hôm nay - và tại sao Shinhan Securities Vietnam nên là người đầu tiên dùng nó."

---

## Slide 2 - Problem / Opportunity (40s, ~100 words)

### Slide content

> **The $26.4B opportunity**
>
> - Global RWA on-chain: **$26.4B** (+300% YoY)
> - BlackRock BUIDL: **$2.5B** on Avalanche + 8 other chains
> - JPMorgan Kinexys: **$2B/day** in tokenized transactions
> - Korea STO market by 2030: **$250B**
>
> **Shinhan's paradox:**
> - Korea: STO Alliance, Lambda256, KDAC
> - **Vietnam: Zero blockchain infrastructure**
>
> Vietnam just opened up:
> - Digital Technology Law 2025 (01/01/2026)
> - Resolution 05/2025 - 5-year tokenization pilot

### Script

"Thị trường RWA toàn cầu đã vượt 26 tỷ đô, tăng 300% mỗi năm. BlackRock nắm 2,5 tỷ trong quỹ token hóa. JPMorgan xử lý 2 tỷ đô mỗi ngày qua Kinexys.

Shinhan có nghịch lý thú vị: ở Hàn Quốc, các anh đã có STO Alliance, Lambda256, KDAC - playbook hoàn chỉnh. Nhưng ở Việt Nam - 5 công ty con, 51 chi nhánh, có mặt từ 1993 - hoàn toàn không có hạ tầng blockchain nào.

Việt Nam vừa mở cửa: Luật Công nghệ Số 2025 công nhận tài sản số, Nghị quyết 05/2025 thí điểm 5 năm cho tokenization. Cửa sổ cơ hội đang mở. Câu hỏi không phải 'có nên làm không' mà là 'ai sẽ đi trước'."

---

## Slide 3 - Solution (40s, ~100 words)

### Slide content

> **Full-stack STO + Payments platform**
>
> ```
> Upload PDF → AI extracts → Compliance check → Deploy → Mint
> ```
>
> **Stack:**
> - **ERC-3643 (T-REX)** - DTCC & SEC endorsed standard
> - **ONCHAINID** - on-chain KYC per investor
> - **Qwen 3.5-35B** - 3 AI agents (docs, compliance, advisor)
> - **DOS Chain** - sovereign Avalanche L1, 1s blocks
> - **DOS.Me ID** - SSO login, no wallet needed
> - **ICTT bridge** - cross-chain settlement
>
> **Covers both halves of SS6:**
> - Tokenized Securities ✓
> - Digital Asset Payments ✓ (gasless, ERC-4337, x402)

### Script

"Giải pháp: nền tảng full-stack vừa token hóa chứng khoán, vừa xử lý thanh toán - đúng 2 nửa đề bài SS6.

Nhà phát hành upload bản cáo bạch PDF. Qwen AI trích xuất thông số trong vài giây. AI kiểm tra tuân thủ theo luật Việt Nam. Một click, backend wallet deploy token ERC-3643 với compliance tự động trên DOS Chain. Mọi chuyển khoản đều được kiểm tra KYC on-chain trước khi thực hiện.

Không cần MetaMask - nhà đầu tư login bằng email qua DOS.Me. Không cần gas - whitelist user trả 0 đồng. Settlement 1 giây - nhanh hơn T+2 truyền thống 172 nghìn lần."

---

## Slide 4 - Live Demo (60s, ~150 words)

### Slide content

> **LIVE on DOS Chain mainnet**
>
> **TREXFactory:** `0x7979...3643` (vanity - mined in 108s)
>
> **4 sample prospectuses:**
> - ✓ Corporate Bond (Shinhan SHVN26A)
> - ✓ Government Bond (Kho Bạc VNGB26)
> - ✓ REIT Fund (Shinhan SHREIT26)
> - ✗ Non-compliant Cayman fund - **AI blocks it**
>
> **Flow: PDF → token in <10 seconds**
> 1. `deployTREXSuite` - creates 6 contracts
> 2. `registerIdentity` - deployer with VN country
> 3. `unpause` - enable transfers
> 4. `mint(totalSupply)` - real supply on-chain
>
> rwa.doschain.com

### Script

"Đây không phải testnet demo - mọi thứ live trên mainnet hôm nay.

TREXFactory ở địa chỉ vanity `0x7979...3643`. Mình viết Rust miner tự tìm, 49 triệu hash mỗi giây, mất 108 giây tìm ra.

Tôi chuẩn bị sẵn 4 mẫu cáo bạch để các anh chị thử: trái phiếu doanh nghiệp Shinhan, trái phiếu Kho Bạc Nhà Nước, quỹ BĐS Shinhan REIT, và một quỹ crypto Cayman không hợp lệ để test AI compliance.

Click vào quỹ Cayman - AI đọc xong trong 10 giây, phát hiện: tổ chức phát hành không đăng ký tại Việt Nam, không có KYC, lãi suất 24% bất thường. Nút deploy bị vô hiệu hóa. AI chặn được đúng cái sai.

Click vào trái phiếu Shinhan - AI pass, backend bắn 4 giao dịch: deploy, register, unpause, mint. Token xuất hiện ngay trên sàn Investor Portal. Nhà đầu tư có thể xem trên DOScan."

---

## Slide 5 - Why This Works (Institutional Validation) (45s, ~110 words)

### Slide content

> **We didn't invent anything. We execute what giants proved.**
>
> **ERC-3643 (our standard):**
> - DTCC joined (03/2025) - $2.5 quadrillion/year
> - US SEC endorsed (07/2025)
> - Tokeny: $32B+ issued
>
> **Sovereign L1 architecture (our chain):**
> - JPMorgan Kinexys: $2B/day
> - Goldman GS DAP, HSBC Orion, Citi Token Services
> - Shinhan Korea: Lambda256 + KDAC
>
> **Tokenized assets on same chains:**
> - BlackRock BUIDL: **$2.5B** on Avalanche
> - Franklin BENJI: **$732M** on Avalanche
>
> → Shinhan Vietnam just needs to **execute**, not pioneer.

### Script

"Một lưu ý quan trọng: chúng tôi không phát minh gì mới.

Chuẩn ERC-3643 đã được DTCC - hệ thống thanh toán chứng khoán lớn nhất thế giới - tham gia tháng 3/2025. SEC Mỹ công nhận tháng 7/2025. Tokeny đã phát hành 32 tỷ đô chứng khoán qua chuẩn này.

Kiến trúc L1 chủ quyền - đúng mô hình Kinexys của JPMorgan, Orion của HSBC, và chính Lambda256 mà Shinhan đã dùng tại Hàn Quốc.

BlackRock BUIDL 2,5 tỷ đô và Franklin BENJI 732 triệu đô đều đã chạy trên Avalanche - cùng hệ sinh thái với DOS Chain.

Điểm mấu chốt: Shinhan Vietnam không cần làm pioneer. Chỉ cần execute cái đã được chứng minh - đi đầu tại Việt Nam."

---

## Slide 6 - Ask / CTA (30s, ~75 words)

### Slide content

> **Ready today. Pilot in Q2 2026.**
>
> **PoC via Shinhan InnoBoost (6 weeks):**
> - Week 1-2: On-premise deploy in Shinhan data center
> - Week 3-4: Pilot SHVN26A - 500 bonds, 50B VND, 10-20 investors
> - Week 5-6: Evaluate + decide production rollout
>
> **Budget:** $30-60K pilot
>
> **Full on-premise capable** (VN banking requirement ✓)
>
> ---
>
> **Demo:** rwa.doschain.com
> **Source:** github.com/DOS/RWA
> **Contact:** joy@dos.ai

### Script

"Đề xuất cụ thể: pilot 6 tuần qua chương trình Shinhan InnoBoost 2026. Tuần 1-2 deploy on-premise trong data center Shinhan. Tuần 3-4 pilot trái phiếu SHVN26A - 500 đơn vị, 50 tỷ đồng, 20 nhà đầu tư chuyên nghiệp. Tuần 5-6 đánh giá và quyết định rollout.

Ngân sách 30 đến 60 ngàn đô.

Nền tảng hỗ trợ on-premise 100% - đáp ứng quy định ngân hàng Việt Nam.

Demo ngay tại rwa.doschain.com. Cảm ơn các anh chị. Tôi sẵn sàng trả lời câu hỏi."

---

## Delivery Tips

**Timing budget (total 4:00):**
- Slide 1: 0:00 - 0:20
- Slide 2: 0:20 - 1:00
- Slide 3: 1:00 - 1:40
- Slide 4: 1:40 - 2:40 *(longest - live demo narration)*
- Slide 5: 2:40 - 3:25
- Slide 6: 3:25 - 4:00

**Pacing:**
- Hit 0:20 when Slide 2 appears
- Hit 2:40 when Slide 5 appears (biggest checkpoint)
- If running over, cut Slide 5 validation numbers first

**If demo won't load live:**
- Fall back to screenshots in slides
- Say: "Xin lỗi kết nối mạng, nhưng toàn bộ đang chạy tại rwa.doschain.com, ban giám khảo có thể verify trên DOScan với địa chỉ `0x7979...3643`"

**Memorize these 3 numbers:**
- $26.4B RWA market, +300% YoY
- $2.5B BlackRock BUIDL on Avalanche
- $2B/day JPMorgan Kinexys

**3 phrases to nail:**
- "Đã live trên mainnet hôm nay - không phải testnet demo"
- "Phủ cả 2 nửa đề bài SS6 - STO và Digital Asset Payments"
- "Shinhan Vietnam không cần pioneer, chỉ cần execute"

**Q&A prep (after 4 min, if asked):**
- "On-premise deploy mất bao lâu?" → "Vài giờ. Chúng tôi đã có bộ script tự động."
- "Tại sao không dùng Ethereum?" → "Shinhan không thể chạy validator trên Ethereum. DOS Chain cho Shinhan sovereign control như JPMorgan trên Kinexys."
- "Chi phí gas thực tế?" → "Khoảng 0,001 VND/giao dịch. Có gasless cho user whitelist - nhà đầu tư trả 0 đồng."
- "AI có hallucinate không?" → "Có khả năng. Flow của mình có bước 'Review & Edit' cho issuer sửa trước khi deploy - AI là first pass, không phải final."
