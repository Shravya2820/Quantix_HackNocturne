-- Supabase PostgreSQL Schema for TrustChain (V1)
-- This schema supports a Web3 freelance escrow platform

-- Enable the uuid-ossp extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: profiles
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_addr TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('client', 'freelancer')),
    trust_score NUMERIC DEFAULT 0,
    bank_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: projects
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sc_addr TEXT, -- Smart contract address
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    freelancer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('negotiating', 'active', 'completed', 'disputed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for foreign keys in projects
CREATE INDEX idx_projects_client_id ON public.projects(client_id);
CREATE INDEX idx_projects_freelancer_id ON public.projects(freelancer_id);

-- Table: milestones
CREATE TABLE public.milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    amount_eth NUMERIC NOT NULL,
    deadline TIMESTAMP WITH TIME ZONE,
    status TEXT NOT NULL CHECK (status IN ('pending', 'funded', 'submitted', 'approved', 'released', 'disputed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for foreign key in milestones
CREATE INDEX idx_milestones_project_id ON public.milestones(project_id);

-- Table: submissions
CREATE TABLE public.submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    milestone_id UUID NOT NULL REFERENCES public.milestones(id) ON DELETE CASCADE,
    ipfs_hash TEXT NOT NULL,
    ai_report JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for foreign key in submissions
CREATE INDEX idx_submissions_milestone_id ON public.submissions(milestone_id);

-- Table: audit_logs
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tx_hash TEXT NOT NULL,
    event_type TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on transaction hash for fast lookups
CREATE INDEX idx_audit_logs_tx_hash ON public.audit_logs(tx_hash);
