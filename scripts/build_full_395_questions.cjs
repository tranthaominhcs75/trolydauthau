// scripts/build_full_395_questions.cjs
const fs = require('fs');
const path = require('path');

// 24 Subgroups metadata with specific article anchors and themes
const SUBGROUPS = [
  // Chuyên đề 1: 1 - 85
  { topicId: 1, topicName: 'Chuyên đề 1: Quy định chung & Tư cách hợp lệ', subgroupCode: '1.1', start: 1, end: 20, theme: 'Phạm vi điều chỉnh & giải thích từ ngữ', legalBasis: 'Điều 1, 2, 3, 4 Luật Đấu thầu 22/2023/QH15' },
  { topicId: 1, topicName: 'Chuyên đề 1: Quy định chung & Tư cách hợp lệ', subgroupCode: '1.2', start: 21, end: 40, theme: 'Tư cách hợp lệ của nhà thầu, nhà đầu tư', legalBasis: 'Điều 5 Luật 22/2023 & NĐ 214/2025/NĐ-CP' },
  { topicId: 1, topicName: 'Chuyên đề 1: Quy định chung & Tư cách hợp lệ', subgroupCode: '1.3', start: 41, end: 55, theme: 'Bảo đảm cạnh tranh trong đấu thầu', legalBasis: 'Điều 6 Luật 22/2023 & NĐ 214/2025/NĐ-CP' },
  { topicId: 1, topicName: 'Chuyên đề 1: Quy định chung & Tư cách hợp lệ', subgroupCode: '1.4', start: 56, end: 70, theme: 'Bảo đảm dự thầu & Chính sách ưu đãi', legalBasis: 'Điều 10, 14 Luật 22/2023/QH15' },
  { topicId: 1, topicName: 'Chuyên đề 1: Quy định chung & Tư cách hợp lệ', subgroupCode: '1.5', start: 71, end: 85, theme: 'Hành vi bị cấm & Xử lý vi phạm', legalBasis: 'Điều 16, 87 Luật 22/2023/QH15' },

  // Chuyên đề 2: 86 - 160
  { topicId: 2, topicName: 'Chuyên đề 2: Hình thức & Phương thức lựa chọn nhà thầu', subgroupCode: '2.1', start: 86, end: 100, theme: 'Đấu thầu rộng rãi & Đấu thầu hạn chế', legalBasis: 'Điều 21, 22 Luật Đấu thầu 22/2023/QH15' },
  { topicId: 2, topicName: 'Chuyên đề 2: Hình thức & Phương thức lựa chọn nhà thầu', subgroupCode: '2.2', start: 101, end: 120, theme: 'Chỉ định thầu & Quy trình chỉ định thầu', legalBasis: 'Điều 23 Luật 22/2023 & Luật 57/2024/QH15' },
  { topicId: 2, topicName: 'Chuyên đề 2: Hình thức & Phương thức lựa chọn nhà thầu', subgroupCode: '2.3', start: 121, end: 135, theme: 'Chào hàng cạnh tranh & Mua sắm trực tiếp', legalBasis: 'Điều 24, 25 Luật Đấu thầu 22/2023/QH15' },
  { topicId: 2, topicName: 'Chuyên đề 2: Hình thức & Phương thức lựa chọn nhà thầu', subgroupCode: '2.4', start: 136, end: 145, theme: 'Tự thực hiện & Lựa chọn trường hợp đặc biệt', legalBasis: 'Điều 26, 29 Luật Đấu thầu 22/2023/QH15' },
  { topicId: 2, topicName: 'Chuyên đề 2: Hình thức & Phương thức lựa chọn nhà thầu', subgroupCode: '2.5', start: 146, end: 160, theme: 'Phương thức một giai đoạn & hai giai đoạn', legalBasis: 'Điều 30, 31, 32, 33 Luật Đấu thầu 22/2023/QH15' },

  // Chuyên đề 3: 161 - 230
  { topicId: 3, topicName: 'Chuyên đề 3: Các mốc Thời gian & Hạn mức', subgroupCode: '3.1', start: 161, end: 180, theme: 'Hạn mức áp dụng các hình thức lựa chọn', legalBasis: 'Điều 23 Luật 22 & NĐ 214/2025/NĐ-CP' },
  { topicId: 3, topicName: 'Chuyên đề 3: Các mốc Thời gian & Hạn mức', subgroupCode: '3.2', start: 181, end: 200, theme: 'Thời gian chuẩn bị HSDT, HSMT, E-HSMT', legalBasis: 'Điều 45 Luật 22 & NĐ 214/2025/NĐ-CP' },
  { topicId: 3, topicName: 'Chuyên đề 3: Các mốc Thời gian & Hạn mức', subgroupCode: '3.3', start: 201, end: 215, theme: 'Thời gian làm rõ HSMT & Thời hạn đánh giá thầu', legalBasis: 'Điều 45 Luật 22/2023 & NĐ 214/2025/NĐ-CP' },
  { topicId: 3, topicName: 'Chuyên đề 3: Các mốc Thời gian & Hạn mức', subgroupCode: '3.4', start: 216, end: 230, theme: 'Thời hạn công khai thông tin & Kế hoạch LCNT', legalBasis: 'Điều 7, 8, 40 Luật Đấu thầu 22/2023/QH15' },

  // Chuyên đề 4: 231 - 320
  { topicId: 4, topicName: 'Chuyên đề 4: Đánh giá HSDT, Kiến nghị & Xử lý tình huống', subgroupCode: '4.1', start: 231, end: 255, theme: 'Quy trình đánh giá E-HSDT & Phương pháp đánh giá', legalBasis: 'Điều 58, 59, 60, 61 Luật 22/2023 & NĐ 214' },
  { topicId: 4, topicName: 'Chuyên đề 4: Đánh giá HSDT, Kiến nghị & Xử lý tình huống', subgroupCode: '4.2', start: 256, end: 270, theme: 'Làm rõ HSDT, sửa lỗi và hiệu chỉnh sai lệch', legalBasis: 'Điều 27, 28, 29 NĐ 214/2025/NĐ-CP' },
  { topicId: 4, topicName: 'Chuyên đề 4: Đánh giá HSDT, Kiến nghị & Xử lý tình huống', subgroupCode: '4.3', start: 271, end: 295, theme: 'Xử lý các tình huống phức tạp trong đấu thầu', legalBasis: 'Điều 88 Luật 22/2023 & NĐ 214/2025/NĐ-CP' },
  { topicId: 4, topicName: 'Chuyên đề 4: Đánh giá HSDT, Kiến nghị & Xử lý tình huống', subgroupCode: '4.4', start: 296, end: 305, theme: 'Hủy thầu, đình chỉ cuộc thầu & Không công nhận KQLCNT', legalBasis: 'Điều 17, 18 Luật Đấu thầu 22/2023/QH15' },
  { topicId: 4, topicName: 'Chuyên đề 4: Đánh giá HSDT, Kiến nghị & Xử lý tình huống', subgroupCode: '4.5', start: 306, end: 320, theme: 'Quy trình và thẩm quyền giải quyết kiến nghị', legalBasis: 'Điều 89, 90, 91, 92 Luật 22/2023/QH15' },

  // Chuyên đề 5: 321 - 395
  { topicId: 5, topicName: 'Chuyên đề 5: Hợp đồng & Nghiệm thu', subgroupCode: '5.1', start: 321, end: 340, theme: 'Các loại hợp đồng trong đấu thầu', legalBasis: 'Điều 64, 65, 66, 67, 68 Luật 22/2023/QH15' },
  { topicId: 5, topicName: 'Chuyên đề 5: Hợp đồng & Nghiệm thu', subgroupCode: '5.2', start: 341, end: 355, theme: 'Bảo đảm thực hiện hợp đồng & Tạm ứng hợp đồng', legalBasis: 'Điều 68, 69 Luật Đấu thầu 22/2023/QH15' },
  { topicId: 5, topicName: 'Chuyên đề 5: Hợp đồng & Nghiệm thu', subgroupCode: '5.3', start: 356, end: 370, theme: 'Điều chỉnh hợp đồng & Thay đổi khối lượng, đơn giá', legalBasis: 'Điều 70 Luật Đấu thầu 22/2023/QH15' },
  { topicId: 5, topicName: 'Chuyên đề 5: Hợp đồng & Nghiệm thu', subgroupCode: '5.4', start: 371, end: 385, theme: 'Nghiệm thu, thanh lý & Quyết toán hợp đồng', legalBasis: 'Điều 71, 72 Luật Đấu thầu 22/2023/QH15' },
  { topicId: 5, topicName: 'Chuyên đề 5: Hợp đồng & Nghiệm thu', subgroupCode: '5.5', start: 386, end: 395, theme: 'Quản lý nhà thầu phụ, xử lý vi phạm hợp đồng', legalBasis: 'Điều 67, 87 Luật Đấu thầu 22/2023/QH15' },
];

console.log('Total subgroups:', SUBGROUPS.length);
