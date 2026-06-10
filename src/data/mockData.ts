// VoiceOps AI — mock data for all screens

export interface InsightAction {
  label: string;
  type: 'default' | 'primary';
  action: string;
}

export interface InsightData {
  id: string;
  severity: 'high' | 'medium' | 'positive';
  severityLabel: string;
  title: string;
  details: string;
  impact: string;
  actions: InsightAction[];
}

export interface KpiData {
  title: string;
  value: string;
  suffix: string;
  trend: 'up' | 'down';
  trendValue: string;
  good: 'up' | 'down';
}

export interface TrendSeries {
  name: string;
  color: string;
  values: number[];
}

export interface TrendData {
  labels: string[];
  series: TrendSeries[];
}

export interface AgentData {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  score: number;
  csat: string;
  aht: string;
  fcr: string;
  esc: string;
  weakest: string;
  status: string;
  statusColor: string;
  rec: string;
}

export interface RohanSummary {
  title: string;
  value: string;
  suffix: string;
  tone: 'bad' | 'neutral' | 'good';
}

export interface SwItem {
  name: string;
  value: number;
}

export interface AuditCall {
  id: string;
  sentiment: 'Negative' | 'Neutral' | 'Positive';
  score: string;
  failed: string[];
  confidence: string;
}

export interface RohanData {
  name: string;
  role: string;
  status: string;
  summary: RohanSummary[];
  aiSummary: string;
  strengths: SwItem[];
  weaknesses: SwItem[];
  auditParams: SwItem[];
  trend: TrendData;
  calls: AuditCall[];
}

export interface EvidenceSnippetLine {
  who: string;
  text: string;
  highlight?: boolean;
}

export interface EvidenceSnippet {
  time: string;
  lines: EvidenceSnippetLine[];
  flag: string;
}

export interface EvidenceReasoning {
  label: string;
  text: string;
}

export interface EvidenceData {
  question: string;
  parameter: string;
  score: string;
  call: string;
  snippets: EvidenceSnippet[];
  reasoning: EvidenceReasoning[];
}

export interface CoachingModule {
  name: string;
  duration: string;
  format: string;
  reason: string;
}

export interface CoachingData {
  pattern: string;
  evidence: string[];
  module: CoachingModule;
  note: string;
  success: string;
}

export interface AuditRow {
  id: string;
  agent: string;
  sentiment: 'Negative' | 'Neutral' | 'Positive';
  score: number;
  failed: string[];
  confidence: string;
}

export interface CoachingPlan {
  agent: string;
  module: string;
  source: string;
  status: string;
  followUp: string;
}

export interface AssistantBar {
  name: string;
  value: number;
}

export interface AssistantRow {
  agent: string;
  failed: number;
  mistake: string;
  call: string;
  action: string;
}

export interface AssistantData {
  query: string;
  responseTitle: string;
  summary: string;
  bars: AssistantBar[];
  rows: AssistantRow[];
  suggestion: string;
}

// ─── Screen 1: Dashboard ──────────────────────────────────────────────────────

export const VO_INSIGHTS: InsightData[] = [
  {
    id: 'ins-1',
    severity: 'high',
    severityLabel: 'High risk',
    title: "Rohan's empathy score dropped 20% in the last 4 hours",
    details: '5 of his last 8 audited calls show low empathy markers.',
    impact: 'CSAT down by 12% today',
    actions: [
      { label: 'View evidence', type: 'default', action: 'evidence' },
      { label: 'Create coaching plan', type: 'primary', action: 'coaching' },
    ],
  },
  {
    id: 'ins-2',
    severity: 'medium',
    severityLabel: 'Medium risk',
    title: '3 agents are struggling with the new escalation policy',
    details: 'Repeated compliance failures detected after the latest escalation policy update.',
    impact: 'Escalation errors increased by 18%',
    actions: [
      { label: 'Review agents', type: 'default', action: 'assistant' },
      { label: 'Assign refresher', type: 'default', action: 'toast:Refresher module queued for 3 agents' },
    ],
  },
  {
    id: 'ins-3',
    severity: 'positive',
    severityLabel: 'Positive',
    title: 'Priya is outperforming the team in active listening',
    details: '96% active listening score across 40 calls.',
    impact: 'Can be used as a peer coaching example',
    actions: [
      { label: 'Recognize agent', type: 'default', action: 'toast:Recognition sent to Priya Sharma' },
      { label: 'View calls', type: 'default', action: 'toast:Opening Priya\'s audited calls' },
    ],
  },
];

