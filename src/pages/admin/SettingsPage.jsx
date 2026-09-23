import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { dbService } from '../../services/dbService';
import { 
  Settings, 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  UploadCloud 
} from 'lucide-react';

export default function SettingsPage() {
  const [firebaseActive, setFirebaseActive] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    setFirebaseActive(dbService.isFirebaseActive());
  }, []);

  const handleSyncToFirestore = async () => {
    setSyncing(true);
    try {
      const count = await dbService.syncAllToFirestore();
      setSynced(true);
      alert(`Successfully synced ${count} project records into your Firebase Firestore 'confirm' collection!`);
      setTimeout(() => setSynced(false), 4000);
    } catch (e) {
      console.error(e);
      alert(`Firestore Write Error: ${e.message || 'Permission denied.'}`);
    } finally {
      setSyncing(false);
    }
  };

  const handleSeedData = async () => {
    setSeeding(true);
    try {
      await dbService.seedSampleData();
      setSeeded(true);
      setTimeout(() => setSeeded(false), 3000);
    } catch (e) {
      console.error(e);
      alert('Error seeding sample data.');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <AdminLayout title="Settings & Database Control">
      <div className="max-w-4xl space-y-6">
        
        {/* Firebase Config Inspector Card */}
        <div className="bg-gray-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl space-y-6 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-2xl">
              <Database size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Firebase Database Configuration</h3>
              <p className="text-xs text-gray-400">Target Firestore Collection: <strong className="text-cyan-400 font-mono">"confirm"</strong> (in <strong className="text-white">(default)</strong> database)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-black/50 border border-white/5 p-4 rounded-2xl space-y-1">
              <span className="text-gray-500 block">Connection Status</span>
              <span className={`font-bold flex items-center gap-1.5 ${firebaseActive ? 'text-emerald-400' : 'text-amber-400'}`}>
                <CheckCircle2 size={14} />
                <span>{firebaseActive ? 'Live Firebase SDK Initialized' : 'Offline Fallback Active'}</span>
              </span>
            </div>

            <div className="bg-black/50 border border-white/5 p-4 rounded-2xl space-y-1">
              <span className="text-gray-500 block">Collection Name (`COLLECTION_NAME`)</span>
              <span className="font-mono font-bold text-cyan-400">confirm</span>
            </div>

            <div className="bg-black/50 border border-white/5 p-4 rounded-2xl space-y-1">
              <span className="text-gray-500 block">Project ID (`VITE_FIREBASE_PROJECT_ID`)</span>
              <span className="font-mono font-semibold text-gray-300">{import.meta.env.VITE_FIREBASE_PROJECT_ID || 'time2o'}</span>
            </div>

            <div className="bg-black/50 border border-white/5 p-4 rounded-2xl space-y-1">
              <span className="text-gray-500 block">Auth Domain</span>
              <span className="font-mono font-semibold text-gray-300">{import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'time2o.firebaseapp.com'}</span>
            </div>
          </div>

          {/* Sync & Seed Controls */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-semibold text-white">Sync All Local Projects to Cloud Firestore</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Upload all local project records, confirmations, and Cloudinary signature links to Firestore.</p>
            </div>
            <button
              onClick={handleSyncToFirestore}
              disabled={syncing}
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-extrabold rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-md shadow-cyan-500/20"
            >
              <UploadCloud size={16} className={syncing ? 'animate-bounce' : ''} />
              <span>{synced ? 'Synced to Firestore!' : syncing ? 'Syncing...' : 'Sync Projects to Cloud'}</span>
            </button>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-semibold text-white">Re-seed Sample Data</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Reset test environment with initial sample projects (`token-alpha-99`).</p>
            </div>
            <button
              onClick={handleSeedData}
              disabled={seeding}
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <RefreshCw size={14} className={seeding ? 'animate-spin' : ''} />
              <span>{seeded ? 'Sample Data Reset!' : seeding ? 'Resetting...' : 'Reset Sample Data'}</span>
            </button>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
