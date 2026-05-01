'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, X, HeartPulse, FileText } from 'lucide-react';
import { useCart } from './cart-provider';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const { items } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const cartQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Medicines', href: '/products' },
    { name: 'Categories', href: '/products?view=categories' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200' : 'bg-white'
        }`}
      >
        {/* Top Info Bar */}
        <div className="hidden md:flex bg-emerald-600 text-emerald-50 py-1.5 px-4 text-xs font-medium justify-between items-center w-full">
          <span>Free delivery on orders over $50. Use code ZILO50</span>
          <div className="flex gap-4">
            <span>Call us: +1 (555) 123-4567</span>
            <span>support@zilohealth.com</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 h-18 lg:h-20 flex items-center justify-between gap-4">
          
          <Link href="/" className="flex items-center gap-2 text-slate-900 font-heading font-bold text-2xl lg:text-3xl shrink-0 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center group-hover:bg-emerald-600 transition-colors shadow-sm">
              <HeartPulse size={24} className="group-hover:scale-110 transition-transform" />
            </div>
            Zilo<span className="text-emerald-600">Health</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
            <input
              type="text"
              placeholder="Search for medicines, health products..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100/80 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-sans text-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`hover:text-emerald-600 transition-colors ${
                  pathname === link.href ? 'text-emerald-600 font-semibold' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:gap-4 shrink-0">
            <Link
              href="/upload"
              className="hidden lg:flex items-center gap-2 text-sm font-medium border border-emerald-200 bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-full hover:bg-emerald-100 hover:border-emerald-300 transition-all"
            >
              <FileText size={18} />
              Upload Prescription
            </Link>
            
            <Link href="/cart" className="relative p-2 text-slate-600 hover:text-emerald-600 transition-colors bg-slate-50 hover:bg-emerald-50 rounded-full">
              <ShoppingCart size={22} />
              {cartQuantity > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
                  {cartQuantity}
                </span>
              )}
            </Link>
            
            <button className="hidden md:flex p-2 text-slate-600 hover:text-emerald-600 transition-colors bg-slate-50 hover:bg-emerald-50 rounded-full">
              <User size={22} />
            </button>

            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              </div>
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-emerald-600 font-medium rounded-lg"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/upload"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-emerald-700 bg-emerald-50 font-medium rounded-lg flex items-center gap-2"
                >
                  <FileText size={18} />
                  Upload Prescription
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-slate-700 hover:bg-slate-50 font-medium rounded-lg flex items-center gap-2"
                >
                  <User size={18} />
                  Login / Signup
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
