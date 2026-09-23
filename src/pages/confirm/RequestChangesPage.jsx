import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ConfirmLayout from '../../components/confirm/ConfirmLayout';
import { dbService } from '../../services/dbService';
import { 
  MessageSquareCode, 
  ArrowLeft, 
  Send, 
  AlertCircle, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';

export default function RequestChangesPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await dbService.getProjectByToken(token);
        if (data) {
          setProject(data);
          if (data.feedback) setFeedback(data.feedback);
          if (data.clientName) setContactPerson(data.clientName);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setSubmitting(true);
    try {
      await dbService.requestChanges(token, {
        feedback: feedback.trim(),
        contactPerson
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Failed to submit change request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <ConfirmLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 size={36} className="text-amber-600 animate-spin mb-3" />
          <p className="text-slate-600 text-sm font-medium">Loading change request console...</p>
        </div>
      </ConfirmLayout>
    );
  }

  return (
    <ConfirmLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Navigation back button */}
        <Link 
          to={`/confirm/${token}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors bg-white px-3.5 py-2 rounded-xl border border-slate-300 shadow-sm"
        >
          <ArrowLeft size={16} />
          <span>Back to Project Specification</span>
        </Link>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 space-y-6">
          
          <div className="border-b border-slate-200 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold rounded-lg uppercase tracking-wider mb-3">
              <MessageSquareCode size={14} />
              <span>Scope Feedback Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Request Scope Adjustments</h1>
            <p className="text-sm text-slate-500 mt-1">
              For project: <strong className="text-slate-800">{project ? project.title : token}</strong>
            </p>
          </div>

          {submitted ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center space-y-4">
              <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto border border-amber-200">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Change Request Transmitted</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your requested adjustments have been logged and assigned to the project lead. We will review and update the proposal within 1 business day.
              </p>
              <div className="pt-2">
                <Link 
                  to={`/confirm/${token}`}
                  className="px-6 py-2.5 bg-amber-500 text-black text-xs font-extrabold rounded-xl hover:bg-amber-400 transition-colors inline-block shadow-sm"
                >
                  Return to Specification
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Requested Scope Adjustments / Comments
                </label>
                <textarea 
                  rows={6}
                  required
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Please describe the features, timeline adjustments, or budget clarifications you would like our team to review..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-4 text-sm text-slate-900 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-400 shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Contact Person / Reviewer Name
                </label>
                <input 
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="Your full name"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-400 shadow-inner"
                />
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 flex items-start gap-3">
                <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Submitting changes will mark this project status as <strong>"Changes Requested"</strong> in our admin system. You can revise these notes at any time prior to final approval.
                </span>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
                <Link 
                  to={`/confirm/${token}`}
                  className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold rounded-xl transition-all shadow-sm"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={submitting || !feedback.trim()}
                  className={`px-6 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
                    submitting || !feedback.trim()
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-amber-500 text-black hover:bg-amber-400 cursor-pointer shadow-md'
                  }`}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Change Request</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </ConfirmLayout>
  );
}
