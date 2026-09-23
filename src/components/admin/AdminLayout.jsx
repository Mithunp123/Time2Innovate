import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { dbService } from '../../services/dbService';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  FileCode2, 
  FileText, 
  Activity, 
  Settings, 
  PlusCircle, 
  Search, 
  Database, 
  Menu, 
  X, 
  ExternalLink, 
  Bell, 
  Sparkles,
  ShieldCheck,
  ChevronRight,
  LogOut
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', path: '/projects', icon: FolderKanban },
  { label: 'Clients', path: '/clients', icon: Users },
  { label: 'Templates', path: '/templates', icon: FileCode2 },
  { label: 'Documents', path: '/documents', icon: FileText },
  { label: 'Activity', path: '/activity', icon: Activity },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export default function AdminLayout({ children, title, actionButton }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [firebaseActive, setFirebaseActive] = useState(false);

  useEffect(() => {
    setFirebaseActive(dbService.isFirebaseActive());
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100 flex font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-gray-950/90 border-r border-white/10 flex flex-col justify-between transition-transform duration-300 backdrop-blur-xl ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div>
          {/* Logo & Workspace Title */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
            <Link to="/dashboard" className="flex items-center gap-3">
              <img src="/T2I-log.png" alt="Time2Innovate" className="h-9 w-auto object-contain" />
              <div>
                <span className="text-xs font-black tracking-widest text-white block">T2I ADMIN</span>
                <span className="text-[10px] text-cyan-400 font-mono">Control Center</span>
              </div>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1">
            <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-widest text-gray-500">
              Navigation
            </div>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold shadow-lg shadow-cyan-500/5'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-cyan-400' : 'text-gray-400'} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Database Status Footer Card */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="bg-black/50 border border-white/10 p-3 rounded-2xl flex items-center gap-3">
            <div className={`p-2 rounded-xl ${firebaseActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
              <Database size={16} />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-mono">Firebase DB</span>
              <span className="text-xs font-bold text-white truncate block">
                {firebaseActive ? 'Connected ("confirm")' : 'Local Fallback Engine'}
              </span>
            </div>
          </div>

          <Link 
            to="/"
            className="flex items-center justify-between px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-gray-300 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} />
              <span>Public Website</span>
            </span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </aside>

      {/* Main Right Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-20 border-b border-white/10 bg-black/60 backdrop-blur-xl sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-white rounded-xl bg-white/5"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">{title || 'Admin Portal'}</h1>
              <p className="text-xs text-gray-400 hidden sm:block">Time2Innovate Agency Operations</p>
            </div>
          </div>

          {/* Header Controls */}
          <div className="flex items-center gap-3">
            {actionButton ? actionButton : (
              <Link 
                to="/projects/create"
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
              >
                <PlusCircle size={16} />
                <span className="hidden sm:inline">New Project</span>
              </Link>
            )}

            {/* Admin Avatar & Logout */}
            <div className="flex items-center gap-3 pl-2 border-l border-white/10">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center font-bold text-xs text-cyan-400">
                  AD
                </div>
              </div>
              <button
                onClick={() => {
                  sessionStorage.removeItem('t2i_admin_authed');
                  window.location.href = '/dashboard';
                }}
                title="Lock / Log Out Admin"
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>

      </div>

    </div>
  );
}
