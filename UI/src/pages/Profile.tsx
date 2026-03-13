import React from 'react';
import { 
  User, 
  Mail, 
  MapPin, 
  Link as LinkIcon, 
  Github, 
  Twitter, 
  Globe, 
  Edit3, 
  Star, 
  Briefcase, 
  CheckCircle2, 
  Award,
  Plus,
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../components/AuthProvider';
import { motion } from 'framer-motion';

export const Profile: React.FC = () => {
  const { profile } = useAuth();
  const isFreelancer = profile?.role === 'freelancer';

  const mockPortfolio = [
    { name: 'DeFi Dashboard', desc: 'A real-time analytics dashboard for Uniswap pools.', link: 'github.com/demo/defi' },
    { name: 'NFT Marketplace', desc: 'Full-stack NFT marketplace on Polygon network.', link: 'github.com/demo/nft' },
    { name: 'Smart Contract Auditor', desc: 'AI tool for automated smart contract security checks.', link: 'github.com/demo/audit' },
  ];

  const skills = ['React', 'TypeScript', 'Solidity', 'Tailwind CSS', 'Node.js', 'Ethers.js'];

  return (
    <div className="flex flex-col gap-8">
      {/* Profile Header */}
      <section className="glass-card p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full -ml-32 -mb-32 blur-3xl" />
        
        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-bg-navbar shadow-2xl">
              <img 
                src={profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.name}`} 
                alt={profile?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-accent-primary text-bg-main rounded-xl flex items-center justify-center shadow-lg hover:bg-accent-secondary transition-all">
              <Edit3 size={18} />
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-text-primary">{profile?.name}</h1>
                <p className="text-accent-primary font-medium mt-1">{isFreelancer ? 'Senior Web3 Developer' : 'Product Manager @ TechFlow'}</p>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-end">
                <button className="px-6 py-2 bg-bg-highlight border border-border-main text-text-primary rounded-xl font-bold text-sm hover:border-accent-primary transition-all">
                  Edit Profile
                </button>
                <button className="p-2 bg-bg-highlight border border-border-main text-text-muted rounded-xl hover:text-accent-primary transition-all">
                  <LinkIcon size={20} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-text-muted">
              <span className="flex items-center gap-2"><Mail size={16} /> {profile?.email}</span>
              <span className="flex items-center gap-2"><MapPin size={16} /> San Francisco, CA</span>
              <span className="flex items-center gap-2"><Globe size={16} /> trustchain.id/{profile?.name?.toLowerCase().replace(' ', '')}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
              {skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-bg-highlight border border-border-main text-text-muted rounded-lg text-xs font-medium">
                  {skill}
                </span>
              ))}
              <button className="p-1 text-accent-primary hover:bg-accent-primary/10 rounded-lg transition-all">
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats & Reputation */}
        <div className="flex flex-col gap-8">
          <section className="glass-card p-8 flex flex-col gap-6">
            <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <Award size={20} className="text-accent-primary" /> Reputation
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-bg-highlight p-4 rounded-2xl border border-border-main text-center">
                <p className="text-2xl font-bold text-text-primary">{profile?.client_rating || '4.8'}</p>
                <p className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Rating</p>
              </div>
              <div className="bg-bg-highlight p-4 rounded-2xl border border-border-main text-center">
                <p className="text-2xl font-bold text-accent-primary">{isFreelancer ? '82' : profile?.completed_contracts || '12'}</p>
                <p className="text-[10px] text-text-muted uppercase tracking-widest mt-1">{isFreelancer ? 'Credit Score' : 'Contracts'}</p>
              </div>
              <div className="bg-bg-highlight p-4 rounded-2xl border border-border-main text-center col-span-2">
                <p className="text-2xl font-bold text-emerald-400">${profile?.total_earnings?.toLocaleString() || '24,500'}</p>
                <p className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Total {isFreelancer ? 'Earnings' : 'Spent'}</p>
              </div>
            </div>
          </section>

          <section className="glass-card p-8 flex flex-col gap-6">
            <h3 className="text-lg font-bold text-text-primary">Connect</h3>
            <div className="flex flex-col gap-3">
              <a href="#" className="flex items-center justify-between p-3 rounded-xl bg-bg-highlight border border-border-main text-text-muted hover:text-text-primary hover:border-accent-primary transition-all">
                <div className="flex items-center gap-3">
                  <Github size={20} />
                  <span className="text-sm font-medium">GitHub</span>
                </div>
                <ExternalLink size={16} />
              </a>
              <a href="#" className="flex items-center justify-between p-3 rounded-xl bg-bg-highlight border border-border-main text-text-muted hover:text-text-primary hover:border-accent-primary transition-all">
                <div className="flex items-center gap-3">
                  <Twitter size={20} />
                  <span className="text-sm font-medium">Twitter</span>
                </div>
                <ExternalLink size={16} />
              </a>
            </div>
          </section>
        </div>

        {/* Portfolio / Projects */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <section className="glass-card p-8 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-text-primary">Portfolio Projects</h3>
              <button className="text-accent-primary text-sm font-bold flex items-center gap-2 hover:underline">
                <Plus size={18} /> Add Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockPortfolio.map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-bg-highlight p-6 rounded-2xl border border-border-main flex flex-col gap-4 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-accent-primary/10 text-accent-primary flex items-center justify-center">
                      <Briefcase size={20} />
                    </div>
                    <a href={`https://${item.link}`} target="_blank" rel="noreferrer" className="text-text-muted hover:text-accent-primary transition-colors">
                      <Github size={20} />
                    </a>
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary group-hover:text-accent-primary transition-colors">{item.name}</h4>
                    <p className="text-xs text-text-muted mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-accent-primary uppercase tracking-widest mt-2">
                    View Case Study <ArrowUpRight size={14} />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="glass-card p-8 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-text-primary">Recent Contracts</h3>
            <div className="flex flex-col gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-bg-highlight border border-border-main">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-text-primary">E-commerce Platform Redesign</p>
                      <p className="text-xs text-text-muted">Completed Oct 2023 • Client: TechFlow</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-400">$4,200</p>
                    <div className="flex items-center gap-1 text-amber-400 text-[10px]">
                      <Star size={10} fill="currentColor" /> 5.0
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
