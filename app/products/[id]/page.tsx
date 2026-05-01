import { getProductById, getProducts } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { AddToCartButton } from './add-to-cart-button';

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm font-medium text-slate-500 mb-8">
          <Link href="/" className="hover:text-emerald-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-emerald-600">Medicines</Link>
          <span className="mx-2">/</span>
          <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-emerald-600">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="relative aspect-square md:aspect-[4/3] bg-slate-50 rounded-3xl p-8 border border-slate-100 flex items-center justify-center">
            {discount > 0 && (
              <div className="absolute top-6 left-6 z-10 bg-rose-500 text-white text-sm font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                {discount}% OFF
              </div>
            )}
            <div className="relative w-full h-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain mix-blend-multiply drop-shadow-xl"
                priority
                referrerPolicy="no-referrer"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full relative z-10">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-heading font-semibold text-slate-900 mb-4">{product.name}</h1>
            
            <div className="flex items-end gap-3 mb-6">
              <span className="text-4xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-slate-400 line-through mb-1">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="text-slate-600 text-base leading-relaxed mb-8">{product.description}</p>
            
            {product.dosage && (
              <div className="mb-8 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-1 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-100 flex items-center justify-center rounded-full text-blue-600 text-xs">ℹ</span>
                  Recommended Dosage
                </h4>
                <p className="text-blue-800 text-sm">{product.dosage}</p>
              </div>
            )}

            <div className="space-y-6 flex-1">
              {/* Add to Cart logic broken out to a Client Component */}
              <AddToCartButton product={product} />

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 text-slate-500 rounded-full"><ShieldCheck size={18} /></div>
                  <span className="text-sm font-medium text-slate-700">100% Genuine</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 text-slate-500 rounded-full"><RefreshCw size={18} /></div>
                  <span className="text-sm font-medium text-slate-700">Easy Returns</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 text-slate-500 rounded-full"><Truck size={18} /></div>
                  <span className="text-sm font-medium text-slate-700">Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
