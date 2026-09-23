import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { dbService } from '../../services/dbService';
import { 
  PlusCircle, 
  Trash2, 
  ArrowLeft, 
  Save, 
  Sparkles, 
  Copy, 
  Check,
  Loader2 
} from 'lucide-react';

export default function CreateProjectPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [budget, setBudget] = useState('$15,000');
  const [timeline, setTimeline] = useState('4 Weeks');
  const [expiryDate, setExpiryDate] = useState('2026-12-31');
  const [description, setDescription] = useState('');
  const [terms, setTerms] = useState('Payment terms follow 30% deposit, 40% mid-project milestone, and 30% upon final sign-off. Scope changes post-confirmation will be evaluated under separate change orders.');
  
  const [deliverables, setDeliverables] = useState([
    'Custom UI/UX Design System with Dark Theme',
    'Frontend & API Development',
    'Database Setup & Quality Assurance Testing'
  ]);
  const [newDeliverable, setNewDeliverable] = useState('');

  const [token, setToken] = useState(`token-${Math.random().toString(36).substring(2, 9)}`);
  const [submitting, setSubmitting] = useState(false);
  const [clientsList, setClientsList] = useState([]);

  useEffect(() => {
    async function loadClients() {
      const cList = await dbService.getClients();
      setClientsList(cList);
    }
    loadClients();
  }, []);

  const handleAddDeliverable = () => {
    if (!newDeliverable.trim()) return;
    setDeliverables([...deliverables, newDeliverable.trim()]);
    setNewDeliverable('');
  };

  const handleRemoveDeliverable = (index) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const handleSelectClient = (e) => {
    const selectedId = e.target.value;
    const client = clientsList.find(c => c.id === selectedId);
    if (client) {
      setClientName(client.name);
      setClientEmail(client.email);
      setClientCompany(client.contact || client.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !clientName) {
      alert('Please enter a project title and client name.');
      return;
    }

    setSubmitting(true);
    try {
      const formattedDeliverables = deliverables.map((item, idx) => ({
        id: idx + 1,
        title: item,
        done: false
      }));

      await dbService.createProject({
        title,
        token,
        clientName,
        clientEmail,
        clientCompany,
        budget,
        timeline,
        expiryDate,
        description,
        deliverables: formattedDeliverables,
        terms
      });

      navigate('/projects');
    } catch (err) {
      console.error(err);
      alert('Error creating project in database. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout title="Create Project Specification Token">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <Link 
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors bg-white/5 px-3.5 py-2 rounded-xl border border-white/10"
        >
          <ArrowLeft size={16} />
          <span>Back to Projects Overview</span>
        </Link>

        <form onSubmit={handleSubmit} className="bg-gray-900/60 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-8">
          
          {/* Header */}
          <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold rounded-md uppercase tracking-wider mb-2">
                <Sparkles size={14} />
                <span>New Token Entry</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white">Project Specification Setup</h2>
            </div>

            <div className="bg-black/50 border border-cyan-500/30 px-4 py-2 rounded-2xl flex items-center gap-3">
              <span className="text-xs text-gray-400">Generated Token:</span>
              <span className="font-mono text-sm font-bold text-cyan-400">{token}</span>
            </div>
          </div>

          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">1. Project Core Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs text-gray-400 mb-1 font-medium">Project Title *</label>
                <input 
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. AI-Powered Enterprise Web Portal"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium">Select Existing Client</label>
                <select 
                  onChange={handleSelectClient}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="">-- Select Client or Enter Below --</option>
                  {clientsList.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.contact})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium">Client Name *</label>
                <input 
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Nexus Tech Solutions"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium">Client Email</label>
                <input 
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="contact@nexustech.io"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium">Company / Entity</label>
                <input 
                  type="text"
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                  placeholder="Nexus Global Corp"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Financials & Timeline */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">2. Financial Scope & Duration</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium">Total Budget</label>
                <input 
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="$24,500"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium">Estimated Timeline</label>
                <input 
                  type="text"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  placeholder="6 Weeks"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium">Confirmation Expiry Date</label>
                <input 
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Description & Deliverables */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">3. Executive Summary & Scope Deliverables</h3>

            <div>
              <label className="block text-xs text-gray-400 mb-1 font-medium">Project Overview</label>
              <textarea 
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Comprehensive description of the target architecture, features, and engineering objectives..."
                className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-2 font-medium">Core Deliverables Checklist</label>
              <div className="space-y-2 mb-3">
                {deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-3 bg-black/40 border border-white/5 px-4 py-2.5 rounded-xl text-xs text-gray-200">
                    <span>{idx + 1}. {item}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveDeliverable(idx)}
                      className="text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input 
                  type="text"
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddDeliverable(); }}}
                  placeholder="Add deliverable feature item..."
                  className="flex-1 bg-black/60 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={handleAddDeliverable}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-all"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>

          {/* Section 4: Terms */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">4. Agreement Terms</h3>
            <textarea 
              rows={3}
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-xs text-gray-300 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Submit Action */}
          <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
            <Link 
              to="/projects"
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold rounded-2xl transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black text-xs font-extrabold rounded-2xl transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Saving to `confirm` collection...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save & Generate Token URL</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </AdminLayout>
  );
}
