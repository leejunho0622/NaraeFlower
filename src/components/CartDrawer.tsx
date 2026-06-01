import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, Trash2, Gift, Check, ShoppingBag, AlertCircle } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  cart,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Checkout sequence state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [orderId, setOrderId] = useState("");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(price);
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const shippingThreshold = 30000;
  const shippingFee = subtotal - discountAmount >= shippingThreshold || subtotal === 0 ? 0 : 3000;
  const grandTotal = subtotal - discountAmount + shippingFee;

  const handleApplyCoupon = () => {
    const cleaned = coupon.trim().toUpperCase();
    if (cleaned === "SPRING10") {
      setDiscountPercent(10);
      setAppliedCoupon("SPRING10");
      setErrorMessage("");
    } else if (cleaned === "WELCOME5") {
      setDiscountPercent(5);
      setAppliedCoupon("WELCOME5");
      setErrorMessage("");
    } else {
      setErrorMessage("유효하지 않은 쿠폰입니다. (SPRING10 을 입력해 보세요!)");
      setTimeout(() => setErrorMessage(""), 3000);
    }
    setCoupon("");
  };

  const handleCheckoutSubmit = () => {
    setIsCheckingOut(true);
    
    // Simulate real florist order reservation
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsCheckedOut(true);
      setOrderId("NR-" + Math.floor(100000 + Math.random() * 900000));
    }, 2000);
  };

  const handleResetCheckout = () => {
    onClearCart();
    setDiscountPercent(0);
    setAppliedCoupon(null);
    setIsCheckedOut(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-overlay">
          {/* Backdrop screen */}
          <div 
            className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs transition-opacity" 
            onClick={onClose}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-900" />
                  <h3 className="font-serif text-lg font-bold text-neutral-900">꽃장바구니</h3>
                  <span className="bg-amber-900 text-amber-50 rounded-full font-mono text-xs w-5 h-5 flex items-center justify-center font-bold">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-950 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Checkout success segment */}
              {isCheckedOut ? (
                <div className="flex-1 p-6 overflow-y-auto flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-amber-50 text-amber-900 rounded-full flex items-center justify-center mb-5 shadow-inner">
                    <Check className="w-8 h-8" />
                  </div>
                  
                  <h4 className="font-serif text-2xl font-semibold text-neutral-900 mb-2">
                    향긋한 주문이 예약되었습니다!
                  </h4>
                  
                  <p className="text-xs text-neutral-500 leading-relaxed max-w-xs mb-6">
                    나래꽃집 전문 특송 차량이 봄을 담은 신선도를 완벽하게 유지하여 귀하의 집 앞까지 안전하고 정성 가득 배송해 드리겠습니다.
                  </p>

                  {/* Summary card */}
                  <div className="w-full bg-neutral-50 rounded-2xl p-5 border border-neutral-100 text-left text-xs space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">주문 접수 번호:</span>
                      <span className="font-mono font-bold text-neutral-800">{orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">진행 유형:</span>
                      <span className="font-bold text-amber-800">당일 한정판 화담 포장 세트</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-dashed border-neutral-200">
                      <span className="text-neutral-500 font-bold">결제 최종액:</span>
                      <span className="font-mono font-bold text-base text-neutral-900">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleResetCheckout}
                    className="w-full bg-amber-900 hover:bg-amber-950 text-white font-medium py-3 rounded-xl transition-all cursor-pointer text-sm shadow-sm"
                  >
                    쇼핑 계속하기
                  </button>
                </div>
              ) : isCheckingOut ? (
                /* Checkout progress circle loader */
                <div className="flex-1 p-6 overflow-y-auto flex flex-col items-center justify-center text-center">
                  <div className="relative w-12 h-12 mb-5">
                    <div className="w-12 h-12 border-4 border-amber-50 border-t-amber-800 rounded-full animate-spin" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-neutral-800 mb-1">
                    플라워 보관함 정돈 중...
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-xs">
                    최고 상태의 생화를 수급 조율하고 당일 포장 리본을 준비하기 위한 임시 가맹 승인 단계입니다.
                  </p>
                </div>
              ) : cart.length === 0 ? (
                /* Empty Cart block */
                <div className="flex-1 p-6 overflow-y-auto flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-300 mb-4">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-neutral-700 mb-1">
                    장바구니가 비어 있습니다.
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
                    나래꽃집의 화사하고 생동감 터지는 시즌 벚꽃 꽃병이나 산뜻한 튤립 다발을 담아 보세요!
                  </p>
                </div>
              ) : (
                /* Active items log list */
                <>
                  <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {cart.map((item) => (
                      <div 
                        key={item.product.id}
                        className="flex gap-4 border-b border-neutral-50 pb-4 last:border-none"
                      >
                        <img 
                          src={item.product.mainImage} 
                          alt={item.product.name} 
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 object-cover rounded-xl shrink-0 border border-neutral-100 bg-neutral-50"
                        />

                        {/* Adjust quantities */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-neutral-800 truncate leading-snug">
                              {item.product.name}
                            </h4>
                            <p className="text-[10px] text-amber-900 font-semibold uppercase font-mono mt-0.5">
                              {item.product.categoryLabel}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            {/* adjuster bar */}
                            <div className="flex items-center border border-neutral-200 rounded-lg p-0.5 bg-neutral-50">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                className="p-1 hover:bg-neutral-100 text-neutral-500 rounded-md transition-all cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-[11px] font-bold font-mono">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 hover:bg-neutral-100 text-neutral-500 rounded-md transition-all cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Price * qly */}
                            <span className="text-[11px] font-mono font-bold text-neutral-700">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>

                        {/* Trash trigger */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-neutral-300 hover:text-red-500 p-1 rounded-lg shrink-0 transition-colors self-start cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    ))}
                  </div>

                  {/* Summary / Controls */}
                  <div className="border-t border-neutral-100 bg-neutral-50/60 p-5 space-y-4 shrink-0">
                    
                    {/* Coupon Bar */}
                    <div className="space-y-1.5">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          placeholder="쿠폰 코드 (예: SPRING10)"
                          className="flex-1 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-amber-800 placeholder-neutral-400"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          className="bg-neutral-800 hover:bg-neutral-900 text-white text-xs px-3.5 py-2.0 rounded-lg transition-colors cursor-pointer"
                        >
                          적용
                        </button>
                      </div>

                      {/* Coupon response state */}
                      <AnimatePresence>
                        {appliedCoupon && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-[10px] text-emerald-800 flex items-center gap-1.5 font-bold"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>쿠폰 코드 ({appliedCoupon})로 {discountPercent}% 할인이 조율되었습니다!</span>
                          </motion.div>
                        )}
                        {errorMessage && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-[10px] text-red-600 flex items-center gap-1.5"
                          >
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{errorMessage}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Summary list math calculations */}
                    <div className="text-xs space-y-2 border-t border-neutral-100 pt-3">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">주문 소계</span>
                        <span className="font-mono text-neutral-800">{formatPrice(subtotal)}</span>
                      </div>
                      
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-800">
                          <span>쿠폰 할인 ({discountPercent}%)</span>
                          <span className="font-mono font-bold">-{formatPrice(discountAmount)}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span className="text-neutral-500 flex items-center gap-1">
                          기본 배송비
                          <span className="group relative cursor-help text-neutral-350">
                            <AlertCircle className="w-3.5 h-3.5 inline" />
                            <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-[9px] p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity w-40 z-20 font-sans tracking-tight">
                              30,000원 이상 주문 시 무료배송 (미만 시 3,000원 배송료 부과)
                            </span>
                          </span>
                        </span>
                        <span className="font-mono text-neutral-800">
                          {shippingFee === 0 ? "무료배송" : formatPrice(shippingFee)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-sm pt-2.5 border-t border-dashed border-neutral-200">
                        <span className="font-serif font-bold text-neutral-900">최종 청구 금액</span>
                        <span className="font-mono font-black text-amber-950 text-base">
                          {formatPrice(grandTotal)}
                        </span>
                      </div>
                    </div>

                    {/* Submit Checkout reservation */}
                    <button
                      onClick={handleCheckoutSubmit}
                      className="w-full bg-amber-900 hover:bg-amber-950 text-white font-medium py-3 rounded-xl transition-all cursor-pointer text-sm shadow-sm flex items-center justify-center gap-2"
                    >
                      <Gift className="w-4 h-4" />
                      예약 및 주문하기
                    </button>
                  </div>
                </>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
