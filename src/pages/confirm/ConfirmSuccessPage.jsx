import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ConfirmLayout from '../../components/confirm/ConfirmLayout';
import { dbService } from '../../services/dbService';

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
      <div className="max-w-3xl mx-auto space-y-6 text-slate-900 font-sans print:max-w-none print:m-0">
        
        {/* Screen Header Text (Screen Only, Clean & Formal) */}
        <div className="print:hidden border-b border-slate-300 pb-4 text-center sm:text-left">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-700 block mb-1">
            Status: Verified & Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900">
            Project Authorization Receipt
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Thank you for confirming the project specification. The authorized record has been logged in our system.
          </p>
        </div>

        {/* PRINT-ONLY HEADER */}
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
          <div className="text-right text-xs font-mono">
            <div className="text-[10px] uppercase text-slate-500 font-bold">Verification Token</div>
            <div className="font-bold text-slate-900 border border-slate-300 px-2 py-0.5 mt-0.5">
              {token}
            </div>
          </div>
        </div>

        {/* MAIN FORMAL RECEIPT TABLE CONTAINER */}
        <div className="bg-white border border-slate-300 p-6 sm:p-8 space-y-6 print:border-slate-300 print:p-0 print:border-0 print:space-y-4">
          
          {/* General Receipt Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              Project Authorization Metadata
            </h3>
            <table className="w-full border-collapse border border-slate-300 text-sm">
              <tbody>
                <tr className="border-b border-slate-300">
                  <th className="w-1/3 py-2.5 px-4 text-left font-bold uppercase text-xs text-slate-700 border-r border-slate-300">Approved Project Title</th>
                  <td className="py-2.5 px-4 font-semibold text-slate-900">{project ? project.title : 'Loading...'}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <th className="py-2.5 px-4 text-left font-bold uppercase text-xs text-slate-700 border-r border-slate-300">Client / Organization</th>
                  <td className="py-2.5 px-4 text-slate-900">{project ? project.clientName : 'Client'} {project?.clientCompany ? `(${project.clientCompany})` : ''}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <th className="py-2.5 px-4 text-left font-bold uppercase text-xs text-slate-700 border-r border-slate-300">Approved Investment Scope</th>
                  <td className="py-2.5 px-4 font-bold text-slate-900">{project ? project.budget : '$0'}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <th className="py-2.5 px-4 text-left font-bold uppercase text-xs text-slate-700 border-r border-slate-300">Confirmation Date</th>
                  <td className="py-2.5 px-4 text-slate-900">{project && project.confirmedAt ? new Date(project.confirmedAt).toLocaleDateString() : new Date().toLocaleDateString()}</td>
                </tr>
                <tr>
                  <th className="py-2.5 px-4 text-left font-bold uppercase text-xs text-slate-700 border-r border-slate-300">Verification Token</th>
                  <td className="py-2.5 px-4 font-mono text-slate-900">{token}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Approved Scope Deliverables Table */}
          {project?.deliverables && project.deliverables.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                Approved Scope Deliverables ({project.deliverables.length})
              </h3>
              <table className="w-full border-collapse border border-slate-300 text-sm">
                <thead>
                  <tr className="border-b border-slate-300 uppercase text-xs text-slate-700">
                    <th className="py-2.5 px-4 text-left border-r border-slate-300 w-16">Item</th>
                    <th className="py-2.5 px-4 text-left">Deliverable Title</th>
                  </tr>
                </thead>
                <tbody>
                  {project.deliverables.map((item, idx) => (
                    <tr key={idx} className="border-b border-slate-300 last:border-none">
                      <td className="py-2.5 px-4 font-mono font-bold border-r border-slate-300">{idx + 1}</td>
                      <td className="py-2.5 px-4 text-slate-900 font-medium">{item.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Authorized Digital Signature Display Table */}
          {project && project.signatureUrl && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                Authorized Executive Signature
              </h3>
              <table className="w-full border-collapse border border-slate-300 text-sm">
                <tbody>
                  <tr>
                    <th className="w-1/3 py-3 px-4 text-left font-bold uppercase text-xs text-slate-700 border-r border-slate-300">Executive Signature</th>
                    <td className="py-3 px-4">
                      <img 
                        src={project.signatureUrl} 
                        alt="Digital Signature" 
                        className="h-14 w-auto object-contain max-h-16" 
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Screen Action Buttons (Hidden in Print, Clean & Icon-Free) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-300 print:hidden">
            <button 
              onClick={handlePrint}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Print Confirmation Receipt
            </button>

            <Link 
              to={`/confirm/${token}`}
              className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all text-center"
            >
              Return to Specification
            </Link>
          </div>

        </div>

        {/* PRINT ONLY FOOTER SEAL */}
        <div className="hidden print:flex items-center justify-between pt-4 border-t border-slate-300 text-[9px] text-slate-500 font-mono mt-4">
          <div>
            Time2Innovate Technologies • Official Security & Compliance Certificate
          </div>
          <div>
            Token: {token} • Encrypted Digital Authorization
          </div>
        </div>

      </div>
    </ConfirmLayout>
  );
}
