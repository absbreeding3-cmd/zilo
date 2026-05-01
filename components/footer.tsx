import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, HeartPulse } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 pt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4 relative">
          <Link href="/" className="flex items-center gap-2 text-white font-heading font-bold text-2xl group">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-emerald-500/20 shadow-lg">
              <HeartPulse size={24} />
            </div>
            Zilo Health
          </Link>
          <p className="text-sm border-l-2 border-emerald-500/30 pl-4 py-1">
            Fast & trusted medicine delivery right at your doorstep. Professional healthcare UI for modern users.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" aria-label="Facebook" className="hover:text-emerald-400 transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"><Facebook size={20} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-emerald-400 transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"><Twitter size={20} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-emerald-400 transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"><Instagram size={20} /></a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-heading font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
            <li><Link href="/products" className="hover:text-emerald-400 transition-colors">All Medicines</Link></li>
            <li><Link href="/upload" className="hover:text-emerald-400 transition-colors">Upload Prescription</Link></li>
            <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-heading font-semibold text-lg mb-4">Categories</h3>
          <ul className="space-y-3">
            <li><Link href="/products?category=Tablets" className="hover:text-emerald-400 transition-colors">Tablets & Pills</Link></li>
            <li><Link href="/products?category=Syrups" className="hover:text-emerald-400 transition-colors">Syrups & Liquids</Link></li>
            <li><Link href="/products?category=Baby%20Care" className="hover:text-emerald-400 transition-colors">Baby Care</Link></li>
            <li><Link href="/products?category=Healthcare" className="hover:text-emerald-400 transition-colors">Healthcare Devices</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-heading font-semibold text-lg mb-4">Contact Info</h3>
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <MapPin className="top-1 relative text-emerald-500" size={20} />
              <span className="text-sm leading-relaxed">123 Health Avenue, Medical Area, NY 10001</span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone className="text-emerald-500" size={20} />
              <span className="text-sm">+1 (555) 123-4567</span>
            </li>
            <li className="flex gap-3 items-center">
              <Mail className="text-emerald-500" size={20} />
              <span className="text-sm">support@zilohealth.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Zilo Health. All rights reserved. Built with Next.js & Tailwind.
      </div>
    </footer>
  );
}