export const VO_KPIS: KpiData[] = [
  { title: 'Team CSAT', value: '82', suffix: '%', trend: 'down', trendValue: '4%', good: 'up' },
  { title: 'Avg AHT', value: '6m 45s', suffix: '', trend: 'up', trendValue: '11%', good: 'down' },
  { title: 'FCR', value: '71', suffix: '%', trend: 'down', trendValue: '6%', good: 'up' },
  { title: 'Audit pass rate', value: '86', suffix: '%', trend: 'up', trendValue: '3%', good: 'up' },
  { title: 'Escalation rate', value: '14', suffix: '%', trend: 'up', trendValue: '5%', good: 'down' },
  { title: 'Avg hold time', value: '48s', suffix: '', trend: 'up', trendValue: '9%', good: 'down' },
  { title: 'Interactions handled', value: '1,248', suffix: '', trend: 'up', trendValue: '8%', good: 'up' },
];

export const VO_TEAM_TREND: TrendData = {
  labels: ['Jun 4', 'Jun 5', 'Jun 6', 'Jun 7', 'Jun 8', 'Jun 9', 'Today'],
  series: [
    { name: 'CSAT', color: '#1677ff', values: [86, 85, 87, 84, 85, 84, 82] },
    { name: 'Audit score', color: '#389e0d', values: [83, 84, 82, 85, 86, 85, 86] },
    { name: 'FCR', color: '#d48806', values: [76, 77, 75, 74, 73, 72, 71] },
  ],
};

export const VO_AGENTS: AgentData[] = [
  { id: 'rohan', name: 'Rohan Mehta', initials: 'RM', avatarBg: '#cf1322', score: 68, csat: '74%', aht: '8m 20s', fcr: '61%', esc: '22%', weakest: 'Empathy', status: 'High risk', statusColor: 'red', rec: 'Coaching needed' },
  { id: 'ananya', name: 'Ananya Rao', initials: 'AR', avatarBg: '#389e0d', score: 91, csat: '92%', aht: '5m 40s', fcr: '84%', esc: '7%', weakest: 'None', status: 'Top performer', statusColor: 'green', rec: 'Recognize' },
  { id: 'arjun', name: 'Arjun Nair', initials: 'AN', avatarBg: '#d46b08', score: 72, csat: '78%', aht: '7m 15s', fcr: '66%', esc: '19%', weakest: 'Escalation handling', status: 'Needs coaching', statusColor: 'volcano', rec: 'Assign policy module' },
  { id: 'meera', name: 'Meera Iyer', initials: 'MI', avatarBg: '#d4a106', score: 76, csat: '80%', aht: '6m 55s', fcr: '70%', esc: '16%', weakest: 'Compliance', status: 'Watchlist', statusColor: 'gold', rec: 'Review evidence' },
  { id: 'kiran', name: 'Kiran Das', initials: 'KD', avatarBg: '#1677ff', score: 83, csat: '86%', aht: '6m 10s', fcr: '77%', esc: '11%', weakest: 'Call closing', status: 'Stable', statusColor: 'blue', rec: 'Monitor' },
];

// ─── Screen 2: Agent Drilldown (Rohan) ───────────────────────────────────────

