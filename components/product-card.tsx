'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ShoppingCart, Heart, Plus } from 'lucide-react';
import { useCart } from './cart-provider';
import { toast } from 'sonner';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    inStock: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 overflow-hidden flex flex-col relative"
    >
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          {discount}% OFF
        </div>
      )}
      
      <button className="absolute top-3 right-3 z-10 p-2 text-slate-300 hover:text-rose-500 transition-colors bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 shadow-sm">
        <Heart size={18} />
      </button>

      <Link href={`/products/${product.id}`} className="block relative aspect-[4/3] bg-slate-50 overflow-hidden p-6 group-hover:bg-emerald-50/50 transition-colors">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain mix-blend-multiply pb-4 group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <div className="p-5 flex-1 flex flex-col">
        <div className="text-xs font-semibold text-emerald-600 mb-2 tracking-wide uppercase">{product.category}</div>
        <Link href={`/products/${product.id}`} className="hover:text-emerald-600 transition-colors">
          <h3 className="font-heading font-semibold text-slate-900 line-clamp-1 mb-1">{product.name}</h3>
        </Link>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{product.description}</p>
        
        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-slate-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
          </div>
          
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              product.inStock 
                ? 'bg-slate-100 text-slate-700 hover:bg-emerald-500 hover:text-white hover:shadow-md hover:shadow-emerald-500/20 active:scale-95' 
                : 'bg-slate-50 text-slate-300 cursor-not-allowed'
            }`}
            aria-label="Add to cart"
          >
            {product.inStock ? <Plus size={20} /> : <span className="text-xs font-bold leading-none px-1">OUT</span>}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
