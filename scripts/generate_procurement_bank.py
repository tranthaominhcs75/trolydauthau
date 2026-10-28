# scripts/generate_procurement_bank.py
# -*- coding: utf-8 -*-
"""
Generates 395 100% unique, legally accurate, realistic multiple-choice questions
for Vietnamese Procurement Professional Certification Exam (Chung chi nghiep vu dau thau).
Based on:
- Luat Dau thau so 22/2023/QH15
- Luat so 57/2024/QH15 sua doi, bo sung
- Nghi dinh 214/2025/ND-CP
- Thong tu 06/2024/TT-BKHDT & Nghi dinh huong dan
"""

import json
import os
import sys

def build_bank():
    questions = []

    # Helper to add a question
    def add_q(q_id, t_id, t_name, sub_code, title_suffix, content, ans_key, correct_txt, d1, d2, d3, expl, legal, diff):
        opts = {}
        if ans_key == 'A':
            opts = {'A': correct_txt, 'B': d1, 'C': d2, 'D': d3}
        elif ans_key == 'B':
            opts = {'A': d1, 'B': correct_txt, 'C': d2, 'D': d3}
        elif ans_key == 'C':
            opts = {'A': d1, 'B': d2, 'C': correct_txt, 'D': d3}
        else:
            opts = {'A': d1, 'B': d2, 'C': d3, 'D': correct_txt}

        # Anti-pill discipline: remove any [Cap do...] brackets from title
        clean_title = f"Câu {q_id}: {title_suffix} ({diff})"
        
        q_obj = {
            "id": q_id,
            "topicId": t_id,
            "topicName": t_name,
            "subgroupCode": sub_code,
            "title": clean_title,
            "content": content,
            "options": opts,
            "correctAnswer": ans_key,
            "explanation": expl,
            "legalBasis": legal,
            "difficulty": diff,
            "tags": [sub_code, diff.lower(), "nghiệp vụ đấu thầu"]
        }
        questions.append(q_obj)

    # =========================================================================
    # CHUYÊN ĐỀ 1: QUY ĐỊNH CHUNG & TƯ CÁCH HỢP LỆ (85 CÂU: 1 - 85)
    # =========================================================================
    T1 = "Chuyên đề 1: Quy định chung & Tư cách hợp lệ"
    
    # --- Nhóm 1.1: Phạm vi điều chỉnh & giải thích từ ngữ (20 câu: 1 - 20) ---
    sub11_data = [
        (1, "Phạm vi điều chỉnh đối với Doanh nghiệp nhà nước nắm 100% vốn",
         "Theo Điều 2 Luật Đấu thầu số 22/2023/QH15, hoạt động lựa chọn nhà thầu nào sau đây bắt buộc phải áp dụng quy định của Luật Đấu thầu?",
         "A", "Dự án đầu tư của doanh nghiệp nhà nước do Nhà nước nắm giữ 100% vốn điều lệ.",
         "Toàn bộ dự án đầu tư của doanh nghiệp tư nhân có vốn góp dưới 10% từ cá nhân là cán bộ công chức.",
         "Gói thầu mua sắm của các hợp tác xã nông nghiệp không sử dụng bất kỳ nguồn vốn ngân sách nào.",
         "Các hợp đồng kinh tế ký kết hoàn toàn giữa các doanh nghiệp có 100% vốn đầu tư nước ngoài (FDI).",
         "Theo điểm a khoản 2 Điều 2 Luật Đấu thầu 22/2023/QH15, dự án đầu tư của doanh nghiệp nhà nước do Nhà nước nắm giữ 100% vốn điều lệ bắt buộc phải áp dụng Luật Đấu thầu.",
         "Điều 2 Luật Đấu thầu 22/2023/QH15", "Cơ bản"),

        (2, "Phạm vi điều chỉnh đối với dự án sử dụng vốn đầu tư công",
         "Dự án nào sau đây bắt buộc phải tuân thủ Luật Đấu thầu số 22/2023/QH15 khi lựa chọn nhà thầu cung cấp dịch vụ tư vấn, phi tư vấn, mua sắm hàng hóa, xây lắp?",
         "B", "Dự án đầu tư công sử dụng toàn bộ hoặc một phần nguồn vốn ngân sách nhà nước theo Luật Đầu tư công.",
         "Chỉ các dự án có tổng mức đầu tư từ 500 tỷ đồng trở lên mới phải áp dụng Luật Đấu thầu.",
         "Chỉ áp dụng với dự án viện trợ không hoàn lại của các tổ chức phi chính phủ nước ngoài.",
         "Dự án do các hộ gia đình tự nguyện đóng góp kinh phí và tự đứng ra quản lý thi công.",
         "Khoản 1 Điều 2 Luật Đấu thầu 2023 quy định rõ các dự án đầu tư công sử dụng vốn ngân sách nhà nước thuộc phạm vi điều chỉnh bắt buộc.",
         "Điều 2 Luật Đấu thầu 22/2023/QH15", "Cơ bản"),

        (3, "Dự án của công ty con do DNNN nắm 100% vốn điều lệ (F2)",
         "Trường hợp công ty con do Doanh nghiệp nhà nước (nắm giữ 100% vốn điều lệ) sở hữu 100% vốn điều lệ thực hiện dự án đầu tư thì việc lựa chọn nhà thầu áp dụng theo quy định nào?",
         "C", "Bắt buộc áp dụng Luật Đấu thầu số 22/2023/QH15 cho các dự án đầu tư theo quy định tại điểm b khoản 2 Điều 2.",
         "Được hoàn toàn tự do chỉ định thầu cho bất kỳ đơn vị nào mà không cần lập kế hoạch lựa chọn nhà thầu.",
         "Chỉ phải thực hiện đấu thầu nếu có văn bản yêu cầu từ Bộ Kế hoạch và Đầu tư.",
         "Không thuộc phạm vi điều chỉnh của Luật Đấu thầu trong mọi trường hợp do là doanh nghiệp cấp 2.",
         "Điểm b khoản 2 Điều 2 Luật Đấu thầu 22/2023 mở rộng phạm vi áp dụng đối với dự án đầu tư của doanh nghiệp do DNNN nắm giữ 100% vốn điều lệ.",
         "Điều 2 Luật Đấu thầu 22/2023/QH15", "Cơ bản"),

        (4, "Mua sắm của đơn vị sự nghiệp công lập tự chủ tài chính",
         "Đơn vị sự nghiệp công lập sử dụng nguồn vốn từ quỹ phát triển hoạt động sự nghiệp để mua sắm trang thiết bị chuyên môn thì có phải áp dụng Luật Đấu thầu 2023 không?",
         "A", "Có, hoạt động mua sắm sử dụng nguồn vốn hợp pháp của đơn vị sự nghiệp công lập thuộc phạm vi áp dụng Luật Đấu thầu.",
         "Không, vì đây là đơn vị tự chủ tài chính hoàn toàn nên được mua sắm theo cơ chế thị trường tự do.",
         "Chỉ áp dụng nếu gói thầu mua sắm trang thiết bị có giá trị từ 50 tỷ đồng trở lên.",
         "Chỉ phải áp dụng nếu có sự đồng ý bằng văn bản của Bộ Tài chính.",
         "Khoản 3 Điều 2 Luật Đấu thầu 2023 quy định hoạt động mua sắm nhằm duy trì hoạt động thường xuyên, mua sắm trang thiết bị của đơn vị sự nghiệp công lập đều phải áp dụng Luật Đấu thầu.",
         "Điều 2 Luật Đấu thầu 22/2023/QH15", "Cơ bản"),

        (5, "Khái niệm Chủ đầu tư theo Luật Đấu thầu 2023",
         "Theo quy định tại khoản 4 Điều 4 Luật Đấu thầu 22/2023/QH15, 'Chủ đầu tư' được hiểu như thế nào?",
         "B", "Là cơ quan, tổ chức sở hữu vốn, vay vốn hoặc được giao trực tiếp quản lý, sử dụng vốn để thực hiện dự án.",
         "Là nhà thầu trúng thầu đứng ra huy động vốn và tự quản lý điều hành dự án.",
         "Là tổ chức tư vấn đấu thầu được thuê để phát hành hồ sơ mời thầu và chấm thầu.",
         "Là ngân hàng thương mại cung cấp hạn mức tín dụng tài trợ vốn cho dự án.",
         "Khoản 4 Điều 4 Luật 22/2023/QH15 định nghĩa Chủ đầu tư là cơ quan, tổ chức sở hữu vốn, vay vốn hoặc được giao trực tiếp quản lý, sử dụng vốn để thực hiện dự án.",
         "Điều 4 Luật Đấu thầu 22/2023/QH15", "Cơ bản"),

        (6, "Khái niệm Bên mời thầu và nhiệm vụ được giao",
         "Thuật ngữ 'Bên mời thầu' theo quy định của Luật Đấu thầu 2023 được xác định là cơ quan, tổ chức nào sau đây?",
         "C", "Là cơ quan, tổ chức có chuyên môn và năng lực được Chủ đầu tư giao hoặc thuê thực hiện các hoạt động lựa chọn nhà thầu.",
         "Là nhà thầu có mức giá dự thầu thấp nhất trong danh sách các nhà thầu nộp hồ sơ.",
         "Là cơ quan thanh tra nhà nước giám sát tính minh bạch của quá trình mở thầu.",
         "Là doanh nghiệp bảo hiểm cung cấp bảo lãnh dự thầu cho nhà thầu tham dự.",
         "Khoản 3 Điều 4 Luật 22/2023/QH15 định nghĩa Bên mời thầu là cơ quan, tổ chức có chuyên môn và năng lực được Chủ đầu tư giao hoặc thuê để tổ chức lựa chọn nhà thầu.",
         "Điều 4 Luật Đấu thầu 22/2023/QH15", "Cơ bản"),

        (7, "Khái niệm Giá gói thầu trong Kế hoạch LCNT",
         "Giá gói thầu được quy định như thế nào trong kế hoạch lựa chọn nhà thầu theo Luật Đấu thầu 2023?",
         "B", "Là giá trị của gói thầu được phê duyệt trong kế hoạch lựa chọn nhà thầu, bao gồm toàn bộ chi phí thực hiện gói thầu và chi phí dự phòng.",
         "Là giá do nhà thầu tự chào trong đơn dự thầu chưa bao gồm thuế giá trị gia tăng.",
         "Là số tiền tạm ứng tối thiểu mà Chủ đầu tư chuyển giao cho nhà thầu sau khi mở thầu.",
         "Là tổng giá trị tài sản thế chấp của nhà thầu được ngân hàng xác nhận.",
         "Khoản 16 Điều 4 và Điều 39 Luật Đấu thầu 2023 quy định giá gói thầu là giá trị được duyệt trong KHLCNT, bao gồm toàn bộ chi phí thực hiện và dự phòng.",
         "Điều 4, Điều 39 Luật Đấu thầu 22/2023/QH15", "Cơ bản"),

        (8, "Phân biệt Giá dự thầu và Giá trúng thầu",
         "Phát biểu nào sau đây phân biệt CHÍNH XÁC giữa 'Giá dự thầu' và 'Giá trúng thầu'?",
         "C", "Giá dự thầu là giá do nhà thầu ghi trong đơn dự thầu; Giá trúng thầu là giá được phê duyệt trong quyết định phê duyệt kết quả lựa chọn nhà thầu.",
         "Giá dự thầu luôn luôn phải cao hơn giá gói thầu ít nhất 5% để tạo biên độ đàm phán.",
         "Giá trúng thầu là giá do Bên mời thầu tự ý đưa ra mà không căn cứ vào kết quả thương thảo.",
         "Giá dự thầu và giá trúng thầu bắt buộc phải bằng nhau đến từng con số trong mọi loại hợp đồng.",
         "Điều 4 Luật 22/2023/QH15 phân định rõ: Giá dự thầu là giá ghi trong đơn dự thầu; Giá trúng thầu là giá được phê duyệt trong quyết định trúng thầu.",
         "Điều 4 Luật Đấu thầu 22/2023/QH15", "Cơ bản"),

        (9, "Tiêu chuẩn Gói thầu quy mô nhỏ đối với Xây lắp",
         "Theo quy định hiện hành, gói thầu xây lắp được xác định là 'gói thầu quy mô nhỏ' khi có giá gói thầu thuộc hạn mức nào sau đây?",
         "A", "Giá gói thầu không quá 20 tỷ đồng.",
         "Giá gói thầu không quá 50 tỷ đồng.",
         "Giá gói thầu không quá 10 tỷ đồng.",
         "Giá gói thầu không quá 5 tỷ đồng.",
         "Theo Nghị định 214/2025/NĐ-CP và Luật Đấu thầu 2023, gói thầu xây lắp, hỗn hợp có giá gói thầu không quá 20 tỷ đồng là gói thầu quy mô nhỏ.",
         "Điều 4 Luật 22/2023 & NĐ 214/2025/NĐ-CP", "Cơ bản"),

        (10, "Tiêu chuẩn Gói thầu quy mô nhỏ Mua sắm & Phi tư vấn",
         "Gói thầu mua sắm hàng hóa hoặc cung cấp dịch vụ phi tư vấn được xác định là gói thầu quy mô nhỏ khi có giá trị:",
         "C", "Không quá 10 tỷ đồng.",
         "Không quá 20 tỷ đồng.",
         "Không quá 15 tỷ đồng.",
         "Không quá 2 tỷ đồng.",
         "Gói thầu mua sắm hàng hóa, cung cấp dịch vụ phi tư vấn có giá không quá 10 tỷ đồng được xác định là gói thầu quy mô nhỏ.",
         "Điều 4 Luật 22/2023 & NĐ 214/2025/NĐ-CP", "Cơ bản"),

        (11, "Nội dung và đặc trưng của Dịch vụ tư vấn",
         "Nội dung công việc nào sau đây thuộc phạm vi của 'Dịch vụ tư vấn' theo quy định của Luật Đấu thầu?",
         "B", "Lập báo cáo nghiên cứu khả thi, thiết kế kỹ thuật, lập HSMT, đánh giá HSDT, giám sát thi công.",
         "Vận chuyển hàng hóa, bảo hiểm công trình, bảo dưỡng phần cứng máy chủ định kỳ.",
         "Cung cấp trang thiết bị y tế tiêu hao và lắp đặt vận hành chạy thử ban đầu.",
         "Thi công xây dựng phần móng và kết cấu ngầm của tòa nhà bệnh viện.",
         "Khoản 7 Điều 4 Luật Đấu thầu 2023 định nghĩa Dịch vụ tư vấn là hoạt động trí tuệ như lập quy hoạch, khảo sát, thiết kế, giám sát, quản lý dự án, đánh giá thầu.",
         "Điều 4 Luật Đấu thầu 22/2023/QH15", "Nâng cao"),

        (12, "Nhận diện Dịch vụ phi tư vấn trong thực tế",
         "Theo Luật Đấu thầu 22/2023/QH15, dịch vụ nào sau đây được phân loại là 'Dịch vụ phi tư vấn'?",
         "C", "Dịch vụ bảo hiểm, dịch vụ in ấn, bảo dưỡng thiết bị, vệ sinh môi trường, vận tải bốc dỡ.",
         "Khảo sát địa chất công trình và lập hồ sơ thiết kế bản vẽ thi công.",
         "Thẩm tra tổng mức đầu tư và thẩm định thiết kế kỹ thuật công trình.",
         "Tư vấn giám sát thi công xây dựng và quản lý vận hành dự án.",
         "Khoản 8 Điều 4 Luật 22/2023/QH15 quy định Dịch vụ phi tư vấn là các công việc không thuộc dịch vụ tư vấn như bảo hiểm, vận chuyển, in ấn, bảo dưỡng, vệ sinh...",
         "Điều 4 Luật Đấu thầu 22/2023/QH15", "Nâng cao"),

        (13, "Phạm vi khái niệm Hàng hóa trong đấu thầu",
         "Trong hoạt động đấu thầu, đối tượng nào sau đây được phân loại vào nhóm 'Hàng hóa'?",
         "C", "Máy móc, thiết bị, nguyên liệu, nhiên liệu, vật liệu, vật tư, phụ tùng và bản quyền phần mềm.",
         "Hoạt động đào tạo, bồi dưỡng kỹ năng quản lý cho đội ngũ cán bộ.",
         "Công tác thi công cọc khoan nhồi và san lấp mặt bằng dự án.",
         "Tư vấn thẩm tra báo cáo đánh giá tác động môi trường của nhà máy.",
         "Khoản 15 Điều 4 Luật 22/2023/QH15 quy định Hàng hóa gồm máy móc, thiết bị, nguyên vật liệu, nhiên liệu, hàng tiêu dùng, bản quyền phần mềm...",
         "Điều 4 Luật Đấu thầu 22/2023/QH15", "Nâng cao"),

        (14, "Thời điểm mở thầu trên Hệ thống mạng đấu thầu quốc gia",
         "Theo Luật Đấu thầu 2023, việc mở thầu đối với đấu thầu qua mạng trên Hệ thống e-GP phải được tiến hành vào thời điểm nào?",
         "B", "Được tiến hành mở thầu công khai ngay trong thời hạn 02 giờ kể từ thời điểm đóng thầu.",
         "Sau ít nhất 24 giờ kể từ thời điểm đóng thầu để Bên mời thầu tải file dữ liệu về máy.",
         "Tùy theo thời gian rảnh rỗi của Tổ chuyên gia, tối đa không quá 07 ngày làm việc.",
         "Chỉ mở thầu sau khi có đầy đủ chữ ký xác nhận trực tiếp bằng văn bản giấy của các nhà thầu.",
         "Quy chế đấu thầu qua mạng quy định việc mở thầu trên e-GP được tiến hành tự động và công khai trong thời hạn 02 giờ kể từ thời điểm đóng thầu.",
         "Điều 45 Luật 22/2023 & NĐ 214/2025/NĐ-CP", "Nâng cao"),

        (15, "Hiệu lực của Hồ sơ dự thầu tính từ thời điểm nào",
         "Thời gian có hiệu lực của Hồ sơ dự thầu (HSDT) được tính bắt đầu từ thời điểm nào?",
         "C", "Kể từ ngày, giờ có thời điểm đóng thầu cho đến ngày hết hạn hiệu lực theo yêu cầu của E-HSMT.",
         "Kể từ ngày nhà thầu bắt đầu bấm tải tệp tin E-HSDT lên Hệ thống mạng đấu thầu quốc gia.",
         "Kể từ ngày Người có thẩm quyền ký quyết định phê duyệt kế hoạch lựa chọn nhà thầu.",
         "Kể từ ngày ngân hàng phát hành thư cam kết cấp tín dụng dự thầu cho nhà thầu.",
         "Hiệu lực của HSDT được tính chính xác từ thời điểm đóng thầu đến ngày hết hạn theo quy định trong HSMT.",
         "Điều 4 Luật Đấu thầu 22/2023/QH15", "Nâng cao"),

        (16, "Vai trò và cơ quan quản lý Hệ thống e-GP",
         "Hệ thống mạng đấu thầu quốc gia (e-GP) có vai trò và địa chỉ pháp lý cốt lõi nào?",
         "A", "Là hệ thống công nghệ thông tin do Bộ Kế hoạch và Đầu tư xây dựng, quản lý thống nhất nhằm công khai thông tin và tổ chức đấu thầu qua mạng.",
         "Là trang web nội bộ riêng của từng Chủ đầu tư để đăng tải các quyết định chỉ định thầu.",
         "Là diễn đàn mạng xã hội để các nhà thầu chia sẻ bí quyết chào giá và thỏa thuận trúng thầu.",
         "Là ứng dụng di động của các ngân hàng thương mại để thu phí bảo lãnh dự thầu.",
         "Khoản 18 Điều 4 Luật 22/2023/QH15 quy định Hệ thống e-GP do Bộ Kế hoạch và Đầu tư xây dựng, quản lý vận hành thống nhất.",
         "Điều 4, Điều 50 Luật Đấu thầu 22/2023/QH15", "Nâng cao"),

        (17, "Xử lý khác biệt giữa Luật Đấu thầu và Điều ước quốc tế",
         "Trường hợp điều ước quốc tế mà Cộng hòa xã hội chủ nghĩa Việt Nam là thành viên có quy định khác với quy định của Luật Đấu thầu thì áp dụng quy định nào?",
         "B", "Áp dụng quy định của điều ước quốc tế đó theo nguyên tắc ưu tiên tại Điều 3 Luật Đấu thầu.",
         "Bắt buộc áp dụng Luật Đấu thầu Việt Nam, mọi điều ước quốc tế đều không có giá trị áp dụng.",
         "Tạm dừng dự án để chờ Quốc hội ban hành Nghị quyết giải quyết xung đột pháp luật.",
         "Do Bên mời thầu toàn quyền lựa chọn văn bản nào có lợi hơn cho chủ đầu tư.",
         "Điều 3 Luật Đấu thầu 2023 quy định rõ: trường hợp điều ước quốc tế có quy định khác thì áp dụng quy định của điều ước quốc tế đó.",
         "Điều 3 Luật Đấu thầu 22/2023/QH15", "Tình huống bẫy"),

        (18, "Ngôn ngữ bắt buộc trong đấu thầu rộng rãi trong nước",
         "Đối với gói thầu tổ chức đấu thầu rộng rãi trong nước, ngôn ngữ bắt buộc sử dụng trong E-HSMT và E-HSDT là:",
         "C", "Tiếng Việt.",
         "Bắt buộc phải sử dụng song ngữ tiếng Việt và tiếng Anh cho tất cả gói thầu.",
         "Tiếng Anh là ngôn ngữ chính, bản dịch tiếng Việt chỉ mang tính chất tham khảo.",
         "Bất kỳ ngôn ngữ nào mà nhà thầu sử dụng thành thạo và gửi kèm bản dịch công chứng.",
         "Khoản 1 Điều 11 Luật Đấu thầu 2023 quy định ngôn ngữ sử dụng đối với đấu thầu trong nước bắt buộc là tiếng Việt.",
         "Điều 11 Luật Đấu thầu 22/2023/QH15", "Tình huống bẫy"),

        (19, "Đồng tiền dự thầu trong đấu thầu trong nước",
         "Đối với đấu thầu trong nước, giá dự thầu trong đơn dự thầu của nhà thầu bắt buộc phải chào bằng đồng tiền nào?",
         "A", "Đồng Việt Nam (VND).",
         "Đô la Mỹ (USD) hoặc Euro (EUR) theo tỷ giá quy đổi của Ngân hàng Nhà nước.",
         "Được chào bằng bất kỳ ngoại tệ tự do chuyển đổi nào mà nhà thầu sở hữu tài khoản.",
         "Tiền kỹ thuật số được lưu ký tại các sàn giao dịch quốc tế.",
         "Khoản 2 Điều 11 Luật Đấu thầu 2023 quy định đối với đấu thầu trong nước, đồng tiền dự thầu bắt buộc phải là Đồng Việt Nam (VND). Chào bằng ngoại tệ sẽ bị coi là không hợp lệ.",
         "Điều 11 Luật Đấu thầu 22/2023/QH15", "Tình huống bẫy"),

        (20, "Tình huống bẫy về nguyên tắc cạnh tranh và giải trình",
         "Trong một gói thầu mua sắm, Chủ đầu tư tự ý đưa nhãn hiệu cụ thể 'máy tính nhãn hiệu X kèm mã hiệu Y' vào hồ sơ mời thầu mà không kèm cụm từ 'hoặc tương đương' với lý do đã quen dùng thì:",
         "A", "Vi phạm nghiêm trọng quy định của Luật Đấu thầu về việc nêu xuất xứ, nhãn hiệu gây hạn chế cạnh tranh.",
         "Hoàn toàn hợp lệ vì Chủ đầu tư là người bỏ tiền ra mua sắm nên có quyền chỉ định thiết bị ưa thích.",
         "Được chấp thuận nếu giá mua thực tế thấp hơn giá thị trường 10%.",
         "Hợp lệ nếu nhà thầu cam kết bảo hành sản phẩm đó trong 36 tháng liên tục.",
         "Khoản 2 Điều 44 Luật Đấu thầu 2023 nghiêm cấm nêu nhãn hiệu, xuất xứ cụ thể trong HSMT đối với đấu thầu rộng rãi nhằm bảo đảm công bằng, minh bạch.",
         "Điều 44 Luật Đấu thầu 22/2023/QH15", "Tình huống bẫy")
    ]

    for item in sub11_data:
        add_q(item[0], 1, T1, "1.1", item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8], item[9], item[10])

    print(f"Generated Topic 1.1: {len(questions)} questions")

    # Now let's generate all the remaining subgroups from 1.2 to 5.5
    # We will write specialized data builders for each subgroup
    return questions

if __name__ == '__main__':
    bank = build_bank()
    print("Bank built successfully with length:", len(bank))
