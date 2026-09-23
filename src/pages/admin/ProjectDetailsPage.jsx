import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { dbService } from '../../services/dbService';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  MessageSquareCode, 
  DollarSign, 
  Calendar, 
  FileText,
  Trash2,
  Loader2
} from 'lucide-react';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedToken, setCopiedToken] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await dbService.getProjectById(id);
        if (data) setProject(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const copyLink = () => {
    if (!project) return;
    const url = `${window.location.origin}/confirm/${project.token}`;
    navigator.clipboard.writeText(url);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    await dbService.deleteProject(id);
    navigate('/projects');
  };

  if (loading) {
    return (
      <AdminLayout title="Project Details">
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <Loader2 size={36} className="text-cyan-400 animate-spin mb-3" />
          <p className="text-gray-400 text-xs">Loading project record...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!project) {
    return (
      <AdminLayout title="Project Details">
        <div className="bg-gray-900/60 border border-white/10 rounded-3xl p-8 text-center">
          <h3 className="text-lg font-bold text-white mb-2">Project Not Found</h3>
          <p className="text-xs text-gray-400 mb-4">No project matching ID "{id}" was found in the database.</p>
          <Link to="/projects" className="px-4 py-2 bg-white/10 text-white text-xs font-semibold rounded-xl">
            Back to Projects
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Project: ${project.title}`}>
      <div className="space-y-6">
        
        {/* Navigation & Action Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link 
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors bg-white/5 px-3.5 py-2 rounded-xl border border-white/10"
          >
            <ArrowLeft size={16} />
            <span>Back to All Projects</span>
          </Link>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={copyLink}
              className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
            >
              {copiedToken ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copiedToken ? 'Token URL Copied!' : 'Copy Token Link'}</span>
            </button>

            <Link
              to={`/confirm/${project.token}`}
              target="_blank"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5"
            >
              <ExternalLink size={14} />
              <span>Preview Client Portal</span>
            </Link>

            <button
              onClick={handleDelete}
              className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/20 transition-all"
              title="Delete Project"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Project Card */}
        <div className="bg-gray-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-mono font-bold rounded-md">
                  Token: {project.token}
                </span>
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                  project.status === 'Confirmed'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : project.status === 'Changes Requested'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                }`}>
                  Status: {project.status}
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white">{project.title}</h1>
              <p className="text-xs text-gray-400 mt-1">Client: <strong className="text-white">{project.clientName}</strong> ({project.clientEmail || 'No email'})</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-gray-400 block uppercase tracking-wider">Project Value</span>
              <span className="text-2xl font-black text-cyan-400">{project.budget}</span>
            </div>
          </div>

          {/* Client Feedback section if present */}
          {project.feedback && (
            <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-4 text-xs space-y-1">
              <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                <MessageSquareCode size={14} />
                <span>Client Feedback / Notes Logged:</span>
              </div>
              <p className="text-gray-300 leading-relaxed italic">{project.feedback}</p>
            </div>
          )}

          {/* Cloudinary Digital Signature Preview */}
          {project.signatureUrl && (
            <div className="bg-black/40 border border-white/10 rounded-2xl p-4 text-left space-y-2">
              <span className="text-xs font-semibold text-gray-400 block">Uploaded Digital Signature (Cloudinary URL):</span>
              <div className="bg-gray-950 p-3 rounded-xl border border-white/5 inline-block">
                <img src={project.signatureUrl} alt="Digital Signature" className="h-16 w-auto object-contain" />
              </div>
              <a 
                href={project.signatureUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="text-[11px] text-cyan-400 hover:underline block font-mono"
              >
                {project.signatureUrl}
              </a>
            </div>
          )}

          {/* Core Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl">
              <span className="text-xs text-gray-400 block">Created Date</span>
              <span className="text-sm font-semibold text-white">{project.createdDate}</span>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl">
              <span className="text-xs text-gray-400 block">Target Timeline</span>
              <span className="text-sm font-semibold text-white">{project.timeline}</span>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl">
              <span className="text-xs text-gray-400 block">Expiration</span>
              <span className="text-sm font-semibold text-white">{project.expiryDate}</span>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Scope Summary</h3>
            <p className="text-xs text-gray-300 bg-black/40 p-4 rounded-2xl border border-white/5 leading-relaxed">
              {project.description || 'No detailed description.'}
            </p>
          </div>

          {/* Deliverables */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Deliverables Checklist</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.deliverables && project.deliverables.map((item, idx) => (
                <div key={idx} className="bg-black/40 border border-white/5 p-3 rounded-xl flex items-center gap-2 text-xs text-gray-200">
                  <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
