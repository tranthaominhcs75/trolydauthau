// scripts/verify_taxonomy.cjs
const fs = require('fs');
const path = require('path');

// Read src/data/questions.ts
const content = fs.readFileSync(path.join(__dirname, '../src/data/questions.ts'), 'utf8');

// Parse the JSON array inside export const QUESTIONS: Question[] = [...]
const startIdx = content.indexOf('= [') + 2;
const jsonStr = content.substring(startIdx, content.lastIndexOf(']') + 1);
const questions = JSON.parse(jsonStr);

console.log('=== KẾT QUẢ KIỂM TRA TOÀN DIỆN 395 CÂU HỎI VÀ 5 CHUYÊN ĐỀ ===');
console.log(`Tổng số câu hỏi trong ngân hàng dữ liệu: ${questions.length} / 395`);

// Check ID continuity
const ids = questions.map(q => q.id);
let isContinuous = true;
for (let i = 1; i <= 395; i++) {
  if (!ids.includes(i)) {
    console.error(`LỖI: Thiếu câu hỏi ID #${i}`);
    isContinuous = false;
  }
}
if (isContinuous) {
  console.log('✓ Tính liên tục ID: Đầy đủ từ Câu 1 đến Câu 395 không thiếu câu nào.');
}

// Check by Topic
const expectedTopics = {
  1: { name: 'Chuyên đề 1: Quy định chung & Tư cách hợp lệ', expected: 85, range: [1, 85] },
  2: { name: 'Chuyên đề 2: Hình thức & Phương thức lựa chọn nhà thầu', expected: 75, range: [86, 160] },
  3: { name: 'Chuyên đề 3: Các mốc Thời gian & Hạn mức', expected: 70, range: [161, 230] },
  4: { name: 'Chuyên đề 4: Đánh giá HSDT, Kiến nghị & Xử lý tình huống', expected: 90, range: [231, 320] },
  5: { name: 'Chuyên đề 5: Hợp đồng & Nghiệm thu', expected: 75, range: [321, 395] },
};

let topicCheckPass = true;
for (const [tIdStr, tInfo] of Object.entries(expectedTopics)) {
  const tId = parseInt(tIdStr);
  const qInTopic = questions.filter(q => q.topicId === tId);
  const minId = Math.min(...qInTopic.map(q => q.id));
  const maxId = Math.max(...qInTopic.map(q => q.id));
  const matchExpected = qInTopic.length === tInfo.expected;
  const matchRange = minId === tInfo.range[0] && maxId === tInfo.range[1];

  console.log(`\n• ${tInfo.name}:`);
  console.log(`  - Số lượng: ${qInTopic.length}/${tInfo.expected} câu ${matchExpected ? '✓ ĐẠT' : '✗ SAI'}`);
  console.log(`  - Dải câu hỏi: Từ câu ${minId} đến câu ${maxId} (Kỳ vọng ${tInfo.range[0]} - ${tInfo.range[1]}) ${matchRange ? '✓ CHUẨN XÁC' : '✗ SAI'}`);

  if (!matchExpected || !matchRange) topicCheckPass = false;
}

// Check subgroups
const expectedSubgroups = {
  '1.1': 20, '1.2': 20, '1.3': 15, '1.4': 15, '1.5': 15,
  '2.1': 15, '2.2': 20, '2.3': 15, '2.4': 10, '2.5': 15,
  '3.1': 20, '3.2': 20, '3.3': 15, '3.4': 15,
  '4.1': 25, '4.2': 15, '4.3': 25, '4.4': 10, '4.5': 15,
  '5.1': 20, '5.2': 15, '5.3': 15, '5.4': 15, '5.5': 10,
};

console.log('\n=== KIỂM TRA CHI TIẾT 24 NHÓM KIẾN THỨC CON (SUBGROUPS) ===');
let subgroupCheckPass = true;
for (const [subCode, expCount] of Object.entries(expectedSubgroups)) {
  const qInSub = questions.filter(q => q.subgroupCode === subCode);
  const pass = qInSub.length === expCount;
  if (!pass) subgroupCheckPass = false;
  console.log(`Nhóm ${subCode}: ${qInSub.length}/${expCount} câu ${pass ? '✓' : '✗ LỖI'}`);
}

// Check data integrity (no nulls/empty fields)
let integrityPass = true;
let emptyOptCount = 0;
let missingLegalCount = 0;
for (const q of questions) {
  if (!q.content || !q.title || !q.options.A || !q.options.B || !q.options.C || !q.options.D) {
    emptyOptCount++;
    integrityPass = false;
  }
  if (!q.legalBasis) {
    missingLegalCount++;
    integrityPass = false;
  }
  if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer)) {
    integrityPass = false;
  }
}

console.log('\n=== KIỂM TRA CHẤT LƯỢNG NỘI DUNG & TÍNH TOÀN VẸN ===');
console.log(`- Tùy chọn A, B, C, D đầy đủ: ${emptyOptCount === 0 ? '✓ ĐẦY ĐỦ 100%' : `✗ Lỗi ${emptyOptCount}`}`);
console.log(`- Căn cứ pháp lý đầy đủ: ${missingLegalCount === 0 ? '✓ ĐẦY ĐỦ 100%' : `✗ Lỗi ${missingLegalCount}`}`);
console.log(`- Đáp án chuẩn hợp lệ: ${integrityPass ? '✓ 100% HỢP LỆ' : '✗ CÓ LỖI'}`);

console.log(`\n=> KẾT LUẬN CHUNG: ${topicCheckPass && subgroupCheckPass && integrityPass ? 'TẤT CẢ 395 CÂU ĐÃ ĐƯỢC PHÂN LOẠI HOÀN TOÀN ĐẦY ĐỦ VÀ CHÍNH XÁC VÀO 5 CÂY CHUYÊN ĐỀ!' : 'CẦN ĐIỀU CHỈNH THÊM'}`);
