import { useState, useEffect } from 'react';
import { ShieldCheck, Lock, KeyRound, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export default function AdminProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session storage for existing authentication
    const authStatus = sessionStorage.getItem('t2i_admin_authed');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (passwordInput.trim() === 'allowme') {
      sessionStorage.setItem('t2i_admin_authed', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid admin password. Access denied.');
      setPasswordInput('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-md w-full relative z-10 bg-gray-950/90 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl space-y-6">
          
          {/* Header Icon */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto shadow-lg shadow-cyan-500/10">
              <Lock size={32} />
            </div>
            
            <div className="space-y-1">
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-bold rounded-full uppercase tracking-widest inline-flex items-center gap-1.5">
                <Sparkles size={12} />
                <span>Restricted Access</span>
              </span>
              <h1 className="text-2xl font-black text-white tracking-tight pt-2">Admin Authentication</h1>
              <p className="text-xs text-gray-400">
                Please enter the administrator passcode to unlock the workspace control center.
              </p>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3.5 rounded-2xl flex items-center gap-2.5 animate-shake">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 block">Administrator Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter passcode..."
                  autoFocus
                  required
                  className="w-full bg-white/5 border border-white/10 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition-all pr-10"
                />
                <KeyRound size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <span>Unlock Admin Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Footer note */}
          <div className="text-center border-t border-white/5 pt-4">
            <a 
              href="/"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center gap-1"
            >
              ← Back to Main Public Site
            </a>
          </div>

        </div>
      </div>
    );
  }

  return children;
}
