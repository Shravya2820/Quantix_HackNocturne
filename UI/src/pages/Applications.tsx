import React from 'react';
import { 
  Send, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Briefcase, 
  DollarSign, 
  Calendar,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_APPLICATIONS } from '../mockData';
import { useNavigate } from 'react-router-dom';

export const Applications: React.FC = () => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'pending': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-bg-highlight text-text-muted border-border-main';
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-text-primary">My Applications</h1>
        <p className="text-text-muted">Track the status of your project proposals and communications.</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_APPLICATIONS.map((app, index) => (
          <motion.div 
            key={app.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-accent-primary/30 transition-all"
          >
            <div className="flex items-center gap-6 flex-1">
              <div className="w-14 h-14 rounded-2xl bg-bg-highlight flex items-center justify-center text-accent-primary border border-border-main">
                <Briefcase size={28} />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">{app.project_title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                  <span className="flex items-center gap-1"><DollarSign size={14} /> ${app.bid_amount.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Calendar size={14} /> {app.delivery_time}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> Applied {new Date(app.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${getStatusColor(app.status)}`}>
                {app.status}
              </div>
              <div className="h-10 w-px bg-border-main hidden md:block" />
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => navigate('/messages')}
                  className="p-3 rounded-xl bg-bg-highlight text-text-muted hover:text-accent-primary hover:bg-accent-primary/10 transition-all"
                  title="Message Client"
                >
                  <MessageSquare size={20} />
                </button>
                <button 
                  onClick={() => navigate(`/projects/${app.project_id}`)}
                  className="px-6 py-3 bg-bg-highlight border border-border-main text-text-primary rounded-xl font-bold text-sm hover:border-accent-primary transition-all flex items-center gap-2"
                >
                  View Job <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {MOCK_APPLICATIONS.length === 0 && (
          <div className="glass-card p-20 text-center flex flex-col items-center gap-6 border-dashed">
            <div className="w-20 h-20 bg-bg-highlight rounded-full flex items-center justify-center text-text-muted">
              <Send size={40} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold text-text-primary">No applications yet</h3>
              <p className="text-text-muted">Start applying for jobs to see them listed here.</p>
            </div>
            <button 
              onClick={() => navigate('/explore')}
              className="px-8 py-3 bg-accent-primary text-bg-main rounded-xl font-bold hover:bg-accent-secondary transition-all"
            >
              Explore Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
