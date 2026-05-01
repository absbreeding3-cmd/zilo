'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/components/cart-provider';
import { useRouter } from 'next/navigation';
import { CheckCircle2, MapPin, CreditCard, Wallet } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrderNumber(Math.floor(Math.random() * 100000).toString());
  }, []);

  const shipping = total > 50 ? 0 : 5;
  const tax = total * 0.05;
  const finalTotal = total + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsProcessing(true);
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    clearCart();
    toast.success('Order placed successfully!');
  };

  if (items.length === 0 && !isSuccess) {
    router.push('/cart');
    return null;
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full mx-4 shadow-xl shadow-emerald-900/5 text-center border border-slate-100">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-heading font-semibold text-slate-900 mb-2">Order Confirmed!</h2>
          <p className="text-slate-500 mb-2">Your order #ZH-{orderNumber} has been placed.</p>
          <p className="text-sm text-slate-400 mb-8">You will receive an SMS confirmation shortly.</p>
          <Link href="/products" className="block w-full py-3 px-4 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-500 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-heading font-semibold text-slate-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Checkout Form */}
          <div className="lg:col-span-3 space-y-6">
            <form id="checkout-form" onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full"><MapPin size={20} /></div>
                <h2 className="text-xl font-heading font-semibold text-slate-900">Delivery Address</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input required type="text" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input required type="tel" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input required type="email" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Address Layer</label>
                  <input required type="text" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50" placeholder="Street layout, House No, etc." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                  <input required type="text" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ZIP Code</label>
                  <input required type="text" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50" />
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6 pt-6 border-t border-slate-100">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full"><CreditCard size={20} /></div>
                <h2 className="text-xl font-heading font-semibold text-slate-900">Payment Method</h2>
              </div>
              
              <div className="space-y-3">
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 border-slate-300 pointer-events-none" 
                  />
                  <div className="flex items-center gap-3">
                    <Wallet className="text-slate-500" size={24} />
                    <div>
                      <p className="font-medium text-slate-900">Cash on Delivery</p>
                      <p className="text-sm text-slate-500">Pay when you receive the order</p>
                    </div>
                  </div>
                </label>
                
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'online' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 border-slate-300 pointer-events-none" 
                  />
                  <div className="flex items-center gap-3">
                    <CreditCard className="text-slate-500" size={24} />
                    <div>
                      <p className="font-medium text-slate-900">Pay Online</p>
                      <p className="text-sm text-slate-500">Credit Card, Transfer, etc. (Placeholder)</p>
                    </div>
                  </div>
                </label>
              </div>

            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 sticky top-28">
              <h2 className="text-xl font-heading font-semibold text-slate-900 mb-6">Order Details</h2>
              
              <div className="space-y-4 mb-6 pt-2 h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex gap-2 min-w-0 pr-4">
                      <span className="font-medium text-slate-900">{item.quantity}x</span>
                      <span className="text-slate-600 truncate">{item.name}</span>
                    </div>
                    <span className="font-medium text-slate-900 shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 mb-6 text-sm text-slate-600 border-t border-slate-100 pt-6">
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
              </div>
              
              <div className="pt-6 border-t border-slate-100 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-slate-900">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center ${
                  isProcessing 
                    ? 'bg-emerald-400 text-white cursor-wait' 
                    : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 active:scale-95'
                }`}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
