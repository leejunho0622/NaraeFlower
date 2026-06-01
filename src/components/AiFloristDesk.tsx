import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, MessageSquare, X, RefreshCw, ShoppingBag, ArrowRight } from "lucide-react";
import { Product, PRODUCTS } from "../types";

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
}

interface AiFloristDeskProps {
  onOpenProductDetail: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function AiFloristDesk({ onOpenProductDetail, onAddToCart, isOpen, onClose }: AiFloristDeskProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "model",
      text: "안녕하세요! 나래꽃집의 수석 AI 플로리스트 **나래**입니다. 🌸\n오늘 어떤 특별한 날을 계획 중이신가요? 혹은 머무시는 소중한 공간에 화사한 생기를 불어넣고 싶으신가요? 자유롭게 말씀 주시면 어울리는 향긋한 꽃과 반려식물을 추천해 드릴게요! 😉"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Quick prompt presets
  const PRESET_PROMPTS = [
    { label: "결혼기념일 양가 부모님 선물 💐", query: "부모님 결혼기념일에 드릴 화사하고 고급스러운 꽃다발 추천해줘" },
    { label: "초보자가 키우기 쉬운 공기정화 식물 🌿", query: "자취방 초보자가 정성들여 키우기 쉬운 공기정화 반려식물 알고싶어" },
    { label: "봄 한정 벚꽃 꽃병 세트 문의 🌸", query: "벚꽃 꽃병 세트는 어떻게 관리하고 어떤 구성인지 상세히 알려주라" },
    { label: "인테리어 포인트용 데이지 부케 🌷", query: "거실 테이블에 화사하게 분위기 낼 수 있는 산뜻한 튤립 데이지 다발 추천이유 알려줘" }
  ];

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text: text
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    try {
      // Map existing messages into required api format ({ role, text })
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error("서버와의 통신에 장애가 발생했습니다.");
      }

      const data = await res.json();
      const modelMsg: Message = {
        id: `m-${Date.now()}`,
        role: "model",
        text: data.reply
      };
      setMessages((prev) => [...prev, modelMsg]);

    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "model",
          text: "☕ 죄송합니다. 꽃 상자를 정돈하는 중에 일시적인 서버 통신 응답 지연이 발행했어요. 잠시 후 다시 상냥히 답변 드릴게요!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Detect which products from the library are mentioned in Na-rae's response text
  const detectProducts = (text: string): Product[] => {
    const results: Product[] = [];
    const lowerText = text.toLowerCase();
    
    PRODUCTS.forEach((product) => {
      // Look for nicknames or partial product names
      if (
        lowerText.includes(product.name.toLowerCase()) ||
        lowerText.includes(product.id.split("-")[0]) ||
        (product.id === "cherry-blossom" && lowerText.includes("벚꽃")) ||
        (product.id === "sunflower" && lowerText.includes("해바라기")) ||
        (product.id === "monstera" && lowerText.includes("몬스테라")) ||
        (product.id === "tulip-daisy" && lowerText.includes("튤립"))
      ) {
        results.push(product);
      }
    });
    return results;
  };

  // Basic custom renderer to style simple markdown elements like bolding (**) in Na-rae's speech
  const renderMessageText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-extrabold text-amber-950 bg-amber-50 px-1 rounded-sm">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", duration: 0.4 }}
          id="ai-florist-panel"
          className="fixed bottom-6 right-6 z-40 w-full sm:w-[420px] h-[550px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-100 flex flex-col justify-between"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-amber-900 to-amber-950 p-4 shrink-0 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/10 rounded-full">
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              </div>
              <div>
                <h3 className="font-serif text-[15px] font-semibold flex items-center gap-1">
                  나래 AI 플로리스트 데스크
                </h3>
                <p className="text-[10px] text-amber-200/90 font-mono tracking-tight flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Na-rae • Premium AI Florist
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 text-amber-200 hover:text-white rounded-full transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Log */}
          <div 
            ref={scrollRef} 
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50/70"
          >
            {messages.map((msg) => {
              const isModel = msg.role === "model";
              const detected = isModel ? detectProducts(msg.text) : [];

              return (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${isModel ? "items-start" : "items-end"}`}
                >
                  <div className={`text-[10px] text-neutral-400 mb-1 font-mono px-1`}>
                    {isModel ? "나래 AI 플로리스트" : "나"}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs font-sans leading-relaxed shadow-xs ${
                      isModel
                        ? "bg-white text-neutral-800 rounded-tl-none border border-neutral-100"
                        : "bg-amber-900 text-amber-50 rounded-tr-none"
                    }`}
                  >
                    <div className="whitespace-pre-line">
                      {renderMessageText(msg.text)}
                    </div>
                  </div>

                  {/* Direct Product recommendation cards bridging into the shop! */}
                  {detected.length > 0 && (
                    <div className="mt-2.5 w-full max-w-[85%] space-y-2 animate-fade-in">
                      <div className="text-[10px] text-amber-900 font-bold px-1 flex items-center gap-1">
                        <ShoppingBag className="w-3 h-3" />
                        상담 추천 상품 링크:
                      </div>
                      
                      {detected.map((p) => (
                        <div 
                          key={p.id}
                          className="bg-white border border-amber-900/10 hover:border-amber-900/30 rounded-xl p-2.5 flex items-center justify-between gap-3 shadow-xs transition-colors"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <img 
                              src={p.mainImage} 
                              alt={p.name} 
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 object-cover rounded-lg shrink-0 border border-neutral-100 bg-neutral-50"
                            />
                            <div className="overflow-hidden">
                              <h4 className="text-[11px] font-bold text-neutral-900 truncate">
                                {p.name}
                              </h4>
                              <p className="text-[10px] text-amber-950 font-mono">
                                {new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(p.price)}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-1">
                            <button
                              onClick={() => onOpenProductDetail(p)}
                              className="text-[9px] bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-2 py-1.5 rounded-md font-medium shrink-0 flex items-center gap-0.5 cursor-pointer"
                            >
                              상세보기
                              <ArrowRight className="w-2.5 h-2.5" />
                            </button>
                            <button
                              onClick={() => onAddToCart(p)}
                              className="text-[9px] bg-amber-800 hover:bg-amber-900 text-white px-2 py-1.5 rounded-md font-medium shrink-0 cursor-pointer"
                            >
                              담기
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Pulsing Loading message */}
            {loading && (
              <div className="flex flex-col items-start">
                <div className="text-[10px] text-neutral-400 mb-1 font-mono px-1">나래 AI 플로리스트</div>
                <div className="bg-white border border-neutral-100 rounded-2xl rounded-tl-none p-3.5 shadow-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-amber-800 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-amber-800 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-amber-800 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    <span className="text-[11px] text-neutral-400 font-medium ml-1">나래꽃향기를 맡으며 생각을 정돈하는 중...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick presets hotkeys section */}
          {messages.length === 1 && !loading && (
            <div className="px-4 py-2 border-t border-neutral-100 bg-amber-50/40 shrink-0">
              <div className="text-[10px] font-bold text-amber-900 mb-1.5 uppercase tracking-wide">
                바쁘신 분들을 위한 대표 질문들:
              </div>
              <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                {PRESET_PROMPTS.map((prs, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(prs.query)}
                    className="w-full text-left bg-white hover:bg-amber-50 hover:border-amber-900/30 text-neutral-700 hover:text-amber-950 font-sans text-xs p-2 rounded-xl border border-neutral-200/60 transition-colors shadow-xs cursor-pointer truncate"
                  >
                    💡 {prs.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Keyboard text panel */}
          <div className="p-3 border-t border-neutral-100 bg-white shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="어울리는 꽃이나 궁금한 점을 물어보세요..."
                disabled={loading}
                className="flex-1 bg-neutral-100 border-0 focus:ring-1 focus:ring-amber-800 rounded-xl px-3.5 py-2.5 text-xs outline-none text-neutral-800 placeholder-neutral-400"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || loading}
                className="p-2.5 bg-amber-900 hover:bg-amber-950 disabled:bg-neutral-200 text-white rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
