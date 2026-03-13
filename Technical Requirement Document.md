

Technical Requirement Document (TRD): TrustChain (V1)
On-Chain Credit & AI-Driven Smart Escrow Architecture
## Lead Backend Architect
## March 13, 2026
## 1. System Architecture Overview
TrustChain utilizes aHybrid Web3 Stackdesigned to bridge the gap between traditional pro-
fessional services and decentralized financial accountability. The architecture prioritizes speed
for scoping and metadata management while reserving the Ethereum Sepolia blockchain for
immutable financial settlements.
–Frontend (React.js / Tailwind CSS):Aresponsive”DualDashboard”focusedonlow-friction
user experience for non-technical freelancers.
–Backend & Auth (Supabase):Manages JWT-based identity, user profiles, and off-chain
project metadata via PostgreSQL.
–Smart Contract Layer (Solidity):Deployed on the Sepolia Testnet, managing the ”Vault”
(Escrow), symmetric 10% staking, and the auto-release logic.
–AI Service (Gemini 2.5 Flash):Provides real-time ”Intelligent Scoping” (MPR generation)
and ”Quality Gate” validation.
## 2. Frontend Responsibilities
Thefrontendservesastheprimarygatewayforprojectorchestrationandfinancialvisualization.
–MetaMask Integration:Handlesthesigningofblockchaintransactionsforlockingscope
and funding milestones.
–Intelligent Scoping UI:Multi-step wizard transforming natural language into structured
JSON milestones via AI.
–Financial Visualization:Real-timevisualizationoftheon-chain”Vault”(Stakedvs. Funded
status).
–Reputation Dashboard:DynamicrenderingoftheTrustScoreandfinancialstabilitymet-
rics.
## 3. Backend & Supabase Architecture
To ensure a rapid hackathon-to-market cycle, the system leveragesSupabase Edge Functions
instead of a monolithic server.
–MPR Generation:Proxies requests to Gemini to generate technical milestones from user
descriptions.
–Quality Gate Validator:Orchestrates the scan of code submissions for functionality and
scope adherence.
## 1

–Blockchain Event Listener:MonitorstheSepolianetworkforpaymentreleaseorpenalty
events to update the PostgreSQL state.
–Reputation Engine:Aggregates completion rates, volume, and mocked bank data to
compute the global Trust Score.
- Database Schema (Supabase PostgreSQL)
TablePrimary FieldsPurpose
profilesid, wallet_addr, trust_score, bank_jsonIdentity and reputation status.
projectsid, sc_addr, client_id, freelancer_id, status   Master project metadata.
milestones   id, project_id, amount_eth, deadline, status  Individual task tracking.
submissions  id, milestone_id, ipfs_hash, ai_reportEvidence of work and validation logs.
audit_logs   id, tx_hash, event_type, timestampBlockchain-to-DB sync history.
- API & Smart Contract Interface
Smart Contract (Solidity)
–lockScope(address freelancer, uint256 reviewPeriod): Finalizestheagreementon-chain.
–fundMilestone(): Escrows the current payment in USDC/ETH.
–commitStake(): Requires the freelancer to lock 10% collateral to begin work.
–releasePayment(): Automated or manual trigger for fund dispersal.
REST Endpoints (Edge Functions)
–POST /generate-mpr: Natural language to JSON roadmap transformation.
–POST /validate-submission: Automated code functionality and scope verification.
–GET /get-credit-score: On-demand calculation of the 360-degree reputation score.
## 6. Scalability & Future Roadmap
–Stateless Execution:Edge functions allow horizontal scaling to thousands of concurrent
users without infrastructure overhead.
–L2 Integration:The architecture is designed to shift from Sepolia to Polygon or Arbitrum
seamlessly for lower gas fees.
–Identity:Future iterations will map ENS names to Supabase profiles for enhanced discov-
ery.
## 2