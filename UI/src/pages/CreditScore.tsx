import React from 'react';
import { useAuth } from '../components/AuthProvider';
import { 
  Star, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  DollarSign,
  Zap,
  Award,
  BarChart3
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

export const CreditScore: React.FC = () => {
  const { profile } = useAuth();

  const data = [
    { month: 'Oct', score: 45 },
    { month: 'Nov', score: 52 },
    { month: 'Dec', score: 48 },
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 78 },
    { month: 'Mar', score: 82 },
  ];

  const factors = [
    { label: 'Completion Rate', weight: '30%', desc: 'Percentage of successfully completed milestones', value: '98%' },
    { label: 'On-Time Delivery', weight: '25%', desc: 'Milestones delivered before deadline', value: '95%' },
    { label: 'Dispute Rate', weight: '15%', desc: 'Number of disputes raised by clients', value: '0%' },
    { label: 'Revision Efficiency', weight: '10%', desc: 'Number of attempts used per milestone', value: '1.2 avg' },
    { label: 'Payment Volume', weight: '10%', desc: 'Total value of completed contracts', value: '₹12.5L' },
    { label: 'Client Satisfaction', weight: '10%', desc: 'Feedback given after milestone approval', value: '4.9/5' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-text-primary">Freelancer Credit Score</h1>
        <p className="text-text-muted">Your on-chain reputation is your most valuable asset in the TrustChain ecosystem.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Score Card */}
        <div className="lg:col-span-2 glass-card p-10 flex flex-col md:flex-row items-center gap-12">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="110"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className="text-bg-highlight"
              />
              <circle
                cx="128"
                cy="128"
                r="110"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeDasharray={2 * Math.PI * 110}
                strokeDashoffset={2 * Math.PI * 110 * (1 - 82 / 100)}
                className="text-accent-primary"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-black text-text-primary">82</span>
              <span className="text-sm font-bold text-text-muted uppercase tracking-widest">Credit Score</span>
              <div className="mt-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                Excellent
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-bold text-text-primary">How Credit Score is Calculated</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Your score is a weighted average of your performance across multiple metrics. 
                Higher scores unlock lower escrow fees and priority in job listings.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {factors.slice(0, 3).map((f, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-text-primary">{f.label}</span>
                    <span className="text-[10px] text-text-muted uppercase">{f.desc}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-accent-primary">{f.value}</span>
                    <p className="text-[10px] text-text-muted">Weight: {f.weight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Improvement Panel */}
        <div className="glass-card p-8 flex flex-col gap-6">
          <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
            <Zap size={20} className="text-amber-400" /> Improvement Insights
          </h3>
          <div className="flex flex-col gap-4">
            {[
              "Deliver milestones before deadlines to increase score",
              "Reduce revision attempts to improve efficiency rating",
              "Avoid disputes by communicating clearly with clients",
              "Maintain consistent project completion for stability"
            ].map((insight, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl bg-bg-highlight border border-border-main text-xs text-text-muted">
                <div className="w-5 h-5 rounded-full bg-accent-primary/10 text-accent-primary flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                {insight}
              </div>
            ))}
          </div>
          <button className="w-full py-3 bg-accent-primary text-bg-main rounded-xl font-bold text-sm hover:bg-accent-secondary transition-all">
            View Detailed Analytics
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Full Breakdown */}
        <div className="lg:col-span-2 glass-card p-8 flex flex-col gap-6">
          <h3 className="text-xl font-bold text-text-primary">Metric Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {factors.map((f, i) => (
              <div key={i} className="p-4 rounded-2xl bg-bg-highlight border border-border-main flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-text-primary">{f.label}</span>
                  <span className="text-xs font-bold text-accent-primary">{f.value}</span>
                </div>
                <div className="h-1.5 bg-bg-main rounded-full overflow-hidden">
                  <div className="h-full bg-accent-primary" style={{ width: f.value.includes('%') ? f.value : '90%' }} />
                </div>
                <div className="flex justify-between text-[10px] text-text-muted uppercase tracking-widest">
                  <span>Weight: {f.weight}</span>
                  <span>Impact: High</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="glass-card p-8 flex flex-col gap-6">
          <h3 className="text-xl font-bold text-text-primary">Trust Badges</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-bg-highlight p-4 rounded-2xl flex flex-col items-center gap-3 text-center border border-border-main hover:border-accent-primary/30 transition-all group">
              <ShieldCheck className="text-accent-primary group-hover:scale-110 transition-transform" size={32} />
              <p className="text-[10px] font-bold text-text-primary uppercase tracking-widest">Identity Verified</p>
            </div>
            <div className="bg-bg-highlight p-4 rounded-2xl flex flex-col items-center gap-3 text-center border border-border-main hover:border-emerald-400/30 transition-all group">
              <DollarSign className="text-emerald-400 group-hover:scale-110 transition-transform" size={32} />
              <p className="text-[10px] font-bold text-text-primary uppercase tracking-widest">High Volume</p>
            </div>
            <div className="bg-bg-highlight p-4 rounded-2xl flex flex-col items-center gap-3 text-center border border-border-main hover:border-blue-400/30 transition-all group">
              <Clock className="text-blue-400 group-hover:scale-110 transition-transform" size={32} />
              <p className="text-[10px] font-bold text-text-primary uppercase tracking-widest">Early Adopter</p>
            </div>
            <div className="bg-bg-highlight p-4 rounded-2xl flex flex-col items-center gap-3 text-center border border-border-main hover:border-amber-400/30 transition-all group">
              <Star className="text-amber-400 group-hover:scale-110 transition-transform" size={32} />
              <p className="text-[10px] font-bold text-text-primary uppercase tracking-widest">Top Rated</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Score History */}
        <div className="lg:col-span-2 glass-card p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-text-primary">Score History</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-lg bg-bg-highlight text-xs font-bold text-text-primary border border-border-main">6M</button>
              <button className="px-3 py-1 text-xs font-bold text-text-muted hover:text-text-primary transition-colors">1Y</button>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1ED2D6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1ED2D6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1B2A32" vertical={false} />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#031E26', border: '1px solid #1B2A32', borderRadius: '12px' }}
                  itemStyle={{ color: '#1ED2D6' }}
                />
                <Area type="monotone" dataKey="score" stroke="#1ED2D6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reputation Summary */}
        <div className="glass-card p-8 flex flex-col gap-6">
          <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Award size={20} className="text-accent-primary" /> Reputation Summary
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center p-3 rounded-xl bg-bg-highlight border border-border-main">
              <span className="text-xs text-text-muted uppercase tracking-widest">Reliability</span>
              <span className="text-sm font-bold text-text-primary">98.4%</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-bg-highlight border border-border-main">
              <span className="text-xs text-text-muted uppercase tracking-widest">Avg. Rating</span>
              <span className="text-sm font-bold text-text-primary">4.95 / 5</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-bg-highlight border border-border-main">
              <span className="text-xs text-text-muted uppercase tracking-widest">Total Volume</span>
              <span className="text-sm font-bold text-text-primary">₹12.5L</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-bg-highlight border border-border-main">
              <span className="text-xs text-text-muted uppercase tracking-widest">Disputes</span>
              <span className="text-sm font-bold text-emerald-400">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
