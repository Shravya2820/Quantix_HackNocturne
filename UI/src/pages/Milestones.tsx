import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  DollarSign, 
  ChevronRight, 
  ArrowUpRight,
  ShieldCheck,
  PlusCircle,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../components/AuthProvider';
import { MOCK_MILESTONES, MOCK_PROJECTS } from '../mockData';
import { useNavigate } from 'react-router-dom';

export const Milestones: React.FC = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const isClient = profile?.role === 'client';

  const activeProject = MOCK_PROJECTS[0];
  const milestones = MOCK_MILESTONES.filter(m => m.project_id === activeProject.id);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'in-progress': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'pending': return 'bg-bg-highlight text-text-muted border-border-main';
      default: return 'bg-bg-highlight text-text-muted border-border-main';
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-text-primary">Project Milestones</h1>
          <p className="text-text-muted">{activeProject.title} • {milestones.length} Total Milestones</p>
        </div>
        {isClient && (
          <button className="px-6 py-3 bg-accent-primary text-bg-main rounded-xl font-bold hover:bg-accent-secondary transition-all flex items-center gap-2">
            <PlusCircle size={20} /> Add Milestone
          </button>
        )}
      </header>

      <div className="grid grid-cols-1 gap-6">
        {milestones.map((milestone, index) => (
          <motion.div 
            key={milestone.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-8 flex flex-col md:flex-row gap-8 group hover:border-accent-primary/30 transition-all"
          >
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    milestone.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 
                    milestone.status === 'in-progress' ? 'bg-blue-500/10 text-blue-400' : 'bg-bg-highlight text-text-muted'
                  }`}>
                    {milestone.status === 'completed' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">Milestone {milestone.id}</h3>
                    <p className="text-xs text-text-muted">Due: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusStyle(milestone.status)}`}>
                  {milestone.status}
                </div>
              </div>
              
              <p className="text-sm text-text-muted leading-relaxed">
                {milestone.description}
              </p>

              <div className="flex items-center gap-6 mt-2">
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-muted uppercase tracking-widest">Amount</span>
                  <span className="text-lg font-bold text-emerald-400">${milestone.amount.toLocaleString()}</span>
                </div>
                <div className="w-px h-8 bg-border-main" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-muted uppercase tracking-widest">Disputes</span>
                  <span className={`text-lg font-bold ${milestone.dispute_count > 0 ? 'text-amber-400' : 'text-text-primary'}`}>
                    {milestone.dispute_count} / 3
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-3 md:w-48">
              {isClient ? (
                <>
                  <button 
                    onClick={() => navigate(`/review-submission/${milestone.id}`)}
                    className="w-full py-3 bg-accent-primary text-bg-main rounded-xl font-bold text-sm hover:bg-accent-secondary transition-all flex items-center justify-center gap-2"
                  >
                    Review Work
                  </button>
                  <button className="w-full py-3 bg-bg-highlight border border-border-main text-text-primary rounded-xl font-bold text-sm hover:border-accent-primary transition-all flex items-center justify-center gap-2">
                    <MessageSquare size={18} /> Message
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => navigate(`/submit-work/${milestone.id}`)}
                    className="w-full py-3 bg-accent-primary text-bg-main rounded-xl font-bold text-sm hover:bg-accent-secondary transition-all flex items-center justify-center gap-2"
                  >
                    Submit Work
                  </button>
                  <button className="w-full py-3 bg-bg-highlight border border-border-main text-text-primary rounded-xl font-bold text-sm hover:border-accent-primary transition-all flex items-center justify-center gap-2">
                    <MessageSquare size={18} /> Message
                  </button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Summary */}
      <section className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-text-primary">Project Progress</h3>
          <p className="text-sm text-text-muted">Overall completion based on approved milestones.</p>
        </div>
        
        <div className="flex-1 max-w-md w-full flex flex-col gap-3">
          <div className="flex justify-between text-sm font-bold">
            <span className="text-text-primary">65% Completed</span>
            <span className="text-accent-primary">2 / 3 Milestones</span>
          </div>
          <div className="w-full h-3 bg-bg-highlight rounded-full overflow-hidden border border-border-main">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-accent-primary shadow-[0_0_15px_rgba(30,210,214,0.5)]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
          <ShieldCheck size={20} />
          Escrow Protected
        </div>
      </section>
    </div>
  );
};
