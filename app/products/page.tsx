import { getProducts, getCategories } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const categoryParam = params.category;
  const searchParam = params.search;

  let products = getProducts();
  const categories = getCategories();

  if (categoryParam) {
    products = products.filter(p => p.category === categoryParam);
  }

  if (searchParam) {
    products = products.filter(p => 
      p.name.toLowerCase().includes(searchParam.toLowerCase()) || 
      p.description.toLowerCase().includes(searchParam.toLowerCase())
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header & Filter */}
        <div className="mb-10 text-center md:text-left md:flex justify-between items-end">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-semibold text-slate-900 mb-2">
              {categoryParam ? `${categoryParam}` : searchParam ? `Search: ${searchParam}` : 'All Medicines'}
            </h1>
            <p className="text-slate-500">Showing {products.length} products</p>
          </div>
          
          {/* Categories Pill Nav */}
          <div className="mt-6 md:mt-0 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Link 
              href="/products" 
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                !categoryParam ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              All
            </Link>
            {categories.map(cat => (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  categoryParam === cat ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm max-w-2xl mx-auto mt-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Search size={24} />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">No products found</h2>
            <p className="text-slate-500 mb-6">Try adjusting your search or category filters.</p>
            <Link href="/products" className="text-emerald-600 font-medium hover:text-emerald-700">Clear filters</Link>
          </div>
        )}
      </div>
    </div>
  );
}
