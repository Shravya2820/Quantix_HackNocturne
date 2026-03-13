import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  ArrowRight,
  Database,
  ExternalLink,
  Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../components/AuthProvider';
import { MOCK_PROJECTS, MOCK_MILESTONES } from '../mockData';

export const EscrowTracker: React.FC = () => {
  const { profile } = useAuth();
  const isClient = profile?.role === 'client';

  const activeProject = MOCK_PROJECTS[0];
  const milestones = MOCK_MILESTONES.filter(m => m.project_id === activeProject.id);

  const totalEscrow = milestones.reduce((acc, m) => acc + m.amount, 0);
  const releasedEscrow = milestones.filter(m => m.status === 'completed').reduce((acc, m) => acc + m.amount, 0);
  const lockedEscrow = totalEscrow - releasedEscrow;

  const steps = [
    { label: 'Contract Created', status: 'completed', date: 'Oct 12, 2023' },
    { label: 'Escrow Funded', status: 'completed', date: 'Oct 13, 2023' },
    { label: 'Milestone 1 Submitted', status: 'completed', date: 'Oct 20, 2023' },
    { label: 'Client Review', status: 'current', date: 'In Progress' },
    { label: 'Payment Released', status: 'pending', date: 'Upcoming' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-text-primary">Escrow Tracker</h1>
        <p className="text-text-muted">Real-time transparency for your project funds and smart contract status.</p>
      </header>

      {/* Escrow Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-8 flex flex-col gap-4 border-l-4 border-l-blue-400">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center">
              <Lock size={24} />
            </div>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Locked</span>
          </div>
          <div>
            <p className="text-text-muted text-sm font-medium">Escrow Locked Amount</p>
            <h3 className="text-3xl font-bold text-text-primary mt-1">${lockedEscrow.toLocaleString()}</h3>
          </div>
        </div>

        <div className="glass-card p-8 flex flex-col gap-4 border-l-4 border-l-emerald-400">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center">
              <Unlock size={24} />
            </div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Released</span>
          </div>
          <div>
            <p className="text-text-muted text-sm font-medium">Payment Released</p>
            <h3 className="text-3xl font-bold text-text-primary mt-1">${releasedEscrow.toLocaleString()}</h3>
          </div>
        </div>

        <div className="glass-card p-8 flex flex-col gap-4 border-l-4 border-l-accent-primary">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-accent-primary/10 text-accent-primary rounded-xl flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <span className="text-[10px] font-bold text-accent-primary uppercase tracking-widest">Funded</span>
          </div>
          <div>
            <p className="text-text-muted text-sm font-medium">Milestones Funded</p>
            <h3 className="text-3xl font-bold text-text-primary mt-1">{milestones.length} / {milestones.length}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline Visualization */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <section className="glass-card p-8 flex flex-col gap-8">
            <h2 className="text-xl font-bold text-text-primary">Transaction Timeline</h2>
            
            <div className="relative flex flex-col gap-12 pl-8 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border-main">
              {steps.map((step, index) => (
                <div key={index} className="relative flex items-start justify-between">
                  <div className={`absolute -left-[25px] w-5 h-5 rounded-full border-4 border-bg-navbar z-10 ${
                    step.status === 'completed' ? 'bg-emerald-400' : 
                    step.status === 'current' ? 'bg-accent-primary animate-pulse' : 'bg-bg-highlight'
                  }`} />
                  
                  <div className="flex flex-col gap-1">
                    <h4 className={`font-bold ${step.status === 'completed' ? 'text-text-primary' : step.status === 'current' ? 'text-accent-primary' : 'text-text-muted'}`}>
                      {step.label}
                    </h4>
                    <p className="text-xs text-text-muted">{step.date}</p>
                  </div>

                  {step.status === 'completed' && (
                    <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                      <ShieldCheck size={14} /> Verified
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Smart Contract Details */}
          <section className="glass-card p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">Smart Contract Details</h2>
              <button className="text-accent-primary text-sm font-bold flex items-center gap-2 hover:underline">
                <ExternalLink size={16} /> View on Explorer
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-text-muted uppercase tracking-widest">Contract Address</span>
                <div className="bg-bg-highlight p-4 rounded-xl border border-border-main font-mono text-xs text-text-primary truncate">
                  0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-text-muted uppercase tracking-widest">Transaction Hash</span>
                <div className="bg-bg-highlight p-4 rounded-xl border border-border-main font-mono text-xs text-text-primary truncate">
                  0x4f8e23...a1b2c3d4e5f6g7h8i9j0
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button className="flex-1 py-3 bg-bg-highlight border border-border-main text-text-primary rounded-xl font-bold text-sm hover:border-accent-primary transition-all flex items-center justify-center gap-2">
                <Database size={18} /> Download Contract JSON
              </button>
              <button className="flex-1 py-3 bg-bg-highlight border border-border-main text-text-primary rounded-xl font-bold text-sm hover:border-accent-primary transition-all flex items-center justify-center gap-2">
                <ShieldCheck size={18} /> Verify Audit Report
              </button>
            </div>
          </section>
        </div>

        {/* Project Context */}
        <div className="flex flex-col gap-8">
          <section className="glass-card p-8 flex flex-col gap-6">
            <h3 className="text-lg font-bold text-text-primary">Active Project</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-bg-highlight rounded-xl flex items-center justify-center text-accent-primary border border-border-main">
                <Briefcase size={24} />
              </div>
              <div>
                <h4 className="font-bold text-text-primary">{activeProject.title}</h4>
                <p className="text-xs text-text-muted">Client: {activeProject.client_name}</p>
              </div>
            </div>
            <div className="h-px bg-border-main" />
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Total Budget</span>
                <span className="text-lg font-bold text-text-primary">${activeProject.budget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Milestones</span>
                <span className="text-sm font-bold text-text-primary">{milestones.length}</span>
              </div>
            </div>
          </section>

          <section className="glass-card p-8 flex flex-col gap-4 bg-emerald-500/5 border-emerald-500/20">
            <div className="flex items-center gap-3 text-emerald-400">
              <ShieldCheck size={24} />
              <h3 className="text-lg font-bold">Funds Secured</h3>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              All project funds are currently held in the TrustChain Escrow Smart Contract. 
              Release is triggered only upon milestone approval or AI-mediated dispute resolution.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
