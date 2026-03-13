export type UserRole = 'client' | 'freelancer' | 'admin';

export interface Profile {
  id: string;
  wallet_addr?: string;
  role: UserRole;
  skills?: string[];
  bio?: string;
  email?: string;
  name?: string;
  avatar?: string;
  client_rating: number;
  completed_contracts: number;
  total_earnings: number;
}

export type ProjectStatus = 'hiring' | 'active' | 'completed' | 'disputed' | 'draft';

export interface Project {
  id: string;
  client_id: string;
  client_name?: string;
  client_rating?: number;
  freelancer_id?: string;
  freelancer_name?: string;
  status: ProjectStatus;
  title: string;
  description: string;
  budget: number;
  sc_addr?: string;
  createdAt: number;
  milestoneCount: number;
  escrowState: 'unfunded' | 'funded' | 'released' | 'disputed';
  category?: string;
  deadline?: string;
}

export type MilestoneStatus = 'pending' | 'in-progress' | 'submitted' | 'approved' | 'rejected' | 'completed';

export interface Milestone {
  id: string;
  project_id: string;
  title: string;
  description: string;
  amount: number;
  deadline: string;
  status: MilestoneStatus;
  attempts: number;
  dispute_count: number;
}

export interface Submission {
  id: string;
  milestone_id: string;
  ipfs_hash?: string;
  ai_report?: string;
  github_repo?: string;
  google_drive_link?: string;
  submittedAt: number;
}

export interface Dispute {
  id: string;
  project_id: string;
  project_title: string;
  milestone_id: string;
  freelancer_name: string;
  client_name: string;
  reason: string;
  status: 'active' | 'resolved';
  outcome?: string;
  createdAt: number;
  summary?: string;
}

export interface Application {
  id: string;
  project_id: string;
  project_title: string;
  freelancer_id: string;
  cover_message: string;
  estimated_time: string;
  portfolio_link: string;
  bid_amount: number;
  delivery_time: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: number;
}

export interface Message {
  id: string;
  project_id: string;
  sender_id: string;
  sender_name: string;
  content: string;
  createdAt: number;
}
