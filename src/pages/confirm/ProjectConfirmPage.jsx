import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ConfirmLayout from '../../components/confirm/ConfirmLayout';
import SignaturePad from '../../components/confirm/SignaturePad';
import { dbService } from '../../services/dbService';
import { uploadSignatureToCloudinary } from '../../lib/cloudinary';
import { 
  CheckCircle2, 
  MessageSquareCode, 
  Calendar, 
  DollarSign, 
  Clock, 
  FileText, 
  AlertCircle, 
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Loader2
} from 'lucide-react';

export default function ProjectConfirmPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      setError(null);
      try {
        const data = await dbService.getProjectByToken(token);
        if (data) {
          setProject(data);
        } else {
          setError(`No project specification found matching token: "${token}"`);
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project details. Please check your token or try again.');
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [token]);

  const handleApprove = async () => {
    if (!agreedToTerms) return;
    if (!signatureDataUrl) {
      alert('Please draw or type your digital signature before approving.');
      return;
    }

    setConfirming(true);
    setStatusMessage('Uploading digital signature...');

    try {
      let cloudinaryUrl = null;
      try {
        cloudinaryUrl = await uploadSignatureToCloudinary(signatureDataUrl);
      } catch (cloudErr) {
        console.warn('Cloudinary upload warning, continuing with signature data:', cloudErr);
        cloudinaryUrl = signatureDataUrl; // Fallback
      }

      setStatusMessage('Saving confirmation to Firebase database...');
      await dbService.confirmProject(
        token, 
        'Confirmed directly by client via token verification portal.',
        cloudinaryUrl
      );

      navigate(`/confirm/${token}/success`);
    } catch (err) {
      console.error('Error confirming project:', err);
      alert('An error occurred while confirming the project. Please try again.');
    } finally {
      setConfirming(false);
      setStatusMessage('');
    }
  };

  if (loading) {
    return (
      <ConfirmLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <Loader2 size={40} className="text-blue-600 animate-spin mb-4" />
          <p className="text-slate-600 text-sm animate-pulse font-medium">Validating project token specification...</p>
        </div>
      </ConfirmLayout>
    );
  }

  if (error || !project) {
    return (
      <ConfirmLayout>
        <div className="max-w-xl mx-auto my-12 bg-white border border-red-200 rounded-2xl p-8 text-center shadow-xl">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Token Verification Failed</h2>
          <p className="text-slate-600 text-sm mb-6">{error || "The confirmation token you provided is invalid or has expired."}</p>
          <div className="flex justify-center gap-4">
            <Link to="/" className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-all shadow-sm">
              Return to Homepage
            </Link>
          </div>
        </div>
      </ConfirmLayout>
    );
  }

  const isAlreadyConfirmed = project.status === 'Confirmed';
  const isChangesRequested = project.status === 'Changes Requested';

  return (
    <ConfirmLayout>
      <div className="space-y-8">
        
        {/* Status Notification Banners */}
        {isAlreadyConfirmed && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="font-bold text-emerald-900 text-base">Project Approved & Confirmed</h4>
                <p className="text-xs text-emerald-700">This scope document was confirmed on {project.confirmedAt ? new Date(project.confirmedAt).toLocaleDateString() : 'recently'}.</p>
              </div>
            </div>
            <Link 
              to={`/confirm/${token}/success`}
              className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition-colors shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              <span>View Receipt & Signature</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        )}

        {isChangesRequested && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-6 flex items-start gap-3 shadow-sm">
            <ShieldAlert size={24} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-900 text-base">Changes Requested</h4>
              <p className="text-xs text-amber-800 mt-0.5">
                You previously submitted feedback: "{project.feedback || 'Scope modifications requested.'}"
                Our engineering team is reviewing your adjustments. You may update your request anytime.
              </p>
            </div>
          </div>
        )}

        {/* Main Light Specification Document Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 relative overflow-hidden space-y-6">
          
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold rounded-md uppercase tracking-wider">
                  Token: {project.token}
                </span>
                <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                  isAlreadyConfirmed 
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' 
                    : isChangesRequested 
                    ? 'bg-amber-50 border border-amber-200 text-amber-700'
                    : 'bg-indigo-50 border border-indigo-200 text-indigo-700'
                }`}>
                  Status: {project.status}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{project.title}</h1>
              <p className="text-sm text-slate-500 mt-1">
                Prepared for <strong className="text-slate-800">{project.clientName}</strong> {project.clientCompany ? `(${project.clientCompany})` : ''}
              </p>
            </div>

            {/* Investment & Expiry */}
            <div className="flex md:flex-col items-start md:items-end justify-between border-t md:border-t-0 border-slate-200 pt-4 md:pt-0">
              <div className="text-left md:text-right">
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Total Value</div>
                <div className="text-2xl sm:text-3xl font-black text-blue-600">{project.budget}</div>
              </div>
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
                <Clock size={12} />
                <span>Valid until: {project.expiryDate}</span>
              </div>
            </div>
          </div>

          {/* Overview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2 border-b border-slate-200 pb-6">
            <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
                <DollarSign size={20} />
              </div>
              <div>
                <span className="text-xs text-slate-500 block font-semibold">Investment Scope</span>
                <span className="text-sm font-bold text-slate-900">{project.budget}</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
                <Calendar size={20} />
              </div>
              <div>
                <span className="text-xs text-slate-500 block font-semibold">Estimated Timeline</span>
                <span className="text-sm font-bold text-slate-900">{project.timeline}</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                <FileText size={20} />
              </div>
              <div>
                <span className="text-xs text-slate-500 block font-semibold">Creation Date</span>
                <span className="text-sm font-bold text-slate-900">{project.createdDate}</span>
              </div>
            </div>
          </div>

          {/* Project Executive Summary */}
          <div className="py-2 border-b border-slate-200 pb-6">
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Sparkles size={16} className="text-blue-600" />
              <span>Project Executive Summary</span>
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80 font-normal">
              {project.description}
            </p>
          </div>

          {/* Key Deliverables Checklist */}
          <div className="py-2 border-b border-slate-200 pb-6">
            <h3 className="text-base font-bold text-slate-900 mb-4">Core Deliverables & Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.deliverables && project.deliverables.map((item) => (
                <div 
                  key={item.id}
                  className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex items-start gap-3 transition-colors hover:border-blue-300"
                >
                  <div className="mt-0.5 p-1 rounded-full bg-blue-100 text-blue-700">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-sm text-slate-800 font-medium leading-snug">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones Table */}
          {project.milestones && project.milestones.length > 0 && (
            <div className="py-2 border-b border-slate-200 pb-6">
              <h3 className="text-base font-bold text-slate-900 mb-4">Financial Milestones Breakdown</h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-xs text-slate-600 uppercase tracking-wider font-semibold border-b border-slate-200">
                      <th className="py-3 px-4">Phase</th>
                      <th className="py-3 px-4">Milestone Description</th>
                      <th className="py-3 px-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {project.milestones.map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono text-blue-700 text-xs font-bold">{m.phase}</td>
                        <td className="py-3 px-4 text-slate-800 font-medium">{m.label}</td>
                        <td className="py-3 px-4 text-right font-black text-slate-900">{m.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Terms & Digital Authorization */}
          <div className="py-2 space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Terms & Legal Agreement</h3>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed max-h-32 overflow-y-auto">
                {project.terms}
              </div>
            </div>

            {!isAlreadyConfirmed && (
              <div className="space-y-6 pt-2">
                {/* Light Signature Pad */}
                <SignaturePad 
                  onSignatureChange={(url) => setSignatureDataUrl(url)}
                  isSubmitting={confirming}
                />

                {/* Authorization Checkbox */}
                <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-slate-300 bg-white text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs sm:text-sm text-slate-700 font-medium">
                      I confirm that I am an authorized representative of <strong className="text-slate-900 font-bold">{project.clientName}</strong> and agree to approve this project specification with my digital signature above.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Signature Preview if already confirmed */}
            {isAlreadyConfirmed && project.signatureUrl && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Verified Client Signature:</span>
                <div className="bg-white p-3 rounded-xl border border-slate-200 inline-block shadow-sm">
                  <img src={project.signatureUrl} alt="Verified Digital Signature" className="h-16 w-auto object-contain" />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <button
                onClick={() => navigate(`/confirm/${token}/changes`)}
                className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-sm font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquareCode size={18} />
                <span>{isChangesRequested ? 'Update Requested Changes' : 'Request Changes or Clarification'}</span>
              </button>

              {!isAlreadyConfirmed && (
                <button
                  onClick={handleApprove}
                  disabled={!agreedToTerms || !signatureDataUrl || confirming}
                  className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-extrabold flex items-center justify-center gap-2 transition-all shadow-lg ${
                    agreedToTerms && signatureDataUrl && !confirming
                      ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20 cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'
                  }`}
                >
                  {confirming ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>{statusMessage || 'Processing Signature...'}</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={18} />
                      <span>Approve & Upload Signature</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </ConfirmLayout>
  );
}
