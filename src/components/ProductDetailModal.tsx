import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Star, Plus, Minus, ShoppingBag, Check, 
  HelpCircle, ChevronDown, ChevronUp, Droplet, 
  Scissors, Sun, Thermometer, Wind, Info 
} from "lucide-react";
import { Product, MOCK_REVIEWS, MOCK_QNAS } from "../types";

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

// Icon helper to safely resolve Lucide icons dynamically from text names
const LucideIconResolver = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "Droplet":
      return <Droplet className={className} />;
    case "Scissors":
      return <Scissors className={className} />;
    case "SunOff":
      return <Sun className={className} />;
    case "Sun":
      return <Sun className={className} />;
    case "Thermometer":
      return <Thermometer className={className} />;
    case "Wind":
      return <Wind className={className} />;
    default:
      return <Info className={className} />;
  }
};

export default function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"care" | "reviews" | "qna">("care");
  const [selectedImage, setSelectedImage] = useState(product.mainImage);
  const [quantity, setQuantity] = useState(1);
  const [expandedQna, setExpandedQna] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  // Filter reviews corresponding to this product, or show general reviews as fallback
  const productReviews = MOCK_REVIEWS; 

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(price);
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="product-detail-modal">
      {/* Background Overlay */}
      <div 
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-neutral-100 max-h-[90vh] md:max-h-[85vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-25 p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image Centerpiece */}
          <div className="w-full md:w-1/2 p-6 bg-neutral-50 flex flex-col justify-between border-r border-neutral-100 overflow-y-auto">
            <div className="flex-grow flex flex-col justify-center items-center">
              <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-sm bg-white border border-neutral-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    src={selectedImage}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* Thumbnails list */}
              <div className="flex gap-2.5 mt-4 overflow-x-auto w-full py-1">
                {product.thumbnails.map((thumb) => (
                  <button
                    key={thumb}
                    onClick={() => setSelectedImage(thumb)}
                    className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === thumb ? "border-amber-800 scale-102" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={thumb} alt="thumb" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Price section in mobile / footer of left col */}
            <div className="mt-6 pt-4 border-t border-dashed border-neutral-200 hidden md:block">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400 block font-mono">Total Standard Price</span>
                  <span className="text-2xl font-serif font-black text-amber-950 font-mono">
                    {formatPrice(product.price)}
                  </span>
                </div>
                
                <span className="text-xs bg-amber-50 text-amber-900 px-3 py-1 rounded-full font-medium font-serif">
                  당일 최고품질 플라워 수급
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Descriptions, Tab controls, cart */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Product Category info */}
              <div className="text-xs font-mono text-amber-800 tracking-wider font-semibold uppercase mb-1">
                {product.categoryLabel}
              </div>

              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900 tracking-tight mb-2">
                {product.name}
              </h2>

              {/* Rating and review simple count */}
              <div className="flex items-center gap-1.5 mb-4">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "fill-amber-500" : "text-neutral-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-neutral-800 font-mono">{product.rating}</span>
                <span className="text-neutral-300 text-xs">•</span>
                <span className="text-xs text-neutral-500 underline font-mono">리뷰 {product.reviewsCount}개</span>
              </div>

              {/* Description Paragraph */}
              <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                {product.longDescription || product.description}
              </p>

              {/* Interactive Tabs Menu */}
              <div className="flex border-b border-neutral-100 mb-5 text-sm gap-4">
                <button
                  onClick={() => setActiveTab("care")}
                  className={`pb-2.5 font-medium border-b-2 transition-all cursor-pointer ${
                    activeTab === "care" 
                      ? "text-amber-950 border-amber-800 font-bold" 
                      : "text-neutral-400 border-transparent hover:text-neutral-600"
                  }`}
                >
                  돌봄 가이드
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-2.5 font-medium border-b-2 transition-all cursor-pointer ${
                    activeTab === "reviews" 
                      ? "text-amber-950 border-amber-800 font-bold" 
                      : "text-neutral-400 border-transparent hover:text-neutral-600"
                  }`}
                >
                  고객 후기 ({productReviews.length})
                </button>
                <button
                  onClick={() => setActiveTab("qna")}
                  className={`pb-2.5 font-medium border-b-2 transition-all cursor-pointer ${
                    activeTab === "qna" 
                      ? "text-amber-950 border-amber-800 font-bold" 
                      : "text-neutral-400 border-transparent hover:text-neutral-600"
                  }`}
                >
                  Q&A ({MOCK_QNAS.length})
                </button>
              </div>

              {/* Tab contents panel */}
              <div className="min-h-[160px] max-h-[250px] overflow-y-auto pr-1 mb-6">
                
                {/* 1. Care Guide Tab */}
                {activeTab === "care" && (
                  <div className="space-y-3.5 animate-fade-in">
                    {product.careGuide.map((step, idx) => (
                      <div key={idx} className="flex gap-3 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                        <div className="text-amber-800 p-2 bg-amber-50 rounded-lg shrink-0 h-fit">
                          <LucideIconResolver name={step.icon} className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                            {step.title}
                            {step.engTitle && (
                              <span className="text-[10px] text-neutral-400 font-mono font-normal">
                                {step.engTitle}
                              </span>
                            )}
                          </h4>
                          <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 2. Reviews Tab */}
                {activeTab === "reviews" && (
                  <div className="space-y-3 animate-fade-in">
                    {productReviews.map((review) => (
                      <div key={review.id} className="border-b border-neutral-50 pb-3 last:border-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-medium text-xs text-neutral-800">{review.author}</span>
                          <span className="text-[10px] text-neutral-400 font-mono">{review.date}</span>
                        </div>
                        <div className="flex text-amber-400 gap-0.5 mb-1.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating ? "fill-amber-400 text-amber-400" : "text-neutral-100"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. Q&A Tab */}
                {activeTab === "qna" && (
                  <div className="space-y-2.5 animate-fade-in">
                    {MOCK_QNAS.map((qna) => {
                      const isExpanded = expandedQna === qna.id;
                      return (
                        <div 
                          key={qna.id} 
                          className="border border-neutral-100 rounded-xl overflow-hidden text-xs bg-neutral-50"
                        >
                          <button
                            onClick={() => setExpandedQna(isExpanded ? null : qna.id)}
                            className="w-full text-left p-3 flex justify-between items-center font-medium text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
                          >
                            <span className="pr-4 line-clamp-1">{qna.question}</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                          
                          {isExpanded && (
                            <div className="p-3 bg-white border-t border-neutral-100 text-neutral-600 leading-relaxed font-sans">
                              <p className="font-bold text-amber-800 text-[10px] uppercase mb-1">나래꽃집 답변:</p>
                              {qna.answer ? qna.answer : "해당 문의사항에 대해 플로리스트가 답변을 검토 중입니다."}
                              <div className="text-[9px] text-neutral-400 text-right mt-1.5 font-mono">
                                작성일: {qna.date}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            </div>

            {/* Cart Controller Section bottom */}
            <div className="pt-4 border-t border-neutral-150">
              <div className="flex items-center gap-3">
                {/* Quantity adjuster */}
                <div className="flex items-center border border-neutral-250 rounded-xl p-1 bg-neutral-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-200 transition-all cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-mono font-bold text-neutral-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-200 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add standard buy button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-amber-900 hover:bg-amber-950 text-white font-medium py-3 px-6 rounded-xl transition-all cursor-pointer shadow-sm text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  장바구니 담기
                </button>
              </div>

              {/* Success Notification message */}
              <AnimatePresence>
                {successMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="mt-3 flex items-center gap-2 justify-center text-xs text-emerald-800 bg-emerald-50 py-2 rounded-xl"
                  >
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>장바구니에 {quantity}개 추가해 두었어요!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
