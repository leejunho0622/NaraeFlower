import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ShoppingBag, Sparkles, MessageSquare, Phone, MapPin, 
  Clock, Heart, Star, Gift, ShieldCheck, Truck, ChevronRight 
} from "lucide-react";
import { PRODUCTS, Product, CartItem } from "./types";
import ProductCard from "./components/ProductCard";
import ProductDetailModal from "./components/ProductDetailModal";
import AiFloristDesk from "./components/AiFloristDesk";
import CartDrawer from "./components/CartDrawer";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Interface panel triggers
  const [cartOpen, setCartOpen] = useState(false);
  const [aiDeskOpen, setAiDeskOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "spring" | "plants" | "gifts">("all");

  // Filtered outcomes
  const filteredProducts = PRODUCTS.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-neutral-50/50 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-950">
      
      {/* 1. Global Announcement Ribbon */}
      <div className="bg-amber-950 text-amber-100 text-center py-2 px-4 text-xs font-medium tracking-tight whitespace-nowrap overflow-hidden text-ellipsis flex items-center justify-center gap-1.5 shrink-0 z-40 relative">
        <span className="inline-block w-2- h-2 bg-rose-400 rounded-full animate-ping mr-1" />
        🌸 나래 봄 특별 기획전 - 전 상품 당일 수급 최고급 생화 패키징 & 3만원 이상 주문 시 무료배송! (쿠폰 코드: <span className="font-mono font-bold underline">SPRING10</span>)
      </div>

      {/* 2. Top Navigation header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-floral border-b border-neutral-100 shadow-xs px-4 sm:px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Brand identity logo */}
        <div className="flex items-center gap-1.5 select-none cursor-pointer" onClick={() => setActiveFilter("all")}>
          <span className="font-serif italic font-bold text-xl sm:text-2xl tracking-tight text-amber-950">
            나래꽃집
          </span>
          <span className="text-[10px] sm:text-xs font-serif text-neutral-400 font-light border-l border-neutral-200 pl-2 leading-none uppercase tracking-widest hidden sm:inline">
            Narae Florals
          </span>
        </div>

        {/* Global Shop Actions panel */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          
          {/* AI Florist button trigger */}
          <button
            onClick={() => setAiDeskOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-900 to-amber-950 hover:from-amber-950 hover:to-neutral-900 text-white font-medium py-2 px-3.5 sm:px-4 rounded-full text-xs sm:text-sm shadow-sm transition-all cursor-pointer relative group"
          >
            <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-300 group-hover:scale-110 transition-transform" />
            <span className="hidden xs:inline">AI 플로리스트 상담</span>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
          </button>

          {/* Cart triggers with item count overlay */}
          <button
            onClick={() => setCartOpen(true)}
            className="p-2.5 text-neutral-700 hover:text-amber-950 bg-neutral-100 hover:bg-amber-50 rounded-full transition-all relative border border-neutral-200/40 cursor-pointer"
            id="cart-trigger"
          >
            <ShoppingBag className="w-4 sm:w-5 h-4 sm:h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-950 text-white rounded-full font-mono text-[9px] font-bold w-4.5 h-4.5 flex items-center justify-center shadow-md animate-fade-in">
                {totalCartCount}
              </span>
            )}
          </button>

        </div>
      </header>

      {/* 3. Main storefront workspace area */}
      <main className="flex-grow">
        
        {/* Poetic Editorial Hero Area */}
        <section className="px-4 sm:px-6 md:px-12 py-10 sm:py-16 bg-gradient-to-b from-amber-50/40 to-transparent">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* Poetic description texts */}
            <div className="space-y-5 sm:space-y-7 pr-0 md:pr-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-900/10 rounded-full text-[11px] font-semibold text-amber-900 font-serif">
                <Gift className="w-3.5 h-3.5 text-amber-800" />
                Premium Floral Atelier
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-[1.12] text-neutral-950 tracking-tight font-serif">
                봄을 피우는 마음,<br />
                <span className="italic font-normal text-amber-900">나래꽃집</span>에서
              </h1>

              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-lg font-sans">
                나래꽃집(Narae Florals)은 매일 아침 양재 화훼공판장에서 공수되는 엄선된 특상등급 포동포동 생화만을 다룹니다. 계절의 온도를 머금은 싱그러운 벚꽃 세트부터, 집 안 구석 공기를 맑고 상쾌하게 살려줄 반려 몬스테라 화분까지, 마음을 잇는 플로럴 큐레이션을 경험해 보세요.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById("store-products-section");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-amber-900 hover:bg-amber-950 text-white font-medium py-3 px-6 rounded-xl transition-all shadow-sm text-xs sm:text-sm cursor-pointer"
                >
                  기획전 꽃 구경하기
                </button>
                <button
                  onClick={() => setAiDeskOpen(true)}
                  className="bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 font-medium py-3 px-5 rounded-xl transition-all text-xs sm:text-sm cursor-pointer flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-amber-800" />
                  AI 플로리스트와 이야기하기
                </button>
              </div>
            </div>

            {/* Curated Floral Hotlink Image card */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/50 group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3puRhcg0oAsiaDEHZQoPnsvhw3r223s96ZU2kwd36bhxPrafKFmLIQ_sAKRb1EC51IwgxKRj29sRbmopWWGlYzfTXQBHxAnyxaaC7PO7TnRhXzQ3MbQcihVJtYf1Kl3oc0VhXib5HSP58ZL6JC0lOmnGX9QgHwfEU1zLn8uWXNKhB-3wrgR_zsYnrH8MtYKTpxTkXWQVCP76w-3Usjii9Bb18MQ7M9WLguuNG0l0NS37pQOjq1xMmve7bLLD62GL_4xZPfpuMKw"
                alt="Beautiful Spring Florals Atelier"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-102 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent flex items-end p-6 sm:p-8">
                <div className="text-white">
                  <p className="text-[10px] font-mono tracking-widest text-amber-300 uppercase mb-1">Seasonal Collection</p>
                  <h4 className="font-serif text-lg sm:text-xl font-bold">봄날의 품격과 오감 큐레이션</h4>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Product section area with filtering */}
        <section 
          id="store-products-section" 
          className="px-4 sm:px-6 md:px-12 py-12 max-w-7xl mx-auto scroll-mt-24"
        >
          {/* Header titles */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-neutral-900 tracking-tight">
              봄을 수놓은 시그니처 큐레이션
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
              당일 최고의 컨디션으로 화담된 수공예 시그니처 다발과 반려 식물을 한 눈에 만나보세요.
            </p>
          </div>

          {/* Filtering Tab lists */}
          <div className="flex justify-center flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 text-xs sm:text-sm rounded-full transition-all cursor-pointer font-medium border ${
                activeFilter === "all"
                  ? "bg-amber-950 text-white border-amber-950 shadow-sm"
                  : "bg-white text-neutral-600 border-neutral-200 hover:text-neutral-800 hover:bg-neutral-50"
              }`}
            >
              전체보기
            </button>
            <button
              onClick={() => setActiveFilter("spring")}
              className={`px-4 py-2 text-xs sm:text-sm rounded-full transition-all cursor-pointer font-medium border ${
                activeFilter === "spring"
                  ? "bg-amber-950 text-white border-amber-950 shadow-sm"
                  : "bg-white text-neutral-600 border-neutral-200 hover:text-neutral-800 hover:bg-neutral-50"
              }`}
            >
              🌸 봄꽃 부케
            </button>
            <button
              onClick={() => setActiveFilter("plants")}
              className={`px-4 py-2 text-xs sm:text-sm rounded-full transition-all cursor-pointer font-medium border ${
                activeFilter === "plants"
                  ? "bg-amber-950 text-white border-amber-950 shadow-sm"
                  : "bg-white text-neutral-600 border-neutral-200 hover:text-neutral-800 hover:bg-neutral-50"
              }`}
            >
              🌿 반려 식물
            </button>
            <button
              onClick={() => setActiveFilter("gifts")}
              className={`px-4 py-2 text-xs sm:text-sm rounded-full transition-all cursor-pointer font-medium border ${
                activeFilter === "gifts"
                  ? "bg-amber-950 text-white border-amber-950 shadow-sm"
                  : "bg-white text-neutral-600 border-neutral-200 hover:text-neutral-800 hover:bg-neutral-50"
              }`}
            >
              🎁 특별 선물전
            </button>
          </div>

          {/* Product grid displaying actual cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onOpenDetail={(prod) => setSelectedProduct(prod)}
                onAddToCart={(prod) => handleAddToCart(prod, 1)}
              />
            ))}
          </div>
        </section>

        {/* 5. Store Key Merits (Brand values block) */}
        <section className="bg-neutral-100/60 py-12 px-4 sm:px-6 md:px-12 mt-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="p-3 bg-amber-50 rounded-xl text-amber-900 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-neutral-900">당일 양재공판장 특상의 최고선도 생화</h4>
                <p className="text-xs text-neutral-400 leading-relaxed mt-1">
                  중간 유통 단계를 생략하고 매일 이른 새벽 수급된 신선생화로 주문 즉시 전문 플로리스트가 디자인을 시작합니다.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="p-3 bg-amber-50 rounded-xl text-amber-900 shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-neutral-900">플라워 밴 전용 안심 콜드체인 특송</h4>
                <p className="text-xs text-neutral-400 leading-relaxed mt-1">
                  일반 택배 화물이 아닙니다. 전문 운전사가 수분막 처리된 전용 박스를 꽃 흔들림 없이 귀댁의 현관 앞으로 안전히 옮겨드립니다.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="p-3 bg-amber-50 rounded-xl text-amber-900 shrink-0">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-neutral-900">맞춤 메시지 및 수제 레터링 엽서 카드</h4>
                <p className="text-xs text-neutral-400 leading-relaxed mt-1">
                  소중한 분께 감사를 담아 전할 수 있도록 실크 파운드 고급 봉투와 친필 대필 엽서 카드 리본 옵션을 무료로 가공해 드립니다.
                </p>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* 6. Contact and Footer Details */}
      <footer className="bg-neutral-900 text-neutral-400 py-12 px-4 sm:px-6 md:px-12 text-xs border-t border-neutral-850 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
          
          {/* Brand info */}
          <div className="space-y-4 max-w-sm">
            <h3 className="font-serif italic font-bold text-lg text-white">나래꽃집 (Narae Florals)</h3>
            <p className="leading-relaxed text-[11px] text-neutral-500">
              봄을 가슴과 일상의 공간 속에 꽃병 하나로 소박하게 담아낼 수 있도록, 나래가 신선하고 화사하게 전하고 연출해 드립니다.
            </p>
            <div className="space-y-1.5 font-sans">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-500" />
                <span>대표 고객지원 센터: 1588-0000</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                <span>서울시 서초구 꽃마을로 나래빌딩 1층 나래꽃집</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                <span>매일 09:00 - 20:00 (명절 당일 휴무)</span>
              </div>
            </div>
          </div>

          {/* Quick links & regulatory info */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div>
              <h4 className="text-white font-serif uppercase tracking-wider mb-3 flex items-center font-bold">고객 안전 서비스</h4>
              <ul className="space-y-1.5 whitespace-nowrap text-neutral-550 text-[11px]">
                <li>• 안심 수분 유통 가이드</li>
                <li>• 100% 안심 교환/반품 보증</li>
                <li>• 기업 단체 플라워 화단 대여</li>
                <li>• 플로리스트 자격증 원데이클래스</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-serif uppercase tracking-wider mb-3 flex items-center font-bold">운영 법인 안내</h4>
              <p className="leading-relaxed text-[11px] text-neutral-500 space-y-1">
                상호명: (주)나래플라워 컴퍼니 | 대표이사: 나래꽃<br />
                사업자등록번호: 220-45-77890<br />
                통신판매업 신고 제 2026-서울서초-1102호<br />
                개인정보 보호 책임자: 플로리스트 나래
              </p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-neutral-800 mt-10 pt-6 text-[10px] text-neutral-600 flex justify-between items-center">
          <span>© 2026 Narae Florals (나래꽃집) Co. All Rights Reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-amber-500 cursor-pointer">이용약관</span>
            <span className="hover:text-amber-500 cursor-pointer">개인정보처리방침</span>
          </div>
        </div>
      </footer>

      {/* 7. Extra Overlays & Modals */}
      
      {/* A. Product detail view modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(prod, qty) => handleAddToCart(prod, qty)}
        />
      )}

      {/* B. Cart sidebar drawer */}
      <CartDrawer
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* C. Interactive Gemini AI Florist Desk chatbot */}
      <AiFloristDesk
        isOpen={aiDeskOpen}
        onClose={() => setAiDeskOpen(false)}
        onOpenProductDetail={(prod) => {
          setAiDeskOpen(false);   // Close AI panel first
          setSelectedProduct(prod); // Toggle detail view
        }}
        onAddToCart={(prod) => handleAddToCart(prod, 1)}
      />

      {/* Floating Sparkly bubble to open AI Chat Desk if it's currently hidden */}
      {!aiDeskOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => setAiDeskOpen(true)}
          className="fixed bottom-6 right-6 z-30 p-4 bg-gradient-to-r from-amber-900 to-amber-950 text-white rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center justify-center cursor-pointer group"
          id="ai-floating-trigger"
          title="나래 AI 플로리스트 상담원 열기"
        >
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse group-hover:rotate-12 transition-transform" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-40 transition-all duration-300 ease-out whitespace-nowrap text-xs font-semibold pl-0 group-hover:pl-2">
            AI 플로리스트 상담
          </span>
        </motion.button>
      )}

    </div>
  );
}
