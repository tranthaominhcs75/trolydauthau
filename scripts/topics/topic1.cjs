// scripts/topics/topic1.cjs
// Chuyên đề 1: Quy định chung & Tư cách hợp lệ (85 câu: 1 - 85)

const topic1 = {
  id: 1,
  name: 'Chuyên đề 1: Quy định chung & Tư cách hợp lệ',
  subgroups: [
    {
      code: '1.1',
      name: 'Phạm vi điều chỉnh, đối tượng & giải thích từ ngữ',
      start: 1,
      end: 20,
      legalBasis: 'Điều 1, 2, 3, 4 Luật Đấu thầu số 22/2023/QH15',
      questions: [
        {
          id: 1,
          title: 'Câu 1: Phạm vi điều chỉnh đối với Doanh nghiệp nhà nước nắm 100% vốn',
          content: 'Theo Điều 2 Luật Đấu thầu số 22/2023/QH15, hoạt động lựa chọn nhà thầu nào sau đây bắt buộc phải áp dụng quy định của Luật Đấu thầu?',
          options: {
            A: 'Dự án đầu tư của doanh nghiệp nhà nước do Nhà nước nắm giữ 100% vốn điều lệ.',
            B: 'Toàn bộ dự án đầu tư của doanh nghiệp tư nhân có vốn góp dưới 10% từ cá nhân là cán bộ công chức.',
            C: 'Gói thầu mua sắm của các hợp tác xã nông nghiệp không sử dụng bất kỳ nguồn vốn ngân sách nào.',
            D: 'Các hợp đồng kinh tế ký kết hoàn toàn giữa các doanh nghiệp có 100% vốn đầu tư nước ngoài (FDI).'
          },
          correctAnswer: 'A',
          explanation: 'Theo điểm a khoản 2 Điều 2 Luật Đấu thầu 22/2023/QH15, dự án đầu tư của doanh nghiệp nhà nước do Nhà nước nắm giữ 100% vốn điều lệ bắt buộc phải áp dụng Luật Đấu thầu.',
          difficulty: 'Cơ bản',
          legalBasis: 'Điều 2 Luật Đấu thầu số 22/2023/QH15'
        },
        {
          id: 2,
          title: 'Câu 2: Phạm vi điều chỉnh đối với dự án sử dụng vốn đầu tư công',
          content: 'Dự án nào sau đây bắt buộc phải tuân thủ Luật Đấu thầu số 22/2023/QH15 khi lựa chọn nhà thầu cung cấp dịch vụ tư vấn, phi tư vấn, mua sắm hàng hóa, xây lắp?',
          options: {
            A: 'Chỉ các dự án có tổng mức đầu tư từ 500 tỷ đồng trở lên mới phải áp dụng Luật Đấu thầu.',
            B: 'Dự án đầu tư công sử dụng toàn bộ hoặc một phần nguồn vốn ngân sách nhà nước theo Luật Đầu tư công.',
            C: 'Chỉ áp dụng với dự án viện trợ không hoàn lại của các tổ chức phi chính phủ nước ngoài.',
            D: 'Dự án do các hộ gia đình tự nguyện đóng góp kinh phí và tự đứng ra quản lý thi công.'
          },
          correctAnswer: 'B',
          explanation: 'Khoản 1 Điều 2 Luật Đấu thầu 2023 quy định rõ các dự án đầu tư công sử dụng vốn ngân sách nhà nước thuộc phạm vi điều chỉnh bắt buộc.',
          difficulty: 'Cơ bản',
          legalBasis: 'Điều 2 Luật Đấu thầu số 22/2023/QH15'
        },
        {
          id: 3,
          title: 'Câu 3: Dự án của công ty con do DNNN nắm 100% vốn điều lệ (F2)',
          content: 'Trường hợp công ty con do Doanh nghiệp nhà nước (nắm giữ 100% vốn điều lệ) sở hữu 100% vốn điều lệ thực hiện dự án đầu tư thì việc lựa chọn nhà thầu áp dụng theo quy định nào?',
          options: {
            A: 'Được hoàn toàn tự do chỉ định thầu cho bất kỳ đơn vị nào mà không cần lập kế hoạch lựa chọn nhà thầu.',
            B: 'Chỉ phải thực hiện đấu thầu nếu có văn bản yêu cầu từ Bộ Kế hoạch và Đầu tư.',
            C: 'Bắt buộc áp dụng Luật Đấu thầu số 22/2023/QH15 cho các dự án đầu tư theo quy định tại điểm b khoản 2 Điều 2.',
            D: 'Không thuộc phạm vi điều chỉnh của Luật Đấu thầu trong mọi trường hợp do là doanh nghiệp cấp 2.'
          },
          correctAnswer: 'C',
          explanation: 'Điểm b khoản 2 Điều 2 Luật Đấu thầu 22/2023 mở rộng phạm vi áp dụng đối với dự án đầu tư của doanh nghiệp do DNNN nắm giữ 100% vốn điều lệ.',
          difficulty: 'Cơ bản',
          legalBasis: 'Điều 2 Luật Đấu thầu số 22/2023/QH15'
        },
        {
          id: 4,
          title: 'Câu 4: Mua sắm của đơn vị sự nghiệp công lập tự chủ tài chính',
          content: 'Đơn vị sự nghiệp công lập sử dụng nguồn vốn từ quỹ phát triển hoạt động sự nghiệp để mua sắm trang thiết bị chuyên môn thì có phải áp dụng Luật Đấu thầu 2023 không?',
          options: {
            A: 'Có, hoạt động mua sắm sử dụng nguồn vốn hợp pháp của đơn vị sự nghiệp công lập thuộc phạm vi áp dụng Luật Đấu thầu.',
            B: 'Không, vì đây là đơn vị tự chủ tài chính hoàn toàn nên được mua sắm theo cơ chế thị trường tự do.',
            C: 'Chỉ áp dụng nếu gói thầu mua sắm trang thiết bị có giá trị từ 50 tỷ đồng trở lên.',
            D: 'Chỉ phải áp dụng nếu có sự đồng ý bằng văn bản của Bộ Tài chính.'
          },
          correctAnswer: 'A',
          explanation: 'Khoản 3 Điều 2 Luật Đấu thầu 2023 quy định hoạt động mua sắm nhằm duy trì hoạt động thường xuyên, mua sắm trang thiết bị của đơn vị sự nghiệp công lập đều phải áp dụng Luật Đấu thầu.',
          difficulty: 'Cơ bản',
          legalBasis: 'Điều 2 Luật Đấu thầu số 22/2023/QH15'
        },
        {
          id: 5,
          title: 'Câu 5: Khái niệm Chủ đầu tư theo Luật Đấu thầu 2023',
          content: 'Theo quy định tại khoản 4 Điều 4 Luật Đấu thầu 22/2023/QH15, "Chủ đầu tư" được hiểu như thế nào?',
          options: {
            A: 'Là nhà thầu trúng thầu đứng ra huy động vốn và tự quản lý điều hành dự án.',
            B: 'Là cơ quan, tổ chức sở hữu vốn, vay vốn hoặc được giao trực tiếp quản lý, sử dụng vốn để thực hiện dự án.',
            C: 'Là tổ chức tư vấn đấu thầu được thuê để phát hành hồ sơ mời thầu và chấm thầu.',
            D: 'Là ngân hàng thương mại cung cấp hạn mức tín dụng tài trợ vốn cho dự án.'
          },
          correctAnswer: 'B',
          explanation: 'Khoản 4 Điều 4 Luật 22/2023/QH15 định nghĩa Chủ đầu tư là cơ quan, tổ chức sở hữu vốn, vay vốn hoặc được giao trực tiếp quản lý, sử dụng vốn để thực hiện dự án.',
          difficulty: 'Cơ bản',
          legalBasis: 'Điều 4 Luật Đấu thầu số 22/2023/QH15'
        },
        {
          id: 6,
          title: 'Câu 6: Khái niệm Bên mời thầu và nhiệm vụ được giao',
          content: 'Thuật ngữ "Bên mời thầu" theo quy định của Luật Đấu thầu 2023 được xác định là cơ quan, tổ chức nào sau đây?',
          options: {
            A: 'Là nhà thầu có mức giá dự thầu thấp nhất trong danh sách các nhà thầu nộp hồ sơ.',
            B: 'Là cơ quan thanh tra nhà nước giám sát tính minh bạch của quá trình mở thầu.',
            C: 'Là cơ quan, tổ chức có chuyên môn và năng lực được Chủ đầu tư giao hoặc thuê thực hiện các hoạt động lựa chọn nhà thầu.',
            D: 'Là doanh nghiệp bảo hiểm cung cấp bảo lãnh dự thầu cho nhà thầu tham dự.'
          },
          correctAnswer: 'C',
          explanation: 'Khoản 3 Điều 4 Luật 22/2023/QH15 định nghĩa Bên mời thầu là cơ quan, tổ chức có chuyên môn và năng lực được Chủ đầu tư giao hoặc thuê để tổ chức lựa chọn nhà thầu.',
          difficulty: 'Cơ bản',
          legalBasis: 'Điều 4 Luật Đấu thầu số 22/2023/QH15'
        },
        {
          id: 7,
          title: 'Câu 7: Khái niệm Giá gói thầu trong Kế hoạch LCNT',
          content: 'Giá gói thầu được quy định như thế nào trong kế hoạch lựa chọn nhà thầu theo Luật Đấu thầu 2023?',
          options: {
            A: 'Là giá do nhà thầu tự chào trong đơn dự thầu chưa bao gồm thuế giá trị gia tăng.',
            B: 'Là giá trị của gói thầu được phê duyệt trong kế hoạch lựa chọn nhà thầu, bao gồm toàn bộ chi phí thực hiện gói thầu và chi phí dự phòng.',
            C: 'Là số tiền tạm ứng tối thiểu mà Chủ đầu tư chuyển giao cho nhà thầu sau khi mở thầu.',
            D: 'Là tổng giá trị tài sản thế chấp của nhà thầu được ngân hàng xác nhận.'
          },
          correctAnswer: 'B',
          explanation: 'Khoản 16 Điều 4 và Điều 39 Luật Đấu thầu 2023 quy định giá gói thầu là giá trị được duyệt trong KHLCNT, bao gồm toàn bộ chi phí thực hiện và dự phòng.',
          difficulty: 'Cơ bản',
          legalBasis: 'Điều 4, Điều 39 Luật Đấu thầu 22/2023/QH15'
        },
        {
          id: 8,
          title: 'Câu 8: Phân biệt Giá dự thầu và Giá trúng thầu',
          content: 'Phát biểu nào sau đây phân biệt CHÍNH XÁC giữa "Giá dự thầu" và "Giá trúng thầu"?',
          options: {
            A: 'Giá dự thầu luôn luôn phải cao hơn giá gói thầu ít nhất 5% để tạo biên độ đàm phán.',
            B: 'Giá trúng thầu là giá do Bên mời thầu tự ý đưa ra mà không căn cứ vào kết quả thương thảo.',
            C: 'Giá dự thầu là giá do nhà thầu ghi trong đơn dự thầu; Giá trúng thầu là giá được phê duyệt trong quyết định phê duyệt kết quả lựa chọn nhà thầu.',
            D: 'Giá dự thầu và giá trúng thầu bắt buộc phải bằng nhau đến từng con số trong mọi loại hợp đồng.'
          },
          correctAnswer: 'C',
          explanation: 'Điều 4 Luật 22/2023/QH15 phân định rõ: Giá dự thầu là giá ghi trong đơn dự thầu; Giá trúng thầu là giá được phê duyệt trong quyết định trúng thầu.',
          difficulty: 'Cơ bản',
          legalBasis: 'Điều 4 Luật Đấu thầu số 22/2023/QH15'
        },
        {
          id: 9,
          title: 'Câu 9: Tiêu chuẩn Gói thầu quy mô nhỏ đối với Xây lắp',
          content: 'Theo quy định hiện hành, gói thầu xây lắp được xác định là "gói thầu quy mô nhỏ" khi có giá gói thầu thuộc hạn mức nào sau đây?',
          options: {
            A: 'Giá gói thầu không quá 20 tỷ đồng.',
            B: 'Giá gói thầu không quá 50 tỷ đồng.',
            C: 'Giá gói thầu không quá 10 tỷ đồng.',
            D: 'Giá gói thầu không quá 5 tỷ đồng.'
          },
          correctAnswer: 'A',
          explanation: 'Theo Nghị định 214/2025/NĐ-CP và Luật Đấu thầu 2023, gói thầu xây lắp, hỗn hợp có giá gói thầu không quá 20 tỷ đồng là gói thầu quy mô nhỏ.',
          difficulty: 'Cơ bản',
          legalBasis: 'Điều 4 Luật 22/2023 & NĐ 214/2025/NĐ-CP'
        },
        {
          id: 10,
          title: 'Câu 10: Tiêu chuẩn Gói thầu quy mô nhỏ Mua sắm & Phi tư vấn',
          content: 'Gói thầu mua sắm hàng hóa hoặc cung cấp dịch vụ phi tư vấn được xác định là gói thầu quy mô nhỏ khi có giá trị:',
          options: {
            A: 'Không quá 20 tỷ đồng.',
            B: 'Không quá 15 tỷ đồng.',
            C: 'Không quá 10 tỷ đồng.',
            D: 'Không quá 2 tỷ đồng.'
          },
          correctAnswer: 'C',
          explanation: 'Gói thầu mua sắm hàng hóa, cung cấp dịch vụ phi tư vấn có giá không quá 10 tỷ đồng được xác định là gói thầu quy mô nhỏ.',
          difficulty: 'Cơ bản',
          legalBasis: 'Điều 4 Luật 22/2023 & NĐ 214/2025/NĐ-CP'
        },
        {
          id: 11,
          title: 'Câu 11: Nội dung và đặc trưng của Dịch vụ tư vấn',
          content: 'Nội dung công việc nào sau đây thuộc phạm vi của "Dịch vụ tư vấn" theo quy định của Luật Đấu thầu?',
          options: {
            A: 'Vận chuyển hàng hóa, bảo hiểm công trình, bảo dưỡng phần cứng máy chủ định kỳ.',
            B: 'Lập báo cáo nghiên cứu khả thi, thiết kế kỹ thuật, lập HSMT, đánh giá HSDT, giám sát thi công.',
            C: 'Cung cấp trang thiết bị y tế tiêu hao và lắp đặt vận hành chạy thử ban đầu.',
            D: 'Thi công xây dựng phần móng và kết cấu ngầm của tòa nhà bệnh viện.'
          },
          correctAnswer: 'B',
          explanation: 'Khoản 7 Điều 4 Luật Đấu thầu 2023 định nghĩa Dịch vụ tư vấn là hoạt động trí tuệ như lập quy hoạch, khảo sát, thiết kế, giám sát, quản lý dự án, đánh giá thầu.',
          difficulty: 'Nâng cao',
          legalBasis: 'Điều 4 Luật Đấu thầu số 22/2023/QH15'
        },
        {
          id: 12,
          title: 'Câu 12: Nhận diện Dịch vụ phi tư vấn trong thực tế',
          content: 'Theo Luật Đấu thầu 22/2023/QH15, dịch vụ nào sau đây được phân loại là "Dịch vụ phi tư vấn"?',
          options: {
            A: 'Khảo sát địa chất công trình và lập hồ sơ thiết kế bản vẽ thi công.',
            B: 'Thẩm tra tổng mức đầu tư và thẩm định thiết kế kỹ thuật công trình.',
            C: 'Dịch vụ bảo hiểm, dịch vụ in ấn, bảo dưỡng thiết bị, vệ sinh môi trường, vận tải bốc dỡ.',
            D: 'Tư vấn giám sát thi công xây dựng và quản lý vận hành dự án.'
          },
          correctAnswer: 'C',
          explanation: 'Khoản 8 Điều 4 Luật 22/2023/QH15 quy định Dịch vụ phi tư vấn là các công việc không thuộc dịch vụ tư vấn như bảo hiểm, vận chuyển, in ấn, bảo dưỡng, vệ sinh...',
          difficulty: 'Nâng cao',
          legalBasis: 'Điều 4 Luật Đấu thầu số 22/2023/QH15'
        },
        {
          id: 13,
          title: 'Câu 13: Phạm vi khái niệm Hàng hóa trong đấu thầu',
          content: 'Trong hoạt động đấu thầu, đối tượng nào sau đây được phân loại vào nhóm "Hàng hóa"?',
          options: {
            A: 'Hoạt động đào tạo, bồi dưỡng kỹ năng quản lý cho đội ngũ cán bộ.',
            B: 'Công tác thi công cọc khoan nhồi và san lấp mặt bằng dự án.',
            C: 'Máy móc, thiết bị, nguyên liệu, nhiên liệu, vật liệu, vật tư, phụ tùng và bản quyền phần mềm.',
            D: 'Tư vấn thẩm tra báo cáo đánh giá tác động môi trường của nhà máy.'
          },
          correctAnswer: 'C',
          explanation: 'Khoản 15 Điều 4 Luật 22/2023/QH15 quy định Hàng hóa gồm máy móc, thiết bị, nguyên vật liệu, nhiên liệu, hàng tiêu dùng, bản quyền phần mềm...',
          difficulty: 'Nâng cao',
          legalBasis: 'Điều 4 Luật Đấu thầu số 22/2023/QH15'
        },
        {
          id: 14,
          title: 'Câu 14: Thời điểm mở thầu trên Hệ thống mạng đấu thầu quốc gia',
          content: 'Theo Luật Đấu thầu 2023, việc mở thầu đối với đấu thầu qua mạng trên Hệ thống e-GP phải được tiến hành vào thời điểm nào?',
          options: {
            A: 'Sau ít nhất 24 giờ kể từ thời điểm đóng thầu để Bên mời thầu tải file dữ liệu về máy.',
            B: 'Được tiến hành mở thầu công khai ngay trong thời hạn 02 giờ kể từ thời điểm đóng thầu.',
            C: 'Tùy theo thời gian rảnh rỗi của Tổ chuyên gia, tối đa không quá 07 ngày làm việc.',
            D: 'Chỉ mở thầu sau khi có đầy đủ chữ ký xác nhận trực tiếp bằng văn bản giấy của các nhà thầu.'
          },
          correctAnswer: 'B',
          explanation: 'Quy chế đấu thầu qua mạng quy định việc mở thầu trên e-GP được tiến hành tự động và công khai trong thời hạn 02 giờ kể từ thời điểm đóng thầu.',
          difficulty: 'Nâng cao',
          legalBasis: 'Điều 45 Luật 22/2023 & NĐ 214/2025/NĐ-CP'
        },
        {
          id: 15,
          title: 'Câu 15: Hiệu lực của Hồ sơ dự thầu tính từ thời điểm nào',
          content: 'Thời gian có hiệu lực của Hồ sơ dự thầu (HSDT) được tính bắt đầu từ thời điểm nào?',
          options: {
            A: 'Kể từ ngày nhà thầu bắt đầu bấm tải tệp tin E-HSDT lên Hệ thống mạng đấu thầu quốc gia.',
            B: 'Kể từ ngày Người có thẩm quyền ký quyết định phê duyệt kế hoạch lựa chọn nhà thầu.',
            C: 'Kể từ ngày, giờ có thời điểm đóng thầu cho đến ngày hết hạn hiệu lực theo yêu cầu của E-HSMT.',
            D: 'Kể từ ngày ngân hàng phát hành thư cam kết cấp tín dụng dự thầu cho nhà thầu.'
          },
          correctAnswer: 'C',
          explanation: 'Hiệu lực của HSDT được tính chính xác từ thời điểm đóng thầu đến ngày hết hạn theo quy định trong HSMT.',
          difficulty: 'Nâng cao',
          legalBasis: 'Điều 4 Luật Đấu thầu số 22/2023/QH15'
        },
        {
          id: 16,
          title: 'Câu 16: Vai trò và cơ quan quản lý Hệ thống e-GP',
          content: 'Hệ thống mạng đấu thầu quốc gia (e-GP) có vai trò và địa chỉ pháp lý cốt lõi nào?',
          options: {
            A: 'Là hệ thống công nghệ thông tin do Bộ Kế hoạch và Đầu tư xây dựng, quản lý thống nhất nhằm công khai thông tin và tổ chức đấu thầu qua mạng.',
            B: 'Là trang web nội bộ riêng của từng Chủ đầu tư để đăng tải các quyết định chỉ định thầu.',
            C: 'Là diễn đàn mạng xã hội để các nhà thầu chia sẻ bí quyết chào giá và thỏa thuận trúng thầu.',
            D: 'Là ứng dụng di động của các ngân hàng thương mại để thu phí bảo lãnh dự thầu.'
          },
          correctAnswer: 'A',
          explanation: 'Khoản 18 Điều 4 Luật 22/2023/QH15 quy định Hệ thống e-GP do Bộ Kế hoạch và Đầu tư xây dựng, quản lý vận hành thống nhất.',
          difficulty: 'Nâng cao',
          legalBasis: 'Điều 4, Điều 50 Luật Đấu thầu 22/2023/QH15'
        },
        {
          id: 17,
          title: 'Câu 17: Xử lý khác biệt giữa Luật Đấu thầu và Điều ước quốc tế',
          content: 'Trường hợp điều ước quốc tế mà Cộng hòa xã hội chủ nghĩa Việt Nam là thành viên có quy định khác với quy định của Luật Đấu thầu thì áp dụng quy định nào?',
          options: {
            A: 'Bắt buộc áp dụng Luật Đấu thầu Việt Nam, mọi điều ước quốc tế đều không có giá trị áp dụng.',
            B: 'Áp dụng quy định của điều ước quốc tế đó theo nguyên tắc ưu tiên tại Điều 3 Luật Đấu thầu.',
            C: 'Tạm dừng dự án để chờ Quốc hội ban hành Nghị quyết giải quyết xung đột pháp luật.',
            D: 'Do Bên mời thầu toàn quyền lựa chọn văn bản nào có lợi hơn cho chủ đầu tư.'
          },
          correctAnswer: 'B',
          explanation: 'Điều 3 Luật Đấu thầu 2023 quy định rõ: trường hợp điều ước quốc tế có quy định khác thì áp dụng quy định của điều ước quốc tế đó.',
          difficulty: 'Tình huống bẫy',
          legalBasis: 'Điều 3 Luật Đấu thầu số 22/2023/QH15'
        },
        {
          id: 18,
          title: 'Câu 18: Ngôn ngữ bắt buộc trong đấu thầu rộng rãi trong nước',
          content: 'Đối với gói thầu tổ chức đấu thầu rộng rãi trong nước, ngôn ngữ bắt buộc sử dụng trong E-HSMT và E-HSDT là:',
          options: {
            A: 'Bắt buộc phải sử dụng song ngữ tiếng Việt và tiếng Anh cho tất cả gói thầu.',
            B: 'Tiếng Anh là ngôn ngữ chính, bản dịch tiếng Việt chỉ mang tính chất tham khảo.',
            C: 'Tiếng Việt.',
            D: 'Bất kỳ ngôn ngữ nào mà nhà thầu sử dụng thành thạo và gửi kèm bản dịch công chứng.'
          },
          correctAnswer: 'C',
          explanation: 'Khoản 1 Điều 11 Luật Đấu thầu 2023 quy định ngôn ngữ sử dụng đối với đấu thầu trong nước bắt buộc là tiếng Việt.',
          difficulty: 'Tình huống bẫy',
          legalBasis: 'Điều 11 Luật Đấu thầu số 22/2023/QH15'
        },
        {
          id: 19,
          title: 'Câu 19: Đồng tiền dự thầu trong đấu thầu trong nước',
          content: 'Đối với đấu thầu trong nước, giá dự thầu trong đơn dự thầu của nhà thầu bắt buộc phải chào bằng đồng tiền nào?',
          options: {
            A: 'Đồng Việt Nam (VND).',
            B: 'Đô la Mỹ (USD) hoặc Euro (EUR) theo tỷ giá quy đổi của Ngân hàng Nhà nước.',
            C: 'Được chào bằng bất kỳ ngoại tệ tự do chuyển đổi nào mà nhà thầu sở hữu tài khoản.',
            D: 'Tiền kỹ thuật số được lưu ký tại các sàn giao dịch quốc tế.'
          },
          correctAnswer: 'A',
          explanation: 'Khoản 2 Điều 11 Luật Đấu thầu 2023 quy định đối với đấu thầu trong nước, đồng tiền dự thầu bắt buộc phải là Đồng Việt Nam (VND). Chào bằng ngoại tệ sẽ bị coi là không hợp lệ.',
          difficulty: 'Tình huống bẫy',
          legalBasis: 'Điều 11 Luật Đấu thầu số 22/2023/QH15'
        },
        {
          id: 20,
          title: 'Câu 20: Tình huống bẫy về nguyên tắc cạnh tranh và giải trình',
          content: 'Trong một gói thầu mua sắm, Chủ đầu tư tự ý đưa nhãn hiệu cụ thể "máy tính nhãn hiệu X kèm mã hiệu Y" vào hồ sơ mời thầu mà không kèm cụm từ "hoặc tương đương" với lý do đã quen dùng thì:',
          options: {
            A: 'Vi phạm nghiêm trọng quy định của Luật Đấu thầu về việc nêu xuất xứ, nhãn hiệu gây hạn chế cạnh tranh.',
            B: 'Hoàn toàn hợp lệ vì Chủ đầu tư là người bỏ tiền ra mua sắm nên có quyền chỉ định thiết bị ưa thích.',
            C: 'Được chấp thuận nếu giá mua thực tế thấp hơn giá thị trường 10%.',
            D: 'Hợp lệ nếu nhà thầu cam kết bảo hành sản phẩm đó trong 36 tháng liên tục.'
          },
          correctAnswer: 'A',
          explanation: 'Khoản 2 Điều 44 Luật Đấu thầu 2023 nghiêm cấm nêu nhãn hiệu, xuất xứ cụ thể trong HSMT đối với đấu thầu rộng rãi nhằm bảo đảm công bằng, minh bạch.',
          difficulty: 'Tình huống bẫy',
          legalBasis: 'Điều 44 Luật Đấu thầu số 22/2023/QH15'
        }
      ]
    }
  ]
};

module.exports = topic1;
