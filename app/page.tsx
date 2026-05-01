import Image from 'next/image';
import Link from 'next/link';
import { Truck, ShieldCheck, Clock, FileText } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/data';

export default function Home() {
  const featuredProducts = getProducts().slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-emerald-900 text-white pb-20 pt-16 md:pt-24 lg:pt-32 lg:pb-28">
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
          <Image
            src="https://picsum.photos/seed/medical-hero/1920/1080"
            alt="Medical background"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-800/50 border border-emerald-700/50 text-sm font-medium text-emerald-200 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              24/7 Delivery Available
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-semibold tracking-tight leading-[1.05]">
              Fast & Trusted <br/>
              <span className="text-emerald-400">Medicine</span> Delivery
            </h1>
            <p className="text-lg md:text-xl text-emerald-100/80 max-w-lg leading-relaxed font-light">
              Get your prescriptions and healthcare essentials delivered right to your doorstep within hours. Professional, safe, and discreet.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                href="/products" 
                className="bg-emerald-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 active:scale-95"
              >
                Order Now
              </Link>
              <Link 
                href="/upload" 
                className="bg-white/10 text-white border border-emerald-400/30 px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all backdrop-blur-md active:scale-95 flex items-center gap-2"
              >
                <FileText size={20} />
                Upload Prescription
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white relative -mt-8 rounded-t-3xl z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { name: 'Tablets', icon: '💊', color: 'bg-blue-50 text-blue-600' },
              { name: 'Syrups', icon: '🧪', color: 'bg-orange-50 text-orange-600' },
              { name: 'Baby Care', icon: '🍼', color: 'bg-pink-50 text-pink-600' },
              { name: 'Healthcare', icon: '🩺', color: 'bg-emerald-50 text-emerald-600' },
            ].map((cat) => (
              <Link 
                key={cat.name} 
                href={`/products?category=${encodeURIComponent(cat.name)}`}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl ${cat.color} hover:-translate-y-1 transition-transform border border-transparent hover:border-current/10`}
              >
                <span className="text-4xl mb-3 block">{cat.icon}</span>
                <span className="font-semibold">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-semibold text-slate-900 mb-4">Why Choose Zilo Health</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">We prioritize your health and convenience. Experience the most reliable pharmacy service.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
                <Truck size={32} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Fast Delivery</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Get your medicines delivered within 2-4 hours in selected areas.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-3">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">100% Genuine</h3>
              <p className="text-slate-500 text-sm leading-relaxed">All medicines are checked for expiry and sourced from verified distributors.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
                <Clock size={32} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">24/7 Support</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Our pharmacists are available round the clock to assist you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-heading font-semibold text-slate-900 mb-2">Trending Now</h2>
              <p className="text-slate-500">Popular healthcare essentials heavily discounted.</p>
            </div>
            <Link href="/products" className="hidden sm:block text-emerald-600 font-medium hover:text-emerald-700">
              View All &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
             <Link href="/products" className="inline-block px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-full hover:bg-slate-200">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
