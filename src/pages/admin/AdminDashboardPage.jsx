import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { dbService } from '../../services/dbService';
import { 
  FolderKanban, 
  CheckCircle2, 
  Clock, 
  MessageSquareCode, 
  DollarSign, 
  Copy, 
  Check, 
  PlusCircle, 
  ArrowRight, 
  Users, 
  Activity, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedToken, setCopiedToken] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [projList, actList] = await Promise.all([
          dbService.getProjects(),
          dbService.getActivities()
        ]);
        setProjects(projList);
        setActivities(actList);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalProjects = projects.length;
  const pendingProjects = projects.filter(p => p.status === 'Pending').length;
  const confirmedProjects = projects.filter(p => p.status === 'Confirmed').length;
  const changesRequested = projects.filter(p => p.status === 'Changes Requested').length;

  const copyTokenLink = (token) => {
    const url = `${window.location.origin}/confirm/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <AdminLayout title="Operations Dashboard">
      <div className="space-y-8">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-gray-900/60 border border-white/10 p-5 rounded-2xl backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Total Projects</span>
              <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl">
                <FolderKanban size={18} />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white">{totalProjects}</div>
            <div className="text-xs text-gray-400">Managed in `confirm` database</div>
          </div>

          <div className="bg-gray-900/60 border border-white/10 p-5 rounded-2xl backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Pending Confirmations</span>
              <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
                <Clock size={18} />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-blue-400">{pendingProjects}</div>
            <div className="text-xs text-gray-400">Awaiting client authorization</div>
          </div>

          <div className="bg-gray-900/60 border border-white/10 p-5 rounded-2xl backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Confirmed & Active</span>
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-emerald-400">{confirmedProjects}</div>
            <div className="text-xs text-gray-400">Signed off & ready for sprint</div>
          </div>

          <div className="bg-gray-900/60 border border-white/10 p-5 rounded-2xl backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Changes Requested</span>
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
                <MessageSquareCode size={18} />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-amber-400">{changesRequested}</div>
            <div className="text-xs text-gray-400">Scope revisions submitted</div>
          </div>

        </div>

        {/* Quick Action Banner */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-900/90 to-black border border-cyan-500/30 p-6 rounded-3xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-1 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-mono font-semibold rounded-md uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Token Confirmation Engine</span>
            </div>
            <h2 className="text-xl font-bold text-white">Create a New Project Confirmation Token</h2>
            <p className="text-xs text-gray-400 max-w-xl">
              Generate a client proposal token link to let clients review scope, milestones, and confirm agreements digitally.
            </p>
          </div>
          <Link
            to="/projects/create"
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-extrabold rounded-2xl transition-all shadow-lg shadow-cyan-500/20 shrink-0 flex items-center gap-2 relative z-10"
          >
            <PlusCircle size={18} />
            <span>Generate Project Token</span>
          </Link>
        </div>

        {/* Two Column Layout: Active Projects & Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Projects List (2 cols) */}
          <div className="lg:col-span-2 bg-gray-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Recent Project Confirmations</h3>
              <Link to="/projects" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                <span>View All ({totalProjects})</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-gray-500 border-b border-white/10 uppercase tracking-wider font-mono">
                    <th className="py-3 px-3">Project & Client</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Value</th>
                    <th className="py-3 px-3 text-right">Public Token Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projects.slice(0, 5).map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-3">
                        <Link to={`/projects/${p.id}`} className="font-bold text-white hover:text-cyan-400 transition-colors block">
                          {p.title}
                        </Link>
                        <span className="text-[11px] text-gray-400">{p.clientName}</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider ${
                          p.status === 'Confirmed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : p.status === 'Changes Requested'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-white">{p.budget}</td>
                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => copyTokenLink(p.token)}
                            className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 transition-colors flex items-center gap-1 font-mono text-[11px]"
                            title="Copy Public Token Share Link"
                          >
                            {copiedToken === p.token ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                            <span>{p.token}</span>
                          </button>
                          <Link 
                            to={`/confirm/${p.token}`} 
                            target="_blank"
                            className="p-1 text-gray-400 hover:text-white"
                            title="Open Client View"
                          >
                            <ExternalLink size={14} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Audit Feed (1 col) */}
          <div className="bg-gray-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity size={18} className="text-cyan-400" />
                <span>Live Activity Stream</span>
              </h3>
              <Link to="/activity" className="text-xs text-gray-400 hover:text-white">Logs</Link>
            </div>

            <div className="space-y-3">
              {activities.slice(0, 6).map((act) => (
                <div key={act.id} className="bg-black/40 border border-white/5 p-3 rounded-2xl text-xs space-y-1">
                  <p className="text-gray-200 leading-snug">{act.text}</p>
                  <span className="text-[10px] text-gray-500 font-mono block">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
