import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Define product info for Gemini context
const SYSTEM_INSTRUCTION = `당신은 한글 브랜드명 '나래꽃집 (Narae Florals)'의 친절하고 감성적인 수석 AI 플로리스트 '나래'입니다.
나래꽃집은 싱그러운 봄의 감성을 담은 최고급 디자인 부케와 건강한 반려식물을 선보이는 프리미엄 플라워 아틀리에입니다.

고객의 요청(기념일 축하, 부모님 선물, 기분 전환, 실내 공기 정화, 강아지가 있는 집, 실내 인테리어 등)을 경청하고, 상냥하고 따뜻하며 감성적인 어조(존댓말)로 플로ラル 카운셀링을 제공해 주세요.

상담 시에는 반드시 나래꽃집에서 판매 중인 실제 제품 목록을 매칭하여 추천해 주십시오:
1. 벚꽃 꽃병 세트 (42,000원) - 화사한 핑크빛 벚꽃 가지와 인디핑크 세라믹 화병 포함. 봄 한정 최고 인기이자 베스트셀러.
2. 선샤인 해바라기 다발 (25,000원) - 활기차고 긍정적인 에너지를 주는 싱그러운 옐로우 해바라기 다발. 축하, 연말, 졸업, 응원 선물 추천.
3. 몬스테라 화분 (42,000원) - 넓고 멋스러운 찢어진 잎이 매력적인 실내 반려식물. 공기정화 능력이 우수하며 관리가 매우 쉬워 초보자에게 딱 좋음.
4. 봄날의 튤립 & 데이지 부케 (35,000원) - 수줍고 우아한 튤립과 귀여운 흰색 마트리카리아 데이지가 어우러진 산뜻한 봄 전용 한정판 다발.

답변 작성 규칙:
1. 고객의 상황이나 감정에 진심으로 공감하는 한두 줄의 오프닝 멘트로 시작하세요.
2. 위 나래꽃집 실제 판매 상품 중 1~2개를 콕 집어 구체적인 추천 이유와 가격을 기입하세요.
3. 추천한 꽃/식물에 활력을 불어넣을 수 있는 간결한 관리 수칙이나 연출 팁을 곁들여 주세요.
4. 문장은 가독성 있게 단락을 나누고 이쁜 꽃과 식물 이모지(🌸, 🌷, 🌿, 🌻, 💐)를 적절히 융합하여 기분 좋게 구성하세요.`;

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = 3000;

  // Initialize Gemini Client
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } else {
    console.warn("⚠️ Warning: GEMINI_API_KEY is not set in environment. AI recommendation is operating in simulation mode.");
  }

  // AI Recommendation API Route
  app.post("/api/gemini", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }

      if (!ai) {
        // Fallback simulation if no API Key provided
        const simulatedReplies: Record<string, string> = {
          "벚꽃": "🌸 봄 한정 베스트셀러인 **벚꽃 꽃병 세트 (42,000원)**를 강력하게 권해드립니다! 따뜻한 봄바람과 함께 피어나는 화사한 분위기를 자아냅니다. 세라믹 화병까지 한 패키지로 바로 장식 가능해서 정말 편리하답니다! 물을 매일 맑은 물로 조절해 주는 것이 좋습니다.",
          "추천": "💐 나래꽃집에 오신 것을 환영합니다! 특별한 축하 자리가 있으시다면 싱그러운 노란색이 활기를 더해주는 **선샤인 해바라기 다발 (25,000원)**이나 우아한 **봄날의 튤립 & 데이지 부케 (35,000원)**를 선물해보세요! 공간 분위기가 단숨에 활기차고 밝아질 거예요. 혹시 선물의 구체적인 사연이나 용도를 편하게 귀띔해주시면 더 알맞게 제안드릴게요! 😊",
          "식물": "🌿 실내에 생기를 더해줄 싱그러운 친구로는 **몬스테라 화분 (42,000원)**을 적극 권해드립니다. 잎 모양도 멋스러우며 공기정화 효과도 짱이에요! 반음비나 간접광 아래에서 겉흙이 마르면 물을 듬뿍 주시면 쑥쑥 건강하게 잘 자라요.",
        };
        const query = message.toLowerCase();
        let reply = "꽃과 식물은 지친 심신에 은은한 쉼터를 선물하지요. 🌸 혹시 기르는 공간의 일조량이나 특별한 선물 용도를 상세히 알려주시면 나래 AI 플로리스트가 더욱 잘 어울리는 화사한 상품(벚꽃 꽃병 세트, 해바라기 다발, 몬스테라 화분 등)을 콕 집어 상세히 추천해 드릴게요!";
        
        for (const [key, val] of Object.entries(simulatedReplies)) {
          if (query.includes(key)) {
            reply = val;
            break;
          }
        }
        return res.json({ reply });
      }

      // Prepare conversation contents with prompt design
      const contentsList: any[] = [];
      
      // Inject previous chat history if provided
      if (history && Array.isArray(history)) {
        history.forEach((h: any) => {
          contentsList.push({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.text }]
          });
        });
      }
      
      // Push the active message
      contentsList.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contentsList,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.8,
        }
      });

      const replyStr = response.text || "죄송합니다, 잠시 답변을 준비하는 중에 향긋한 꽃향기에 취해 지연이 발생했네요. 무엇을 도와드릴까요?";
      return res.json({ reply: replyStr });

    } catch (err: any) {
      console.error("Gemini Error:", err);
      return res.status(500).json({ error: err.message || "An error occurred with Gemini." });
    }
  });

  // Health check API
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Narae Florals Server is healthy" });
  });

  // Vite development vs production serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite middleware mounted in development mode.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🌸 Narae Florals server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
