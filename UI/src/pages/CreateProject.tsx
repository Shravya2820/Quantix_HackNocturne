import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { Zap, ArrowRight, ArrowLeft, Plus, Trash2, Loader2, CheckCircle2, DollarSign, Clock, FileText, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MilestoneInput {
  title: string;
  description: string;
  amount: number;
  deadlineDays: number;
}

export const CreateProject: React.FC = () => {
  const { profile, isDemo } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step 1: Basic Info
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState<number>(0);

  // Step 2: Milestones
  const [milestones, setMilestones] = useState<MilestoneInput[]>([]);

  const handleGenerateMilestones = async () => {
    if (!title || !description || budget <= 0) return;
    setLoading(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      const mockMilestones: MilestoneInput[] = [
        {
          title: 'Project Setup & Architecture',
          description: 'Environment configuration, project structure, and core architecture design.',
          amount: Math.floor(budget * 0.2),
          deadlineDays: 7
        },
        {
          title: 'Core Feature Implementation',
          description: 'Development of the primary functional requirements as specified.',
          amount: Math.floor(budget * 0.5),
          deadlineDays: 21
        },
        {
          title: 'Testing & Final Handover',
          description: 'Quality assurance, bug fixes, and final project delivery.',
          amount: budget - Math.floor(budget * 0.2) - Math.floor(budget * 0.5),
          deadlineDays: 30
        }
      ];
      setMilestones(mockMilestones);
      setStep(2);
      setLoading(false);
    }, 2500);
  };

  const handleAddMilestone = () => {
    setMilestones([...milestones, { title: '', description: '', amount: 0, deadlineDays: 7 }]);
  };

  const handleRemoveMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const handleUpdateMilestone = (index: number, field: keyof MilestoneInput, value: any) => {
    const updated = [...milestones];
    updated[index] = { ...updated[index], [field]: value };
    setMilestones(updated);
  };

  const totalMilestoneAmount = milestones.reduce((sum, m) => sum + m.amount, 0);

  const handleFinalize = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Project created successfully! In a real scenario, this would deploy a smart contract escrow.");
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-text-primary">Create New Project</h1>
          <p className="text-text-muted">
            Step {step} of 3: {step === 1 ? 'Project Details' : step === 2 ? 'Milestone Scoping' : 'Final Review'}
          </p>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map(s => (
            <div 
              key={s} 
              className={`w-12 h-1.5 rounded-full transition-all duration-500 ${s <= step ? 'bg-accent-primary' : 'bg-bg-highlight'}`} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-8 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Project Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Build a Web3 Freelance Platform"
                  className="w-full bg-bg-mid border border-border-main rounded-xl py-3 px-4 text-text-primary focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Detailed Description</label>
                <textarea 
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain exactly what you need. Our AI will use this to generate milestones..."
                  className="w-full bg-bg-mid border border-border-main rounded-xl py-3 px-4 text-text-primary focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary outline-none resize-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Total Budget (INR)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input 
                    type="number" 
                    value={budget || ''}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    placeholder="50000"
                    className="w-full bg-bg-mid border border-border-main rounded-xl py-3 pl-12 pr-4 text-text-primary focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={handleGenerateMilestones}
              disabled={loading || !title || !description || budget <= 0}
              className="w-full bg-accent-primary text-bg-dark py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent-secondary transition-all disabled:opacity-50 shadow-lg shadow-accent-primary/20"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Zap size={20} />}
              Generate Milestones with AI
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-text-primary">AI-Optimized Milestones</h3>
              <button 
                onClick={handleAddMilestone}
                className="flex items-center gap-2 text-accent-primary hover:text-accent-secondary font-bold text-sm"
              >
                <Plus size={18} /> Add Manual Milestone
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {milestones.map((m, index) => (
                <div key={index} className="glass-card p-6 flex flex-col gap-6 relative group border-l-4 border-l-accent-primary">
                  <button 
                    onClick={() => handleRemoveMilestone(index)}
                    className="absolute top-4 right-4 text-text-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={18} />
                  </button>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 flex flex-col gap-4">
                      <input 
                        type="text" 
                        value={m.title}
                        onChange={(e) => handleUpdateMilestone(index, 'title', e.target.value)}
                        placeholder="Milestone Title"
                        className="w-full bg-bg-mid border border-border-main rounded-lg py-2 px-3 text-text-primary font-bold focus:border-accent-primary outline-none"
                      />
                      <textarea 
                        rows={2}
                        value={m.description}
                        onChange={(e) => handleUpdateMilestone(index, 'description', e.target.value)}
                        placeholder="What will be delivered?"
                        className="w-full bg-bg-mid border border-border-main rounded-lg py-2 px-3 text-text-primary text-sm resize-none focus:border-accent-primary outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Amount (INR)</label>
                        <input 
                          type="number" 
                          value={m.amount}
                          onChange={(e) => handleUpdateMilestone(index, 'amount', Number(e.target.value))}
                          className="w-full bg-bg-mid border border-border-main rounded-lg py-2 px-3 text-text-primary focus:border-accent-primary outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Deadline (Days)</label>
                        <input 
                          type="number" 
                          value={m.deadlineDays}
                          onChange={(e) => handleUpdateMilestone(index, 'deadlineDays', Number(e.target.value))}
                          className="w-full bg-bg-mid border border-border-main rounded-lg py-2 px-3 text-text-primary focus:border-accent-primary outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 border-accent-primary/20">
              <div className="flex flex-col">
                <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Total Milestone Budget</p>
                <p className={`text-2xl font-bold ${totalMilestoneAmount === budget ? "text-accent-primary" : "text-red-400"}`}>
                  ₹{totalMilestoneAmount.toLocaleString()} / ₹{budget.toLocaleString()}
                </p>
                {totalMilestoneAmount !== budget && (
                  <p className="text-[10px] text-red-400 mt-1">Total must equal project budget</p>
                )}
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 rounded-xl border border-border-main font-bold text-text-primary hover:bg-bg-highlight transition-all"
                >
                  Back
                </button>
                <button 
                  onClick={() => setStep(3)}
                  disabled={totalMilestoneAmount !== budget}
                  className="flex-1 bg-accent-primary text-bg-dark px-8 py-3 rounded-xl font-bold hover:bg-accent-secondary transition-all disabled:opacity-50"
                >
                  Review Contract
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-8"
          >
            <div className="glass-card p-8 flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-2xl font-bold text-text-primary">Contract Final Review</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Project Name</label>
                    <p className="text-lg font-bold text-text-primary">{title}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Total Budget</label>
                    <p className="text-3xl font-bold text-accent-primary">₹{budget.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Milestones</label>
                    <p className="text-lg font-bold text-text-primary">{milestones.length} Phases</p>
                  </div>
                  <div className="p-4 bg-bg-highlight rounded-xl border border-border-main">
                    <p className="text-xs text-text-muted leading-relaxed">
                      <strong>Escrow Policy:</strong> 100% of the budget will be locked in the TrustChain smart contract upon posting. Funds are released only when you approve milestones.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border-main pt-6 flex flex-col gap-4">
                <h4 className="font-bold text-text-muted uppercase text-[10px] tracking-widest">Milestone Breakdown</h4>
                <div className="flex flex-col gap-2">
                  {milestones.map((m, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-bg-mid rounded-lg border border-border-main/50">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary text-[10px] font-bold">
                          {i + 1}
                        </div>
                        <span className="font-medium text-sm text-text-primary">{m.title}</span>
                      </div>
                      <span className="font-bold text-sm text-text-primary">₹{m.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button 
                onClick={() => setStep(2)}
                className="flex-1 py-4 rounded-xl border border-border-main font-bold text-text-primary hover:bg-bg-highlight transition-all"
              >
                Back to Milestones
              </button>
              <button 
                onClick={handleFinalize}
                disabled={loading}
                className="flex-[2] bg-accent-primary text-bg-dark py-4 rounded-xl font-bold hover:bg-accent-secondary transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent-primary/20"
              >
                {loading ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={20} />}
                Lock Contract & Post Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
