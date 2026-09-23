import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ConfirmLayout from '../../components/confirm/ConfirmLayout';
import SignaturePad from '../../components/confirm/SignaturePad';
import { dbService } from '../../services/dbService';
import { uploadSignatureToCloudinary } from '../../lib/cloudinary';

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
        console.warn('Signature upload warning, continuing with fallback:', cloudErr);
        cloudinaryUrl = signatureDataUrl; // Fallback
      }

      setStatusMessage('Saving confirmation record...');
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
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-3">
          <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-700 text-sm font-mono uppercase tracking-wider">Validating Project Token Specification...</p>
        </div>
      </ConfirmLayout>
    );
  }

  if (error || !project) {
    return (
      <ConfirmLayout>
        <div className="max-w-xl mx-auto my-12 bg-white border border-slate-300 p-8 text-center space-y-4">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider">Token Verification Failed</h2>
          <p className="text-slate-700 text-sm">{error || "The confirmation token you provided is invalid or has expired."}</p>
          <div className="pt-2">
            <Link to="/" className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all inline-block">
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
      <div className="space-y-6 text-slate-900 font-sans">
        
        {/* Status Notification Headers (Plain Text, Professional) */}
        {isAlreadyConfirmed && (
          <div className="border border-slate-900 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold uppercase text-xs tracking-wider text-slate-900">Status: Project Approved & Confirmed</h4>
              <p className="text-xs text-slate-700 mt-0.5">Confirmed on {project.confirmedAt ? new Date(project.confirmedAt).toLocaleDateString() : 'recently'}.</p>
            </div>
            <Link 
              to={`/confirm/${token}/success`}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shrink-0"
            >
              View Verification Receipt
            </Link>
          </div>
        )}

        {isChangesRequested && (
          <div className="border border-slate-900 p-4 space-y-1">
            <h4 className="font-bold uppercase text-xs tracking-wider text-slate-900">Status: Changes Requested</h4>
            <p className="text-xs text-slate-800">
              Feedback submitted: "{project.feedback || 'Scope modifications requested.'}" — Our engineering team is currently reviewing your requested adjustments.
            </p>
          </div>
        )}

        {/* Main Document Table Layout Container */}
        <div className="bg-white border border-slate-300 p-6 sm:p-10 space-y-8">
          
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-slate-600 tracking-widest block">Formal Agreement & Specification</span>
              <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 mt-1">{project.title}</h1>
            </div>
            <div className="text-left sm:text-right text-xs font-mono">
              <div><strong className="text-slate-700">TOKEN:</strong> {project.token}</div>
              <div><strong className="text-slate-700">STATUS:</strong> {project.status.toUpperCase()}</div>
            </div>
          </div>

          {/* Section 1: Overview Specifications Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              1. Project Overview & General Details
            </h3>
            <table className="w-full border-collapse border border-slate-300 text-sm">
              <tbody>
                <tr className="border-b border-slate-300">
                  <th className="w-1/3 py-2.5 px-4 text-left font-bold uppercase text-xs text-slate-700 border-r border-slate-300 bg-white">Project Title</th>
                  <td className="py-2.5 px-4 font-semibold text-slate-900">{project.title}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <th className="py-2.5 px-4 text-left font-bold uppercase text-xs text-slate-700 border-r border-slate-300 bg-white">Client / Organization</th>
                  <td className="py-2.5 px-4 text-slate-900">{project.clientName} {project.clientCompany ? `(${project.clientCompany})` : ''}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <th className="py-2.5 px-4 text-left font-bold uppercase text-xs text-slate-700 border-r border-slate-300 bg-white">Total Investment Scope</th>
                  <td className="py-2.5 px-4 font-bold text-slate-900">{project.budget}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <th className="py-2.5 px-4 text-left font-bold uppercase text-xs text-slate-700 border-r border-slate-300 bg-white">Estimated Project Timeline</th>
                  <td className="py-2.5 px-4 text-slate-900">{project.timeline}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <th className="py-2.5 px-4 text-left font-bold uppercase text-xs text-slate-700 border-r border-slate-300 bg-white">Document Token</th>
                  <td className="py-2.5 px-4 font-mono text-slate-900">{project.token}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <th className="py-2.5 px-4 text-left font-bold uppercase text-xs text-slate-700 border-r border-slate-300 bg-white">Creation Date</th>
                  <td className="py-2.5 px-4 text-slate-900">{project.createdDate}</td>
                </tr>
                <tr>
                  <th className="py-2.5 px-4 text-left font-bold uppercase text-xs text-slate-700 border-r border-slate-300 bg-white">Specification Expiry</th>
                  <td className="py-2.5 px-4 text-slate-900">Valid until {project.expiryDate}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 2: Executive Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              2. Executive Summary & Scope Description
            </h3>
            <div className="border border-slate-300 p-4 text-sm text-slate-900 leading-relaxed font-normal">
              {project.description}
            </div>
          </div>

          {/* Section 3: Core Deliverables Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              3. Core Deliverables & Technical Specifications
            </h3>
            <table className="w-full border-collapse border border-slate-300 text-sm">
              <thead>
                <tr className="border-b border-slate-300 uppercase text-xs text-slate-700">
                  <th className="py-2.5 px-4 text-left border-r border-slate-300 w-16">Item</th>
                  <th className="py-2.5 px-4 text-left">Deliverable Title & Scope Description</th>
                </tr>
              </thead>
              <tbody>
                {project.deliverables && project.deliverables.map((item, idx) => (
                  <tr key={item.id || idx} className="border-b border-slate-300 last:border-none">
                    <td className="py-2.5 px-4 font-mono font-bold border-r border-slate-300">{idx + 1}</td>
                    <td className="py-2.5 px-4 text-slate-900 font-medium">{item.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 4: Financial Milestones Table */}
          {project.milestones && project.milestones.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                4. Financial Milestones Schedule
              </h3>
              <table className="w-full border-collapse border border-slate-300 text-sm">
                <thead>
                  <tr className="border-b border-slate-300 uppercase text-xs text-slate-700">
                    <th className="py-2.5 px-4 text-left border-r border-slate-300 w-28">Phase</th>
                    <th className="py-2.5 px-4 text-left border-r border-slate-300">Milestone Description</th>
                    <th className="py-2.5 px-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {project.milestones.map((m, idx) => (
                    <tr key={idx} className="border-b border-slate-300 last:border-none">
                      <td className="py-2.5 px-4 font-mono font-bold border-r border-slate-300">{m.phase}</td>
                      <td className="py-2.5 px-4 text-slate-900 border-r border-slate-300">{m.label}</td>
                      <td className="py-2.5 px-4 text-right font-bold text-slate-900">{m.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Section 5: Terms & Legal Conditions */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              5. Terms & Conditions Agreement
            </h3>
            <div className="border border-slate-300 p-4 text-xs text-slate-700 leading-relaxed max-h-40 overflow-y-auto font-mono">
              {project.terms}
            </div>
          </div>

          {/* Section 6: Digital Signature & Authorization */}
          {!isAlreadyConfirmed && (
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                6. Executive Digital Signature Authorization
              </h3>
              
              <SignaturePad 
                onSignatureChange={(url) => setSignatureDataUrl(url)}
                isSubmitting={confirming}
              />

              <div className="border border-slate-300 p-4">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 border-slate-400 text-slate-900 focus:ring-slate-900"
                  />
                  <span className="text-xs text-slate-900 font-medium leading-relaxed">
                    I confirm that I am an authorized representative of <strong>{project.clientName}</strong> and hereby approve and authorize this project specification and scope of work with my digital signature above.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Verified Signature Display (If Confirmed) */}
          {isAlreadyConfirmed && project.signatureUrl && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                Verified Executive Digital Signature
              </h3>
              <table className="w-full border-collapse border border-slate-300 text-sm">
                <tbody>
                  <tr>
                    <th className="w-1/3 py-3 px-4 text-left font-bold uppercase text-xs text-slate-700 border-r border-slate-300">Authorized Digital Signature</th>
                    <td className="py-3 px-4">
                      <img src={project.signatureUrl} alt="Verified Digital Signature" className="h-16 w-auto object-contain" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Action Buttons (Clean & Professional) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-300">
            <button
              onClick={() => navigate(`/confirm/${token}/changes`)}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 text-xs font-bold uppercase tracking-wider transition-all"
            >
              {isChangesRequested ? 'Update Requested Changes' : 'Request Changes or Clarification'}
            </button>

            {!isAlreadyConfirmed && (
              <button
                onClick={handleApprove}
                disabled={!agreedToTerms || !signatureDataUrl || confirming}
                className={`w-full sm:w-auto px-8 py-3 text-xs font-bold uppercase tracking-wider transition-all ${
                  agreedToTerms && signatureDataUrl && !confirming
                    ? 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                {confirming ? (statusMessage || 'Processing Signature...') : 'Approve & Authorize Specification'}
              </button>
            )}
          </div>

        </div>

      </div>
    </ConfirmLayout>
  );
}
