import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { dbService } from '../../services/dbService';
import { 
  FolderKanban, 
  PlusCircle, 
  Search, 
  Filter, 
  Copy, 
  Check, 
  ExternalLink, 
  Eye, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  MessageSquareCode,
  Calendar,
  DollarSign
} from 'lucide-react';

export default function ProjectsOverviewPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [copiedToken, setCopiedToken] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    try {
      const data = await dbService.getProjects();
      setProjects(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this project?')) return;
    await dbService.deleteProject(id);
    loadProjects();
  };

  const copyTokenLink = (token) => {
    const url = `${window.location.origin}/confirm/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.token.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All' || p.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <AdminLayout 
      title="All Projects & Confirmations"
      actionButton={
        <Link 
          to="/projects/create"
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-extrabold rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
        >
          <PlusCircle size={16} />
          <span>Create Project</span>
        </Link>
      }
    >
      <div className="space-y-6">
        
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/60 border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-xl border border-white/5 w-full sm:w-auto overflow-x-auto">
            {['All', 'Pending', 'Confirmed', 'Changes Requested'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  activeTab === tab
                    ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, client or token..."
              className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-gray-600"
            />
          </div>

        </div>

        {/* Projects Grid / List */}
        {filteredProjects.length === 0 ? (
          <div className="bg-gray-900/40 border border-white/10 rounded-3xl p-12 text-center text-gray-400">
            <FolderKanban size={40} className="mx-auto mb-3 text-gray-600" />
            <p className="text-sm font-semibold text-white">No projects found</p>
            <p className="text-xs text-gray-500 mt-1">Try adjusting your search query or create a new project token.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => (
              <div 
                key={p.id}
                className="bg-gray-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-all group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider ${
                      p.status === 'Confirmed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : p.status === 'Changes Requested'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    }`}>
                      {p.status}
                    </span>

                    <span className="text-[11px] text-gray-500 font-mono">Token: {p.token}</span>
                  </div>

                  <Link to={`/projects/${p.id}`} className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1 block">
                    {p.title}
                  </Link>
                  <p className="text-xs text-gray-400 mt-1">Client: <strong className="text-gray-300">{p.clientName}</strong></p>

                  <p className="text-xs text-gray-500 mt-3 line-clamp-2 leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5">
                    {p.description || 'No description provided.'}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Budget:</span>
                    <span className="font-extrabold text-cyan-400">{p.budget}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() => copyTokenLink(p.token)}
                      className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-gray-300 font-mono transition-colors flex items-center justify-center gap-1.5"
                    >
                      {copiedToken === p.token ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      <span>{copiedToken === p.token ? 'Copied Link' : 'Copy Link'}</span>
                    </button>

                    <Link
                      to={`/confirm/${p.token}`}
                      target="_blank"
                      className="p-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-xl border border-cyan-500/20 transition-colors"
                      title="Open Public Confirmation View"
                    >
                      <ExternalLink size={16} />
                    </Link>

                    <Link
                      to={`/projects/${p.id}`}
                      className="p-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl border border-white/10 transition-colors"
                      title="View Full Details"
                    >
                      <Eye size={16} />
                    </Link>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/20 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
