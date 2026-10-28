import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  ExternalLink, 
  Download, 
  Scale, 
  Globe, 
  ShieldCheck, 
  Calendar,
  CheckCircle2
} from 'lucide-react';

interface LawItem {
  id: string;
  number: string;
  title: string;
  type: 'Luật' | 'Nghị định' | 'Thông tư' | 'Hiệp định FTA';
  issuedYear: string;
  effectiveDate: string;
  scope: string;
  keyHighlights: string[];
}

const PROCUREMENT_LAWS: LawItem[] = [
  {
    id: 'l22-2023',
    number: 'Luật số 22/2023/QH15',
    title: 'Luật Đấu thầu số 22/2023/QH15 của Quốc hội',
    type: 'Luật',
    issuedYear: '2023',
    effectiveDate: '01/01/2024',
    scope: 'Hoạt động lựa chọn nhà thầu, nhà đầu tư sử dụng vốn ngân sách nhà nước và vốn hợp pháp.',
    keyHighlights: [
      'Định vị rõ ràng dự toán mua sắm và dự án đầu tư phát triển',
      'Đẩy mạnh 100% đấu thầu qua mạng trên Hệ thống e-GP',
      'Minh bạch hóa các trường hợp chỉ định thầu, mua sắm trực tiếp',
      'Bảo đảm tính độc lập, cạnh tranh giữa các bên liên danh và mẹ - con',
    ],
  },
  {
    id: 'l57-2024',
    number: 'Luật số 57/2024/QH15',
    title: 'Luật sửa đổi, bổ sung một số điều của Luật Đấu thầu',
    type: 'Luật',
    issuedYear: '2024',
    effectiveDate: '01/07/2024',
    scope: 'Cắt giảm thủ tục hành chính, phân cấp triệt để quyền quyết định cho Chủ đầu tư.',
    keyHighlights: [
      'Rút ngắn thời gian lập, thẩm định và phê duyệt KHLCNT',
      'Mở rộng quyền hạn xử lý tình huống trong đấu thầu',
      'Tối ưu hóa quy trình đấu thầu mua sắm trang thiết bị y tế, thuốc',
    ],
  },
  {
    id: 'l90-2025',
    number: 'Luật số 90/2025/QH15',
    title: 'Luật sửa đổi, bổ sung liên quan đến thủ tục đầu tư và mua sắm công nghệ số',
    type: 'Luật',
    issuedYear: '2025',
    effectiveDate: '01/01/2026',
    scope: 'Bổ sung cơ chế mua sắm phần mềm CNTT, bản quyền số và đổi mới sáng tạo.',
    keyHighlights: [
      'Đấu thầu sản phẩm công nghệ cao, R&D',
      'Hợp đồng mua sắm dựa trên hiệu suất (Performance-based)',
    ],
  },
  {
    id: 'nd214-2025',
    number: 'Nghị định số 214/2025/NĐ-CP',
    title: 'Nghị định quy định chi tiết một số điều và biện pháp thi hành Luật Đấu thầu',
    type: 'Nghị định',
    issuedYear: '2025',
    effectiveDate: '01/03/2025',
    scope: 'Quy trình chi tiết lựa chọn nhà thầu qua mạng, lập HSMT, đánh giá HSDT.',
    keyHighlights: [
      'Quy định chi tiết các mẫu HSMT điện tử (E-HSMT)',
      'Quy chuẩn phương pháp đánh giá giá thấp nhất, giá đánh giá, kết hợp kỹ thuật - giá',
      'Quy trình làm rõ HSDT qua mạng không làm thay đổi bản chất nội dung',
    ],
  },
  {
    id: 'nd349-2026',
    number: 'Nghị định số 349/2026/NĐ-CP',
    title: 'Nghị định hướng dẫn lựa chọn nhà đầu tư thực hiện dự án có sử dụng đất',
    type: 'Nghị định',
    issuedYear: '2026',
    effectiveDate: '01/01/2026',
    scope: 'Đấu thầu lựa chọn nhà đầu tư dự án PPP, dự án đầu tư kinh doanh có sử dụng đất.',
    keyHighlights: [
      'Quy định tiêu chuẩn đánh giá hiệu quả sử dụng đất (m3)',
      'Công khai danh mục dự án trên Hệ thống e-GP',
    ],
  },
  {
    id: 'tt79-2025',
    number: 'Thông tư số 79/2025/TT-BTC',
    title: 'Thông tư hướng dẫn về chi phí trong lựa chọn nhà thầu, nhà đầu tư',
    type: 'Thông tư',
    issuedYear: '2025',
    effectiveDate: '15/04/2025',
    scope: 'Mức thu, nộp chi phí đăng tải thông tin, chi phí nộp E-HSDT, phí duy trì tài khoản.',
    keyHighlights: [
      'Biểu mức chi phí tham gia Hệ thống mạng đấu thầu quốc gia',
      'Quy định chi phí giải quyết kiến nghị của nhà thầu',
    ],
  },
  {
    id: 'tt134-2026',
    number: 'Thông tư số 134/2026/TT-BTC',
    title: 'Thông tư quy định về đào tạo, bồi dưỡng và cấp chứng chỉ nghiệp vụ đấu thầu',
    type: 'Thông tư',
    issuedYear: '2026',
    effectiveDate: '01/02/2026',
    scope: 'Khung chương trình ôn luyện, sát hạch cấp chứng chỉ chuyên môn đấu thầu toàn quốc.',
    keyHighlights: [
      'Khung 5 chuyên đề cốt lõi ôn thi',
      'Quy chuẩn bộ ngân hàng 395 câu hỏi sát hạch',
      'Thời hạn chứng chỉ nghiệp vụ đấu thầu là 05 năm',
    ],
  },
  {
    id: 'cptpp',
    number: 'Hiệp định CPTPP',
    title: 'Chương 15: Mua sắm Chính phủ (Government Procurement) trong CPTPP',
    type: 'Hiệp định FTA',
    issuedYear: '2019',
    effectiveDate: '14/01/2019',
    scope: 'Các gói thầu thuộc phạm vi điều chỉnh của CPTPP do các cơ quan trung ương mời thầu.',
    keyHighlights: [
      'Nguyên tắc không phân biệt đối xử với nhà thầu các nước thành viên',
      'Hạn mức giá gói thầu áp dụng theo quyền rút vốn đặc biệt (SDR)',
      'Cấm sử dụng điều kiện ưu đãi trong nước đối với các gói thầu CPTPP',
    ],
  },
  {
    id: 'evfta',
    number: 'Hiệp định EVFTA & UKVFTA',
    title: 'Chương 9: Mua sắm của Chính phủ trong Hiệp định EVFTA và UKVFTA',
    type: 'Hiệp định FTA',
    issuedYear: '2020',
    effectiveDate: '01/08/2020',
    scope: 'Mua sắm công của các Bộ, ngành, Tập đoàn Điện lực EVN, Tổng công ty Đường sắt.',
    keyHighlights: [
      'Thời hạn tối thiểu chuẩn bị HSDT từ 40 ngày (hoặc 10 ngày nếu đấu thầu điện tử hoàn toàn)',
      'Hệ thống khiếu nại độc lập và bồi thường thiệt hại',
    ],
  },
];

