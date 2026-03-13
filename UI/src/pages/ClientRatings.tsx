import React from 'react';
import { 
  Star, 
  CheckCircle2, 
  MessageSquare, 
  Briefcase, 
  TrendingUp, 
  Award,
  ArrowUpRight,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../components/AuthProvider';

export const ClientRatings: React.FC = () => {
  const { profile } = useAuth();
  
  const mockRatings = [
    { id: '1', client: 'TechFlow', project: 'E-commerce Redesign', rating: 5, comment: 'Excellent work! The code quality is top-notch and the communication was perfect.', date: 'Oct 2023' },
    { id: '2', client: 'WebScale', project: 'NFT Marketplace', rating: 4.5, comment: 'Great developer, delivered on time. Highly recommended for Web3 projects.', date: 'Sep 2023' },
    { id: '3', client: 'CryptoLabs', project: 'Smart Contract Audit', rating: 5, comment: 'Very thorough and professional. Found critical bugs we missed.', date: 'Aug 2023' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-text-primary">Client Ratings</h1>
        <p className="text-text-muted">Your track record of excellence and client satisfaction.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rating Overview */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <section className="glass-card p-8 flex flex-col gap-8">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-24 h-24 bg-accent-primary/10 text-accent-primary rounded-3xl flex items-center justify-center relative">
                <Star size={48} fill="currentColor" />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 text-bg-main rounded-xl flex items-center justify-center shadow-lg">
                  <Award size={20} />
                </div>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-text-primary">{profile?.client_rating || '4.8'}</h3>
                <p className="text-text-muted text-sm font-medium mt-1">Average Client Rating</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {[5, 4, 3, 2, 1].map(star => (
                <div key={star} className="flex items-center gap-4">
                  <span className="text-xs font-bold text-text-muted w-4">{star}</span>
                  <div className="flex-1 h-2 bg-bg-highlight rounded-full overflow-hidden border border-border-main">
                    <div 
                      className="h-full bg-accent-primary" 
                      style={{ width: star === 5 ? '85%' : star === 4 ? '10%' : '2%' }} 
                    />
                  </div>
                  <span className="text-xs font-bold text-text-muted w-8">{star === 5 ? '85%' : star === 4 ? '10%' : '2%'}</span>
                </div>
              ))}
            </div>

            <div className="h-px bg-border-main" />

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-xl font-bold text-text-primary">100%</p>
                <p className="text-[10px] text-text-muted uppercase tracking-widest">Success Rate</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-text-primary">92%</p>
                <p className="text-[10px] text-text-muted uppercase tracking-widest">On Time</p>
              </div>
            </div>
          </section>
        </div>

        {/* Ratings List */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <h2 className="text-xl font-bold text-text-primary">Recent Feedback</h2>
          <div className="flex flex-col gap-4">
            {mockRatings.map((rating, index) => (
              <motion.div 
                key={rating.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 flex flex-col gap-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-bg-highlight border border-border-main flex items-center justify-center text-text-muted">
                      <User size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary">{rating.client}</h4>
                      <p className="text-xs text-text-muted">Project: {rating.project}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < Math.floor(rating.rating) ? "currentColor" : "none"} />
                      ))}
                      <span className="text-sm font-bold ml-1">{rating.rating}</span>
                    </div>
                    <span className="text-[10px] text-text-muted uppercase tracking-widest">{rating.date}</span>
                  </div>
                </div>
                <div className="bg-bg-highlight p-4 rounded-xl border border-border-main italic text-sm text-text-muted leading-relaxed">
                  "{rating.comment}"
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                    <CheckCircle2 size={14} /> Verified Contract
                  </div>
                  <button className="text-accent-primary text-xs font-bold flex items-center gap-1 hover:underline">
                    View Project <ArrowUpRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ClientRating = ClientRatings; // Alias for consistency
