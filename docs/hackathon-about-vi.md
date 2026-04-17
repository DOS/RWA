# DOS Chain - Tài Sản Số & Chứng Khoán Token Hóa

**Submit cho:** Qwen AI Build Day x Shinhan Future's Lab - Track **SS6: Digital Assets & Tokenized Securities**

| Mục | Chi tiết |
|-----|----------|
| **Partner / Challenger** | Shinhan Future's Lab Việt Nam |
| **Track** | **SS6 - Digital Assets & Tokenized Securities** |
| **Use Case** | Nền tảng STO full-stack cho Shinhan Securities Việt Nam: token hóa trái phiếu doanh nghiệp theo chuẩn ERC-3643 với AI kiểm tra tuân thủ, chạy trên DOS Chain (Avalanche L1) |
| **Devpost** | [devpost.com/software/dos-n05ucd](https://devpost.com/software/dos-n05ucd) |
| **Demo Live** | [rwa.doschain.com](https://rwa.doschain.com) |
| **Source Code** | [github.com/DOS/RWA](https://github.com/DOS/RWA) |

**Elevator Pitch:** Hạ tầng chứng khoán token hóa đầu tiên tại Việt Nam - phát hành ERC-3643, KYC/AML on-chain, AI kiểm tra tuân thủ & tư vấn đầu tư, chạy trên Avalanche L1 chủ quyền. Thiết kế riêng cho Shinhan Securities Việt Nam để trở thành first-mover thị trường STO Việt Nam theo Luật Công nghệ Số 2025 và Nghị quyết 05/2025.

---

## Cảm Hứng (Inspiration)

Tháng 01/2026, Quốc hội Hàn Quốc thông qua sửa đổi Luật Thị trường Vốn và Luật Chứng khoán Điện tử - tạo khung pháp lý đầu tiên cho chứng khoán token hóa trên blockchain. Thị trường RWA (Real World Asset) toàn cầu đã vượt **26,4 tỷ USD**, tăng 300% mỗi năm. Quỹ trái phiếu token hóa **BUIDL của BlackRock** nắm **2,5 tỷ USD** trên 9 blockchain bao gồm Avalanche. **Kinexys của JPMorgan** xử lý **2 tỷ USD mỗi ngày** giao dịch token hóa. DBS đã ra mắt structured notes token hóa trên Ethereum. Dòng chảy tổ chức sang chứng khoán on-chain không còn là "nếu" - mà là "nhanh đến mức nào."

Tập đoàn Shinhan đã chuẩn bị từ lâu: **STO Alliance** (2023) đặt chuẩn ngành, **consortium KB-NH-Shinhan** xây hạ tầng sổ cái phân tán chung, và **KDAC** (Shinhan đầu tư) trở thành custodian tài sản số cấp tổ chức đầu tiên tại Hàn Quốc. Riêng thị trường STO Hàn Quốc dự kiến đạt **367 nghìn tỷ won (~250 tỷ USD) vào năm 2030**.

Nhưng Shinhan Việt Nam - 5 công ty con, 51 chi nhánh, có mặt từ 1993 - **không có bất kỳ hạ tầng blockchain/token hóa nào**. Trong khi đó, Việt Nam vừa mở cửa cơ hội: **Luật Công nghệ Số** (hiệu lực 01/01/2026) công nhận tài sản số là tài sản, và **Nghị quyết 05/2025** triển khai chương trình thí điểm token hóa tài sản toàn quốc 5 năm, Bộ Tài chính nhận hồ sơ cấp phép từ 01/2026.

CEO Shinhan VN Lee Sun-hoon gọi Việt Nam là *"điểm khởi đầu chiến lược cho đổi mới số toàn cầu."* Chúng tôi xây hạ tầng để biến điều đó thành hiện thực.

## Sản Phẩm Làm Gì (What it does)

DOS Chain Digital Assets & Tokenized Securities là **nền tảng STO full-stack** giúp Shinhan Securities Việt Nam phát hành, quản lý và giao dịch chứng khoán token hóa trên blockchain Avalanche L1 chủ quyền, với AI kiểm tra tuân thủ và tư vấn đầu tư.

**Dành cho Shinhan (Cổng Phát Hành):**

| Năng lực | Cách hoạt động |
|----------|----------------|
| **Phát hành chứng khoán token hóa** | Upload bản cáo bạch → Qwen AI trích xuất thông số (mệnh giá, coupon, đáo hạn, hạn chế) → duyệt → 1 click triển khai token ERC-3643 |
| **Tuân thủ tự động** | Qwen AI kiểm tra phát hành theo Luật Tài sản Số VN, quy định STO Hàn Quốc, tạo báo cáo tuân thủ cho cơ quan quản lý |
| **Quản lý vòng đời** | Pause/unpause token, đóng băng tài khoản NĐT (theo lệnh cơ quan quản lý), buộc chuyển, phân phối coupon |

**Dành cho Nhà Đầu Tư (Cổng Nhà Đầu Tư):**

| Năng lực | Cách hoạt động |
|----------|----------------|
| **Xác minh danh tính (KYC)** | Upload CMND → Triển khai smart contract ONCHAINID với claim đã ký (KYC, AML, quốc tịch, trạng thái NĐT chuyên nghiệp) |
| **Duyệt & đầu tư** | Sàn chứng khoán token hóa - lọc theo loại, lợi suất, đáo hạn, mức rủi ro |
| **Tư vấn đầu tư AI** | Chat với Qwen AI: "giải thích trái phiếu này", "so sánh SCB26A vs SCB26B", "gợi ý trái phiếu cho NĐT bảo thủ" - tiếng Việt/Anh/Hàn |
| **Quản lý danh mục** | Tài sản nắm giữ, P&L, lịch sử coupon, lịch sử giao dịch |

**Tuân thủ on-chain (tự động, mọi giao dịch):**

Mọi chuyển token đều đi qua compliance module của ERC-3643 - kiểm tra claim ONCHAINID của NĐT (KYC hợp lệ? AML sạch? Quốc gia được phép? Qua thời gian khóa? Đủ số NĐT tối đa?) **trước khi chuyển thực hiện**. Chuyển không hợp lệ tự động bị chặn ở cấp smart contract. Không cần enforce off-chain.

**Dành cho Cơ Quan Quản Lý (Compliance Dashboard + DOScan):**

Minh bạch hoàn toàn - báo cáo tuân thủ AI tạo cho từng token, registry NĐT với trạng thái claim, audit trail giao dịch đầy đủ, export PDF. Mọi dữ liệu on-chain đều verify độc lập được qua DOScan.

## Cách Xây Dựng (How we built it)

| Tầng | Công nghệ |
|------|-----------|
| Blockchain | **DOS Chain** - Avalanche L1, Chain ID 7979, 4 validators, block 1 giây, gas limit 100M |
| Smart contracts | **ERC-3643 (T-REX)** - Token, Identity Registry, ONCHAINID, Compliance Module, Claim Verifier, Trusted Issuers Registry, Token Factory. Foundry, Solidity 0.8.17 (T-REX) + ^0.8.28 (DOS) |
| AI inference | **Qwen3.5** qua Alibaba Cloud Model Studio - 3 agent: Document Processor, Compliance Engine, Investment Advisor |
| Xác thực user | **DOS.Me ID** - login qua id.dos.me (Supabase Auth), không cần ví crypto |
| Issuer Portal | Next.js 16 + viem, backend wallet ký deploy thay nhà phát hành (nhà phát hành không cần ví) |
| Investor Portal | Next.js 16 + DOS.Me SSO, sàn live tự động populate từ event TREXFactory on-chain, tích hợp widget Qwen AI |
| Đa ngôn ngữ | Tiếng Việt (mặc định) + English, đổi qua lại |
| Explorer | **DOScan** - trang token nâng cao với metadata chứng khoán |
| Định danh | **ONCHAINID** (chuẩn ERC-3643) - 1 smart contract identity mỗi NĐT, claim được Shinhan ký với vai trò Trusted Issuer |
| Attestations | **EAS** (Ethereum Attestation Service) - đã deploy sẵn trên DOS Chain |
| Cross-chain | **Cầu ICTT** - DOS Chain ↔ Avalanche C-Chain |

**Qwen AI là lõi của giải pháp - không phải bolt-on:**

1. **Document Processor** - Qwen đọc file PDF cáo bạch và trích xuất dữ liệu có cấu trúc (tên chứng khoán, mệnh giá, coupon, đáo hạn, hạn chế). Dữ liệu này đẩy thẳng vào tham số TokenFactory. Không có AI, nhà phát hành phải điền tay 15+ trường mỗi chứng khoán.

2. **Compliance Engine** - AI kiểm tra theo tài liệu quy định Việt Nam/Hàn Quốc. Check từng phát hành theo Luật Công nghệ Số 2025, Nghị quyết 05/2025, Luật Thị trường Vốn Hàn Quốc. Tạo báo cáo tuân thủ mà cơ quan quản lý thực sự đọc được.

3. **Investment Advisor** - Đọc dữ liệu on-chain (metadata token, phân bố NĐT, khối lượng giao dịch) + danh mục NĐT, tư vấn ngôn ngữ tự nhiên bằng Việt/Anh/Hàn.

**Tại sao chọn Avalanche L1 (DOS Chain) thay vì C-Chain hay Ethereum?**

Shinhan có thể **chạy validator node riêng** trên DOS Chain - điều không thể trên C-Chain hoặc Ethereum. Đây là kiểm soát chủ quyền tương đương Kinexys của JPMorgan hay Hyperledger private, nhưng vẫn interop với toàn hệ sinh thái Avalanche (cầu ICTT sang C-Chain, cùng hệ sinh thái với BlackRock BUIDL). Thông lượng riêng, phí giao dịch dưới cent, và narrative pháp lý hiệu quả: "Shinhan xác thực giao dịch trên chain chuyên dụng" thắng "chúng tôi deploy contract cạnh meme coin."

**Khả năng on-premise đầy đủ - yêu cầu của ngân hàng Việt Nam:**

Quy định ngân hàng Việt Nam yêu cầu hạ tầng tài chính phải triển khai được hoàn toàn trong data center của ngân hàng. Mọi component của stack đều hỗ trợ:

| Component | Self-hosted? | Cách làm |
|-----------|--------------|----------|
| **DOS Chain** (blockchain) | Có | Binary AvalancheGo, chạy validator trên server ngân hàng |
| **DOScan** (explorer) | Có | Docker containers (backend + frontend + PostgreSQL) |
| **Qwen AI** (3 agent) | Có | Self-host qua vLLM trên GPU server ngân hàng, không phụ thuộc cloud |
| **DApp** (web portal) | Có | Next.js, deploy trên Node.js server hoặc Docker |
| **DOS.Me ID** (auth) | Có | Supabase self-hosted |
| **EAS** (attestations) | Có | Smart contracts trên DOS Chain - không phụ thuộc bên ngoài |

**Không phụ thuộc cloud.** Toàn bộ stack - blockchain, explorer, AI inference, web app, xác thực - chạy được trong data center Shinhan trên phần cứng Shinhan. Dữ liệu không rời khỏi mạng ngân hàng. Đây không phải năng lực lý thuyết - DOS Chain đã chạy trên VM tự quản, DOScan chạy Docker self-hosted, Qwen chạy GPU self-hosted, Supabase chạy self-hosted.

**Option L1 permissioned riêng.** Nếu cần, chúng tôi có thể deploy Avalanche L1 permissioned hoàn toàn riêng cho Shinhan - 100% chạy trên server Shinhan với validator Shinhan kiểm soát. Cùng contract ERC-3643, cùng AI, cùng DApp - nhưng trên private chain. Chain này vẫn có thể bridge sang DOS Chain public hoặc Avalanche C-Chain qua ICTT khi cần, hoặc cô lập hoàn toàn nếu quy định yêu cầu. Spin up L1 mới chỉ mất vài giờ, không phải tháng.

## Xác Thực Từ Tổ Chức Lớn (Institutional Validation)

Chúng tôi không phát minh gì mới. Mọi lựa chọn công nghệ đều đã được kiểm chứng ở quy mô tổ chức bởi các ngân hàng và quỹ lớn. Khi Shinhan Việt Nam dùng DOS Chain, họ đang dùng cùng chuẩn với JPMorgan, BlackRock, DTCC và công ty mẹ ở Hàn Quốc.

**ERC-3643 (T-REX) - chuẩn token chúng tôi dùng:**

| Tổ chức | Dùng ERC-3643 cho gì | Quy mô |
|---------|----------------------|--------|
| **DTCC** | Tham gia ERC-3643 Association (03/2025) với vai trò sáng lập | Hệ thống thanh toán chứng khoán lớn nhất thế giới - 2,5 triệu tỷ USD/năm |
| **SEC Mỹ** | Công nhận ERC-3643 hợp lệ cho chứng khoán token hóa (07/2025) | Chứng nhận pháp lý |
| **Tokeny** | Nền tảng cho ngân hàng, quỹ, sàn | 32+ tỷ USD chứng khoán phát hành qua T-REX |
| **Archax** | Sàn tài sản số được FCA cấp phép | Nền tảng STO đầu tiên của UK dùng T-REX |
| **K3 Capital** | Token hóa cổ phần pre-IPO | Các NĐT tổ chức lớn hậu thuẫn |
| **CMTA** (Hiệp hội ngân hàng Thụy Sĩ) | Áp dụng T-REX cho chứng khoán số Thụy Sĩ | Khung pháp lý Thụy Sĩ |

**Blockchain L1 chủ quyền/chuyên dụng - lựa chọn kiến trúc của chúng tôi:**

| Tổ chức | Chain chủ quyền | Lý do |
|---------|-----------------|-------|
| **JPMorgan** | Kinexys (Quorum → Canton) | 2 tỷ USD/ngày giao dịch token hóa, tổng 1,5+ nghìn tỷ USD |
| **Goldman Sachs** | GS DAP (Canton/Daml) | Trái phiếu, MMF token hóa, spin out thành platform 2026 |
| **HSBC** | Orion (DLT private) | 3,5+ tỷ USD trái phiếu số, pilot trái phiếu chính phủ UK |
| **Citi** | Citi Token Services (permissioned) | Thanh toán xuyên biên giới 24/7 tại US/UK/SG/HK/IE |
| **Shinhan (Hàn Quốc)** | Lambda256/Luniverse + KDAC | Chính playbook chúng tôi đang replicate cho Việt Nam |

**Tài sản token hóa trên chain public-adjacent (câu chuyện interop):**

| Tài sản | Nền tảng | Chain | Quy mô |
|---------|----------|-------|--------|
| **BlackRock BUIDL** | Securitize | 9 chain gồm Avalanche | **2,5+ tỷ USD AUM, 40% thị phần trái phiếu token hóa** |
| **Franklin Templeton BENJI** | Proprietary + Stellar | 8 chain gồm Avalanche | 732 triệu USD AUM |
| **Ondo Finance OUSG** | Ondo | Ethereum + Sui + Solana | 650+ triệu USD TVL trái phiếu token hóa |
| **Hamilton Lane SCOPE** | Securitize | Polygon + Avalanche | Quỹ private equity token hóa |
| **Apollo Global ACRED** | Securitize | Ethereum + Solana | Quỹ tín dụng token hóa |
| **WisdomTree Prime** | Proprietary + Stellar | Multi-chain | MMF, vàng token hóa |

**Pattern rất rõ ràng:** mọi sáng kiến token hóa tổ chức lớn đều dùng (a) chain dedicated/permissioned với validator chủ quyền, (b) định danh + tuân thủ on-chain ở cấp smart contract, (c) cầu interop sang chain public. DOS Chain + ERC-3643 + ONCHAINID + ICTT cho Shinhan Việt Nam đúng kiến trúc này, đã production, ngay hôm nay.

**Ý nghĩa với Shinhan:** thị trường research xong rồi. Chuẩn đã set. Tiền lệ pháp lý đã có. Shinhan không cần pioneer cách tiếp cận mới - chỉ cần execute cái đã được chứng minh, đi đầu tại Việt Nam. Đó là dự án 6 tháng, không phải 3 năm.

## Thách Thức (Challenges)

**ERC-3643 trên chain mới.** T-REX reference assume công cụ Ethereum mainnet. Deploy full 6-contract (Token, Identity Registry, ONCHAINID, Compliance Module, Claim Verifier, Trusted Issuers Registry) cộng Token Factory trên DOS Chain phải adapt script deploy và verify contract hoạt động đúng với consensus Avalanche L1.

**Tuân thủ không phải checkbox.** Build pipeline AI cho Compliance Engine nghĩa là phải source, parse và chunk tài liệu pháp lý VN (Luật Công nghệ Số - 80+ điều) và luật STO Hàn Quốc. Văn bản pháp lý đặc, cross-reference nhau, đầy ngoại lệ. Để Qwen produce được đánh giá tuân thủ chính xác - không hallucinate - phải prompt engineering kỹ và validate output có cấu trúc.

**Onboarding gasless cho NĐT.** Deploy full contract ONCHAINID mỗi NĐT tốn 50-100 USD trên Ethereum. Trên DOS Chain, chi phí tính bằng cent lẻ - và hơn thế: DOS Chain hỗ trợ **gasless transaction cho contract và user whitelist**, nghĩa là NĐT trả 0 đồng gas khi KYC và deploy identity. Biến thách thức ở chain khác thành lợi thế cạnh tranh.

**Bridge chứng khoán xuyên chain.** Chứng khoán token hóa không như token fungible - chuyển cross-chain phải giữ được trạng thái tuân thủ. NĐT ở chain đích cũng phải có claim ONCHAINID hợp lệ. Chúng tôi thiết kế tích hợp cầu ICTT để enforce, nhưng thêm độ phức tạp cho 1 bridge call thông thường.

## Thành Tựu Tự Hào (Accomplishments)

- **Full ERC-3643 live trên mainnet** - không phải testnet demo. Hệ 6 contract T-REX + TREXFactory ở địa chỉ vanity `0x7979...3643` (Rust miner, 49M hash/giây, tìm trong 108s).
- **PDF → token dưới 10 giây** - Qwen trích thông số, AI kiểm tra tuân thủ, backend wallet bắn 4 giao dịch (deploy + register + unpause + mint). Supply thật trên chain.
- **Sàn live từ event on-chain** - Investor Portal query `TREXSuiteDeployed` từ factory. Không database, blockchain là nguồn thật duy nhất.
- **4 bản cáo bạch mẫu** - Trái phiếu DN, Trái phiếu CP, Quỹ BĐS, và 1 quỹ crypto Cayman không hợp lệ. AI chặn đúng cái sai.
- **Tuân thủ enforce ở cấp contract** - mọi chuyển đều check claim ONCHAINID. Không hợp lệ = revert. Không cần trust off-chain.
- **UX không ma sát** - DOS.Me SSO login (không cần MetaMask), gasless cho user whitelist (deploy ONCHAINID tốn NĐT 0 USD thay vì 50-100 USD trên Ethereum).
- **Sẵn sàng on-premise** - mọi component self-host được trên phần cứng ngân hàng. Yêu cầu của quy định ngân hàng VN.
- **Build trên hạ tầng live** - EAS, DOScan, ICTT, DOS Names, Faucet - đều đã production. Chúng tôi tích hợp, không reinvent.

## Bài Học (What we learned)

1. **Chuẩn > đổi mới trong tài chính quy định.** Ngân hàng muốn ERC-3643 + ONCHAINID (DTCC & SEC công nhận), không phải trò clever tự chế.
2. **Avalanche L1 là sweet spot cho blockchain tổ chức.** Validator chủ quyền + interop + phí gần 0. JPMorgan xây Kinexys hướng đến cái này, mình có sẵn ngày đầu.
3. **AI tuân thủ là force multiplier.** Review quy định VN/KR thủ công mất cả đội pháp lý nhiều ngày. Qwen làm 90% đầu trong vài giây - luật sư review phần còn lại.
4. **Việt Nam đã sẵn sàng.** Luật 2025, Nghị quyết 05/2025, Bộ Tài chính nhận hồ sơ. Thiếu không phải permission mà là hạ tầng.
5. **On-premise là bắt buộc.** Webinar Shinhan (15/04/2026) khẳng định ngân hàng VN cần full on-premise. Loại bỏ đối thủ SaaS-only (Securitize, Tokeny).
6. **Playbook Hàn Quốc map thẳng sang VN.** STO Alliance + Lambda256 + KDAC đều translate được - DOS Chain là bản Việt Nam tương đương.

## Bước Tiếp Theo (What's next)

**Các khoảng trống trong bản hackathon (thành thật):**

Những chức năng dưới đây có trong demo dưới dạng wireframe/placeholder nhưng chưa wire đầy đủ vào blockchain. Phần production sẽ làm:
- **UI KYC cho nhà đầu tư** - hiện NĐT login qua DOS.Me SSO, nhưng flow KYC → deploy ONCHAINID → ký claim mới chỉ demo ở phần issuer (ONCHAINID của deployer). Phần wizard KYC + tạo ONCHAINID cho từng NĐT là bước tiếp theo.
- **UX buy/sell trên marketplace** - sàn list token live từ event on-chain, nhưng nút "Mua N đơn vị" chưa wire. Cần: flow allowance token, meta-transaction gasless qua ERC-4337 paymaster, settlement với balance issuer.
- **Dữ liệu Compliance Dashboard** - hiện show hard-code. Cần query tất cả token đã deploy + aggregate metadata NĐT/quốc gia/audit từ event Identity Registry.
- **AI Investment Advisor tích hợp dữ liệu on-chain** - Qwen chat chạy nhưng trả lời dựa trên training + context hard-code. Cần đọc metadata token live, phân bố NĐT, khối lượng giao dịch từ DOS Chain.
- **Phân phối coupon** - smart contract hỗ trợ (ERC-3643 có `forcedTransfer`) nhưng chưa có UI schedule phân phối.
- **Test nhiều NĐT** - demo mới single-wallet (deployer/issuer mint cho chính mình). Cần: register ví NĐT thứ 2, add KYC claim, demo chuyển hợp lệ.
- **Metadata token trên DOScan** - mệnh giá, coupon, ngày đáo hạn có trong cáo bạch nhưng chưa lưu on-chain. Cần contract MetadataRegistry hoặc JSON off-chain pin lên IPFS.
- **Safe multisig cho custody tổ chức** - hiện backend wallet ký deploy; production sẽ route qua Gnosis Safe do Shinhan kiểm soát để multi-sig.
- **Verify TREXFactory trên DOScan** - đã deploy nhưng chưa verify source code.

**Ngay lập tức (PoC với Shinhan qua InnoBoost):**
- Pilot phát hành trái phiếu DN token hóa với Shinhan Securities Việt Nam
- Triển khai on-premise toàn bộ stack trong data center Shinhan (blockchain, DOScan, AI, DApp)
- Tích hợp với hệ thống KYC/AML hiện có của Shinhan để issue claim ONCHAINID
- Kết nối với app SOL của Shinhan cho NĐT truy cập
- Đóng các khoảng trống trên (KYC NĐT, buy/sell, phân phối coupon, multisig custody)

**Ngắn hạn (6 tháng):**
- Đa tài sản: trái phiếu DN → trái phiếu CP → chứng chỉ quỹ → structured notes
- Thị trường thứ cấp với order book on-chain hoặc AMM thiết kế cho chứng khoán
- Tự động phân phối coupon - smart contract phân phối lợi suất theo lịch
- Shinhan chạy validator node trên DOS Chain - tham gia chủ quyền đầy đủ

**Trung hạn (12 tháng):**
- STO xuyên biên giới: dùng cầu ICTT cho DOS Chain ↔ C-Chain ↔ Ethereum
- Tích hợp với hạ tầng STO Hàn Quốc của Shinhan (Lambda256/Luniverse) qua bridge
- Settlement bằng stablecoin won (consortium 8 ngân hàng Hàn Quốc)
- Mở rộng sang Shinhan Bank VN (tiền gửi token hóa), Shinhan Finance (cho vay token hóa)

**Dài hạn:**
- Nền tảng RWA đầy đủ: bất động sản, hàng hóa, tín dụng tư nhân token hóa
- Tham gia regulatory sandbox theo Nghị quyết 05/2025
- Kết nối Chainlink DTA để tích hợp Swift (theo mô hình UBS)
- Mở Token Factory cho các công ty chứng khoán Việt Nam khác - DOS Chain thành hạ tầng STO quốc gia

---

## Link Demo Live

| Tài nguyên | URL |
|------------|-----|
| **DApp** | [rwa.doschain.com](https://rwa.doschain.com) |
| **Explorer** | [doscan.io](https://doscan.io) |
| **Token SCB26A** | [doscan.io/token/0x2720...](https://doscan.io/token/0x27202027046E614E159329d9cdf8c35a197CC7b5) |
| **TREXFactory** | [doscan.io/address/0x7979...3643](https://doscan.io/address/0x7979539fb9eb7f1c92221f278a92812967303643) |
| **DOS.Me Login** | [id.dos.me](https://id.dos.me) |
| **GitHub (submission)** | [github.com/DOS/RWA](https://github.com/DOS/RWA) |
| **GitHub (monorepo)** | [github.com/DOS/DOS-Chain](https://github.com/DOS/DOS-Chain) |

---

## Cheat Sheet - Số Liệu Cần Nhớ

**Thị trường RWA toàn cầu (03/2026):**
- Tổng RWA on-chain: 26,4 tỷ USD (tăng 300%/năm)
- Trái phiếu token hóa: 7+ tỷ USD
- Cổ phiếu token hóa: 963 triệu USD (tăng 2.878%/năm)
- Avalanche RWA TVL: 1,33 tỷ USD (tăng 949%/năm)
- Dự báo 2028 (Standard Chartered): 2 nghìn tỷ USD
- Dự báo STO Hàn Quốc 2030 (BCG): 367 nghìn tỷ won (~250 tỷ USD)

**Top 3 ngân hàng lớn đã làm:**
- **JPMorgan Kinexys**: 1,5+ nghìn tỷ USD đã xử lý, ~2 tỷ USD/ngày
- **BlackRock BUIDL**: 2,5+ tỷ USD AUM trên 9 chain gồm Avalanche
- **HSBC Orion**: 3,5+ tỷ USD trái phiếu số, pilot trái phiếu chính phủ UK

**Shinhan Hàn Quốc:**
- STO Alliance (02/2023) - cơ quan tư vấn STO
- Lambda256/Luniverse - nền tảng PoC STO
- KDAC - custodian tài sản số tổ chức đầu tiên Hàn Quốc (Shinhan đầu tư)
- Consortium KB+NH+Shinhan - sổ cái phân tán chung
- 8 ngân hàng Hàn Quốc - stablecoin won
- **Việt Nam: 5 công ty con, 51 chi nhánh, từ 1993, CHƯA CÓ blockchain = cơ hội first-mover**
- InnoBoost: winner nhận ưu tiên PoC funding tối đa 200 triệu VND

**Quy định Việt Nam (thuận lợi):**
- Luật Công nghệ Số 2025: hiệu lực 01/01/2026 - công nhận tài sản số
- Nghị quyết 05/2025: pilot 5 năm token hóa tài sản toàn quốc
- Yêu cầu: chỉ crypto asset có tài sản đảm bảo, chỉ công ty VN phát hành
- Thuế: 0,1% mỗi giao dịch (từ 2026)
- Bộ Tài chính nhận hồ sơ cấp phép từ 20/01/2026

**Quy định Hàn Quốc:**
- 01/2026: Quốc hội thông qua sửa đổi Luật Thị trường Vốn + Luật Chứng khoán Điện tử
- 02/2027: Hiệu lực - khung pháp lý phát hành chứng khoán token hóa trên DLT
- Cho phép token hóa: BĐS, bản quyền âm nhạc, nghệ thuật, chăn nuôi
- "Qualified issuer" có thể phát hành trực tiếp trên blockchain

**Tại sao ERC-3643 (T-REX):**
- Chuẩn chính thức (DTCC tham gia 03/2025, SEC công nhận 07/2025)
- On-chain identity built-in (ONCHAINID)
- Modular compliance - tự động restrict transfer
- Khác ERC-1400 (dự thảo, chưa finalize) và ERC-20 (không compliance)

**DOS Chain key info:**
- Chain ID: 7979 (mainnet), 3939 (testnet)
- RPC: https://main.doschain.com
- Block time: 1 giây
- Gas limit: 100M
- Phí: ~0,001 VND/tx
- Gasless: user whitelist → 0 đồng
- 4 validator
- TREXFactory vanity: `0x7979539fb9eb7f1c92221f278a92812967303643`

**CEO Shinhan VN Lee Sun-hoon:** *"Việt Nam là điểm khởi đầu chiến lược cho đổi mới số toàn cầu."*
