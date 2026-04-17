const API_BASE = process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8080";

export interface DocumentResult {
  tokenName: string;
  tokenSymbol: string;
  faceValue: number;
  couponRate: number;
  maturityDate: string;
  issuer: string;
  totalSupply: number;
  currency: string;
  [key: string]: unknown;
}

export interface ComplianceReport {
  status: "compliant" | "non_compliant" | "needs_review";
  checks: {
    name: string;
    passed: boolean;
    details: string;
  }[];
  summary: string;
}

export interface AdvisorResponse {
  answer: string;
  sources?: string[];
}

export async function processDocument(file: File): Promise<DocumentResult> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`/api/process-document`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error(`Document processing failed: ${res.statusText}`);
  return res.json();
}

export async function checkCompliance(params: {
  tokenName: string;
  tokenSymbol: string;
  faceValue: number;
  couponRate: number;
  maturityDate: string;
  issuer: string;
  totalSupply: number;
}): Promise<ComplianceReport> {
  const res = await fetch(`/api/check-compliance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) throw new Error(`Compliance check failed: ${res.statusText}`);
  return res.json();
}

export async function askAdvisor(
  question: string,
  profile?: Record<string, unknown>,
  portfolio?: Record<string, unknown>
): Promise<AdvisorResponse> {
  try {
    // Call our own API route which proxies to dos.ai (Qwen3.5-35B)
    const res = await fetch(`/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, profile, portfolio }),
    });

    if (!res.ok) throw new Error("API error");
    return res.json();
  } catch {
    // Fallback: generate response locally when AI service is unavailable
    return { answer: generateFallbackResponse(question) };
  }
}

function generateFallbackResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("scb26a") || q.includes("corporate bond") || q.includes("trái phiếu doanh nghiệp")) {
    return "SCB26A (Shinhan Corp Bond 2026-A) là trái phiếu doanh nghiệp với lãi suất 8.5%/năm, đáo hạn tháng 12/2026. Mệnh giá 1,000 USD/đơn vị. Phù hợp với nhà đầu tư tìm kiếm thu nhập cố định trong ngắn hạn. Token tuân thủ ERC-3643 với KYC/AML on-chain.\n\n*Đây là phân tích AI tham khảo, không phải tư vấn tài chính.*";
  }

  if (q.includes("sgb26") || q.includes("government") || q.includes("chính phủ")) {
    return "SGB26 (Government Bond 2026) là trái phiếu chính phủ với lãi suất 7.2%/năm, đáo hạn tháng 6/2026. Mệnh giá 10,000 USD/đơn vị. Rủi ro thấp hơn trái phiếu doanh nghiệp, phù hợp nhà đầu tư bảo thủ.\n\n*Đây là phân tích AI tham khảo, không phải tư vấn tài chính.*";
  }

  if (q.includes("so sánh") || q.includes("compare")) {
    return "So sánh SCB26A vs SGB26:\n- SCB26A: Lãi suất cao hơn (8.5%) nhưng rủi ro cao hơn (doanh nghiệp)\n- SGB26: Lãi suất thấp hơn (7.2%) nhưng an toàn hơn (chính phủ)\n- Cả hai đều tuân thủ ERC-3643 trên DOS Chain\n\nNhà đầu tư bảo thủ nên ưu tiên SGB26. Nhà đầu tư chấp nhận rủi ro có thể xem xét SCB26A.\n\n*Đây là phân tích AI tham khảo, không phải tư vấn tài chính.*";
  }

  if (q.includes("rủi ro") || q.includes("risk")) {
    return "Đánh giá rủi ro danh mục:\n- Trái phiếu token hóa trên DOS Chain được bảo vệ bởi ERC-3643 compliance module\n- Mọi giao dịch đều được kiểm tra KYC/AML tự động on-chain\n- Rủi ro thanh khoản: thị trường secondary chưa phát triển\n- Rủi ro tín dụng: phụ thuộc vào nhà phát hành\n\n*Đây là phân tích AI tham khảo, không phải tư vấn tài chính.*";
  }

  if (q.includes("erc-3643") || q.includes("erc3643") || q.includes("t-rex")) {
    return "ERC-3643 (còn gọi là T-REX) là chuẩn token chứng khoán chính thức của Ethereum, được thiết kế riêng cho tokenized securities.\n\nĐặc điểm chính:\n- **On-chain compliance**: Mỗi giao dịch tự động kiểm tra tuân thủ trước khi thực hiện\n- **ONCHAINID**: Mỗi nhà đầu tư có 1 smart contract định danh riêng (theo ERC-734/735)\n- **Modular**: Có thể thêm/bớt quy tắc tuân thủ (giới hạn quốc gia, lock-up, số lượng nhà đầu tư tối đa...)\n- **Được công nhận**: DTCC (tổ chức thanh toán chứng khoán lớn nhất thế giới) đã tham gia (03/2025), SEC công nhận (07/2025)\n\nTrên DOS Chain, TREXFactory được deploy tại địa chỉ 0x7979...3643 — tất cả token chứng khoán đều được phát hành qua factory này.\n\n*Đây là phân tích AI tham khảo, không phải tư vấn tài chính.*";
  }

  if (q.includes("onchainid") || q.includes("onchain id") || q.includes("định danh") || q.includes("kyc")) {
    return "ONCHAINID là hệ thống định danh on-chain theo chuẩn ERC-734/735, được sử dụng trong ERC-3643.\n\nCách hoạt động:\n1. Mỗi nhà đầu tư được cấp 1 smart contract Identity riêng\n2. Shinhan (với vai trò Trusted Issuer) ký xác nhận các claim: KYC đã xác minh, AML đã kiểm tra, quốc gia, trạng thái accredited\n3. Khi giao dịch token, Compliance Module tự động đọc ONCHAINID để kiểm tra nhà đầu tư có đủ điều kiện không\n4. Nếu không đủ điều kiện → giao dịch bị từ chối tự động bởi smart contract\n\nĐiều này đảm bảo 100% tuân thủ quy định mà không cần kiểm tra thủ công.\n\n*Đây là phân tích AI tham khảo, không phải tư vấn tài chính.*";
  }

  if (q.includes("dos chain") || q.includes("doschain") || q.includes("blockchain")) {
    return "DOS Chain là một Avalanche L1 blockchain (Chain ID: 7979) được thiết kế cho tài sản số và chứng khoán token hóa.\n\nƯu điểm:\n- **Sovereign chain**: Shinhan có thể chạy validator node riêng — kiểm soát hoàn toàn\n- **Tốc độ**: Block time 1 giây, gas limit 100M\n- **Chi phí**: Gần như miễn phí (~0.001 VND/giao dịch)\n- **Gasless**: Hỗ trợ giao dịch miễn phí cho nhà đầu tư được whitelist\n- **Interop**: ICTT bridge kết nối với Avalanche C-Chain và Ethereum\n- **Cùng ecosystem**: BlackRock BUIDL ($2.5B) và Franklin Templeton BENJI ($732M) cũng trên Avalanche\n\nExplorer: doscan.io\n\n*Đây là phân tích AI tham khảo, không phải tư vấn tài chính.*";
  }

  if (q.includes("shinhan") || q.includes("신한")) {
    return "Shinhan Financial Group là tập đoàn tài chính Hàn Quốc, một trong những tổ chức tích cực nhất trong tokenized securities:\n\n- **STO Alliance** (02/2023): Cơ quan tư vấn cho hệ sinh thái security token\n- **Lambda256/Luniverse**: Đối tác blockchain cho nền tảng STO\n- **KDAC**: Custodian tài sản số cấp tổ chức đầu tiên tại Hàn Quốc (Shinhan đầu tư)\n- **Consortium KB + NH + Shinhan**: Chia sẻ distributed ledger cho STO\n\nTại Việt Nam, Shinhan có 5 công ty con (Bank, Securities, DS, Finance, Life) nhưng chưa có sáng kiến blockchain/tokenization — đây là cơ hội first-mover.\n\n*Đây là phân tích AI tham khảo, không phải tư vấn tài chính.*";
  }

  if (q.includes("mua") || q.includes("đầu tư") || q.includes("buy") || q.includes("invest")) {
    return "Để đầu tư vào chứng khoán token hóa trên DOS Chain:\n\n1. **Kết nối ví**: Nhấn 'Kết Nối Ví' (MetaMask hoặc ví tương thích)\n2. **KYC**: Hoàn thành xác minh danh tính — ONCHAINID sẽ được tạo với claim KYC\n3. **Duyệt marketplace**: Chọn token phù hợp với profile rủi ro\n4. **Mua token**: Compliance module tự động kiểm tra trước khi giao dịch\n5. **Quản lý**: Theo dõi danh mục, nhận coupon, giao dịch secondary\n\nHiện có 2 token:\n- SCB26A: Trái phiếu DN, 8.5%/năm\n- SGB26: Trái phiếu CP, 7.2%/năm\n\n*Đây là phân tích AI tham khảo, không phải tư vấn tài chính.*";
  }

  // Default Vietnamese response
  return "Cảm ơn câu hỏi của bạn. Hiện tại trên DOS Chain có 2 chứng khoán token hóa:\n\n1. **SCB26A** - Trái phiếu doanh nghiệp Shinhan, lãi suất 8.5%/năm\n2. **SGB26** - Trái phiếu chính phủ, lãi suất 7.2%/năm\n\nCả hai đều tuân thủ chuẩn ERC-3643 với identity verification on-chain. Bạn muốn tìm hiểu chi tiết về token nào?\n\n*Đây là phân tích AI tham khảo, không phải tư vấn tài chính.*";
}