export const VO_ROHAN: RohanData = {
  name: 'Rohan Mehta',
  role: 'Voice support agent',
  status: 'High risk',
  summary: [
    { title: 'Overall QA score', value: '68', suffix: '%', tone: 'bad' },
    { title: 'CSAT', value: '74', suffix: '%', tone: 'bad' },
    { title: 'AHT', value: '8m 20s', suffix: '', tone: 'bad' },
    { title: 'FCR', value: '61', suffix: '%', tone: 'bad' },
    { title: 'Escalation rate', value: '22', suffix: '%', tone: 'bad' },
    { title: 'Avg hold time', value: '1m 18s', suffix: '', tone: 'bad' },
    { title: 'Calls audited', value: '18', suffix: '', tone: 'neutral' },
  ],
  aiSummary:
    "Rohan's performance risk is mainly driven by empathy and compliance issues. The system detected repeated cases where the customer expressed frustration, but the agent moved directly to resolution without acknowledgement. Compliance failures are linked to missed identity verification before account-level actions.",
  strengths: [
    { name: 'Greeting & call opening', value: 92 },
    { name: 'Probing & clarification', value: 84 },
    { name: 'Solution accuracy', value: 81 },
  ],
  weaknesses: [
    { name: 'Empathy', value: 58 },
    { name: 'Compliance & process adherence', value: 62 },
    { name: 'Escalation handling', value: 60 },
    { name: 'Active listening', value: 64 },
  ],
  auditParams: [
    { name: 'Greeting & call opening', value: 92 },
    { name: 'Active listening', value: 64 },
    { name: 'Probing & clarification', value: 84 },
    { name: 'Solution provided', value: 81 },
    { name: 'Compliance & process adherence', value: 62 },
    { name: 'Communication skills', value: 78 },
    { name: 'Call closing', value: 74 },
    { name: 'Empathy', value: 58 },
    { name: 'Escalation handling', value: 60 },
  ],
  trend: {
    labels: ['Jun 4', 'Jun 5', 'Jun 6', 'Jun 7', 'Jun 8', 'Jun 9', 'Today'],
    series: [
      { name: 'Empathy', color: '#f5222d', values: [76, 74, 72, 70, 66, 62, 58] },
      { name: 'Compliance', color: '#d48806', values: [78, 77, 74, 72, 70, 66, 62] },
      { name: 'CSAT', color: '#1677ff', values: [84, 83, 82, 80, 78, 76, 74] },
    ],
  },
  calls: [
    { id: 'CALL-1024', sentiment: 'Negative', score: '58%', failed: ['Empathy', 'Compliance'], confidence: '89%' },
    { id: 'CALL-1018', sentiment: 'Neutral', score: '66%', failed: ['Active listening'], confidence: '84%' },
    { id: 'CALL-1009', sentiment: 'Negative', score: '61%', failed: ['Escalation handling'], confidence: '87%' },
  ],
};

// ─── Screen 3: Evidence Drawer ────────────────────────────────────────────────

export const VO_EVIDENCE: EvidenceData = {
  question: 'Why did AI mark Compliance & process adherence low?',
  parameter: 'Compliance & process adherence',
  score: '2/5',
  call: 'CALL-1024',
  snippets: [
    {
      time: '02:14',
      lines: [
        { who: 'Customer', text: 'Can you cancel the charge now?' },
        { who: 'Agent', text: 'Yes, I can process it immediately.', highlight: true },
      ],
      flag: 'Agent confirmed account-level action before completing identity verification.',
    },
    {
      time: '04:31',
      lines: [
        { who: 'Customer', text: "I already told you I'm frustrated." },
        { who: 'Agent', text: 'Let me check the policy and proceed.', highlight: true },
      ],
      flag: 'Agent did not acknowledge customer frustration before moving to process.',
    },
  ],
  reasoning: [
    { label: 'Required policy', text: 'Verify customer identity before account-level changes.' },
    { label: 'Detected issue', text: 'Agent confirmed action before verification.' },
    { label: 'Customer impact', text: 'Increased frustration and lower trust.' },
    { label: 'Compliance risk', text: 'Medium to high.' },
    { label: 'AI confidence', text: '89%' },
  ],
};

// ─── Screen 4: Coaching Plan ──────────────────────────────────────────────────

