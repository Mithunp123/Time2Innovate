import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function ConfirmLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white font-sans relative overflow-x-hidden print:bg-white print:text-slate-900 print:min-h-0 print:overflow-visible">
      
      {/* Light Theme Subtle Ambient Glows (Hidden in Print) */}
      <div className="fixed inset-0 pointer-events-none z-0 print:hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-blue-200/50 via-indigo-100/30 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-100/40 blur-[150px] rounded-full" />
      </div>

      {/* Light Navigation Header (Hidden in Print) */}
      <header className="relative z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl sticky top-0 shadow-sm print:hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-slate-900 px-3 py-1.5 rounded-xl flex items-center justify-center shrink-0 border border-slate-800 shadow-sm group-hover:bg-slate-800 transition-colors">
              <img src="/T2I-log.png" alt="Time2Innovate" className="h-8 w-auto object-contain" />
            </div>
            <div className="hidden sm:block border-l border-slate-200 pl-3">
              <span className="text-xs uppercase tracking-widest text-blue-600 font-bold block">Client Portal</span>
              <span className="text-xs text-slate-500">Project Authorization Engine</span>
            </div>
          </Link>

          <div className="flex items-center gap-4 text-xs text-slate-600">
            <div className="hidden md:flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full font-semibold">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>Encrypted & Verified</span>
            </div>
            <Link to="/" className="hover:text-slate-900 transition-colors flex items-center gap-1 text-xs font-medium">
              <ArrowLeft size={14} />
              <span>Main Site</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-10 print:p-0 print:m-0 print:max-w-none">
        {children}
      </main>

      {/* Footer (Hidden in Print) */}
      <footer className="relative z-10 border-t border-slate-200 mt-16 py-8 bg-white/60 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            © {new Date().getFullYear()} Time2Innovate Technologies. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-900 cursor-pointer">Security Protocol</span>
            <span className="hover:text-slate-900 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-900 cursor-pointer">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
