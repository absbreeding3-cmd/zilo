'use client';

import { useState } from 'react';
import { useCart } from '@/components/cart-provider';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    inStock: boolean;
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
    toast.success(`Added ${qty} ${qty > 1 ? 'items' : 'item'} to cart`);
  };

  if (!product.inStock) {
    return (
      <div className="p-4 bg-slate-100 text-slate-500 rounded-xl text-center font-medium border border-slate-200">
        Currently Out of Stock
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {/* Qty Counter */}
      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-full h-14 p-1">
        <button 
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-full transition-colors"
        >
          -
        </button>
        <div className="w-12 text-center font-semibold text-slate-900">{qty}</div>
        <button 
          onClick={() => setQty(Math.min(10, qty + 1))}
          className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-full transition-colors"
        >
          +
        </button>
      </div>

      <button 
        onClick={handleAdd}
        className="flex-1 bg-emerald-600 text-white h-14 rounded-full font-semibold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2"
      >
        <ShoppingCart size={20} />
        Add to Cart
      </button>
    </div>
  );
}
