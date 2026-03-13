import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  DollarSign, 
  Clock, 
  Briefcase, 
  Star, 
  ChevronRight,
  ArrowUpRight,
  MapPin,
  Tag
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_PROJECTS } from '../mockData';
import { useNavigate } from 'react-router-dom';

export const ExploreJobs: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web Development', 'Design', 'Marketing', 'Writing', 'Blockchain'];

  const filteredProjects = MOCK_PROJECTS.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory && project.status === 'hiring';
  });

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-text-primary">Explore Opportunities</h1>
        <p className="text-text-muted">Find the perfect project that matches your skills and expertise.</p>
      </header>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
          <input 
            type="text"
            placeholder="Search for jobs, skills, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-bg-navbar border border-border-main rounded-2xl py-4 pl-12 pr-4 text-text-primary outline-none focus:border-accent-primary transition-all"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                selectedCategory === category 
                ? 'bg-accent-primary text-bg-main' 
                : 'bg-bg-navbar border border-border-main text-text-muted hover:border-accent-primary/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Job Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card p-6 flex flex-col gap-6 group hover:border-accent-primary/30 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-bg-highlight rounded-xl flex items-center justify-center text-accent-primary border border-border-main">
                <Briefcase size={24} />
              </div>
              <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                <Star size={14} fill="currentColor" />
                {project.client_rating || '4.5'}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">{project.title}</h3>
              <p className="text-sm text-text-muted line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-bg-highlight text-text-muted rounded-full text-[10px] font-bold uppercase tracking-widest border border-border-main">
                {project.category}
              </span>
              <span className="px-3 py-1 bg-bg-highlight text-text-muted rounded-full text-[10px] font-bold uppercase tracking-widest border border-border-main">
                {project.milestoneCount} Milestones
              </span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border-main mt-auto">
              <div className="flex flex-col">
                <span className="text-[10px] text-text-muted uppercase tracking-widest">Budget</span>
                <span className="text-lg font-bold text-emerald-400">${project.budget.toLocaleString()}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-text-muted uppercase tracking-widest">Deadline</span>
                <span className="text-sm font-medium text-text-primary">{project.deadline || '2 weeks'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <button 
                onClick={() => navigate(`/projects/${project.id}`)}
                className="py-3 bg-bg-highlight border border-border-main text-text-primary rounded-xl font-bold text-sm hover:border-accent-primary transition-all"
              >
                View Details
              </button>
              <button 
                onClick={() => navigate(`/projects/${project.id}`)}
                className="py-3 bg-accent-primary text-bg-main rounded-xl font-bold text-sm hover:bg-accent-secondary transition-all"
              >
                Submit Proposal
              </button>
            </div>
          </motion.div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="col-span-full glass-card p-20 text-center flex flex-col items-center gap-6 border-dashed">
            <div className="w-20 h-20 bg-bg-highlight rounded-full flex items-center justify-center text-text-muted">
              <Search size={40} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold text-text-primary">No projects found</h3>
              <p className="text-text-muted">Try adjusting your search or category filters.</p>
            </div>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="px-8 py-3 bg-accent-primary text-bg-main rounded-xl font-bold hover:bg-accent-secondary transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