export const VO_COACHING: CoachingData = {
  pattern: 'AI detected repeated Active Listening and Empathy failures across 7 calls in the last 10 days.',
  evidence: [
    'Interruptions detected in 5 calls',
    'Missed empathy acknowledgement in 6 calls',
    'CSAT dropped by 12%',
    'Escalation rate increased to 22%',
  ],
  module: {
    name: 'Active Listening for Escalated Voice Calls',
    duration: '25 minutes',
    format: 'Interactive simulation',
    reason:
      "This module targets the exact behaviors detected in Rohan's recent calls: interrupting customers, missing emotional cues, and moving to resolution too quickly.",
  },
  note: 'Focus on acknowledging customer frustration before moving into resolution.',
  success: 'Rohan has been enrolled in Active Listening for Escalated Voice Calls. Follow-up audit scheduled for Friday.',
};

// ─── Audits Page ──────────────────────────────────────────────────────────────

export const VO_AUDITS: AuditRow[] = [
  { id: 'CALL-1024', agent: 'Rohan Mehta', sentiment: 'Negative', score: 58, failed: ['Empathy', 'Compliance'], confidence: '89%' },
  { id: 'CALL-1018', agent: 'Rohan Mehta', sentiment: 'Neutral', score: 66, failed: ['Active listening'], confidence: '84%' },
  { id: 'CALL-1015', agent: 'Arjun Nair', sentiment: 'Neutral', score: 64, failed: ['Escalation handling'], confidence: '86%' },
  { id: 'CALL-1009', agent: 'Rohan Mehta', sentiment: 'Negative', score: 61, failed: ['Escalation handling'], confidence: '87%' },
  { id: 'CALL-1007', agent: 'Meera Iyer', sentiment: 'Neutral', score: 69, failed: ['Compliance'], confidence: '82%' },
  { id: 'CALL-1002', agent: 'Kiran Das', sentiment: 'Positive', score: 78, failed: ['Escalation handling'], confidence: '81%' },
];

// ─── Coaching Plans Page ──────────────────────────────────────────────────────

export const VO_PLANS: CoachingPlan[] = [
  { agent: 'Rohan Mehta', module: 'Active Listening for Escalated Voice Calls', source: 'AI recommended', status: 'In progress', followUp: 'Audit · Fri, Jun 12' },
  { agent: 'Arjun Nair', module: 'New Escalation Policy Refresher', source: 'AI recommended', status: 'Pending approval', followUp: '—' },
];

// ─── Screen 5: AI Assistant ───────────────────────────────────────────────────

export const VO_ASSISTANT: AssistantData = {
  query: 'Which agents are struggling with the new escalation policy?',
  responseTitle: '4 agents show repeated escalation-policy issues',
  summary:
    'AI analyzed audited calls after the new escalation policy update. The main issue is incorrect escalation timing and missing mandatory documentation.',
  bars: [
    { name: 'Rohan Mehta', value: 6 },
    { name: 'Arjun Nair', value: 5 },
    { name: 'Meera Iyer', value: 4 },
    { name: 'Kiran Das', value: 3 },
  ],
  rows: [
    { agent: 'Rohan Mehta', failed: 6, mistake: 'Escalated before completing verification', call: 'CALL-1024', action: 'Assign policy refresher' },
    { agent: 'Arjun Nair', failed: 5, mistake: 'Missed escalation documentation', call: 'CALL-1015', action: 'Assign policy refresher' },
    { agent: 'Meera Iyer', failed: 4, mistake: 'Incorrect escalation category', call: 'CALL-1007', action: 'QA review' },
    { agent: 'Kiran Das', failed: 3, mistake: 'Delayed escalation', call: 'CALL-1002', action: 'Monitor' },
  ],
  suggestion: "Assign 'New Escalation Policy Refresher' to these 4 agents.",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function scoreColor(v: number): string {
  return v >= 85 ? '#389e0d' : v >= 75 ? '#1677ff' : v >= 70 ? '#d48806' : '#f5222d';
}

export function scoreTextColor(v: number): string {
  return v >= 85 ? '#2c7a0b' : v >= 75 ? '#0958d9' : v >= 70 ? '#ad6800' : '#cf1322';
}
