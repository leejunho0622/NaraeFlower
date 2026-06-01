import React from "react";
import { motion } from "motion/react";
import { Star, ShoppingBag, Eye, Plus } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  key?: string;
  product: Product;
  onOpenDetail: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onOpenDetail, onAddToCart }: ProductCardProps) {
  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(price);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      id={`product-card-${product.id}`}
      className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
    >
      {/* Product Image & Tags */}
      <div className="relative group overflow-hidden aspect-[4/3] bg-neutral-50">
        <img
          src={product.mainImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Dynamic Tag Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.tags.map((tag, idx) => (
            <span
              key={tag}
              className={`px-2.5 py-0.5 text-[10px] font-mono tracking-wider uppercase rounded-full text-white font-medium
                ${idx === 0 ? "bg-amber-800 text-amber-50" : "bg-neutral-800/85"}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hover Quick Action Panel */}
        <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={() => onOpenDetail(product)}
            className="p-3 bg-white/95 text-neutral-800 rounded-full hover:bg-neutral-800 hover:text-white shadow-lg transition-colors cursor-pointer"
            title="자세히 보기"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="p-3 bg-amber-800 text-white rounded-full hover:bg-amber-900 shadow-lg transition-colors cursor-pointer"
            title="장바구니 담기"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Contents */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category Label */}
        <div className="text-[11px] font-mono tracking-wider text-amber-900 font-semibold mb-1 uppercase">
          {product.categoryLabel}
        </div>
        
        {/* Title */}
        <h3 className="font-serif text-lg text-neutral-900 font-semibold tracking-tight hover:text-amber-800 transition-colors cursor-pointer mb-1.5" onClick={() => onOpenDetail(product)}>
          {product.name}
        </h3>

        {/* Simple Description */}
        <p className="text-xs text-neutral-500 line-clamp-2 mb-4 leading-relaxed flex-grow">
          {product.description}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating) ? "fill-amber-500" : "text-neutral-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-neutral-600 font-mono">
            {product.rating}
          </span>
          <span className="text-neutral-300 text-[10px]">•</span>
          <span className="text-xs text-neutral-400 font-mono">
            리뷰 {product.reviewsCount}
          </span>
        </div>

        {/* Price & Action button */}
        <div className="flex items-center justify-between pt-4 border-t border-dotted border-neutral-100 mt-auto">
          <span className="font-mono font-bold text-[16px] text-neutral-900">
            {formatPrice(product.price)}
          </span>
          
          <button
            onClick={() => onAddToCart(product)}
            className="text-xs text-amber-900 bg-amber-50 hover:bg-amber-100 font-medium px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            담기
          </button>
        </div>
      </div>
    </motion.div>
  );
}
