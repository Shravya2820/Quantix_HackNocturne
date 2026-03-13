import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { Project, Milestone, Profile } from '../types';
import { 
  Briefcase, 
  Clock, 
  ShieldCheck, 
  User, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  ArrowLeft,
  Lock,
  Zap,
  FileText,
  Star,
  ArrowRight,
  DollarSign,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_PROJECTS } from '../mockData';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams();
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundProject = MOCK_PROJECTS.find(p => p.id === id);
      if (foundProject) {
        setProject(foundProject);
        // Mock milestones for this project
        setMilestones([
          {
            id: 'm1',
            project_id: id,
            title: 'Project Kickoff & Research',
            description: 'Initial research, stakeholder interviews, and project planning.',
            amount: foundProject.budget * 0.2,
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'approved'
          },
          {
            id: 'm2',
            project_id: id,
            title: 'MVP Development - Phase 1',
            description: 'Core features implementation and initial testing.',
            amount: foundProject.budget * 0.5,
            deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'pending'
          },
          {
            id: 'm3',
            project_id: id,
            title: 'Final Delivery & Handover',
            description: 'Bug fixes, documentation, and final deployment.',
            amount: foundProject.budget * 0.3,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'pending'
          }
        ]);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleGenerateAI = () => {
    setIsGeneratingAI(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGeneratingAI(false);
      alert("AI has generated optimized milestones for your project scope!");
    }, 3000);
  };

  const handleApply = () => {
    alert("Application submitted! Your trust score and commitment stake will be verified on-chain.");
    navigate('/dashboard');
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-96 gap-4">
      <Loader2 className="w-12 h-12 text-accent-primary animate-spin" />
      <p className="text-text-muted font-medium animate-pulse">Fetching project details from TrustChain...</p>
    </div>
  );

  if (!project) return (
    <div className="flex flex-col items-center justify-center h-96 gap-6">
      <div className="w-20 h-20 bg-bg-highlight rounded-full flex items-center justify-center text-text-muted">
        <AlertCircle size={40} />
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-text-primary mb-2">Project not found</h3>
        <p className="text-text-muted">The project you are looking for does not exist or has been removed.</p>
      </div>
      <button onClick={() => navigate('/explore')} className="text-accent-primary font-bold hover:underline">
        Back to Explore
      </button>
    </div>
  );

  const isClient = profile?.id === project.client_id;
  const isFreelancer = profile?.id === project.freelancer_id;
  const canApply = !project.freelancer_id && profile?.role === 'freelancer';

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors w-fit">
        <ArrowLeft size={18} /> Back to Projects
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Project Info */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="glass-card p-8 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-text-primary">{project.title}</h1>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    project.status === 'active' ? 'bg-accent-primary/20 text-accent-primary' :
                    project.status === 'hiring' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <Clock size={16} /> Posted 2 days ago
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-emerald-400" /> Escrow Funded
                  </span>
                </div>
              </div>
              <div className="bg-bg-highlight p-4 rounded-2xl border border-border-main flex flex-col items-end">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Total Budget</span>
                <span className="text-3xl font-bold text-accent-primary">₹{project.budget.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-text-primary">Project Description</h3>
              <p className="text-text-muted leading-relaxed whitespace-pre-wrap">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-6 border-t border-border-main">
              {['React', 'TypeScript', 'Tailwind CSS', 'Smart Contracts', 'UI/UX Design'].map(skill => (
                <span key={skill} className="px-3 py-1.5 bg-bg-highlight rounded-lg text-xs font-medium text-text-primary border border-border-main">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-text-primary">Milestones & Deliverables</h3>
              {isClient && (
                <button 
                  onClick={handleGenerateAI}
                  disabled={isGeneratingAI}
                  className="flex items-center gap-2 text-accent-primary text-sm font-bold hover:underline disabled:opacity-50"
                >
                  {isGeneratingAI ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
                  Generate with AI
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {isGeneratingAI ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card p-12 flex flex-col items-center justify-center gap-6 text-center"
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-accent-primary/20 border-t-accent-primary animate-spin" />
                    <Zap className="absolute inset-0 m-auto text-accent-primary animate-pulse" size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-text-primary mb-2">AI is scoping your project...</h4>
                    <p className="text-text-muted max-w-sm">Gemini is analyzing your description to create fair, verifiable milestones and payment schedules.</p>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-4">
                  {milestones.map((m, i) => (
                    <motion.div 
                      key={m.id} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-bg-highlight flex items-center justify-center text-accent-primary font-bold border border-border-main">
                          {i + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-text-primary group-hover:text-accent-primary transition-colors">{m.title}</h4>
                          <p className="text-xs text-text-muted mt-1 max-w-md line-clamp-1">{m.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <p className="font-bold text-text-primary">₹{m.amount.toLocaleString()}</p>
                          <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Amount</p>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className="font-bold text-text-primary">{new Date(m.deadline).toLocaleDateString()}</p>
                          <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Deadline</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          m.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-bg-highlight text-text-muted border border-border-main'
                        }`}>
                          {m.status}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Client Info & Actions */}
        <div className="flex flex-col gap-8">
          <section className="glass-card p-8 flex flex-col gap-6">
            <h3 className="text-lg font-bold text-text-primary">About the Client</h3>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-bg-highlight rounded-2xl flex items-center justify-center text-accent-primary border border-border-main overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${project.client_id}`} alt="Avatar" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-text-primary">TechCorp Solutions</h4>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-bold">4.9</span>
                  <span className="text-text-muted text-xs font-normal ml-1">(24 reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4 border-t border-border-main">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Trust Score</span>
                <span className="font-bold text-accent-primary">92/100</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Verification</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={14} /> Identity Verified
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Total Spent</span>
                <span className="font-bold text-text-primary">₹12.5L+</span>
              </div>
            </div>
          </section>

          <section className="glass-card p-8 flex flex-col gap-6">
            <h3 className="text-lg font-bold text-text-primary">Contract Actions</h3>
            
            {canApply ? (
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-accent-primary/10 rounded-xl border border-accent-primary/20">
                  <p className="text-xs text-accent-primary leading-relaxed">
                    <strong>Note:</strong> Applying requires a 10% commitment stake (₹{(project.budget * 0.1).toLocaleString()}) which will be locked in escrow to ensure project reliability.
                  </p>
                </div>
                <button 
                  onClick={handleApply}
                  className="w-full bg-accent-primary text-bg-dark py-4 rounded-xl font-bold hover:bg-accent-secondary transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent-primary/20"
                >
                  Apply for Project <ArrowRight size={18} />
                </button>
              </div>
            ) : isFreelancer ? (
              <div className="flex flex-col gap-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-400 shrink-0" size={20} />
                  <p className="text-sm text-emerald-400 font-medium">You are the selected freelancer for this project.</p>
                </div>
                <button className="w-full bg-bg-highlight text-text-primary py-4 rounded-xl font-bold hover:bg-border-main transition-all border border-border-main">
                  Submit Deliverable
                </button>
              </div>
            ) : isClient ? (
              <div className="flex flex-col gap-4">
                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-3">
                  <AlertCircle className="text-blue-400 shrink-0" size={20} />
                  <p className="text-sm text-blue-400 font-medium">Waiting for a freelancer to apply.</p>
                </div>
                <button className="w-full border border-border-main py-4 rounded-xl font-bold hover:bg-bg-highlight transition-all text-text-primary">
                  Edit Project Scope
                </button>
              </div>
            ) : (
              <div className="bg-bg-highlight p-4 rounded-xl text-center border border-border-main">
                <p className="text-sm text-text-muted">This project is currently in progress.</p>
              </div>
            )}

            <div className="pt-4 border-t border-border-main flex flex-col gap-3">
              <button className="w-full flex items-center justify-between text-sm text-text-muted hover:text-text-primary transition-colors group">
                <span className="flex items-center gap-2"><Lock size={14} /> Smart Contract: 0x71...3a9</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full flex items-center justify-between text-sm text-text-muted hover:text-text-primary transition-colors group">
                <span className="flex items-center gap-2"><FileText size={14} /> View Scope Audit</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