export const LawLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredLaws = PROCUREMENT_LAWS.filter((item) => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        item.number.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.scope.toLowerCase().includes(q) ||
        item.keyHighlights.some((h) => h.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
            📚
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-base sm:text-lg">
              Thư viện Văn bản Pháp luật Đấu thầu
            </h2>
            <p className="text-xs text-slate-500">
              Cập nhật đồng bộ các Luật, Nghị định, Thông tư và Hiệp định thương mại tự do quốc tế
            </p>
          </div>
        </div>

        {/* Filter Badges */}
        <div className="inline-flex p-1 bg-slate-100 rounded-2xl text-xs font-semibold self-start sm:self-auto">
          {['all', 'Luật', 'Nghị định', 'Thông tư', 'Hiệp định FTA'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filterType === type ? 'bg-white text-blue-600 shadow-xs font-bold' : 'text-slate-600'
              }`}
            >
              {type === 'all' ? 'Tất cả' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm văn bản (VD: 'Luật 22/2023', 'Nghị định 214', 'CPTPP', 'chứng chỉ')..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900"
        />
      </div>

      {/* Law Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLaws.map((law) => (
          <div
            key={law.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  law.type === 'Luật'
                    ? 'bg-blue-50 text-blue-700 border border-blue-100'
                    : law.type === 'Nghị định'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    : law.type === 'Thông tư'
                    ? 'bg-amber-50 text-amber-700 border border-amber-100'
                    : 'bg-purple-50 text-purple-700 border border-purple-100'
                }`}>
                  {law.type}
                </span>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Hiệu lực: {law.effectiveDate}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base leading-snug">
                {law.title}
              </h3>

              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                <strong>Phạm vi: </strong> {law.scope}
              </p>

              <div className="mt-4 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-700">Điểm cốt lõi quan trọng:</div>
                {law.keyHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
              <span className="flex items-center gap-1 text-slate-500 font-normal">
                <Scale className="w-3.5 h-3.5" /> {law.number}
              </span>
              <span className="hover:underline cursor-pointer">
                Đã đồng bộ vào ngân hàng 395 câu ✓
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
