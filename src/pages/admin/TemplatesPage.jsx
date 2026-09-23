import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { dbService } from '../../services/dbService';
import { FileCode2, Clock, DollarSign, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function TemplatesPage() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await dbService.getTemplates();
      setTemplates(data);
    }
    load();
  }, []);

  const handleUseTemplate = (tpl) => {
    navigate('/projects/create');
  };

  return (
    <AdminLayout title="Proposal & Scope Templates">
      <div className="space-y-6">
        <p className="text-xs text-gray-400">Pre-built architecture & project proposal templates for fast client token creation.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <div key={tpl.id} className="bg-gray-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex flex-col justify-between space-y-4 shadow-xl">
              <div>
                <span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-[10px] font-bold rounded-md uppercase">
                  {tpl.category}
                </span>
                <h3 className="text-base font-bold text-white mt-3">{tpl.title}</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{tpl.description}</p>
                
                <div className="mt-4 space-y-2">
                  <span className="text-[11px] text-gray-500 uppercase tracking-wider block font-semibold">Included Deliverables:</span>
                  {tpl.deliverables && tpl.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Est. Investment:</span>
                  <span className="font-bold text-cyan-400">{tpl.estimatedBudget}</span>
                </div>
                <button
                  onClick={() => handleUseTemplate(tpl)}
                  className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Use Template for New Project</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
