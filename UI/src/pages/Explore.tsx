import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Briefcase, 
  Clock, 
  DollarSign, 
  ChevronRight,
  Zap,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MOCK_PROJECTS } from '../mockData';

export const Explore: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Filter for projects that are open for hiring
  const [projects] = useState(MOCK_PROJECTS.filter(p => p.status === 'hiring' || p.status === 'active'));

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-text-primary">Explore Projects</h1>
        <p className="text-text-muted">Find your next mission and build your on-chain reputation.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
          <input 
            type="text"
            placeholder="Search projects, skills, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-bg-mid border border-border-main rounded-xl py-3 pl-12 pr-4 text-text-primary focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-bg-mid border border-border-main rounded-xl text-text-primary hover:bg-bg-highlight transition-all">
          <Filter size={20} />
          <span>Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={`/projects/${project.id}`}
                className="glass-card p-6 flex flex-col gap-6 hover:border-accent-primary/30 transition-all group h-full"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center">
                    <Briefcase size={24} />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md flex items-center gap-1 uppercase tracking-wider">
                      <ShieldCheck size={12} /> Escrow Verified
                    </span>
                    <span className="text-[10px] font-bold text-accent-primary bg-accent-primary/10 px-2 py-1 rounded-md flex items-center gap-1 uppercase tracking-wider">
                      <Zap size={12} /> AI Scoped
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-text-muted text-sm line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-border-main flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Budget</span>
                    <span className="text-lg font-bold text-text-primary">₹{project.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Milestones</span>
                    <span className="text-sm font-medium text-text-primary">{project.milestoneCount} Steps</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-text-muted">Posted 2 days ago</span>
                  <div className="text-accent-primary font-bold flex items-center gap-1 text-sm group-hover:translate-x-1 transition-transform">
                    View Details <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full glass-card p-20 flex flex-col items-center text-center gap-6">
            <div className="w-20 h-20 bg-bg-highlight rounded-full flex items-center justify-center text-text-muted">
              <Search size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">No projects found</h3>
              <p className="text-text-muted max-w-xs mx-auto">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
            <button 
              onClick={() => setSearchTerm('')}
              className="text-accent-primary font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
