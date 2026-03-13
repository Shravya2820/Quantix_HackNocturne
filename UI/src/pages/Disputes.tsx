import React, { useState } from 'react';
import { 
  AlertCircle, 
  ShieldAlert, 
  MessageSquare, 
  FileText, 
  Clock, 
  ChevronRight,
  Zap,
  CheckCircle2,
  Scale,
  Plus,
  Calendar,
  DollarSign,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_DISPUTES } from '../mockData';
import { useAuth } from '../components/AuthProvider';

export const Disputes: React.FC = () => {
  const { profile } = useAuth();
  const isClient = profile?.role === 'client';
  const [disputes, setDisputes] = useState(MOCK_DISPUTES);
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<any>(null);

  const activeDisputes = disputes.filter(d => d.status === 'active');
  const resolvedDisputes = disputes.filter(d => d.status === 'resolved');

  const handleResolve = (id: string) => {
    // Mock resolve logic
    setDisputes(prev => prev.map(d => d.id === id ? { ...d, status: 'resolved', outcome: 'Resolved by mutual agreement.' } : d));
  };

  const raiseDispute = (milestoneId: string) => {
    // Mock limit check
    const milestoneDisputeCount = 3; // This would come from actual milestone data
    if (milestoneDisputeCount >= 3) {
      setShowAdjustmentModal(true);
      return;
    }
    // Logic to raise dispute
  };

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-text-primary">Dispute Resolution Center</h1>
        <p className="text-text-muted">AI-powered mediation for fair and transparent conflict resolution.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Active Disputes */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">Active Disputes</h2>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-xs font-bold border border-amber-500/20">
                {activeDisputes.length} Active
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {activeDisputes.map((dispute, index) => (
                <motion.div 
                  key={dispute.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 flex flex-col gap-6 hover:border-accent-primary/30 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                        <ShieldAlert size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-text-primary group-hover:text-accent-primary transition-colors">{dispute.project_title}</h3>
                        <p className="text-xs text-text-muted mt-1">Milestone: {dispute.milestone_id} • Freelancer: {dispute.freelancer_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden md:block">
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Opened On</p>
                        <p className="text-sm font-medium text-text-primary">{new Date(dispute.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        {dispute.status}
                      </div>
                    </div>
                  </div>

                  <div className="bg-bg-highlight p-4 rounded-xl border border-border-main flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-accent-primary">
                      <Zap size={16} />
                      <span className="text-xs font-bold uppercase tracking-widest">Reason for Dispute</span>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed italic">
                      "{dispute.reason}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border-main">
                    <div className="flex items-center gap-4">
                      <button className="text-accent-primary text-sm font-bold flex items-center gap-1 hover:underline">
                        View Details <ChevronRight size={16} />
                      </button>
                    </div>
                    {isClient && (
                      <button 
                        onClick={() => handleResolve(dispute.id)}
                        className="px-4 py-2 bg-emerald-500 text-bg-dark rounded-lg text-sm font-bold hover:bg-emerald-400 transition-all"
                      >
                        Resolve Case
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              {activeDisputes.length === 0 && (
                <div className="glass-card p-12 text-center flex flex-col items-center gap-4 border-dashed">
                  <CheckCircle2 size={48} className="text-emerald-400 opacity-20" />
                  <p className="text-text-muted">No active disputes. Your projects are running smoothly!</p>
                </div>
              )}
            </div>
          </section>

          {/* Resolved Disputes */}
          <section className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-text-primary">Resolved Disputes</h2>
            <div className="flex flex-col gap-4">
              {resolvedDisputes.map((dispute, index) => (
                <div 
                  key={dispute.id}
                  className="glass-card p-6 flex flex-col gap-4 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-text-primary">{dispute.project_title}</h4>
                        <p className="text-xs text-text-muted">Outcome: {dispute.outcome}</p>
                      </div>
                    </div>
                    <span className="text-xs text-text-muted">{new Date(dispute.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-8">
          <section className="glass-card p-8 flex flex-col gap-6">
            <div className="w-16 h-16 bg-accent-primary/10 text-accent-primary rounded-2xl flex items-center justify-center">
              <Scale size={32} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-text-primary">Resolution Protocol</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                TrustChain uses Gemini AI to analyze project scopes, chat logs, and deliverables. 
                Our AI provides a neutral summary and suggests a resolution based on the smart contract terms.
              </p>
            </div>
            <div className="bg-bg-highlight p-4 rounded-xl border border-border-main">
              <h4 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-2">Dispute Limits</h4>
              <p className="text-xs text-text-muted">Clients can raise a maximum of 3 disputes per milestone. If reached, an adjustment (deadline or payment) is required to proceed.</p>
            </div>
          </section>

          <section className="glass-card p-8 flex flex-col gap-6 bg-accent-primary/5 border-accent-primary/20">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-text-primary">Need Help?</h3>
              <p className="text-sm text-text-muted">Our support team is available for complex cases that require human intervention.</p>
            </div>
            <button className="w-full py-3 bg-accent-primary text-bg-main rounded-xl font-bold hover:bg-accent-secondary transition-all">
              Contact Support
            </button>
          </section>
        </div>
      </div>

      {/* Adjustment Modal */}
      <AnimatePresence>
        {showAdjustmentModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdjustmentModal(false)}
              className="absolute inset-0 bg-bg-main/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-bg-navbar border border-border-main rounded-3xl shadow-2xl p-8 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center">
                  <AlertCircle size={24} />
                </div>
                <button onClick={() => setShowAdjustmentModal(false)} className="text-text-muted hover:text-text-primary transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-text-primary">Limit Reached</h3>
                <p className="text-text-muted text-sm">
                  You have reached the maximum dispute limit (3) for this milestone. To continue, you must adjust the project terms.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <button className="flex items-center justify-between p-4 bg-bg-highlight border border-border-main rounded-2xl hover:border-accent-primary transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-primary/10 text-accent-primary rounded-lg flex items-center justify-center">
                      <Calendar size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-text-primary">Extend Deadline</p>
                      <p className="text-xs text-text-muted">Give the freelancer more time</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-text-muted group-hover:text-accent-primary transition-all" />
                </button>

                <button className="flex items-center justify-between p-4 bg-bg-highlight border border-border-main rounded-2xl hover:border-accent-primary transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center">
                      <DollarSign size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-text-primary">Add Extra Payment</p>
                      <p className="text-xs text-text-muted">Increase milestone budget</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-text-muted group-hover:text-accent-primary transition-all" />
                </button>
              </div>

              <p className="text-[10px] text-text-muted text-center uppercase tracking-widest">
                This will create a new milestone adjustment entry
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
