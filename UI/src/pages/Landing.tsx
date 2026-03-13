import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Zap, Lock, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="glass-card p-8 flex flex-col items-start gap-4">
    <div className="w-12 h-12 bg-accent-primary/10 rounded-xl flex items-center justify-center text-accent-primary">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
    <p className="text-text-muted leading-relaxed">{description}</p>
  </div>
);

const Step = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center gap-4">
    <div className="w-12 h-12 rounded-full border-2 border-accent-primary flex items-center justify-center text-accent-primary font-bold text-lg">
      {number}
    </div>
    <h4 className="text-lg font-semibold text-text-primary">{title}</h4>
    <p className="text-sm text-text-muted max-w-50">{description}</p>
  </div>
);

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-main selection:bg-accent-primary/30">

      {/* Header */}
      <header className="h-20 flex items-center justify-between px-6 lg:px-20 border-b border-border-main bg-bg-main/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-accent-primary rounded-xl flex items-center justify-center">
            <ShieldCheck className="text-bg-main" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-text-primary">TrustChain</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-text-muted hover:text-text-primary transition-colors">How it Works</a>
          <a href="#features" className="text-text-muted hover:text-text-primary transition-colors">Features</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-text-primary font-medium hover:text-accent-primary transition-colors">
            Log In
          </Link>

          <Link
            to="/register"
            className="bg-accent-primary text-bg-main px-6 py-2.5 rounded-full font-semibold hover:bg-accent-hover transition-all shadow-lg shadow-accent-primary/20"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-150 bg-accent-primary/5 blur-[120px] rounded-full -z-10" />

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bg-highlight border border-border-main text-accent-primary text-xs font-bold tracking-widest uppercase"
          >
            <Zap size={14} />
            The Future of Work
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-bold leading-[1.1]"
          >
            Freelancing Built on <br />
            <span className="heading-gradient">
              Trust & Smart Contracts
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-muted max-w-2xl"
          >
            AI generates project milestones. Smart contracts lock escrow payments.
            Freelancers get guaranteed payments for verified work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-4"
          >
            <Link
              to="/create-project"
              className="bg-accent-primary text-bg-main px-10 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-accent-hover transition-all group"
            >
              Launch Project
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/login"
              className="border border-border-main text-text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-bg-highlight transition-all"
            >
              Login
            </Link>
          </motion.div>

        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32 bg-bg-mid/50 border-y border-border-main px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">How TrustChain Works</h2>
            <p className="text-text-muted">
              A seamless bridge between traditional work and decentralized finance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-6 left-20 right-20 h-0.5 bg-border-main -z-10" />

            <Step
              number="01"
              title="Describe Project"
              description="Client writes project idea in natural language."
            />

            <Step
              number="02"
              title="AI Milestone Generator"
              description="AI converts description into structured milestones."
            />

            <Step
              number="03"
              title="Dual Stake Escrow"
              description="Client funds escrow and freelancer commits stake."
            />

            <Step
              number="04"
              title="Smart Release"
              description="Funds release automatically after milestone approval."
            />

          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <FeatureCard
              icon={Lock}
              title="Smart Escrow"
              description="Payments are locked in audited smart contracts. Funds are only released when milestones are met."
            />

            <FeatureCard
              icon={Zap}
              title="AI Scoping"
              description="Our AI Pilot helps you define clear, technical milestones to prevent scope creep and disputes."
            />

            <FeatureCard
              icon={BarChart3}
              title="Client Rating"
              description="Build a verifiable reputation based on completed contracts and successful milestone approvals."
            />

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-border-main px-6">

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

          <div className="flex items-center gap-2">
            <ShieldCheck className="text-accent-primary" size={24} />
            <span className="text-xl font-bold text-text-primary">TrustChain</span>
          </div>

          <p className="text-text-muted text-sm">
            © 2026 TrustChain. Built for the future of decentralized work.
          </p>

          <div className="flex gap-6">
            <a href="#" className="text-text-muted hover:text-text-primary transition-colors">Twitter</a>
            <a href="#" className="text-text-muted hover:text-text-primary transition-colors">Discord</a>
            <a href="#" className="text-text-muted hover:text-text-primary transition-colors">GitHub</a>
          </div>

        </div>

      </footer>

    </div>
  );
};