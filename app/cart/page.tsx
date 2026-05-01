'use client';

import { useCart } from '@/components/cart-provider';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 border-t border-slate-100 py-16 flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-2xl font-heading font-semibold text-slate-900 mb-2">Your Cart is Empty</h2>
        <p className="text-slate-500 mb-8 max-w-sm text-center">Looks like you haven&apos;t added any medicines or health products to your cart yet.</p>
        <Link href="/products" className="bg-emerald-600 text-white px-8 py-3 rounded-full font-medium hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-500/20">
          Start Shopping
        </Link>
      </div>
    );
  }

  const shipping = total > 50 ? 0 : 5;
  const tax = total * 0.05; // 5% flat tax rate
  const finalTotal = total + shipping + tax;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-heading font-semibold text-slate-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0, padding: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl p-4 sm:p-6 flex gap-4 sm:gap-6 items-center shadow-sm border border-slate-100"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-xl relative overflow-hidden flex-shrink-0 border border-slate-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2 mix-blend-multiply"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.id}`} className="hover:text-emerald-600 transition-colors">
                      <h3 className="font-semibold text-slate-900 truncate mb-1">{item.name}</h3>
                    </Link>
                    <p className="text-slate-500 text-sm mb-4">${item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center gap-4">
                      {/* Qty */}
                      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-full h-9 p-0.5 w-24">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex-1 h-full flex items-center justify-center text-slate-500 hover:bg-slate-200 rounded-full transition-colors"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium text-slate-900 px-2">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex-1 h-full flex items-center justify-center text-slate-500 hover:bg-slate-200 rounded-full transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 p-2 rounded-full transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Cart Summary */}
          <div>
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 sticky top-28">
              <h2 className="text-xl font-heading font-semibold text-slate-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span className="font-medium text-slate-900">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-slate-900">
                    {shipping === 0 ? <span className="text-emerald-600">Free</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-emerald-600 mt-1">Add ${(50 - total).toFixed(2)} more for free shipping!</p>
                )}
              </div>
              
              <div className="pt-6 border-t border-slate-100 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-slate-900">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Link
                href="/checkout"
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
