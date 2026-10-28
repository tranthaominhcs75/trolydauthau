# scripts/build_data.py
# -*- coding: utf-8 -*-
"""
Generator for all 395 authentic questions with zero repetition.
Covers Vietnamese Bidding Law 22/2023/QH15, Law 57/2024/QH15, Decree 214/2025/ND-CP.
"""

import json
import os

topics_meta = {
    1: {"name": "Chuyên đề 1: Quy định chung & Tư cách hợp lệ", "count": 85, "range": (1, 85)},
    2: {"name": "Chuyên đề 2: Hình thức & Phương thức lựa chọn nhà thầu", "count": 75, "range": (86, 160)},
    3: {"name": "Chuyên đề 3: Các mốc Thời gian & Hạn mức", "count": 70, "range": (161, 230)},
    4: {"name": "Chuyên đề 4: Đánh giá HSDT, Kiến nghị & Xử lý tình huống", "count": 90, "range": (231, 320)},
    5: {"name": "Chuyên đề 5: Hợp đồng & Nghiệm thu", "count": 75, "range": (321, 395)},
}

subgroups_meta = [
    # Topic 1
    ("1.1", 1, 1, 20, "Phạm vi điều chỉnh & giải thích từ ngữ", "Điều 1, 2, 3, 4 Luật Đấu thầu 22/2023/QH15"),
    ("1.2", 1, 21, 40, "Tư cách hợp lệ của nhà thầu, nhà đầu tư", "Điều 5 Luật 22/2023 & NĐ 214/2025/NĐ-CP"),
    ("1.3", 1, 41, 55, "Bảo đảm cạnh tranh trong đấu thầu", "Điều 6 Luật 22/2023 & NĐ 214/2025/NĐ-CP"),
    ("1.4", 1, 56, 70, "Bảo đảm dự thầu & Chính sách ưu đãi", "Điều 10, 14 Luật 22/2023/QH15"),
    ("1.5", 1, 71, 85, "Hành vi bị cấm & Xử lý vi phạm", "Điều 16, 87 Luật 22/2023/QH15"),
    # Topic 2
    ("2.1", 2, 86, 100, "Đấu thầu rộng rãi & Đấu thầu hạn chế", "Điều 21, 22 Luật Đấu thầu 22/2023/QH15"),
    ("2.2", 2, 101, 120, "Chỉ định thầu & Quy trình chỉ định thầu", "Điều 23 Luật 22/2023 & Luật 57/2024/QH15"),
    ("2.3", 2, 121, 135, "Chào hàng cạnh tranh & Mua sắm trực tiếp", "Điều 24, 25 Luật Đấu thầu 22/2023/QH15"),
    ("2.4", 2, 136, 145, "Tự thực hiện & Lựa chọn trường hợp đặc biệt", "Điều 26, 29 Luật Đấu thầu 22/2023/QH15"),
    ("2.5", 2, 146, 160, "Phương thức một giai đoạn & hai giai đoạn", "Điều 30, 31, 32, 33 Luật Đấu thầu 22/2023/QH15"),
    # Topic 3
    ("3.1", 3, 161, 180, "Hạn mức áp dụng các hình thức lựa chọn", "Điều 23 Luật 22 & NĐ 214/2025/NĐ-CP"),
    ("3.2", 3, 181, 200, "Thời gian chuẩn bị HSDT, HSMT, E-HSMT", "Điều 45 Luật 22 & NĐ 214/2025/NĐ-CP"),
    ("3.3", 3, 201, 215, "Thời gian làm rõ HSMT & Thời hạn đánh giá thầu", "Điều 45 Luật 22/2023 & NĐ 214/2025/NĐ-CP"),
    ("3.4", 3, 216, 230, "Thời hạn công khai thông tin & Kế hoạch LCNT", "Điều 7, 8, 40 Luật Đấu thầu 22/2023/QH15"),
    # Topic 4
    ("4.1", 4, 231, 255, "Quy trình đánh giá E-HSDT & Phương pháp đánh giá", "Điều 58, 59, 60, 61 Luật 22/2023 & NĐ 214"),
    ("4.2", 4, 256, 270, "Làm rõ HSDT, sửa lỗi và hiệu chỉnh sai lệch", "Điều 27, 28, 29 NĐ 214/2025/NĐ-CP"),
    ("4.3", 4, 271, 295, "Xử lý các tình huống phức tạp trong đấu thầu", "Điều 88 Luật 22/2023 & NĐ 214/2025/NĐ-CP"),
    ("4.4", 4, 296, 305, "Hủy thầu, đình chỉ cuộc thầu & Không công nhận KQLCNT", "Điều 17, 18 Luật Đấu thầu 22/2023/QH15"),
    ("4.5", 4, 306, 320, "Quy trình và thẩm quyền giải quyết kiến nghị", "Điều 89, 90, 91, 92 Luật 22/2023/QH15"),
    # Topic 5
    ("5.1", 5, 321, 340, "Các loại hợp đồng trong đấu thầu", "Điều 64, 65, 66, 67, 68 Luật 22/2023/QH15"),
    ("5.2", 5, 341, 355, "Bảo đảm thực hiện hợp đồng & Tạm ứng hợp đồng", "Điều 68, 69 Luật Đấu thầu 22/2023/QH15"),
    ("5.3", 5, 356, 370, "Điều chỉnh hợp đồng & Thay đổi khối lượng, đơn giá", "Điều 70 Luật Đấu thầu 22/2023/QH15"),
    ("5.4", 5, 371, 385, "Nghiệm thu, thanh lý & Quyết toán hợp đồng", "Điều 71, 72 Luật Đấu thầu 22/2023/QH15"),
    ("5.5", 5, 386, 395, "Quản lý nhà thầu phụ, xử lý vi phạm hợp đồng", "Điều 67, 87 Luật Đấu thầu 22/2023/QH15"),
]

print(f"Total subgroups configured: {len(subgroups_meta)}")
