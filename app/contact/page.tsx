import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-heading font-semibold text-slate-900 mb-4">Get In Touch</h1>
          <p className="text-slate-500 max-w-xl mx-auto">Have questions about your order, prescriptions, or our services? Our support team is here to help you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Contact Details */}
          <div className="bg-emerald-900 text-white p-10 md:p-12 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-heading font-semibold mb-6">Contact Information</h2>
              <p className="text-emerald-100/80 mb-12 loading-relaxed">Fill out the form and our team will get back to you within 24 hours.</p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="text-emerald-400 mt-1"><Phone size={24} /></div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-emerald-100/80">+1 (555) 123-4567</p>
                    <p className="text-emerald-100/80 text-sm mt-1">Available 24/7</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-emerald-400 mt-1"><Mail size={24} /></div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-emerald-100/80">support@zilohealth.com</p>
                    <p className="text-emerald-100/80 text-sm mt-1">For general inquiries</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-emerald-400 mt-1"><MapPin size={24} /></div>
                  <div>
                    <h4 className="font-semibold mb-1">Location</h4>
                    <p className="text-emerald-100/80">123 Health Avenue, Medical Area,<br/>NY 10001</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-sm text-emerald-100/60">
              &copy; {new Date().getFullYear()} Zilo Health
            </div>
          </div>

          {/* Form */}
          <div className="p-10 md:p-12">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50 resize-none"></textarea>
              </div>

              <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
