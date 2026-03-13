import React, { useState } from 'react';
import { 
  Github, 
  ExternalLink, 
  FileText, 
  ShieldCheck, 
  AlertCircle, 
  MessageSquare, 
  CheckCircle2, 
  XCircle,
  ArrowLeft,
  Database
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MOCK_MILESTONES, MOCK_PROJECTS } from '../mockData';

export const SubmissionReview: React.FC = () => {
  const { milestoneId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | 'disputed'>('pending');

  // Mock data fetching
  const milestone = MOCK_MILESTONES.find(m => m.id === milestoneId) || MOCK_MILESTONES[0];
  const project = MOCK_PROJECTS.find(p => p.id === milestone.project_id) || MOCK_PROJECTS[0];

  const handleApprove = () => {
    setStatus('approved');
    // Logic to release payment
  };

  const handleRequestChanges = () => {
    setStatus('rejected');
    // Logic to notify freelancer
  };

  const handleRaiseDispute = () => {
    navigate('/disputes');
  };

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
          <h1 className="text-3xl font-bold text-text-primary">Review Submission</h1>
          <p className="text-text-muted">{project.title} • Milestone {milestone.id}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Deliverables Section */}
          <section className="glass-card p-8 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">Deliverables</h2>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                <ShieldCheck size={18} />
                Verified on TrustChain
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-5 bg-bg-highlight border border-border-main rounded-2xl hover:border-accent-primary transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-bg-dark rounded-xl flex items-center justify-center text-text-primary">
                    <Github size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-text-primary">GitHub Repository</p>
                    <p className="text-xs text-text-muted">Source code & documentation</p>
                  </div>
                </div>
                <ExternalLink size={20} className="text-text-muted group-hover:text-accent-primary transition-all" />
              </a>

              <a 
                href="https://drive.google.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-5 bg-bg-highlight border border-border-main rounded-2xl hover:border-accent-primary transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center">
                    <FileText size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-text-primary">Google Drive</p>
                    <p className="text-xs text-text-muted">Assets & Large files</p>
                  </div>
                </div>
                <ExternalLink size={20} className="text-text-muted group-hover:text-accent-primary transition-all" />
              </a>

              <div className="flex items-center justify-between p-5 bg-bg-highlight border border-border-main rounded-2xl col-span-1 md:col-span-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center">
                    <Database size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-text-primary">IPFS Content Hash</p>
                    <p className="text-xs text-text-muted font-mono mt-1">QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-bg-dark border border-border-main rounded-lg text-xs font-bold text-text-muted hover:text-text-primary transition-all">
                  Copy Hash
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-text-primary">Freelancer's Note</h3>
              <div className="bg-bg-highlight p-6 rounded-2xl border border-border-main">
                <p className="text-sm text-text-muted leading-relaxed">
                  "I have completed the initial UI implementation and integrated the mock data services. 
                  The components are fully responsive and follow the design guidelines. 
                  Please review the GitHub repository for the source code and the Drive link for the design assets."
                </p>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <button 
              onClick={handleApprove}
              className="w-full md:flex-1 py-4 bg-emerald-500 text-bg-dark rounded-2xl font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={20} /> Approve & Release Payment
            </button>
            <button 
              onClick={handleRequestChanges}
              className="w-full md:flex-1 py-4 bg-bg-highlight border border-border-main text-text-primary rounded-2xl font-bold hover:border-accent-primary transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare size={20} /> Request Changes
            </button>
            <button 
              onClick={handleRaiseDispute}
              className="w-full md:w-auto px-8 py-4 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-2xl font-bold hover:bg-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <AlertCircle size={20} /> Raise Dispute
            </button>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="flex flex-col gap-8">
          <section className="glass-card p-8 flex flex-col gap-6">
            <h3 className="text-lg font-bold text-text-primary">Contract Details</h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Escrow Amount</span>
                <span className="text-lg font-bold text-emerald-400">${milestone.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Freelancer Stake</span>
                <span className="text-sm font-bold text-text-primary">$250.00</span>
              </div>
              <div className="h-px bg-border-main" />
              <div className="flex flex-col gap-2">
                <span className="text-xs text-text-muted uppercase tracking-widest">Smart Contract Address</span>
                <div className="flex items-center justify-between bg-bg-highlight p-3 rounded-xl border border-border-main">
                  <span className="text-[10px] font-mono text-text-muted truncate mr-2">0x71C765...d897</span>
                  <ExternalLink size={14} className="text-accent-primary cursor-pointer" />
                </div>
              </div>
            </div>
          </section>

          <section className="glass-card p-8 flex flex-col gap-4 bg-blue-500/5 border-blue-500/20">
            <div className="flex items-center gap-3 text-blue-400">
              <ShieldCheck size={24} />
              <h3 className="text-lg font-bold">TrustChain Protection</h3>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Your payment is held securely in escrow. Releasing payment is final and cannot be reversed. 
              If you are not satisfied, use "Request Changes" or "Raise Dispute".
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
