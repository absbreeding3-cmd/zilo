import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/cart-provider';
import { Toaster } from 'sonner';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'Zilo Health - Fast & Trusted Medicine Delivery',
  description: 'Order your medicines online with Zilo Health. Fast & trusted medicine delivery at your doorstep.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-[#f8fafc] text-slate-900 flex flex-col min-h-screen" suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster position="bottom-center" />
        </CartProvider>
      </body>
    </html>
  );
}
