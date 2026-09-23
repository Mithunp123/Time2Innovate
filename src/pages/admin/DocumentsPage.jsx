import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { dbService } from '../../services/dbService';
import { FileText, Download, FileCheck, Search } from 'lucide-react';

export default function DocumentsPage() {
  const [docs, setDocs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      const data = await dbService.getDocuments();
      setDocs(data);
    }
    load();
  }, []);

  const filtered = docs.filter(d => d.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout title="Document Vault & Agreements">
      <div className="space-y-6">
        <div className="bg-gray-900/60 border border-white/10 p-4 rounded-2xl backdrop-blur-xl flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contracts and receipts..."
              className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="bg-gray-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-white/10 uppercase tracking-wider font-mono">
                <th className="py-3 px-3">Document Title</th>
                <th className="py-3 px-3">Associated Project</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">File Size</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-3 font-semibold text-white flex items-center gap-2">
                    <FileText size={16} className="text-cyan-400 shrink-0" />
                    <span>{d.title}</span>
                  </td>
                  <td className="py-3.5 px-3 text-gray-400">{d.project}</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold rounded-md">
                      {d.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-gray-400 font-mono">{d.size}</td>
                  <td className="py-3.5 px-3 text-gray-400">{d.date}</td>
                  <td className="py-3.5 px-3 text-right">
                    <button 
                      onClick={() => alert(`Downloading document: ${d.title}`)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-xs font-medium border border-white/10 inline-flex items-center gap-1.5"
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
