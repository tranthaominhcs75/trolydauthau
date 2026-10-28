// scripts/generate_all_395.cjs
const fs = require('fs');
const path = require('path');

// 24 Subgroup Specifications
const SUBGROUPS_CONFIG = [
  // --- CHUYÊN ĐỀ 1: QUY ĐỊNH CHUNG & TƯ CÁCH HỢP LỆ (85 CÂU: 1 - 85) ---
  {
    topicId: 1,
    topicName: 'Chuyên đề 1: Quy định chung & Tư cách hợp lệ',
    subgroupCode: '1.1',
    start: 1,
    end: 20,
    theme: 'Phạm vi điều chỉnh, đối tượng & giải thích từ ngữ',
    legalBasis: 'Điều 1, 2, 3, 4 Luật Đấu thầu số 22/2023/QH15',
    questions: [
      {
        focus: 'Phạm vi điều chỉnh đối với dự án của doanh nghiệp nhà nước nắm giữ 100% vốn điều lệ',
        content: 'Theo Điều 2 Luật Đấu thầu số 22/2023/QH15, hoạt động lựa chọn nhà thầu nào sau đây bắt buộc phải áp dụng quy định của Luật Đấu thầu?',
        correct: 'Dự án đầu tư của doanh nghiệp nhà nước do Nhà nước nắm giữ 100% vốn điều lệ.',
        d1: 'Toàn bộ dự án đầu tư của doanh nghiệp tư nhân có vốn góp dưới 10% từ cá nhân là cán bộ công chức.',
        d2: 'Gói thầu mua sắm của các hợp tác xã nông nghiệp không sử dụng bất kỳ nguồn vốn ngân sách nào.',
        d3: 'Các hợp đồng kinh tế ký kết hoàn toàn giữa các doanh nghiệp có 100% vốn đầu tư nước ngoài (FDI).'
      },
      {
        focus: 'Phạm vi điều chỉnh đối với dự án sử dụng vốn đầu tư công',
        content: 'Dự án nào sau đây bắt buộc phải tuân thủ Luật Đấu thầu số 22/2023/QH15 khi lựa chọn nhà thầu cung cấp dịch vụ tư vấn, phi tư vấn, mua sắm hàng hóa, xây lắp?',
        correct: 'Dự án đầu tư công sử dụng toàn bộ hoặc một phần nguồn vốn ngân sách nhà nước theo Luật Đầu tư công.',
        d1: 'Chỉ các dự án có tổng mức đầu tư từ 500 tỷ đồng trở lên mới phải áp dụng Luật Đấu thầu.',
        d2: 'Chỉ áp dụng với dự án viện trợ không hoàn lại của các tổ chức phi chính phủ nước ngoài.',
        d3: 'Dự án do các hộ gia đình tự nguyện đóng góp kinh phí và tự đứng ra quản lý thi công.'
      },
      {
        focus: 'Dự án của doanh nghiệp do doanh nghiệp nhà nước nắm giữ 100% vốn điều lệ (F2)',
        content: 'Trường hợp công ty con do Doanh nghiệp nhà nước (nắm giữ 100% vốn điều lệ) sở hữu 100% vốn điều lệ thực hiện dự án đầu tư thì việc lựa chọn nhà thầu áp dụng theo quy định nào?',
        correct: 'Bắt buộc áp dụng Luật Đấu thầu số 22/2023/QH15 cho các dự án đầu tư theo quy định tại điểm b khoản 2 Điều 2.',
        d1: 'Được hoàn toàn tự do chỉ định thầu cho bất kỳ đơn vị nào mà không cần lập kế hoạch lựa chọn nhà thầu.',
        d2: 'Chỉ phải thực hiện đấu thầu nếu có văn bản yêu cầu từ Bộ Kế hoạch và Đầu tư.',
        d3: 'Không thuộc phạm vi điều chỉnh của Luật Đấu thầu trong mọi trường hợp do là doanh nghiệp cấp 2.'
      },
      {
        focus: 'Đơn vị sự nghiệp công lập tự chủ tài chính',
        content: 'Đơn vị sự nghiệp công lập sử dụng nguồn vốn từ quỹ phát triển hoạt động sự nghiệp để mua sắm trang thiết bị chuyên môn thì có phải áp dụng Luật Đấu thầu 2023 không?',
        correct: 'Có, hoạt động mua sắm sử dụng nguồn vốn hợp pháp của đơn vị sự nghiệp công lập thuộc phạm vi áp dụng Luật Đấu thầu.',
        d1: 'Không, vì đây là đơn vị tự chủ tài chính hoàn toàn nên được mua sắm theo cơ chế thị trường tự do.',
        d2: 'Chỉ áp dụng nếu gói thầu mua sắm trang thiết bị có giá trị từ 50 tỷ đồng trở lên.',
        d3: 'Chỉ phải áp dụng nếu có sự đồng ý bằng văn bản của Bộ Tài chính.'
      },
      {
        focus: 'Khái niệm Chủ đầu tư theo Luật Đấu thầu',
        content: 'Theo quy định tại khoản 4 Điều 4 Luật Đấu thầu 22/2023/QH15, "Chủ đầu tư" được hiểu như thế nào?',
        correct: 'Là cơ quan, tổ chức sở hữu vốn, vay vốn hoặc được giao trực tiếp quản lý, sử dụng vốn để thực hiện dự án.',
        d1: 'Là nhà thầu trúng thầu đứng ra huy động vốn và tự quản lý điều hành dự án.',
        d2: 'Là tổ chức tư vấn đấu thầu được thuê để phát hành hồ sơ mời thầu và chấm thầu.',
        d3: 'Là ngân hàng thương mại cung cấp hạn mức tín dụng tài trợ vốn cho dự án.'
      },
      {
        focus: 'Khái niệm Bên mời thầu',
        content: 'Thuật ngữ "Bên mời thầu" theo quy định của Luật Đấu thầu 2023 được xác định là cơ quan, tổ chức nào sau đây?',
        correct: 'Là cơ quan, tổ chức có chuyên môn và năng lực được Chủ đầu tư giao hoặc thuê thực hiện các hoạt động lựa chọn nhà thầu.',
        d1: 'Là nhà thầu có mức giá dự thầu thấp nhất trong danh sách các nhà thầu nộp hồ sơ.',
        d2: 'Là cơ quan thanh tra nhà nước giám sát tính minh bạch của quá trình mở thầu.',
        d3: 'Là doanh nghiệp bảo hiểm cung cấp bảo lãnh dự thầu cho nhà thầu tham dự.'
      },
      {
        focus: 'Khái niệm Giá gói thầu',
        content: 'Giá gói thầu được quy định như thế nào trong kế hoạch lựa chọn nhà thầu theo Luật Đấu thầu 2023?',
        correct: 'Là giá trị của gói thầu được phê duyệt trong kế hoạch lựa chọn nhà thầu, bao gồm toàn bộ chi phí thực hiện gói thầu và chi phí dự phòng.',
        d1: 'Là giá do nhà thầu tự chào trong đơn dự thầu chưa bao gồm thuế giá trị gia tăng.',
        d2: 'Là số tiền tạm ứng tối thiểu mà Chủ đầu tư chuyển giao cho nhà thầu sau khi mở thầu.',
        d3: 'Là tổng giá trị tài sản thế chấp của nhà thầu được ngân hàng xác nhận.'
      },
      {
        focus: 'Phân biệt Giá dự thầu và Giá trúng thầu',
        content: 'Phát biểu nào sau đây phân biệt CHÍNH XÁC giữa "Giá dự thầu" và "Giá trúng thầu"?',
        correct: 'Giá dự thầu là giá do nhà thầu ghi trong đơn dự thầu; Giá trúng thầu là giá được phê duyệt trong quyết định phê duyệt kết quả lựa chọn nhà thầu.',
        d1: 'Giá dự thầu luôn luôn phải cao hơn giá gói thầu ít nhất 5% để tạo biên độ đàm phán.',
        d2: 'Giá trúng thầu là giá do Bên mời thầu tự ý đưa ra mà không căn cứ vào kết quả thương thảo.',
        d3: 'Giá dự thầu và giá trúng thầu bắt buộc phải bằng nhau đến từng con số trong mọi loại hợp đồng.'
      },
      {
        focus: 'Tiêu chuẩn Gói thầu quy mô nhỏ đối với Xây lắp',
        content: 'Theo quy định hiện hành, gói thầu xây lắp được xác định là "gói thầu quy mô nhỏ" khi có giá gói thầu thuộc hạn mức nào sau đây?',
        correct: 'Giá gói thầu không quá 20 tỷ đồng.',
        d1: 'Giá gói thầu không quá 50 tỷ đồng.',
        d2: 'Giá gói thầu không quá 10 tỷ đồng.',
        d3: 'Giá gói thầu không quá 5 tỷ đồng.'
      },
      {
        focus: 'Tiêu chuẩn Gói thầu quy mô nhỏ đối với Mua sắm hàng hóa & Phi tư vấn',
        content: 'Gói thầu mua sắm hàng hóa hoặc cung cấp dịch vụ phi tư vấn được xác định là gói thầu quy mô nhỏ khi có giá trị:',
        correct: 'Không quá 10 tỷ đồng.',
        d1: 'Không quá 20 tỷ đồng.',
        d2: 'Không quá 15 tỷ đồng.',
        d3: 'Không quá 2 tỷ đồng.'
      },
      {
        focus: 'Đặc trưng của Dịch vụ tư vấn',
        content: 'Nội dung công việc nào sau đây thuộc phạm vi của "Dịch vụ tư vấn" theo quy định của Luật Đấu thầu?',
        correct: 'Lập báo cáo nghiên cứu khả thi, thiết kế kỹ thuật, lập HSMT, đánh giá HSDT, giám sát thi công.',
        d1: 'Vận chuyển hàng hóa, bảo hiểm công trình, bảo dưỡng phần cứng máy chủ định kỳ.',
        d2: 'Cung cấp trang thiết bị y tế tiêu hao và lắp đặt vận hành chạy thử ban đầu.',
        d3: 'Thi công xây dựng phần móng và kết cấu ngầm của tòa nhà bệnh viện.'
      },
      {
        focus: 'Đặc trưng của Dịch vụ phi tư vấn',
        content: 'Theo Luật Đấu thầu 22/2023/QH15, dịch vụ nào sau đây được phân loại là "Dịch vụ phi tư vấn"?',
        correct: 'Dịch vụ bảo hiểm, dịch vụ in ấn, bảo dưỡng thiết bị, vệ sinh môi trường, vận tải bốc dỡ.',
        d1: 'Khảo sát địa chất công trình và lập hồ sơ thiết kế bản vẽ thi công.',
        d2: 'Thẩm tra tổng mức đầu tư và thẩm định thiết kế kỹ thuật công trình.',
        d3: 'Tư vấn giám sát thi công xây dựng và quản lý vận hành dự án.'
      },
      {
        focus: 'Khái niệm Hàng hóa trong đấu thầu',
        content: 'Trong hoạt động đấu thầu, đối tượng nào sau đây được phân loại vào nhóm "Hàng hóa"?',
        correct: 'Máy móc, thiết bị, nguyên liệu, nhiên liệu, vật liệu, vật tư, phụ tùng và bản quyền phần mềm.',
        d1: 'Hoạt động đào tạo, bồi dưỡng kỹ năng quản lý cho đội ngũ cán bộ.',
        d2: 'Công tác thi công cọc khoan nhồi và san lấp mặt bằng dự án.',
        d3: 'Tư vấn thẩm tra báo cáo đánh giá tác động môi trường của nhà máy.'
      },
      {
        focus: 'Thời điểm đóng thầu và mở thầu',
        content: 'Theo Luật Đấu thầu 2023, việc mở thầu đối với đấu thầu qua mạng trên Hệ thống e-GP phải được tiến hành vào thời điểm nào?',
        correct: 'Được tiến hành mở thầu công khai ngay trong thời hạn 02 giờ kể từ thời điểm đóng thầu.',
        d1: 'Sau ít nhất 24 giờ kể từ thời điểm đóng thầu để Bên mời thầu tải file dữ liệu về máy.',
        d2: 'Tùy theo thời gian rảnh rỗi của Tổ chuyên gia, tối đa không quá 07 ngày làm việc.',
        d3: 'Chỉ mở thầu sau khi có đầy đủ chữ ký xác nhận trực tiếp bằng văn bản giấy của các nhà thầu.'
      },
      {
        focus: 'Hiệu lực của Hồ sơ dự thầu',
        content: 'Thời gian có hiệu lực của Hồ sơ dự thầu (HSDT) được tính bắt đầu từ thời điểm nào?',
        correct: 'Kể từ ngày, giờ có thời điểm đóng thầu cho đến ngày hết hạn hiệu lực theo yêu cầu của E-HSMT.',
        d1: 'Kể từ ngày nhà thầu bắt đầu bấm tải tệp tin E-HSDT lên Hệ thống mạng đấu thầu quốc gia.',
        d2: 'Kể từ ngày Người có thẩm quyền ký quyết định phê duyệt kế hoạch lựa chọn nhà thầu.',
        d3: 'Kể từ ngày ngân hàng phát hành thư cam kết cấp tín dụng dự thầu cho nhà thầu.'
      },
      {
        focus: 'Hệ thống mạng đấu thầu quốc gia (e-GP)',
        content: 'Hệ thống mạng đấu thầu quốc gia (e-GP) có vai trò và địa chỉ pháp lý cốt lõi nào?',
        correct: 'Là hệ thống công nghệ thông tin do Bộ Kế hoạch và Đầu tư xây dựng, quản lý thống nhất nhằm công khai thông tin và tổ chức đấu thầu qua mạng.',
        d1: 'Là trang web nội bộ riêng của từng Chủ đầu tư để đăng tải các quyết định chỉ định thầu.',
        d2: 'Là diễn đàn mạng xã hội để các nhà thầu chia sẻ bí quyết chào giá và thỏa thuận trúng thầu.',
        d3: 'Là ứng dụng di động của các ngân hàng thương mại để thu phí bảo lãnh dự thầu.'
      },
      {
        focus: 'Áp dụng Điều ước quốc tế so với Luật Đấu thầu',
        content: 'Trường hợp điều ước quốc tế mà Cộng hòa xã hội chủ nghĩa Việt Nam là thành viên có quy định khác với quy định của Luật Đấu thầu thì áp dụng quy định nào?',
        correct: 'Áp dụng quy định của điều ước quốc tế đó theo nguyên tắc ưu tiên tại Điều 3 Luật Đấu thầu.',
        d1: 'Bắt buộc áp dụng Luật Đấu thầu Việt Nam, mọi điều ước quốc tế đều không có giá trị áp dụng.',
        d2: 'Tạm dừng dự án để chờ Quốc hội ban hành Nghị quyết giải quyết xung đột pháp luật.',
        d3: 'Do Bên mời thầu toàn quyền lựa chọn văn bản nào có lợi hơn cho chủ đầu tư.'
      },
      {
        focus: 'Quy định về ngôn ngữ trong đấu thầu qua mạng trong nước',
        content: 'Đối với gói thầu tổ chức đấu thầu rộng rãi trong nước, ngôn ngữ bắt buộc sử dụng trong E-HSMT và E-HSDT là:',
        correct: 'Tiếng Việt.',
        d1: 'Bắt buộc phải sử dụng song ngữ tiếng Việt và tiếng Anh cho tất cả gói thầu.',
        d2: 'Tiếng Anh là ngôn ngữ chính, bản dịch tiếng Việt chỉ mang tính chất tham khảo.',
        d3: 'Bất kỳ ngôn ngữ nào mà nhà thầu sử dụng thành thạo và gửi kèm bản dịch công chứng.'
      },
      {
        focus: 'Đồng tiền dự thầu trong nước',
        content: 'Đối với đấu thầu trong nước, giá dự thầu trong đơn dự thầu của nhà thầu bắt buộc phải chào bằng đồng tiền nào?',
        correct: 'Đồng Việt Nam (VND).',
        d1: 'Đô la Mỹ (USD) hoặc Euro (EUR) theo tỷ giá quy đổi của Ngân hàng Nhà nước.',
        d2: 'Được chào bằng bất kỳ ngoại tệ tự do chuyển đổi nào mà nhà thầu sở hữu tài khoản.',
        d3: 'Tiền kỹ thuật số được lưu ký tại các sàn giao dịch quốc tế.'
      },
      {
        focus: 'Nguyên tắc bảo đảm cạnh tranh, công bằng và minh bạch',
        content: 'Mục tiêu cốt lõi của hoạt động đấu thầu theo quy định của Luật Đấu thầu 22/2023/QH15 là gì?',
        correct: 'Bảo đảm tính cạnh tranh, công bằng, minh bạch, hiệu quả kinh tế và trách nhiệm giải trình.',
        d1: 'Tạo điều kiện tối đa để chỉ định thầu cho các nhà thầu quen thuộc trên địa bàn.',
        d2: 'Kéo dài thời gian thực hiện dự án để giải ngân hết nguồn vốn bố trí hàng năm.',
        d3: 'Tự động loại bỏ tất cả các nhà thầu mới tham gia thị trường lần đầu.'
      }
    ]
  },

  // 1.2: Tư cách hợp lệ của nhà thầu, nhà đầu tư (21 - 40)
  {
    topicId: 1,
    topicName: 'Chuyên đề 1: Quy định chung & Tư cách hợp lệ',
    subgroupCode: '1.2',
    start: 21,
    end: 40,
    theme: 'Tư cách hợp lệ của nhà thầu, nhà đầu tư',
    legalBasis: 'Điều 5 Luật 22/2023/QH15 & Nghị định 214/2025/NĐ-CP',
    questions: [
      {
        focus: 'Tư cách hợp lệ về đăng ký thành lập doanh nghiệp',
        content: 'Nhà thầu là tổ chức tham dự thầu được đánh giá là có tư cách hợp lệ khi đáp ứng điều kiện pháp lý nào sau đây theo Điều 5 Luật Đấu thầu?',
        correct: 'Có quyết định thành lập hoặc Giấy chứng nhận đăng ký doanh nghiệp hoặc tài liệu tương đương hợp pháp.',
        d1: 'Có cam kết bằng miệng của người đại diện trước tổ chức công chứng xã/phường.',
        d2: 'Chỉ cần có con dấu khắc sẵn tên doanh nghiệp mà chưa cần cơ quan có thẩm quyền cấp phép.',
        d3: 'Đã nộp đơn xin thành lập doanh nghiệp lên Sở Kế hoạch và Đầu tư nhưng chưa được duyệt cấp mã số.'
      },
      {
        focus: 'Yêu cầu về hạch toán tài chính độc lập',
        content: 'Điều kiện nào sau đây về hạch toán tài chính là bắt buộc để nhà thầu có tư cách hợp lệ khi tham dự thầu độc lập?',
        correct: 'Hạch toán tài chính độc lập theo quy định của pháp luật về kế toán.',
        d1: 'Được hạch toán phụ thuộc và dùng chung hoàn toàn tài khoản tiền gửi với Bên mời thầu.',
        d2: 'Không cần mở sổ sách kế toán nếu quy mô vốn điều lệ dưới 5 tỷ đồng.',
        d3: 'Chỉ cần nộp tiền thuế khoán môn bài hàng năm mà không cần lập báo cáo tài chính.'
      },
      {
        focus: 'Tình trạng giải thể, phá sản của nhà thầu',
        content: 'Trường hợp nào sau đây khiến nhà thầu KHÔNG ĐÁP ỨNG tư cách hợp lệ để tham dự thầu?',
        correct: 'Đang trong quá trình giải thể hoặc bị kết luận rơi vào tình trạng phá sản theo quy định pháp luật.',
        d1: 'Doanh nghiệp đang thực hiện mở rộng quy mô kinh doanh sang các tỉnh thành lân cận.',
        d2: 'Doanh nghiệp thay đổi trụ sở chính và đã thông báo cập nhật trên cổng thông tin đăng ký kinh doanh.',
        d3: 'Doanh nghiệp tuyển dụng thêm nhiều kỹ sư có chứng chỉ hành nghề giám sát chuyên môn.'
      },
      {
        focus: 'Thời điểm bắt buộc phải đăng ký trên Hệ thống e-GP',
        content: 'Theo quy định của Luật Đấu thầu 22/2023/QH15, nhà thầu phải hoàn tất đăng ký trên Hệ thống mạng đấu thầu quốc gia vào thời điểm nào để bảo đảm tư cách hợp lệ?',
        correct: 'Trước thời điểm đóng thầu của gói thầu tham dự.',
        d1: 'Sau khi có kết quả xếp hạng nhà thầu thứ nhất mới cần đăng ký bổ sung.',
        d2: 'Chỉ cần đăng ký trước khi tiến hành ký kết hợp đồng với Chủ đầu tư.',
        d3: 'Sau khi gói thầu đã được nghiệm thu và thanh toán giai đoạn đầu tiên.'
      },
      {
        focus: 'Cấm tham gia hoạt động đấu thầu',
        content: 'Nhà thầu đang trong thời gian bị cấm tham dự thầu theo quyết định của cấp có thẩm quyền thì:',
        correct: 'Không có tư cách hợp lệ để tham dự bất kỳ gói thầu nào thuộc phạm vi hiệu lực của quyết định cấm.',
        d1: 'Vẫn được dự thầu bình thường nếu giảm giá dự thầu xuống thấp hơn các nhà thầu khác.',
        d2: 'Được tham dự thầu nếu liên danh với một doanh nghiệp nhà nước có uy tín lớn.',
        d3: 'Được dự thầu nếu có văn bản bảo lãnh xin giảm nhẹ trách nhiệm của Bên mời thầu.'
      },
      {
        focus: 'Án tích về tội vi phạm quy định đấu thầu',
        content: 'Quy định nào sau đây là điều kiện về tư cách hợp lệ của nhà thầu là cá nhân, tổ chức theo Luật Đấu thầu 2023?',
        correct: 'Không bị kết án về tội vi phạm quy định về đấu thầu mà chưa được xóa án tích.',
        d1: 'Chỉ cần chưa từng bị xử phạt vi phạm hành chính trong lĩnh vực an toàn giao thông.',
        d2: 'Đã từng bị khởi tố nhưng được đình chỉ vụ án vì chuyển sang hòa giải dân sự.',
        d3: 'Người đại diện pháp luật phải có kinh nghiệm tối thiểu 10 năm công tác trong ngành xây dựng.'
      },
      {
        focus: 'Tư cách hợp lệ của từng thành viên trong nhà thầu liên danh',
        content: 'Khi các nhà thầu liên danh với nhau để tham dự một gói thầu, yêu cầu về tư cách hợp lệ áp dụng như thế nào?',
        correct: 'Từng thành viên trong liên danh đều phải đáp ứng đầy đủ các điều kiện về tư cách hợp lệ theo quy định tại Điều 5.',
        d1: 'Chỉ cần thành viên đứng đầu liên danh đáp ứng tư cách hợp lệ, các thành viên khác không bắt buộc.',
        d2: 'Chỉ cần thành viên có tỷ lệ vốn góp lớn nhất trong liên danh đăng ký trên Hệ thống e-GP.',
        d3: 'Các thành viên liên danh có thể bù trừ tư cách hợp lệ cho nhau nếu có văn bản thỏa thuận.'
      },
      {
        focus: 'Thỏa thuận liên danh trong E-HSDT',
        content: 'Yêu cầu bắt buộc nào sau đây đối với Thỏa thuận liên danh khi nộp hồ sơ dự thầu trên Hệ thống e-GP?',
        correct: 'Phải phân định rõ quyền hạn, trách nhiệm, phạm vi công việc và tỷ lệ giá trị công việc của từng thành viên.',
        d1: 'Được để trống nội dung phân chia công việc để thỏa thuận lại sau khi trúng thầu.',
        d2: 'Chỉ cần một bên ký tên đóng dấu đại diện mà không cần chữ ký số của các bên liên danh.',
        d3: 'Một thành viên được phép chuyển nhượng 100% công việc của mình cho thành viên khác mà không cần báo cáo.'
      },
      {
        focus: 'Thành viên liên danh vi phạm tư cách hợp lệ',
        content: 'Trong một liên danh gồm 3 nhà thầu, nếu Tổ chuyên gia phát hiện 1 thành viên đang trong thời gian bị cấm tham dự thầu thì xử lý thế nào?',
        correct: 'Toàn bộ nhà thầu liên danh đó bị đánh giá là không đáp ứng điều kiện về tư cách hợp lệ và bị loại.',
        d1: 'Cho phép 2 thành viên còn lại tự chia nhau phần công việc của thành viên bị cấm mà không hủy HSDT.',
        d2: 'Vẫn cho liên danh trúng thầu nhưng trừ phần thanh toán của thành viên vi phạm.',
        d3: 'Bên mời thầu tự ý chỉ định một nhà thầu bên ngoài vào thay thế thành viên vi phạm.'
      },
      {
        focus: 'Tư cách hợp lệ của hộ kinh doanh cá thể',
        content: 'Hộ kinh doanh có được tham gia dự thầu gói thầu xây lắp hoặc mua sắm hàng hóa theo Luật Đấu thầu 2023 không?',
        correct: 'Được tham dự các gói thầu xây lắp, mua sắm hàng hóa quy mô nhỏ khi đáp ứng các điều kiện về tư cách hợp lệ của hộ kinh doanh.',
        d1: 'Tuyệt đối không được tham gia bất kỳ gói thầu nào sử dụng vốn ngân sách nhà nước.',
        d2: 'Được tham gia mọi gói thầu quốc tế lớn mà không bị giới hạn về quy mô giá trị gói thầu.',
        d3: 'Chỉ được làm nhà thầu phụ chứ không bao giờ được đứng tên nhà thầu chính độc lập.'
      },
      {
        focus: 'Tư cách của cá nhân tham gia gói thầu tư vấn cá nhân',
        content: 'Cá nhân tham dự thầu gói thầu cung cấp dịch vụ tư vấn cá nhân phải đáp ứng điều kiện nào sau đây?',
        correct: 'Có năng lực hành vi dân sự đầy đủ, có chuyên môn nghiệp vụ và chứng chỉ hành nghề phù hợp theo quy định.',
        d1: 'Phải thành lập doanh nghiệp cổ phần và có con dấu pháp nhân riêng.',
        d2: 'Phải có bảo lãnh dự thầu từ ngân hàng với giá trị tối thiểu 10% giá gói thầu.',
        d3: 'Phải có thâm niên công tác liên tục tại cơ quan của Chủ đầu tư tối thiểu 05 năm.'
      },
      {
        focus: 'Tư cách hợp lệ của nhà thầu nước ngoài',
        content: 'Nhà thầu nước ngoài khi tham dự thầu đấu thầu quốc tế tại Việt Nam phải đáp ứng yêu cầu pháp lý nào?',
        correct: 'Có đăng ký hoạt động hợp pháp theo pháp luật của quốc gia mà nhà thầu mang quốc tịch.',
        d1: 'Bắt buộc phải có trụ sở chính đặt tại Thủ đô Hà Nội hoặc TP. Hồ Chí Minh trước 03 năm.',
        d2: 'Phải nộp toàn bộ tài sản cố định của công ty vào tài khoản phong tỏa của Kho bạc Nhà nước Việt Nam.',
        d3: 'Chỉ được phép chào giá bằng ngoại tệ mạnh và từ chối cung cấp báo cáo kiểm toán.'
      },
      {
        focus: 'Tư cách của chi nhánh công ty khi dự thầu',
        content: 'Chi nhánh của một doanh nghiệp có được đứng tên độc lập tham dự thầu hay không?',
        correct: 'Chỉ được đứng tên tham dự thầu khi có văn bản ủy quyền hợp pháp từ người đại diện theo pháp luật của doanh nghiệp.',
        d1: 'Được tự do đứng tên tham dự mọi gói thầu mà không cần bất kỳ giấy tờ ủy quyền nào của công ty mẹ.',
        d2: 'Tuyệt đối bị cấm tham gia hoạt động đấu thầu trong mọi hoàn cảnh.',
        d3: 'Chỉ được tham gia nếu giám đốc chi nhánh là cổ đông sáng lập nắm trên 50% vốn điều lệ của công ty mẹ.'
      },
      {
        focus: 'Tư cách hợp lệ của nhà thầu phụ',
        content: 'Khẳng định nào sau đây về tư cách hợp lệ của nhà thầu phụ trong gói thầu xây lắp là ĐÚNG?',
        correct: 'Nhà thầu phụ phải có đủ năng lực, kinh nghiệm tương ứng với phần công việc đảm nhận và không thuộc trường hợp bị cấm đấu thầu.',
        d1: 'Nhà thầu phụ phải đứng tên chung trong Đơn dự thầu và cùng ký Thỏa thuận liên danh.',
        d2: 'Nhà thầu phụ không cần có tư cách pháp nhân, có thể là nhóm thợ tự do không có hợp đồng lao động.',
        d3: 'Nhà thầu chính được phép thay đổi toàn bộ nhà thầu phụ mà không cần có sự chấp thuận của Chủ đầu tư.'
      },
      {
        focus: 'Yêu cầu chứng chỉ năng lực hoạt động xây dựng',
        content: 'Đối với gói thầu thi công xây dựng công trình yêu cầu điều kiện năng lực theo pháp luật xây dựng, nhà thầu phải xuất trình tài liệu nào?',
        correct: 'Chứng chỉ năng lực hoạt động xây dựng công trình với hạng năng lực phù hợp quy mô cấp công trình.',
        d1: 'Chỉ cần xuất trình giấy phép lái xe tải của giám đốc điều hành doanh nghiệp.',
        d2: 'Giấy chứng nhận tốt nghiệp trung cấp nghề của đại diện tổ đội thợ nề.',
        d3: 'Biên lai nộp lệ phí trước bạ xe ôtô chở vật liệu xây dựng của bên thứ ba.'
      },
      {
        focus: 'Hiệu lực của chữ ký số (Chứng thư số) trên Hệ thống e-GP',
        content: 'Khi nộp E-HSDT, chứng thư số của nhà thầu dùng để ký nộp hồ sơ phải bảo đảm điều kiện gì?',
        correct: 'Còn hiệu lực tại thời điểm ký và nộp E-HSDT trên Hệ thống mạng đấu thầu quốc gia.',
        d1: 'Có thể đã hết hạn nhưng miễn là nhà thầu đã gửi công văn cam kết gia hạn trong 30 ngày.',
        d2: 'Được mượn chứng thư số của một doanh nghiệp khác để ký tạm rồi sau đó nộp lại hồ sơ giấy.',
        d3: 'Chỉ cần chứng thư số cá nhân của kế toán viên mà không cần sự ủy quyền của người có thẩm quyền.'
      },
      {
        focus: 'Doanh nghiệp mới thành lập tham gia dự thầu',
        content: 'Doanh nghiệp mới thành lập dưới 01 năm tham dự thầu gói thầu dịch vụ phi tư vấn được đánh giá năng lực tài chính như thế nào?',
        correct: 'Căn cứ vào số vốn điều lệ thực góp và báo cáo tài chính từ thời điểm thành lập đến thời điểm đóng thầu theo quy định.',
        d1: 'Tự động bị đánh trượt ngay vòng thẩm định tư cách pháp nhân mà không cần xem xét hồ sơ.',
        d2: 'Bắt buộc phải có doanh thu tối thiểu bằng 10 lần giá gói thầu dù mới thành lập 1 tháng.',
        d3: 'Được miễn trừ hoàn toàn việc chứng minh khả năng huy động vốn và không cần có vốn điều lệ.'
      },
      {
        focus: 'Viện nghiên cứu, trường đại học tham gia dự thầu',
        content: 'Viện nghiên cứu hoặc trường đại học công lập muốn tham dự thầu gói thầu tư vấn nghiên cứu khoa học thì cần điều kiện gì?',
        correct: 'Có quyết định thành lập của cơ quan có thẩm quyền, có tư cách pháp nhân và hạch toán độc lập.',
        d1: 'Phải chuyển đổi mô hình sang công ty cổ phần niêm yết trên sàn chứng khoán.',
        d2: 'Phải do Thủ tướng Chính phủ đích thân ký quyết định phê duyệt tham gia từng gói thầu.',
        d3: 'Chỉ được phép tham gia với tư cách chuyên gia độc lập không được đứng tên tổ chức viện trường.'
      },
      {
        focus: 'Tài khoản trên Hệ thống e-GP bị tạm khóa',
        content: 'Tại thời điểm đóng thầu, tài khoản của nhà thầu trên Hệ thống e-GP đang trong trạng thái bị tạm ngừng do chưa đóng phí duy trì hàng năm thì:',
        correct: 'Nhà thầu không bảo đảm tư cách hợp lệ trên Hệ thống e-GP để tham dự thầu theo quy định hiện hành.',
        d1: 'Hệ thống vẫn tự động chấp nhận HSDT và coi như nhà thầu đã hoàn thành mọi nghĩa vụ pháp lý.',
        d2: 'Bên mời thầu có trách nhiệm nộp tiền thay cho nhà thầu để mở hồ sơ đánh giá.',
        d3: 'Nhà thầu được nộp bản in giấy đến trụ sở Bên mời thầu để thay thế hồ sơ điện tử.'
      },
      {
        focus: 'Thay đổi người đại diện theo pháp luật trong quá trình xét thầu',
        content: 'Trong quá trình Tổ chuyên gia đang đánh giá HSDT, nhà thầu có sự thay đổi người đại diện theo pháp luật thì phải xử lý như thế nào?',
        correct: 'Kịp thời gửi văn bản thông báo kèm theo tài liệu đăng ký thay đổi hợp pháp tới Bên mời thầu để cập nhật hồ sơ.',
        d1: 'Hồ sơ dự thầu của nhà thầu lập tức bị hủy bỏ vô điều kiện do sai lệch thông tin ban đầu.',
        d2: 'Nhà thầu phải thu hồi toàn bộ hồ sơ đã nộp và chờ đợi mời thầu lại từ đầu.',
        d3: 'Giữ bí mật tuyệt đối và chỉ tiết lộ thông tin sau khi đã nhận tiền tạm ứng hợp đồng.'
      }
    ]
  },

  // 1.3: Bảo đảm cạnh tranh trong đấu thầu (41 - 55)
  {
    topicId: 1,
    topicName: 'Chuyên đề 1: Quy định chung & Tư cách hợp lệ',
    subgroupCode: '1.3',
    start: 41,
    end: 55,
    theme: 'Bảo đảm cạnh tranh trong đấu thầu',
    legalBasis: 'Điều 6 Luật 22/2023/QH15 & Nghị định 214/2025/NĐ-CP',
    questions: [
      {
        focus: 'Độc lập pháp lý giữa nhà thầu và Chủ đầu tư, Bên mời thầu',
        content: 'Theo Điều 6 Luật Đấu thầu 2023, nhà thầu tham dự thầu gói thầu đấu thầu rộng rãi phải độc lập về pháp lý và tài chính với chủ thể nào?',
        correct: 'Chủ đầu tư, Bên mời thầu, đơn vị tư vấn lập E-HSMT và đơn vị tư vấn đánh giá E-HSDT của gói thầu đó.',
        d1: 'Tất cả các ngân hàng thương mại đang hoạt động trên lãnh thổ Việt Nam.',
        d2: 'Các cơ quan thông tấn báo chí đưa tin về lễ mở thầu của gói thầu.',
        d3: 'Ủy ban nhân dân các tỉnh lân cận không có dự án đi qua địa bàn.'
      },
      {
        focus: 'Tư vấn lập E-HSMT tham gia dự thầu chính gói thầu đó',
        content: 'Nhà thầu tư vấn đã tham gia lập E-HSMT cho một gói thầu mua sắm thiết bị y tế có được tham gia dự thầu gói thầu đó không?',
        correct: 'Không được tham gia dự thầu gói thầu đó nhằm bảo đảm tính cạnh tranh, công bằng và minh bạch.',
        d1: 'Được tham gia bình thường nếu cam kết không sử dụng tài liệu nội bộ đã lập.',
        d2: 'Được tham gia nếu liên danh với một nhà thầu ngoại quốc có thương hiệu lớn.',
        d3: 'Được tham gia nếu nộp mức bảo đảm dự thầu gấp đôi so với các nhà thầu khác.'
      },
      {
        focus: 'Độc lập giữa đơn vị đánh giá HSDT và nhà thầu dự thầu',
        content: 'Đơn vị tư vấn được Chủ đầu tư thuê để đánh giá E-HSDT có được có quan hệ sở hữu cổ phần với nhà thầu tham dự thầu không?',
        correct: 'Không được có cổ phần hoặc vốn góp trên 30% của nhau hoặc cùng chịu sự kiểm soát của một chủ sở hữu chung.',
        d1: 'Được sở hữu chéo đến 99% vốn điều lệ của nhau mà không ảnh hưởng kết quả.',
        d2: 'Chỉ bị cấm nếu hai bên có trụ sở đăng ký kinh doanh tại cùng một tòa nhà văn phòng.',
        d3: 'Được sở hữu tùy ý miễn là có văn bản cam kết bảo mật thông tin chấm thầu.'
      },
      {
        focus: 'Độc lập giữa đơn vị thẩm định và đơn vị tư vấn lập HSMT',
        content: 'Quy định về bảo đảm cạnh tranh giữa đơn vị thẩm định E-HSMT và đơn vị lập E-HSMT được quy định như thế nào?',
        correct: 'Đơn vị thẩm định phải độc lập về pháp lý và tài chính với đơn vị lập E-HSMT để bảo đảm tính khách quan.',
        d1: 'Hai đơn vị này bắt buộc phải là một phòng ban chuyên môn trực thuộc cùng một giám đốc điều hành.',
        d2: 'Đơn vị lập HSMT được quyền tự thẩm định hồ sơ của mình để tiết kiệm chi phí thời gian.',
        d3: 'Không cần quan tâm đến mối quan hệ giữa hai đơn vị này trong các dự án dưới 100 tỷ đồng.'
      },
      {
        focus: 'Tư vấn lập báo cáo FS và gói thầu EPC',
        content: 'Trong gói thầu EPC (Thiết kế - Cung cấp thiết bị - Xây lắp), nhà thầu đã lập Báo cáo nghiên cứu khả thi (FS) có được tham gia gói thầu EPC không?',
        correct: 'Phải tuân thủ nghiêm ngặt quy định về bảo đảm cạnh tranh theo Nghị định hướng dẫn của Chính phủ để tránh độc quyền thông tin.',
        d1: 'Được tự do chỉ định làm tổng thầu EPC mà không cần thông qua đấu thầu rộng rãi.',
        d2: 'Mặc nhiên được ưu tiên cộng 20% điểm kỹ thuật vào kết quả đánh giá HSDT.',
        d3: 'Bị cấm vĩnh viễn không bao giờ được tham gia bất kỳ dự án nào tại Việt Nam.'
      },
      {
        focus: 'Hai doanh nghiệp có cùng người đại diện pháp luật tham gia cùng gói thầu',
        content: 'Công ty A và Công ty B đều có ông Nguyễn Văn X là người đại diện theo pháp luật cùng nộp HSDT cho một gói thầu xây lắp thì:',
        correct: 'Vi phạm quy định về bảo đảm cạnh tranh trong đấu thầu; cả hai hồ sơ đều không hợp lệ.',
        d1: 'Hợp lệ nếu hai công ty hoạt động ở hai ngành nghề đăng ký kinh doanh khác nhau.',
        d2: 'Tổ chuyên gia sẽ bốc thăm chọn một trong hai công ty để giữ lại đánh giá tiếp.',
        d3: 'Được chấp thuận nếu một trong hai công ty cam kết chỉ đóng vai trò quân xanh hỗ trợ.'
      },
      {
        focus: 'Công ty mẹ và công ty con tham gia cùng gói thầu',
        content: 'Công ty mẹ và công ty con do công ty mẹ nắm giữ trên 50% vốn điều lệ có được cùng nộp HSDT trong cùng một gói thầu không?',
        correct: 'Không được cùng tham dự thầu trong một gói thầu vì không bảo đảm tính độc lập và cạnh tranh.',
        d1: 'Được phép nếu hai bên có thỏa thuận độc lập về kế hoạch tài chính và đơn vị thi công.',
        d2: 'Được phép nếu gói thầu được tổ chức theo hình thức chào hàng cạnh tranh rút gọn.',
        d3: 'Chỉ bị cấm nếu gói thầu sử dụng nguồn vốn tài trợ của Ngân hàng Thế giới (WB).'
      },
      {
        focus: 'Hai công ty con trực thuộc cùng Tổng công ty',
        content: 'Hai công ty con cùng do một Tổng công ty nhà nước nắm giữ 100% vốn điều lệ cùng nộp hồ sơ tham dự một gói thầu thì:',
        correct: 'Không bảo đảm tính cạnh tranh theo quy định tại Điều 6 Luật Đấu thầu 2023.',
        d1: 'Được khuyến khích tham gia để thúc đẩy nội bộ ngành phát triển mạnh mẽ hơn.',
        d2: 'Hoàn toàn hợp lệ vì hai công ty con có hai mã số thuế độc lập và hai con dấu riêng.',
        d3: 'Được chấp thuận nếu Tổng công ty có văn bản đồng ý cho hai đơn vị cùng cạnh tranh.'
      },
      {
        focus: 'Tư vấn giám sát thi công và nhà thầu xây lắp',
        content: 'Nhà thầu thực hiện gói thầu tư vấn giám sát thi công xây dựng công trình có được có mối quan hệ sở hữu vốn với nhà thầu thi công xây lắp không?',
        correct: 'Phải độc lập hoàn toàn về pháp lý và tài chính; không được có vốn góp của nhau nhằm bảo đảm giám sát trung thực.',
        d1: 'Được sở hữu chéo thoải mái để phối hợp xử lý hồ sơ nghiệm thu thanh toán nhanh hơn.',
        d2: 'Chỉ cần nhà thầu tư vấn giám sát cam kết cử kỹ sư không có quan hệ họ hàng ra hiện trường.',
        d3: 'Được phép sở hữu nếu tỷ lệ góp vốn không vượt quá 80% vốn điều lệ của nhà thầu thi công.'
      },
      {
        focus: 'Tư vấn lập thiết kế bản vẽ thi công liên danh với nhà thầu xây lắp',
        content: 'Nhà thầu tư vấn lập thiết kế bản vẽ thi công cho công trình có được đứng trong liên danh tham gia dự thầu gói thầu xây lắp công trình đó không?',
        correct: 'Không được tham gia dự thầu dưới bất kỳ hình thức độc lập hay liên danh vì vi phạm nguyên tắc bảo đảm cạnh tranh.',
        d1: 'Được liên danh nếu chỉ đảm nhận tỷ lệ công việc dưới 10% giá trị hợp đồng.',
        d2: 'Được tham gia nếu thiết kế đó đã được cơ quan cảnh sát PCCC nghiệm thu phê duyệt.',
        d3: 'Được phép nếu bên mời thầu không thuê được đơn vị tư vấn thiết kế nào khác trên thị trường.'
      },
      {
        focus: 'Tỷ lệ sở hữu chéo tối đa giữa hai nhà thầu tham dự cùng gói thầu',
        content: 'Theo quy định hiện hành, hai nhà thầu cùng nộp HSDT trong một gói thầu không được có tỷ lệ sở hữu vốn của nhau hoặc cùng một tổ chức khác sở hữu vượt quá bao nhiêu %?',
        correct: 'Không quá 30% vốn điều lệ hoặc cổ phần có quyền biểu quyết.',
        d1: 'Không quá 50% vốn điều lệ.',
        d2: 'Không quá 70% vốn điều lệ.',
        d3: 'Không quá 10% vốn điều lệ.'
      },
      {
        focus: 'Quan hệ thân nhân giữa lãnh đạo BQLDA và nhà thầu',
        content: 'Trường hợp Giám đốc Ban QLDA có vợ là Tổng giám đốc kiêm người đại diện theo pháp luật của nhà thầu nộp E-HSDT thì xử lý thế nào?',
        correct: 'Nhà thầu không được tham dự thầu gói thầu do Ban QLDA này làm Bên mời thầu hoặc Chủ đầu tư để tránh xung đột lợi ích.',
        d1: 'Vẫn được dự thầu bình thường nếu bà vợ ủy quyền cho phó giám đốc ký hồ sơ dự thầu.',
        d2: 'Chỉ cần hai vợ chồng có văn bản cam kết không trao đổi thông tin công việc tại nhà riêng.',
        d3: 'Nhà thầu được tự động chấm đỗ nếu giá dự thầu không vượt dự toán được duyệt.'
      },
      {
        focus: 'Nhà thầu tham gia giai đoạn 1 và giai đoạn 2',
        content: 'Trong phương thức đấu thầu hai giai đoạn, các nhà thầu đã tham dự và đáp ứng yêu cầu ở giai đoạn một thì:',
        correct: 'Được mời nộp hồ sơ dự thầu ở giai đoạn hai theo đúng danh sách được phê duyệt.',
        d1: 'Bắt buộc phải tìm kiếm thêm một nhà thầu mới bên ngoài vào liên danh bắt buộc.',
        d2: 'Bị loại toàn bộ để tổ chức đấu thầu rộng rãi lại từ đầu với các nhà thầu khác.',
        d3: 'Được chuyển ngay sang hình thức chỉ định thầu mà không cần đánh giá giá dự thầu.'
      },
      {
        focus: 'Biện pháp khi phát hiện vi phạm bảo đảm cạnh tranh',
        content: 'Khi phát hiện hai nhà thầu tham dự thầu có mối quan hệ sở hữu chéo vượt quy định, Bên mời thầu xử lý như thế nào?',
        correct: 'Báo cáo Chủ đầu tư loại bỏ cả hai nhà thầu do không đáp ứng yêu cầu về tính độc lập cạnh tranh theo Điều 6.',
        d1: 'Yêu cầu hai nhà thầu tiến hành sáp nhập doanh nghiệp ngay trong thời gian chấm thầu.',
        d2: 'Cho phép hai nhà thầu tự thỏa thuận rút bớt một hồ sơ mà không lập biên bản lưu trữ.',
        d3: 'Cộng thêm 50% giá dự thầu cho nhà thầu có quy mô tài sản nhỏ hơn để cân bằng.'
      },
      {
        focus: 'Hậu quả pháp lý của HSDT không bảo đảm cạnh tranh',
        content: 'Hồ sơ dự thầu của nhà thầu vi phạm quy định về bảo đảm cạnh tranh trong đấu thầu sẽ bị đánh giá là:',
        correct: 'Không hợp lệ và bị loại ngay từ bước kiểm tra tính hợp lệ của hồ sơ.',
        d1: 'Vẫn được đánh giá tiếp về năng lực kỹ thuật nhưng bị trừ 5 điểm tài chính.',
        d2: 'Được xem xét đặc cách nếu gói thầu không có nhà thầu nào khác nộp hồ sơ.',
        d3: 'Chỉ bị nhắc nhở bằng văn bản và yêu cầu rút kinh nghiệm cho các gói thầu sau.'
      }
    ]
  },

  // 1.4: Bảo đảm dự thầu & Chính sách ưu đãi (56 - 70)
  {
    topicId: 1,
    topicName: 'Chuyên đề 1: Quy định chung & Tư cách hợp lệ',
    subgroupCode: '1.4',
    start: 56,
    end: 70,
    theme: 'Bảo đảm dự thầu & Ưu đãi trong đấu thầu',
    legalBasis: 'Điều 10, 14 Luật 22/2023/QH15',
    questions: [
      {
        focus: 'Các biện pháp bảo đảm dự thầu hợp lệ',
        content: 'Theo Điều 14 Luật Đấu thầu 2023, nhà thầu có thể thực hiện biện pháp bảo đảm dự thầu bằng hình thức nào sau đây?',
        correct: 'Đặt cọc hoặc nộp thư bảo lãnh của tổ chức tín dụng trong nước, chi nhánh ngân hàng nước ngoài, hoặc giấy chứng nhận bảo hiểm bảo lãnh.',
        d1: 'Thế chấp sổ đỏ nhà đất hoặc giấy đăng ký xe ôtô trực tiếp tại phòng họp mở thầu.',
        d2: 'Gửi giấy cam kết bằng chữ viết tay của cá nhân tổ trưởng tổ thợ thi công.',
        d3: 'Chuyển nhượng quyền sở hữu thương hiệu độc quyền của công ty cho Bên mời thầu giữ hộ.'
      },
      {
        focus: 'Giá trị bảo đảm dự thầu gói thầu quy mô nhỏ',
        content: 'Mức giá trị bảo đảm dự thầu đối với gói thầu quy mô nhỏ được quy định trong khoảng tỷ lệ nào của giá gói thầu?',
        correct: 'Từ 1% đến 1,5% giá gói thầu.',
        d1: 'Từ 3% đến 5% giá gói thầu.',
        d2: 'Từ 5% đến 10% giá gói thầu.',
        d3: 'Cố định luôn là 20 triệu đồng cho mọi quy mô gói thầu.'
      },
      {
        focus: 'Giá trị bảo đảm dự thầu gói thầu thông thường',
        content: 'Đối với các gói thầu không phải quy mô nhỏ, giá trị bảo đảm dự thầu được quy định trong khoảng bao nhiêu phần trăm giá gói thầu?',
        correct: 'Từ 1% đến 3% giá gói thầu.',
        d1: 'Từ 5% đến 15% giá gói thầu.',
        d2: 'Từ 0,1% đến 0,5% giá gói thầu.',
        d3: 'Chính xác 10% giá gói thầu không được phép thay đổi.'
      },
      {
        focus: 'Thời gian hiệu lực của bảo đảm dự thầu',
        content: 'Thời hạn hiệu lực của bảo đảm dự thầu được quy định như thế nào trong hồ sơ mời thầu?',
        correct: 'Bằng thời gian có hiệu lực của hồ sơ dự thầu cộng thêm 30 ngày.',
        d1: 'Chỉ cần có hiệu lực đến đúng thời điểm đóng thầu là kết thúc nghĩa vụ bảo đảm.',
        d2: 'Bằng thời gian thi công dự kiến của gói thầu ghi trong kế hoạch lựa chọn nhà thầu.',
        d3: 'Có giá trị vĩnh viễn cho đến khi công trình hoàn thành thanh quyết toán 5 năm sau.'
      },
      {
        focus: 'Bảo lãnh dự thầu của ngân hàng nước ngoài',
        content: 'Trường hợp bảo lãnh dự thầu do ngân hàng nước ngoài phát hành cho nhà thầu tham dự gói thầu tại Việt Nam thì cần điều kiện gì?',
        correct: 'Phải được một tổ chức tín dụng thành lập hợp pháp tại Việt Nam xác nhận bảo lãnh theo quy định.',
        d1: 'Không cần xác nhận, chỉ cần gửi email thông báo từ trụ sở ngân hàng ở nước ngoài.',
        d2: 'Tuyệt đối không được chấp nhận bảo lãnh từ bất kỳ ngân hàng nước ngoài nào.',
        d3: 'Nhà thầu phải đóng thêm 50% tiền mặt bằng đồng USD vào kho bạc nhà nước.'
      },
      {
        focus: 'Bảo đảm dự thầu của nhà thầu liên danh',
        content: 'Quy định nào sau đây là chuẩn xác về việc nộp bảo đảm dự thầu của nhà thầu liên danh?',
        correct: 'Từng thành viên trong liên danh nộp riêng rẽ hoặc thỏa thuận để thành viên đứng đầu liên danh nộp bảo lãnh dự thầu thay cho cả liên danh.',
        d1: 'Bắt buộc tất cả các thành viên phải cùng mở một tài khoản ngân hàng chung duy nhất.',
        d2: 'Chỉ thành viên có vốn góp nhỏ nhất mới phải chịu trách nhiệm nộp bảo lãnh dự thầu.',
        d3: 'Nhà thầu liên danh được miễn 100% không phải nộp bất kỳ hình thức bảo đảm dự thầu nào.'
      },
      {
        focus: 'Tịch thu bảo đảm dự thầu do rút thầu sau đóng thầu',
        content: 'Trường hợp nhà thầu có văn bản rút hồ sơ dự thầu SAU THỜI ĐIỂM ĐÓNG THẦU và khi HSDT vẫn đang còn hiệu lực thì xử lý thế nào?',
        correct: 'Bảo đảm dự thầu của nhà thầu sẽ không được hoàn trả (bị tịch thu nộp vào ngân sách hoặc chủ đầu tư).',
        d1: 'Được hoàn trả lại đầy đủ tiền bảo đảm dự thầu trong vòng 24 giờ kèm theo tiền lãi ngân hàng.',
        d2: 'Chỉ bị phạt 10% giá trị bảo lãnh dự thầu, 90% còn lại được trả lại cho nhà thầu.',
        d3: 'Bên mời thầu chuyển bảo đảm dự thầu đó sang gói thầu tiếp theo của nhà thầu.'
      },
      {
        focus: 'Tịch thu bảo đảm do từ chối ký kết hợp đồng',
        content: 'Nhà thầu được thông báo trúng thầu nhưng từ chối vào hoàn thiện ký kết hợp đồng hoặc không nộp bảo đảm thực hiện hợp đồng thì:',
        correct: 'Không được nhận lại bảo đảm dự thầu theo quy định tại khoản 8 Điều 14 Luật Đấu thầu 2023.',
        d1: 'Vẫn được nhận lại thư bảo lãnh gốc nếu gửi đơn giải trình lý do tài chính khó khăn.',
        d2: 'Được nhận lại bảo đảm dự thầu nếu giới thiệu một nhà thầu bạn bè khác vào ký thay.',
        d3: 'Chỉ bị cảnh cáo trên trang web của Chủ đầu tư mà không có chế tài về tài chính.'
      },
      {
        focus: 'Tịch thu bảo đảm do gian lận trong đấu thầu',
        content: 'Nhà thầu có hành vi làm giả báo cáo tài chính, bằng cấp nhân sự để gian lận trong HSDT thì bảo đảm dự thầu xử lý ra sao?',
        correct: 'Không được hoàn trả bảo đảm dự thầu và bị xem xét xử lý vi phạm pháp luật cấm tham gia đấu thầu.',
        d1: 'Được trả lại ngay lập tức để tránh tranh chấp khiếu kiện kéo dài.',
        d2: 'Được chuyển đổi thành tiền nộp phạt vi phạm giao thông đường bộ.',
        d3: 'Cho phép nhà thầu bổ sung giấy tờ thật rồi hoàn trả bảo đảm dự thầu sau 03 ngày.'
      },
      {
        focus: 'Thời hạn hoàn trả bảo đảm dự thầu cho nhà thầu không trúng thầu',
        content: 'Bên mời thầu có trách nhiệm hoàn trả hoặc giải tỏa bảo đảm dự thầu cho nhà thầu không trúng thầu trong thời hạn bao lâu?',
        correct: 'Không quá 14 ngày kể từ ngày kết quả lựa chọn nhà thầu được phê duyệt.',
        d1: 'Sau ít nhất 180 ngày kể từ khi gói thầu khánh thành đưa vào vận hành.',
        d2: 'Ngay trong vòng 30 phút sau khi kết thúc lễ mở thầu trên mạng.',
        d3: 'Khi nào nhà thầu có đơn xin hoàn trả được tất cả các nhà thầu khác cùng ký tên đồng ý.'
      },
      {
        focus: 'Ưu đãi cho hàng hóa sản xuất trong nước',
        content: 'Theo quy định tại Điều 10 Luật Đấu thầu 2023, hàng hóa sản xuất trong nước được hưởng chính sách ưu đãi trong đấu thầu khi:',
        correct: 'Có chi phí sản xuất trong nước chiếm tỷ lệ từ 30% trở lên trong giá bán của hàng hóa.',
        d1: 'Chỉ cần được đóng gói bao bì dán nhãn mác tại các nhà kho đặt tại Việt Nam.',
        d2: 'Là hàng hóa nhập khẩu 100% từ các nước có hiệp định thương mại tự do với Việt Nam.',
        d3: 'Có tỷ lệ chi phí sản xuất trong nước từ 5% trở lên bất kể nguồn gốc xuất xứ linh kiện.'
      },
      {
        focus: 'Ưu đãi cho doanh nghiệp nhỏ và siêu nhỏ',
        content: 'Đối tượng nào sau đây được hưởng ưu đãi trong hoạt động lựa chọn nhà thầu theo Luật Đấu thầu 2023?',
        correct: 'Doanh nghiệp nhỏ và siêu nhỏ; doanh nghiệp khởi nghiệp sáng tạo theo quy định pháp luật.',
        d1: 'Các tập đoàn đa quốc gia có chi nhánh đặt tại các đặc khu kinh tế nước ngoài.',
        d2: 'Doanh nghiệp có số lượng lao động trên 10.000 người và doanh thu trên 5.000 tỷ đồng.',
        d3: 'Các công ty nước ngoài lần đầu tiên tham gia dự thầu tại thị trường Đông Nam Á.'
      },
      {
        focus: 'Gói thầu xây lắp dưới 5 tỷ dành riêng cho DN nhỏ',
        content: 'Theo Luật Đấu thầu 2023, gói thầu xây lắp có giá gói thầu dưới bao nhiêu thì CHỈ DÀNH RIÊNG cho doanh nghiệp nhỏ và siêu nhỏ tham dự?',
        correct: 'Gói thầu xây lắp có giá gói thầu không quá 05 tỷ đồng.',
        d1: 'Gói thầu xây lắp có giá gói thầu không quá 20 tỷ đồng.',
        d2: 'Gói thầu xây lắp có giá gói thầu không quá 50 tỷ đồng.',
        d3: 'Gói thầu xây lắp có giá gói thầu không quá 01 tỷ đồng.'
      },
      {
        focus: 'Ưu đãi cho nhà thầu sử dụng lao động nữ, người khuyết tật',
        content: 'Nhà thầu sử dụng lao động là người khuyết tật hoặc lao động nữ được hưởng chính sách ưu đãi khi đạt tỷ lệ tối thiểu bao nhiêu?',
        correct: 'Sử dụng từ 25% tổng số lao động trở lên là người khuyết tật, thương binh hoặc lao động nữ và có hợp đồng lao động tối thiểu 01 năm.',
        d1: 'Chỉ cần có 1 nhân viên nữ duy nhất làm công tác kế toán trưởng của công ty.',
        d2: 'Tối thiểu 80% lao động là phụ nữ đã nghỉ hưu theo chế độ bảo hiểm xã hội.',
        d3: 'Có ít nhất 5% lao động thời vụ không có hợp đồng làm việc dưới 3 tháng.'
      },
      {
        focus: 'Nguyên tắc áp dụng ưu đãi khi có nhiều tiêu chí',
        content: 'Trường hợp nhà thầu thuộc đối tượng được hưởng nhiều hơn một loại ưu đãi trong cùng một gói thầu thì được tính như thế nào?',
        correct: 'Nhà thầu chỉ được hưởng một loại ưu đãi có lợi nhất cho nhà thầu theo quy định.',
        d1: 'Được cộng dồn tất cả các mức ưu đãi lại với nhau mà không có giới hạn trần.',
        d2: 'Bị tước bỏ toàn bộ quyền ưu đãi vì thuộc quá nhiều đối tượng chính sách.',
        d3: 'Do Bên mời thầu tùy ý quyết định cho hưởng nửa mức ưu đãi thấp nhất.'
      }
    ]
  },

  // 1.5: Hành vi bị cấm & Xử lý vi phạm trong đấu thầu (71 - 85)
  {
    topicId: 1,
    topicName: 'Chuyên đề 1: Quy định chung & Tư cách hợp lệ',
    subgroupCode: '1.5',
    start: 71,
    end: 85,
    theme: 'Hành vi bị cấm & Xử lý vi phạm trong đấu thầu',
    legalBasis: 'Điều 16, 87 Luật 22/2023/QH15 & NĐ 214/2025/NĐ-CP',
    questions: [
      {
        focus: 'Nhận diện hành vi Thông thầu',
        content: 'Hành vi nào sau đây được xác định là hành vi "Thông thầu" bị nghiêm cấm tuyệt đối theo Điều 16 Luật Đấu thầu 2023?',
        correct: 'Thỏa thuận để một hoặc các bên rút đơn dự thầu hoặc rút hồ sơ dự thầu để một bên trúng thầu.',
        d1: 'Hai nhà thầu cùng tham gia một hiệp hội ngành nghề cơ khí xây dựng Việt Nam.',
        d2: 'Nhà thầu gửi văn bản đề nghị Bên mời thầu làm rõ các tiêu chuẩn kỹ thuật trong E-HSMT.',
        d3: 'Nhà thầu liên danh chào mức giảm giá hợp pháp trong thư giảm giá nộp kèm E-HSDT.'
      },
      {
        focus: 'Nhận diện hành vi quân xanh quân đỏ',
        content: 'Hiện tượng một nhóm nhà thầu thỏa thuận lập HSDT có mức giá cao vọt hoặc cố tình để thiếu hồ sơ nhằm tạo điều kiện cho một nhà thầu định sẵn trúng thầu là hành vi gì?',
        correct: 'Hành vi thông thầu (bố trí "quân xanh, quân đỏ") vi phạm nghiêm trọng Điều 16 Luật Đấu thầu.',
        d1: 'Biện pháp tiếp thị sản phẩm hợp pháp trong nền kinh tế thị trường định hướng XHCN.',
        d2: 'Kỹ năng thương thảo hợp đồng thông minh để thăm dò mức giá gói thầu của Chủ đầu tư.',
        d3: 'Quy trình liên kết kinh doanh thông thường được pháp luật doanh nghiệp bảo hộ tuyệt đối.'
      },
      {
        focus: 'Hành vi gian lận về nhân sự và hợp đồng tương tự',
        content: 'Nhà thầu cố ý làm giả bằng đại học, chứng chỉ hành nghề của nhân sự chủ chốt hoặc làm giả con dấu trên biên bản nghiệm thu hợp đồng tương tự thì cấu thành hành vi gì?',
        correct: 'Hành vi gian lận trong đấu thầu bị nghiêm cấm theo khoản 4 Điều 16 Luật Đấu thầu 2023.',
        d1: 'Chỉ là lỗi hành chính sơ suất về công tác văn phòng phẩm, cho phép làm rõ sửa sai.',
        d2: 'Hành vi cạnh tranh lành mạnh không gây ảnh hưởng đến chất lượng thi công sau này.',
        d3: 'Thuộc thẩm quyền giải quyết nội bộ giữa Tổ chuyên gia và giám đốc công ty nhà thầu.'
      },
      {
        focus: 'Cung cấp báo cáo tài chính sai lệch',
        content: 'Nhà thầu tự chỉnh sửa số liệu doanh thu trên Báo cáo tài chính đã kiểm toán để đáp ứng tiêu chuẩn đánh giá của E-HSMT sẽ bị xử lý thế nào?',
        correct: 'Bị coi là gian lận, HSDT bị loại và bị cấm tham gia hoạt động đấu thầu từ 03 năm đến 05 năm.',
        d1: 'Được quyền nộp lại báo cáo tài chính thật mà không phải chịu bất kỳ hình thức kỷ luật nào.',
        d2: 'Chỉ bị phạt tiền 500.000 đồng và vẫn được giữ quyền trúng thầu nếu giá rẻ nhất.',
        d3: 'Bên mời thầu tự ý sửa lại số liệu cho đúng với thực tế rồi tiếp tục chấm thầu.'
      },
      {
        focus: 'Hành vi cản trở hoạt động đấu thầu',
        content: 'Hành vi nào sau đây bị coi là hành vi "Cản trở" hoạt động đấu thầu theo quy định pháp luật?',
        correct: 'Hủy hoại, lừa dối, mua chuộc, đe dọa hoặc dùng vũ lực để ngăn chặn nhà thầu khác tham dự thầu hoặc nộp hồ sơ.',
        d1: 'Đăng tải thông tin mời thầu công khai, minh bạch đúng thời hạn trên Hệ thống e-GP.',
        d2: 'Tổ chức hội nghị tiền đấu thầu để giải đáp thắc mắc công khai cho các nhà thầu quan tâm.',
        d3: 'Phát hành biên bản mở thầu điện tử công khai cho toàn bộ cộng đồng mạng theo dõi.'
      },
      {
        focus: 'Tiết lộ thông tin tài liệu đấu thầu mật',
        content: 'Thành viên Tổ chuyên gia gửi bản chấm thầu nội bộ hoặc thông tin giá dự thầu của các nhà thầu cho một nhà thầu thân quen trước khi công bố KQLCNT là hành vi:',
        correct: 'Vi phạm quy định về bảo mật thông tin trong đấu thầu, bị xử lý kỷ luật và xử lý theo quy định pháp luật.',
        d1: 'Hành động giao lưu cởi mở giúp nhà thầu kịp thời chuẩn bị năng lực đón đầu dự án.',
        d2: 'Được phép thực hiện nếu nhà thầu nhận thông tin có cam kết không chia sẻ lên mạng xã hội.',
        d3: 'Chỉ vi phạm nếu người tiết lộ thông tin có nhận tiền thù lao từ 100 triệu đồng trở lên.'
      },
      {
        focus: 'Chuyển nhượng thầu trái phép',
        content: 'Hành vi nào sau đây cấu thành hành vi "Chuyển nhượng thầu trái phép" bị nghiêm cấm?',
        correct: 'Nhà thầu chuyển nhượng cho nhà thầu khác phần công việc thuộc gói thầu vượt mức tỷ lệ tối đa cho phép theo quy định hoặc hợp đồng.',
        d1: 'Ký hợp đồng với nhà thầu phụ đúng theo danh sách nhà thầu phụ đã kê khai trong E-HSDT.',
        d2: 'Thuê xe vận tải chuyên dụng của bên thứ ba để chuyên chở vật liệu xây dựng đến chân công trường.',
        d3: 'Mua vật liệu sắt thép, xi măng từ các đại lý phân phối chính thức của nhà sản xuất.'
      },
      {
        focus: 'Can thiệp bất hợp pháp vào hoạt động đấu thầu',
        content: 'Người có thẩm quyền hoặc Chủ đầu tư lợi dụng chức vụ để ép buộc Tổ chuyên gia chấm cho một nhà thầu quen biết trúng thầu là hành vi:',
        correct: 'Hành vi can thiệp bất hợp pháp vào hoạt động đấu thầu bị nghiêm cấm tại khoản 2 Điều 16.',
        d1: 'Thực hiện đúng quyền hạn chỉ đạo điều hành của cấp trên đối với cấp dưới.',
        d2: 'Biện pháp linh hoạt để bảo đảm chọn được nhà thầu thân thiết nhằm hoàn thành dự án đúng tiến độ.',
        d3: 'Hành vi bình thường không thuộc phạm vi điều chỉnh của Luật Đấu thầu 2023.'
      },
      {
        focus: 'Thẩm quyền cấm tham gia hoạt động đấu thầu',
        content: 'Cơ quan, cá nhân nào sau đây có thẩm quyền ban hành quyết định cấm tham gia hoạt động đấu thầu đối với nhà thầu vi phạm?',
        correct: 'Người có thẩm quyền, Bộ trưởng, Thủ trưởng cơ quan ngang bộ, Chủ tịch Ủy ban nhân dân cấp tỉnh.',
        d1: 'Tổ trưởng tổ chuyên gia trực tiếp chấm bài của gói thầu đó.',
        d2: 'Nhân viên bảo vệ tòa nhà nơi tổ chức mở thầu công khai.',
        d3: 'Bất kỳ nhà thầu đối thủ nào bị trượt thầu trong danh sách xếp hạng.'
      },
      {
        focus: 'Khung thời gian cấm từ 03 đến 05 năm',
        content: 'Hành vi gian lận hoặc thông thầu trong hoạt động đấu thầu sẽ bị người có thẩm quyền cấm tham gia hoạt động đấu thầu với khung thời gian là bao lâu?',
        correct: 'Từ 03 năm đến 05 năm.',
        d1: 'Từ 01 tháng đến 03 tháng.',
        d2: 'Từ 06 tháng đến 01 năm.',
        d3: 'Cấm vĩnh viễn không thời hạn trong mọi hoạt động kinh doanh thương mại.'
      },
      {
        focus: 'Khung thời gian cấm từ 01 đến 03 năm',
        content: 'Hành vi cản trở hoạt động đấu thầu hoặc chuyển nhượng thầu trái phép thì áp dụng khung thời gian cấm tham gia hoạt động đấu thầu là:',
        correct: 'Từ 01 năm đến 03 năm.',
        d1: 'Từ 03 năm đến 05 năm.',
        d2: 'Từ 03 tháng đến 06 tháng.',
        d3: 'Từ 05 năm đến 10 năm.'
      },
      {
        focus: 'Khung thời gian cấm từ 06 tháng đến 01 năm',
        content: 'Nhà thầu không thực hiện biện pháp bảo đảm thực hiện hợp đồng hoặc cố tình không ký kết hợp đồng sau khi có quyết định trúng thầu bị cấm tham gia đấu thầu bao lâu?',
        correct: 'Từ 06 tháng đến 01 năm.',
        d1: 'Từ 03 năm đến 05 năm.',
        d2: 'Từ 02 năm đến 04 năm.',
        d3: 'Chỉ bị nhắc nhở trong 07 ngày mà không áp dụng cấm tham gia.'
      },
      {
        focus: 'Phạm vi hiệu lực của Quyết định cấm tham gia đấu thầu',
        content: 'Quyết định cấm tham gia hoạt động đấu thầu do Chủ tịch Ủy ban nhân dân cấp tỉnh ban hành có hiệu lực áp dụng trong phạm vi nào?',
        correct: 'Các dự án, dự toán mua sắm trong phạm vi quản lý của địa phương đó và được đăng tải toàn quốc trên e-GP.',
        d1: 'Chỉ có hiệu lực trong phạm vi một phòng làm việc của Ban Quản lý dự án trực tiếp.',
        d2: 'Tự động có hiệu lực cấm xuất cảnh đối với toàn bộ công nhân viên của công ty nhà thầu.',
        d3: 'Không có hiệu lực nếu nhà thầu đổi tên công ty và đăng ký địa chỉ ở tỉnh khác.'
      },
      {
        focus: 'Công khai quyết định xử lý vi phạm trên Hệ thống e-GP',
        content: 'Quyết định xử lý vi phạm pháp luật về đấu thầu sau khi ban hành bắt buộc phải được gửi đến đâu để công khai rộng rãi?',
        correct: 'Bộ Kế hoạch và Đầu tư để đăng tải công khai trên Hệ thống mạng đấu thầu quốc gia.',
        d1: 'Chỉ lưu trữ nội bộ trong tủ tài liệu mật của Bên mời thầu.',
        d2: 'Gửi riêng cho các nhà thầu thân hữu qua đường bưu điện chuyển phát nhanh.',
        d3: 'Chỉ cần dán thông báo tại cổng cơ quan Ủy ban nhân dân xã trong thời gian 3 ngày.'
      },
      {
        focus: 'Trách nhiệm hình sự theo Điều 222 Bộ luật Hình sự',
        content: 'Hành vi thông thầu, gian lận trong đấu thầu gây thiệt hại tài sản của Nhà nước từ 100 triệu đồng trở lên có thể bị xử lý như thế nào?',
        correct: 'Bị truy cứu trách nhiệm hình sự về tội Vi phạm quy định về đấu thầu gây hậu quả nghiêm trọng theo Điều 222 BLHS.',
        d1: 'Chỉ bị xử phạt vi phạm hành chính cảnh cáo và yêu cầu hoàn trả số tiền chênh lệch.',
        d2: 'Không bị xử lý hình sự nếu cá nhân vi phạm đã xin chuyển công tác sang đơn vị khác.',
        d3: 'Được miễn trừ trách nhiệm hình sự nếu nhà thầu đã bàn giao công trình xong xuôi.'
      }
    ]
  }
];

// Helper to expand and complete subgroups 2.1 to 5.5 systematically
// We will generate authentic questions for all 24 subgroups
console.log('Building full taxonomy and questions...');
