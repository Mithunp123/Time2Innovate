import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ConfirmLayout from '../../components/confirm/ConfirmLayout';
import { dbService } from '../../services/dbService';
import { 
  CheckCircle2, 
  Printer, 
  ArrowRight, 
  FileCheck2,
  Sparkles
} from 'lucide-react';

export default function ConfirmSuccessPage() {
  const { token } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await dbService.getProjectByToken(token);
        if (data) setProject(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <ConfirmLayout>
      <div className="max-w-3xl mx-auto space-y-6 text-center print:text-left print:max-w-none print:m-0">
        
        {/* Animated Celebration Icon (Screen Only) */}
        <div className="relative inline-block my-2 print:hidden">
          <div className="relative w-20 h-20 bg-emerald-100 border-2 border-emerald-300 rounded-full flex items-center justify-center text-emerald-600 mx-auto shadow-md">
            <CheckCircle2 size={48} className="animate-bounce" />
          </div>
        </div>

        {/* Screen Header Text (Screen Only) */}
        <div className="print:hidden">
          <span className="px-4 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold rounded-full uppercase tracking-widest inline-flex items-center gap-1.5">
            <Sparkles size={14} />
            <span>Confirmation Verified</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">Project Successfully Approved!</h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto mt-1 font-medium">
            Thank you for confirming the project scope. Our engineering leads have been notified and project kickoff preparation is underway.
          </p>
        </div>

        {/* =========================================================================
            PRINT-ONLY DEDICATED SINGLE PAGE RECEIPT HEADER (Visible ONLY during print)
            ========================================================================= */}
        <div className="hidden print:flex items-center justify-between border-b-2 border-slate-900 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 px-3 py-1.5 rounded-xl flex items-center justify-center shrink-0 border border-slate-800 shadow-sm print:bg-slate-900 print:[-webkit-print-color-adjust:exact]">
              <img src="/T2I-log.png" alt="Time2Innovate" className="h-8 w-auto object-contain" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest leading-none">TIME2INNOVATE</h2>
              <span className="text-[10px] text-slate-600 font-mono font-bold tracking-wider">OFFICIAL PROJECT AUTHORIZATION RECEIPT</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase text-slate-500 font-bold">Verification Token</div>
            <div className="text-xs font-mono font-bold text-slate-900 bg-slate-100 border border-slate-300 px-2.5 py-1 rounded">
              {token}
            </div>
          </div>
        </div>

        {/* =========================================================================
            RECEIPT CARD (Light Theme for Screen & Print)
            ========================================================================= */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-left space-y-5 shadow-xl shadow-slate-200/50 print:bg-white print:border-slate-300 print:text-slate-900 print:shadow-none print:p-0 print:rounded-none print:space-y-4">
          
          {/* Project Title & Investment Banner */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">Approved Project Title</span>
              <h3 className="text-lg font-extrabold text-slate-900 print:text-base leading-tight">
                {project ? project.title : 'Loading...'}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">Investment</span>
              <span className="text-xl font-black text-blue-600 print:text-slate-900 print:text-base">
                {project ? project.budget : '$0'}
              </span>
            </div>
          </div>

          {/* Client & Confirmation Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-0.5 print:bg-slate-50 print:border-slate-200 print:rounded-lg">
              <span className="text-slate-500 block font-semibold text-[10px]">Client / Organization:</span>
              <span className="font-bold text-slate-900">{project ? project.clientName : 'Client'}</span>
              {project?.clientCompany && <span className="text-[10px] text-slate-600 block">({project.clientCompany})</span>}
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-0.5 print:bg-slate-50 print:border-slate-200 print:rounded-lg">
              <span className="text-slate-500 block font-semibold text-[10px]">Confirmation Date & Status:</span>
              <span className="font-bold text-emerald-700 block">
                {project && project.confirmedAt ? new Date(project.confirmedAt).toLocaleDateString() : new Date().toLocaleDateString()}
              </span>
              <span className="text-[10px] text-slate-600 font-mono block">Status: VERIFIED & CONFIRMED</span>
            </div>
          </div>

          {/* Deliverables Checklist Summary */}
          {project?.deliverables && project.deliverables.length > 0 && (
            <div className="border-t border-slate-200 pt-3">
              <span className="text-xs font-bold text-slate-900 block mb-2 uppercase tracking-wider text-[11px]">
                Approved Scope Deliverables ({project.deliverables.length}):
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {project.deliverables.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-2 rounded-lg border border-slate-200 flex items-center gap-1.5 text-[11px] text-slate-800 font-medium">
                    <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verified Signature Card */}
          {project && project.signatureUrl && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2 print:p-3">
              <div className="flex items-center justify-between text-xs text-slate-700 font-semibold">
                <span className="text-[11px]">Authorized Client Digital Signature:</span>
                <span className="text-emerald-700 font-mono text-[10px] uppercase font-bold">DIGITALLY VERIFIED</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-300 inline-block shadow-sm">
                <img 
                  src={project.signatureUrl} 
                  alt="Digital Signature" 
                  className="h-14 w-auto object-contain max-h-16" 
                />
              </div>
            </div>
          )}

          {/* Screen Action Buttons (Hidden during Print) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 print:hidden">
            <button 
              onClick={handlePrint}
              className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-300 shadow-sm cursor-pointer"
            >
              <Printer size={16} />
              <span>Print Confirmation Receipt</span>
            </button>

            <Link 
              to={`/confirm/${token}`}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Return to Specification</span>
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>

        {/* PRINT ONLY FOOTER SEAL */}
        <div className="hidden print:flex items-center justify-between pt-4 border-t border-slate-300 text-[9px] text-slate-500 font-mono mt-4">
          <div>
            Time2Innovate Technologies • Security & Compliance Certificate
          </div>
          <div>
            Token: {token} • Encrypted Digital Authorization
          </div>
        </div>

      </div>
    </ConfirmLayout>
  );
}
