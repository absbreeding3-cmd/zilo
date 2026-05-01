'use client';

import { useState } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, File, X } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

export default function UploadPrescriptionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    // Check type
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error('Invalid file type. Please upload JPG, PNG or PDF.');
      return;
    }
    
    // Check size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('File too large. Maximum size is 5MB.');
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    
    // Simulate API upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsUploading(false);
    setIsSuccess(true);
    toast.success('Prescription uploaded successfully!');
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-10 max-w-md w-full mx-4 shadow-xl shadow-emerald-900/5 text-center border border-slate-100"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-heading font-semibold text-slate-900 mb-2">Upload Complete</h2>
          <p className="text-slate-500 mb-8">Our pharmacists are reviewing your prescription. We&apos;ll contact you shortly with the order details.</p>
          <div className="space-y-3">
            <Link href="/products" className="block w-full py-3 px-4 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-500 transition-colors">
              Continue Shopping
            </Link>
            <button onClick={() => { setIsSuccess(false); setFile(null); }} className="block w-full py-3 px-4 bg-slate-100 text-slate-700 rounded-full font-medium hover:bg-slate-200 transition-colors">
              Upload Another
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-heading font-semibold text-slate-900 mb-4">Upload Prescription</h1>
          <p className="text-slate-500 max-w-xl mx-auto">Upload a clear photo or PDF of your prescription. Our pharmacists will review it and process your order.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          
          <div className="mb-8">
            <h3 className="font-semibold text-slate-900 mb-4">Patient Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input required type="text" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input required type="tel" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50" placeholder="+1 (555) 000-0000" />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-slate-900 mb-4">Attach Prescription</h3>
            
            <AnimatePresence mode="wait">
              {!file ? (
                <motion.div 
                  key="upload-box"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-10 text-center transition-colors ${
                    isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <input 
                    type="file" 
                    id="file-upload" 
                    className="hidden" 
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                  />
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100 text-emerald-600">
                    <UploadCloud size={28} />
                  </div>
                  <p className="text-slate-700 font-medium mb-1">Drag and drop your file here</p>
                  <p className="text-slate-500 text-sm mb-6">or click to browse from your device</p>
                  <label 
                    htmlFor="file-upload"
                    className="inline-block px-6 py-2.5 bg-white border border-slate-200 shadow-sm rounded-full text-slate-700 font-medium hover:bg-slate-50 hover:text-emerald-600 transition-colors cursor-pointer"
                  >
                    Browse Files
                  </label>
                  <p className="text-xs text-slate-400 mt-4">Supported formats: JPG, PNG, PDF (Max 5MB)</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="file-preview"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex justify-between items-center"
                >
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-emerald-600 shrink-0">
                      <File size={24} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-medium text-slate-900 truncate">{file.name}</p>
                      <p className="text-slate-500 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setFile(null)}
                    className="p-2 hover:bg-emerald-100 rounded-full text-emerald-700 transition-colors shrink-0"
                    title="Remove file"
                  >
                    <X size={20} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3 mb-8">
            <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-amber-800 leading-relaxed">
              Please ensure the doctor&apos;s name, patient name, date, and medicines are clearly visible. Invalid prescriptions will be rejected.
            </p>
          </div>

          <button 
            type="submit" 
            disabled={!file || isUploading}
            className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center ${
              !file 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/25'
            }`}
          >
            {isUploading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Submit Prescription'}
          </button>
        </form>
      </div>
    </div>
  );
}
