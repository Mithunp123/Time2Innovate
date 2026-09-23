import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { dbService } from '../../services/dbService';
import { Activity, Clock, ShieldCheck, CheckCircle2, MessageSquareCode, PlusCircle } from 'lucide-react';

export default function ActivityPage() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await dbService.getActivities();
      setActivities(data);
    }
    load();
  }, []);

  return (
    <AdminLayout title="System Activity & Audit Trail">
      <div className="space-y-6">
        <p className="text-xs text-gray-400">Complete chronological event logs of client token views, confirmations, and change requests.</p>
        
        <div className="bg-gray-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-4">
          <div className="space-y-3">
            {activities.map((act) => (
              <div key={act.id} className="bg-black/40 border border-white/5 p-4 rounded-2xl flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${
                    act.type === 'confirm'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : act.type === 'change'
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'bg-cyan-500/10 text-cyan-400'
                  }`}>
                    {act.type === 'confirm' ? <CheckCircle2 size={16} /> : act.type === 'change' ? <MessageSquareCode size={16} /> : <Activity size={16} />}
                  </div>
                  <span className="text-gray-200 font-medium">{act.text}</span>
                </div>
                <span className="text-[11px] text-gray-500 font-mono shrink-0">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
