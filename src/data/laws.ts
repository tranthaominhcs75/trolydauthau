export interface LawDocument {
  id: string;
  code: string;
  title: string;
  effectiveDate: string;
  scope: string;
  highlights: string[];
}

export const LAW_DOCUMENTS: LawDocument[] = [
  {
    id: 'luat-22-2023',
    code: 'Luật số 22/2023/QH15',
    title: 'Luật Đấu thầu năm 2023',
    effectiveDate: '01/01/2024 (Một số điều khoản 01/01/2025)',
    scope: 'Áp dụng cho hoạt động lựa chọn nhà thầu, nhà đầu tư sử dụng vốn ngân sách nhà nước, vốn hợp pháp của DNNN.',
    highlights: [
      'Phân cấp triệt để quyền quyết định cho Chủ đầu tư và Người có thẩm quyền.',
      'Bắt buộc đấu thầu qua mạng toàn diện cho tất cả các gói thầu thông dụng.',
      'Cải cách thủ tục chỉ định thầu, quy định chi tiết 12 nhóm hành vi bị cấm tại Điều 16.',
      'Bảo vệ nhà thầu trong nước, nhà thầu khởi nghiệp sáng tạo và ưu đãi môi trường.',
    ],
  },
  {
    id: 'luat-57-2024',
    code: 'Luật số 57/2024/QH15',
    title: 'Luật sửa đổi, bổ sung một số điều của Luật Đấu thầu',
    effectiveDate: '01/01/2025',
    scope: 'Sửa đổi, tháo gỡ điểm nghẽn trong mua sắm y tế, thuốc, vật tư tiêu hao và các dự án trọng điểm quốc gia.',
    highlights: [
      'Mở rộng các trường hợp chỉ định thầu phục vụ mua sắm thiết bị y tế cấp bách.',
      'Cho phép áp dụng cơ chế mua sắm tập trung linh hoạt và đàm phán giá nhanh.',
      'Rút ngắn thời gian giải quyết kiến nghị trong đấu thầu.',
    ],
  },
  {
    id: 'luat-90-2025',
    code: 'Luật số 90/2025/QH15',
    title: 'Luật sửa đổi, bổ sung các Luật về Đầu tư & Mua sắm công',
    effectiveDate: '01/07/2025',
    scope: 'Tối ưu hóa thủ tục đầu tư công, đấu thầu dự án PPP và liên thông số hóa dữ liệu đấu thầu quốc gia.',
    highlights: [
      'Đồng bộ hóa dữ liệu doanh nghiệp và dữ liệu thuế trực tiếp trên Hệ thống e-GP.',
      'Đơn giản hóa mẫu bảo lãnh dự thầu điện tử tích hợp với các ngân hàng thương mại.',
    ],
  },
  {
    id: 'nd-214-2025',
    code: 'Nghị định 214/2025/NĐ-CP',
    title: 'Nghị định quy định chi tiết một số điều và biện pháp thi hành Luật Đấu thầu về lựa chọn nhà thầu',
    effectiveDate: '01/03/2025',
    scope: 'Hướng dẫn toàn diện quy trình lựa chọn nhà thầu, đánh giá HSDT, xử lý tình huống, hợp đồng và quản lý nhà nước.',
    highlights: [
      'Quy định chi tiết Điều 131 về xử lý các tình huống phức tạp trong đấu thầu.',
      'Quy chuẩn hóa cách thức kiểm tra tính hợp lệ và năng lực kinh nghiệm của nhà thầu liên danh.',
      'Quy định chặt chẽ về giám sát, thanh tra, kiểm tra và xử lý vi phạm trong đấu thầu.',
    ],
  },
  {
    id: 'nd-349-2026',
    code: 'Nghị định 349/2026/NĐ-CP',
    title: 'Nghị định về đấu thầu qua mạng, mẫu hồ sơ và chứng chỉ nghiệp vụ đấu thầu',
    effectiveDate: '01/01/2026',
    scope: 'Quy chuẩn hóa Hệ thống e-GP thế hệ mới, mẫu E-HSMT và chuẩn hóa kỳ thi cấp chứng chỉ nghiệp vụ đấu thầu.',
    highlights: [
      'Ngân hàng đề thi chuẩn 395 câu hỏi trắc nghiệm đánh giá năng lực cán bộ đấu thầu.',
      'Tự động hóa hoàn toàn việc mở thầu và trích xuất dữ liệu tài chính nhà thầu.',
      'Chứng chỉ nghiệp vụ đấu thầu có giá trị 05 năm trên phạm vi toàn quốc.',
    ],
  },
  {
    id: 'fta-cptpp-evfta',
    code: 'CPTPP, EVFTA & UKVFTA',
    title: 'Các Hiệp định Thương mại Tự do Thế hệ Mới (Chương Mua sắm Chính phủ)',
    effectiveDate: 'Đang có hiệu lực',
    scope: 'Áp dụng đối với các gói thầu thuộc phạm vi điều chỉnh của cam kết mua sắm công quốc tế.',
    highlights: [
      'Ngưỡng mua sắm đối với cơ quan trung ương và doanh nghiệp nhà nước theo lộ trình giảm dần (SDR).',
      'Thời hạn nộp HSDT quốc tế tối thiểu 40 ngày (hoặc 35 ngày khi phát hành điện tử).',
      'Bảo đảm tính minh bạch, không phân biệt đối xử và cơ chế giải quyết khiếu nại độc lập.',
    ],
  },
];
