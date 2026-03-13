import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  TrendingUp, 
  Users, 
  Clock,
  ArrowUpRight,
  Star,
  DollarSign,
  Send,
  PlusCircle,
  Search
} from 'lucide-react';
import { useAuth } from '../components/AuthProvider';
import { MOCK_PROJECTS, MOCK_CLIENT_STATS, MOCK_FREELANCER_STATS } from '../mockData';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatCard = ({ icon: Icon, label, value, trend, onClick, color = "accent-primary" }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    onClick={onClick}
    className="glass-card p-6 flex flex-col gap-4 cursor-pointer group hover:border-accent-primary/30 transition-all"
  >
    <div className="flex items-center justify-between">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${color}/10 text-${color}`}>
        <Icon size={24} />
      </div>
      <div className="flex items-center gap-1 text-emerald-400 text-sm font-bold">
        <TrendingUp size={14} />
        {trend}
      </div>
    </div>
    <div>
      <p className="text-text-muted text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-bold text-text-primary mt-1">{value}</h3>
    </div>
    <div className="flex items-center gap-1 text-xs text-text-muted group-hover:text-accent-primary transition-colors">
      View Details <ArrowUpRight size={14} />
    </div>
  </motion.div>
);

const chartData = [
  { name: 'Jan', score: 4.2 },
  { name: 'Feb', score: 4.5 },
  { name: 'Mar', score: 4.8 },
  { name: 'Apr', score: 4.7 },
  { name: 'May', score: 4.9 },
];

export const Dashboard: React.FC = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const isClient = profile?.role === 'client';

  const stats = isClient ? [
    { icon: Briefcase, label: 'Active Projects', value: MOCK_CLIENT_STATS.activeProjects, trend: '+2', path: '/projects', color: 'accent-primary' },
    { icon: CheckCircle2, label: 'Milestones Pending', value: MOCK_CLIENT_STATS.milestonesPending, trend: '+3', path: '/milestones', color: 'emerald-400' },
    { icon: ShieldCheck, label: 'Escrow Locked', value: `$${MOCK_CLIENT_STATS.escrowLocked.toLocaleString()}`, trend: '+$1.2k', path: '/escrow', color: 'blue-400' },
    { icon: AlertCircle, label: 'Disputes Open', value: MOCK_CLIENT_STATS.disputesOpen, trend: '0', path: '/disputes', color: 'amber-400' },
  ] : [
    { icon: Briefcase, label: 'Active Contracts', value: MOCK_FREELANCER_STATS.activeContracts, trend: '+1', path: '/milestones', color: 'accent-primary' },
    { icon: Clock, label: 'Milestones In Progress', value: '3', trend: '+2', path: '/milestones', color: 'blue-400' },
    { icon: ShieldCheck, label: 'Pending Payments', value: '$1,200', trend: '+$400', path: '/escrow', color: 'amber-400' },
    { icon: DollarSign, label: 'Total Earnings', value: `$${MOCK_FREELANCER_STATS.totalEarnings.toLocaleString()}`, trend: '+$2.5k', path: '/escrow', color: 'emerald-400' },
  ];

  const recentProjects = MOCK_PROJECTS.slice(0, 3);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-text-primary">
          {isClient ? 'Employer Dashboard' : 'Freelancer Workspace'}
        </h1>
        <p className="text-text-muted">
          {isClient ? "Manage your projects and escrow funding." : "Track your active contracts and milestone progress."}
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard 
            key={index} 
            {...stat} 
            onClick={() => navigate(stat.path)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {!isClient && (
            <section className="glass-card p-6 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-text-primary">Active Contract Panel</h2>
                <button onClick={() => navigate('/milestones')} className="text-accent-primary text-sm font-bold hover:underline">View All</button>
              </div>
              <div className="bg-bg-highlight/50 rounded-2xl p-6 border border-border-main">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">AI Chatbot UI Implementation</h3>
                    <p className="text-sm text-text-muted">Budget: ₹45,000</p>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    In Progress
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-text-muted">Overall Progress</span>
                      <span className="text-accent-primary font-bold">65%</span>
                    </div>
                    <div className="h-2 bg-bg-main rounded-full overflow-hidden">
                      <div className="h-full bg-accent-primary w-[65%]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {['UI Components', 'Dashboard Integration', 'Deployment'].map((m, i) => (
                      <div key={i} className="p-3 rounded-xl bg-bg-main border border-border-main flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-emerald-400' : i === 1 ? 'bg-accent-primary' : 'bg-text-muted'}`} />
                        <span className="text-xs font-medium text-text-primary">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/milestones')}
                  className="w-full mt-6 py-3 bg-accent-primary text-bg-main rounded-xl font-bold hover:bg-accent-secondary transition-all"
                >
                  View Milestones
                </button>
              </div>
            </section>
          )}

          {/* Chart Section */}
          <section className="glass-card p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">{isClient ? 'Escrow Activity' : 'Earnings Overview'}</h2>
              <select className="bg-bg-highlight border border-border-main rounded-lg px-3 py-1.5 text-xs text-text-primary outline-none">
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1ED2D6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1ED2D6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E3A44" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A2A35', border: '1px solid #1E3A44', borderRadius: '12px' }}
                    itemStyle={{ color: '#1ED2D6' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#1ED2D6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Recent Projects */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">Recent Projects</h2>
              <button 
                onClick={() => navigate('/projects')}
                className="text-accent-primary text-sm font-bold hover:underline"
              >
                View All
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              {recentProjects.length > 0 ? (
                recentProjects.map((project) => (
                  <div 
                    key={project.id}
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="glass-card p-5 flex items-center justify-between hover:bg-bg-highlight transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-bg-highlight flex items-center justify-center text-accent-primary border border-border-main">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-text-primary group-hover:text-accent-primary transition-colors">{project.title}</h4>
                        <p className="text-xs text-text-muted mt-1">Budget: ${project.budget.toLocaleString()} • {project.milestoneCount} Milestones</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        project.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 
                        project.status === 'hiring' ? 'bg-blue-500/20 text-blue-400' : 'bg-bg-highlight text-text-muted'
                      }`}>
                        {project.status}
                      </div>
                      <ArrowUpRight size={18} className="text-text-muted group-hover:text-accent-primary transition-all" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="glass-card p-12 flex flex-col items-center justify-center text-center gap-4 border-dashed">
                  <div className="w-16 h-16 bg-bg-highlight rounded-full flex items-center justify-center text-text-muted">
                    <Briefcase size={32} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-text-primary">No active projects</h4>
                    <p className="text-sm text-text-muted mt-1">Start by creating a new project or exploring jobs.</p>
                  </div>
                  <button 
                    onClick={() => navigate(isClient ? '/create-project' : '/explore')}
                    className="mt-2 px-6 py-2 bg-accent-primary text-bg-main rounded-xl font-bold hover:bg-accent-secondary transition-all"
                  >
                    {isClient ? 'Create Project' : 'Explore Jobs'}
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Widgets */}
        <div className="flex flex-col gap-8">
          <section className="glass-card p-6 flex flex-col gap-6">
            <h3 className="text-lg font-bold text-text-primary">
              {isClient ? 'Client Reputation' : 'Credit Score'}
            </h3>
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-bg-highlight"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={364.4}
                    strokeDashoffset={364.4 * (1 - (isClient ? 4.8 / 5 : 82 / 100))}
                    className="text-accent-primary"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-text-primary">
                    {isClient ? '4.8' : '82'}
                  </span>
                  <span className="text-[10px] text-text-muted uppercase tracking-widest">
                    {isClient ? 'Rating' : 'Score'}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 w-full gap-4 mt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary">
                    {isClient ? '12' : '24'}
                  </p>
                  <p className="text-[10px] text-text-muted uppercase tracking-widest">
                    {isClient ? 'Projects' : 'Contracts'}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-400">100%</p>
                  <p className="text-[10px] text-text-muted uppercase tracking-widest">Success</p>
                </div>
              </div>
            </div>
            {!isClient && (
              <button 
                onClick={() => navigate('/credit-score')}
                className="w-full py-2 bg-bg-highlight border border-border-main text-text-primary rounded-xl text-xs font-bold hover:border-accent-primary transition-all"
              >
                Improve Score
              </button>
            )}
          </section>

          <section className="glass-card p-6 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-text-primary">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              {isClient ? (
                <>
                  <button onClick={() => navigate('/create-project')} className="flex items-center gap-3 p-3 rounded-xl bg-accent-primary/10 text-accent-primary hover:bg-accent-primary/20 transition-all text-sm font-bold">
                    <PlusCircle size={18} /> Create New Project
                  </button>
                  <button onClick={() => navigate('/disputes')} className="flex items-center gap-3 p-3 rounded-xl bg-amber-400/10 text-amber-400 hover:bg-amber-400/20 transition-all text-sm font-bold">
                    <AlertCircle size={18} /> Review Disputes
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate('/explore')} className="flex items-center gap-3 p-3 rounded-xl bg-accent-primary/10 text-accent-primary hover:bg-accent-primary/20 transition-all text-sm font-bold">
                    <Search size={18} /> Browse New Jobs
                  </button>
                  <button onClick={() => navigate('/submit-work')} className="flex items-center gap-3 p-3 rounded-xl bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20 transition-all text-sm font-bold">
                    <CheckCircle2 size={18} /> Submit Deliverables
                  </button>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
