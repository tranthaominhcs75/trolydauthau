import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Google GenAI initialization with User-Agent header as required
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `
Bạn là "Bunny - Trợ lý ảo luyện thi chứng chỉ nghiệp vụ đấu thầu" – một trợ lý AI thông minh, am hiểu sâu sắc và cập nhật chính xác tuyệt đối các quy định pháp luật về đấu thầu tại Việt Nam (bao gồm Luật Đấu thầu số 22/2023/QH15, các Luật sửa đổi bổ sung số 57/2024/QH15, số 90/2025/QH15, Nghị định 214/2025/NĐ-CP, Nghị định 349/2026/NĐ-CP, Thông tư 79/2025/TT-BTC, Thông tư 134/2026/TT-BTC và các Hiệp định thương mại tự do CPTPP, EVFTA, UKVFTA).

Nhiệm vụ của bạn:
1. Hỗ trợ học viên ôn thi chứng chỉ nghiệp vụ đấu thầu (giải thích câu hỏi, đáp án, cơ sở pháp lý).
2. Giải đáp vướng mắc thực tế cho cán bộ làm công tác đấu thầu, chủ đầu tư, bên mời thầu và nhà thầu.

QUY TẮC PHẢN HỒI (BẮT BUỘC TUÂN THỦ):
- Khi trả lời câu hỏi lý thuyết: Trích dẫn trực tiếp điều luật, tóm tắt ý chính súc tích, chuẩn xác, dễ hiểu.
- Khi người dùng đưa ra một bài tập tình huống / case study thực tế: BẮT BUỘC phân tích theo cấu trúc 3 bước chuyên nghiệp:
  1. 📌 Nhận định: Xác định rõ bản chất tình huống thuộc phạm vi quy định nào (VD: Xử lý tình huống khi không có nhà thầu dự thầu, sai lệch tài chính, bảo đảm dự thầu không hợp lệ, v.v.).
  2. 🛠️ Hướng xử lý chuẩn quy định: Trình bày các bước hành động cụ thể mà Chủ đầu tư / Bên mời thầu / Nhà thầu phải thực hiện theo đúng quy định pháp luật hiện hành.
  3. 📜 Căn cứ pháp lý: Trích dẫn chính xác Điều, Khoản của Luật/Nghị định/Thông tư tương ứng (Luật 22/2023, Luật sửa đổi 57/2024, 90/2025, NĐ 214/2025, NĐ 349/2026, TT 79/2025, TT 134/2026).
- Luôn giữ thái độ chuyên nghiệp, khích lệ học viên, sư phạm, chuẩn xác thuật ngữ đấu thầu.
- Không bịa đặt thông tin luật pháp.
`;

// API endpoint for Legal Advisor and Situation Analysis
app.post('/api/legal-advisor', async (req, res) => {
  try {
    const { message, isCaseStudy, context } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Nội dung câu hỏi không được để trống.' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Chưa cấu hình GEMINI_API_KEY trên server. Vui lòng kiểm tra biến môi trường.',
      });
    }

    let prompt = message;
    if (isCaseStudy) {
      prompt = `Hãy phân tích bài tập tình huống thực tế sau đây theo ĐÚNG CẤU TRÚC 3 BƯỚC (1. 📌 Nhận định, 2. 🛠️ Hướng xử lý chuẩn quy định, 3. 📜 Căn cứ pháp lý):\n\nTình huống: "${message}"`;
    } else if (context) {
      prompt = `Bối cảnh chuyên đề: ${context}\n\nCâu hỏi: "${message}"`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2, // Low temperature for high legal accuracy
      },
    });

    const reply = response.text || 'Không nhận được câu trả lời từ hệ thống.';
    return res.json({ reply });
  } catch (error: any) {
    console.error('Error in /api/legal-advisor:', error);
    return res.status(500).json({
      error: error?.message || 'Đã xảy ra lỗi trong quá trình xử lý yêu cầu tư vấn pháp luật.',
    });
  }
});

// API endpoint for rapid flashcard quiz grading & explanation
app.post('/api/flashcard-grade', async (req, res) => {
  try {
    const { question, userAnswer, correctAnswerKey, legalBasis } = req.body;
    if (!ai) {
      return res.status(503).json({
        error: 'Chưa cấu hình GEMINI_API_KEY trên server.',
      });
    }

    const prompt = `Câu hỏi phản xạ hạn mức/thời gian: "${question}"
Đáp án chuẩn của hệ thống: "${correctAnswerKey}"
Căn cứ pháp lý: "${legalBasis}"
Câu trả lời của người dùng: "${userAnswer}"

Hãy đánh giá xem câu trả lời của người dùng có ĐÚNG với bản chất/con số của quy định pháp luật hay không.
Trả về định dạng JSON:
{
  "isCorrect": boolean,
  "verdictTitle": "✅ Chính xác!" hoặc "❌ Chưa chính xác!",
  "feedback": "Nhận xét ngắn gọn, chỉ ra con số/mốc thời gian chuẩn xác nhất",
  "legalReference": "Căn cứ pháp lý chính xác (Điều/Khoản/Văn bản)"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Bạn là chuyên gia thẩm định đáp án pháp luật đấu thầu Việt Nam. Đánh giá khách quan, chính xác theo Luật 22/2023/QH15, Luật 57/2024, Nghị định 214/2025, Nghị định 349/2026. Trả về JSON hợp lệ.',
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/flashcard-grade:', error);
    return res.status(500).json({ error: 'Không thể đánh giá câu trả lời flashcard.' });
  }
});

// API endpoint for deep explanation of quiz questions
app.post('/api/explain-question', async (req, res) => {
  try {
    const { question, options, selectedAnswer, correctAnswer, explanation, legalBasis } = req.body;
    if (!ai) {
      return res.status(503).json({
        error: 'Chưa cấu hình GEMINI_API_KEY trên server.',
      });
    }

    const prompt = `Giải thích chuyên sâu câu hỏi ôn thi chứng chỉ nghiệp vụ đấu thầu:
Câu hỏi: ${question}
Các phương án:
${Object.entries(options || {}).map(([key, val]) => `${key}. ${val}`).join('\n')}
Học viên chọn: ${selectedAnswer}
Đáp án đúng: ${correctAnswer}
Giải thích cơ bản: ${explanation}
Căn cứ: ${legalBasis}

Hãy đóng vai Trợ lý ảo Chuyên gia Đấu thầu, phân tích chi tiết tại sao phương án ${correctAnswer} là đúng, bản chất pháp lý đằng sau quy định này là gì, và tại sao các phương án khác lại sai hoặc gây bẫy người thi. Trích dẫn rõ Điều, Khoản văn bản pháp luật hiện hành.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3,
      },
    });

    return res.json({ explanation: response.text });
  } catch (error: any) {
    console.error('Error in /api/explain-question:', error);
    return res.status(500).json({ error: 'Không thể tạo phần giải thích chi tiết.' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    aiConfigured: !!ai,
    laws: ['Luật 22/2023/QH15', 'Luật 57/2024/QH15', 'Luật 90/2025/QH15', 'NĐ 214/2025/NĐ-CP', 'NĐ 349/2026/NĐ-CP', 'TT 79/2025/TT-BTC', 'TT 134/2026/TT-BTC'],
  });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
