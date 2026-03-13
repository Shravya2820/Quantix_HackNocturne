import React, { useState } from 'react';
import { 
  Github, 
  FileText, 
  Database, 
  Send, 
  ShieldCheck, 
  AlertCircle, 
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Plus,
  X
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_MILESTONES, MOCK_PROJECTS } from '../mockData';

export const SubmitWork: React.FC = () => {
  const { milestoneId } = useParams();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    githubRepo: '',
    driveLink: '',
    ipfsHash: '',
    note: ''
  });

  // Mock data
  const milestone = MOCK_MILESTONES.find(m => m.id === milestoneId) || MOCK_MILESTONES[0];
  const project = MOCK_PROJECTS.find(p => p.id === milestone.project_id) || MOCK_PROJECTS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Logic to update milestone status and notify client
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-6">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-text-primary">Work Submitted!</h2>
          <p className="text-text-muted max-w-md">
            Your deliverables for <strong>Milestone {milestone.id}</strong> have been sent to the client for review. 
            The escrow payment will be released once approved.
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 bg-accent-primary text-bg-main rounded-xl font-bold hover:bg-accent-secondary transition-all"
          >
            Go to Dashboard
          </button>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="px-8 py-3 bg-bg-highlight border border-border-main text-text-primary rounded-xl font-bold hover:border-accent-primary transition-all"
          >
            Edit Submission
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-bg-highlight flex items-center justify-center text-text-muted hover:text-text-primary transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Submit Deliverables</h1>
          <p className="text-text-muted">{project.title} • Milestone {milestone.id}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="glass-card p-8 flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-primary flex items-center gap-2">
                  <Github size={18} className="text-text-muted" /> GitHub Repository URL
                </label>
                <input 
                  type="url"
                  placeholder="https://github.com/username/repo"
                  required
                  value={formData.githubRepo}
                  onChange={(e) => setFormData({...formData, githubRepo: e.target.value})}
                  className="w-full bg-bg-highlight border border-border-main rounded-xl py-3 px-4 text-text-primary outline-none focus:border-accent-primary transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-primary flex items-center gap-2">
                  <FileText size={18} className="text-text-muted" /> Google Drive / Assets Link
                </label>
                <input 
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={formData.driveLink}
                  onChange={(e) => setFormData({...formData, driveLink: e.target.value})}
                  className="w-full bg-bg-highlight border border-border-main rounded-xl py-3 px-4 text-text-primary outline-none focus:border-accent-primary transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-primary flex items-center gap-2">
                  <Database size={18} className="text-text-muted" /> IPFS Content Hash (Optional)
                </label>
                <input 
                  type="text"
                  placeholder="Qm..."
                  value={formData.ipfsHash}
                  onChange={(e) => setFormData({...formData, ipfsHash: e.target.value})}
                  className="w-full bg-bg-highlight border border-border-main rounded-xl py-3 px-4 text-text-primary outline-none focus:border-accent-primary transition-all font-mono text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-primary">Note to Client</label>
                <textarea 
                  placeholder="Describe what you've completed in this milestone..."
                  rows={4}
                  required
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                  className="w-full bg-bg-highlight border border-border-main rounded-xl py-3 px-4 text-text-primary outline-none focus:border-accent-primary transition-all resize-none"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-accent-primary text-bg-main rounded-2xl font-bold text-lg hover:bg-accent-secondary transition-all flex items-center justify-center gap-2"
            >
              <Send size={20} /> Submit Work for Review
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-8">
          <section className="glass-card p-8 flex flex-col gap-6">
            <h3 className="text-lg font-bold text-text-primary">Milestone Info</h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Payment Amount</span>
                <span className="text-lg font-bold text-emerald-400">${milestone.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Status</span>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-widest">In Progress</span>
              </div>
              <div className="h-px bg-border-main" />
              <div className="flex flex-col gap-2">
                <span className="text-xs text-text-muted uppercase tracking-widest">Description</span>
                <p className="text-sm text-text-primary leading-relaxed">{milestone.description}</p>
              </div>
            </div>
          </section>

          <section className="glass-card p-8 flex flex-col gap-4 bg-accent-primary/5 border-accent-primary/20">
            <div className="flex items-center gap-3 text-accent-primary">
              <ShieldCheck size={24} />
              <h3 className="text-lg font-bold">Secure Submission</h3>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Your submission is timestamped and recorded on TrustChain. 
              The client has 7 days to review. If no action is taken, you can trigger an automated dispute or payment release.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
