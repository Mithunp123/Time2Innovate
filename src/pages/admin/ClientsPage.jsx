import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { dbService } from '../../services/dbService';
import { Users, PlusCircle, Mail, Phone, Building, Briefcase, Search, Check } from 'lucide-react';

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [phone, setPhone] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    const list = await dbService.getClients();
    setClients(list);
  }

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name || !email) return;
    await dbService.addClient({ name, email, contact, phone });
    setShowModal(false);
    setName('');
    setEmail('');
    setContact('');
    setPhone('');
    loadClients();
  };

  const filtered = clients.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout 
      title="Client Directory"
      actionButton={
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-extrabold rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
        >
          <PlusCircle size={16} />
          <span>Add Client</span>
        </button>
      }
    >
      <div className="space-y-6">
        
        {/* Search */}
        <div className="bg-gray-900/60 border border-white/10 p-4 rounded-2xl backdrop-blur-xl flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients..."
              className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <span className="text-xs text-gray-400 hidden sm:block">Total Clients: {clients.length}</span>
        </div>

        {/* Client Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <div key={c.id} className="bg-gray-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-bold text-sm">
                    {c.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{c.name}</h4>
                    <span className="text-[11px] text-gray-400">{c.contact || c.name}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded-md uppercase">
                  {c.status}
                </span>
              </div>

              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-gray-500" />
                  <span>{c.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-gray-500" />
                  <span>{c.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Briefcase size={14} className="text-gray-500" />
                  <span>Assigned Projects: <strong className="text-cyan-400">{c.projectsCount}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Client Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6">
              <h3 className="text-lg font-bold text-white">Add New Client Entity</h3>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Company / Organization Name</label>
                  <input 
                    type="text" 
                    required
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="e.g. Acme Innovations"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Contact Person</label>
                  <input 
                    type="text" 
                    value={contact} 
                    onChange={(e) => setContact(e.target.value)} 
                    placeholder="e.g. John Doe"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="john@acme.com"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-white/5 text-gray-400 text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2 bg-cyan-500 text-black font-bold text-xs rounded-xl"
                  >
                    Save Client
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
