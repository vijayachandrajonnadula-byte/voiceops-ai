import type { ReactNode } from 'react';
import { Table, Tag, Avatar, Button, Steps, Badge, Checkbox } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  DashboardOutlined,
  TeamOutlined,
  FileSearchOutlined,
  SolutionOutlined,
  BulbOutlined,
  BarChartOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  BellOutlined,
  SearchOutlined,
  ExclamationCircleFilled,
  CheckCircleFilled,
  RiseOutlined,
  ArrowLeftOutlined,
  EyeOutlined,
  ReadOutlined,
  ExportOutlined,
  ClockCircleOutlined,
  AimOutlined,
  SendOutlined,
  CheckCircleOutlined,
  FlagOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import { TrendChart } from '../components/TrendChart';
import { InsightCard } from '../components/InsightCard';
import { KpiStrip } from '../components/KpiStrip';
import { AgentTable } from '../components/AgentTable';
import { DashboardScreen } from './DashboardScreen';
import { AgentDrilldown } from './AgentDrilldown';
import {
  VO_INSIGHTS,
  VO_KPIS,
  VO_TEAM_TREND,
  VO_ROHAN,
  VO_EVIDENCE,
  VO_COACHING,
  VO_ASSISTANT,
  scoreColor,
  scoreTextColor,
} from '../data/mockData';
import type { AssistantRow } from '../data/mockData';

// ─── Shared helpers ──────────────────────────────────────────────────────────

function Bar({ value, height = 8 }: { value: number; height?: number }) {
  return (
    <div
      style={{
        flex: 1,
        height,
        background: 'rgba(0,0,0,0.06)',
        borderRadius: 100,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${value}%`,
          height: '100%',
          background: scoreColor(value),
          borderRadius: 100,
        }}
      />
    </div>
  );
}

function CsSection({
  num,
  title,
  annotation,
  children,
}: {
  num?: string;
  title: string;
  annotation?: string;
  children: ReactNode;
}) {
  return (
    <section
      style={{
        maxWidth: 1440,
        margin: '0 auto',
        padding: '72px 48px',
        borderBottom: '1px solid #e2e5ea',
      }}
    >
      <div style={{ marginBottom: 36 }}>
        {num && (
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#1677ff',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Section {num}
          </div>
        )}
        <h2
          style={{
            fontSize: 30,
            fontWeight: 700,
            margin: '0 0 14px',
            color: '#0a0a14',
            letterSpacing: '-0.4px',
          }}
        >
          {title}
        </h2>
        {annotation && (
          <p
            style={{
              fontSize: 15,
              color: '#6b7280',
              lineHeight: 1.65,
              maxWidth: 820,
              margin: 0,
              borderLeft: '3px solid #dbeafe',
              paddingLeft: 16,
            }}
          >
            {annotation}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

function ScreenFrame({
  label,
  url = 'voiceops-ai-ten.vercel.app',
  children,
}: {
  label: string;
  url?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        borderRadius: 14,
        border: '1px solid #d0d5dd',
        boxShadow:
          '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          background: '#f4f5f7',
          borderBottom: '1px solid #e2e5ea',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {['#ff5f56', '#ffbd2e', '#27c93f'].map((c) => (
            <div
              key={c}
              style={{ width: 12, height: 12, borderRadius: '50%', background: c }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: '#ebebeb',
            borderRadius: 6,
            padding: '4px 12px',
            fontSize: 12,
            color: '#888',
            textAlign: 'center',
            maxWidth: 480,
            margin: '0 auto',
          }}
        >
          {url}
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#1677ff',
            background: '#e6f4ff',
            border: '1px solid #bae0ff',
            padding: '3px 10px',
            borderRadius: 5,
            letterSpacing: '0.04em',
            flexShrink: 0,
          }}
        >
          {label}
        </div>
      </div>
      {children}
    </div>
  );
}

// ─── Static app shell ────────────────────────────────────────────────────────

const SIDE_MENU = [
  {
    group: 'MONITOR',
    items: [
      { key: 'overview', icon: <DashboardOutlined />, label: 'Overview' },
      { key: 'agents', icon: <TeamOutlined />, label: 'Agents' },
    ],
  },
  {
    group: 'QUALITY',
    items: [
      { key: 'audits', icon: <FileSearchOutlined />, label: 'Audits' },
      { key: 'coaching', icon: <SolutionOutlined />, label: 'Coaching' },
    ],
  },
  {
    group: 'ANALYZE',
    items: [
      { key: 'insights', icon: <BulbOutlined />, label: 'Insights' },
      { key: 'reports', icon: <BarChartOutlined />, label: 'Reports' },
    ],
  },
];

function StaticSidebar({ active = 'overview' }: { active?: string }) {
  return (
    <div
      style={{
        width: 220,
        background: '#fff',
        borderRight: '1px solid #f0f0f0',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <ThunderboltOutlined style={{ color: '#1677ff', fontSize: 18 }} />
        <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.2px' }}>
          VoiceOps AI
        </span>
      </div>
      <div style={{ flex: 1, padding: '12px 0' }}>
        {SIDE_MENU.map((grp) => (
          <div key={grp.group}>
            <div
              style={{
                padding: '10px 24px 4px',
                fontSize: 11,
                fontWeight: 600,
                color: 'rgba(0,0,0,0.35)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {grp.group}
            </div>
            {grp.items.map((item) => {
              const on = active === item.key;
              return (
                <div
                  key={item.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 16px',
                    margin: '1px 8px',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: on ? 600 : 400,
                    background: on ? '#e6f4ff' : 'transparent',
                    color: on ? '#1677ff' : 'rgba(0,0,0,0.65)',
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        ))}
        <div style={{ margin: '8px 16px', borderTop: '1px solid #f0f0f0' }} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 16px',
            margin: '1px 8px',
            borderRadius: 8,
            fontSize: 14,
            color: 'rgba(0,0,0,0.65)',
          }}
        >
          <SettingOutlined />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
}

function StaticHeader({ crumb = 'Overview' }: { crumb?: string }) {
  return (
    <div
      style={{
        height: 56,
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: 16,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          fontSize: 13,
          color: 'rgba(0,0,0,0.45)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <ThunderboltOutlined style={{ color: '#1677ff', fontSize: 12 }} />
        <span>VoiceOps AI</span>
        <span style={{ color: 'rgba(0,0,0,0.2)' }}>/</span>
        <span style={{ color: 'rgba(0,0,0,0.75)', fontWeight: 500 }}>{crumb}</span>
      </div>
      <div style={{ flex: 1 }} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background:
            'linear-gradient(#fff,#fff) padding-box,linear-gradient(90deg,#1677ff,#7c3aed) border-box',
          border: '1.5px solid transparent',
          borderRadius: 8,
          padding: '5px 12px',
          width: 300,
        }}
      >
        <SearchOutlined style={{ color: 'rgba(0,0,0,0.3)', fontSize: 13 }} />
        <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.3)', flex: 1 }}>
          Ask VoiceOps AI anything…
        </span>
        <span
          style={{
            fontSize: 11,
            color: 'rgba(0,0,0,0.2)',
            background: '#f5f5f5',
            border: '1px solid #e8e8e8',
            borderRadius: 4,
            padding: '1px 6px',
          }}
        >
          ⌘K
        </span>
      </div>
      <div style={{ flex: 1 }} />
      <Badge count={3} size="small">
        <BellOutlined style={{ fontSize: 18, color: 'rgba(0,0,0,0.65)' }} />
      </Badge>
      <Avatar size={32} style={{ background: '#13c2c2' }}>SK</Avatar>
    </div>
  );
}

function StaticLayout({
  children,
  active = 'overview',
  crumb = 'Overview',
}: {
  children: ReactNode;
  active?: string;
  crumb?: string;
}) {
  return (
    <div style={{ display: 'flex', background: '#f5f7fa' }}>
      <StaticSidebar active={active} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <StaticHeader crumb={crumb} />
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}

// ─── Cover ───────────────────────────────────────────────────────────────────

function Cover() {
  const META = [
    { label: 'Role', value: 'Product Designer' },
    { label: 'Domain', value: 'Contact Center / B2B SaaS' },
    { label: 'Design System', value: 'Ant Design' },
    { label: 'Focus', value: 'AI Insights · Explainable AI · Agentic Coaching' },
    { label: 'Deliverable', value: 'High-fidelity prototype' },
  ];

  const CARDS = [
    {
      label: 'Project Overview',
      text: 'VoiceOps AI helps supervisors monitor agent performance, identify coaching needs, understand the reason behind low audit scores, and approve AI-recommended actions from one dashboard.',
    },
    {
      label: 'Problem Statement',
      text: 'Supervisors have access to many metrics like CSAT, AHT, FCR, audit scores, escalation rate, and hold time, but raw data does not clearly answer who needs attention today, why they are underperforming, and what action should be taken next.',
    },
    {
      label: 'Design Goal',
      text: 'Move the product from a passive monitoring tool to an actionable AI agent that surfaces urgent interventions, explains audit reasoning, and closes the loop through coaching automation.',
    },
  ];

  return (
    <div
      style={{
        background: 'linear-gradient(135deg,#0a0a14 0%,#1a1a3e 55%,#0f172a 100%)',
        padding: '96px 48px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(22,119,255,0.15)',
            border: '1px solid rgba(22,119,255,0.3)',
            borderRadius: 24,
            padding: '6px 16px',
            marginBottom: 32,
          }}
        >
          <ThunderboltOutlined style={{ color: '#4096ff' }} />
          <span style={{ color: '#4096ff', fontSize: 13, fontWeight: 600 }}>
            Product Design Case Study
          </span>
        </div>

        <h1
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: '#fff',
            margin: '0 0 18px',
            letterSpacing: '-1.5px',
            lineHeight: 1.1,
            maxWidth: 920,
          }}
        >
          VoiceOps AI —
          <br />
          <span style={{ color: '#4096ff' }}>AI-Powered Supervisor Dashboard</span>
        </h1>
        <p
          style={{
            fontSize: 20,
            color: 'rgba(255,255,255,0.6)',
            margin: '0 0 48px',
            maxWidth: 680,
            lineHeight: 1.6,
          }}
        >
          A contact center supervisor dashboard that turns raw performance data into
          explainable insights and AI-assisted coaching actions.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 56 }}>
          {META.map((m) => (
            <div
              key={m.label}
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8,
                padding: '10px 18px',
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.38)',
                  marginBottom: 4,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                }}
              >
                {m.label}
              </div>
              <div style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>{m.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {CARDS.map((c) => (
            <div
              key={c.label}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: 12,
                padding: '24px',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#4096ff',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: 12,
                }}
              >
                {c.label}
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.72)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section 1: Main Dashboard ───────────────────────────────────────────────

function Sec1Dashboard() {
  return (
    <CsSection
      num="1"
      title="Supervisor Dashboard Main Screen"
      annotation="This screen gives supervisors a fast at-a-glance view of team health, urgent AI-ranked interventions, KPIs, trends, and individual agent performance."
    >
      <ScreenFrame label="Main Dashboard State">
        <StaticLayout active="overview" crumb="Overview">
          <DashboardScreen onOpenAgent={() => {}} onAction={() => {}} />
        </StaticLayout>
      </ScreenFrame>
    </CsSection>
  );
}

// ─── Section 2: AI Insights Focus ───────────────────────────────────────────

function Sec2Insights() {
  return (
    <CsSection
      num="2"
      title="High-Signal AI Insights"
      annotation="Instead of showing only raw metrics, the AI layer surfaces the top interventions that require supervisor attention today."
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #e2e5ea',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          padding: '28px 32px 32px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
          }}
        >
          <div>
            <h3
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 18,
                fontWeight: 700,
                margin: '0 0 6px',
              }}
            >
              <ThunderboltOutlined style={{ color: '#1d39c4' }} />
              Today's priority interventions
            </h3>
            <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)' }}>
              AI-ranked actions based on performance, audit risk, and customer impact.
            </div>
          </div>
          <Button type="link">View all 7 insights</Button>
        </div>
        <div className="vo-insight-grid">
          {VO_INSIGHTS.map((ins) => (
            <InsightCard key={ins.id} ins={ins} onAction={() => {}} />
          ))}
        </div>
      </div>
    </CsSection>
  );
}

// ─── Section 3: Agent Drilldown ──────────────────────────────────────────────

function Sec3Drilldown() {
  return (
    <CsSection
      num="3"
      title="Agent Performance Drilldown Screen"
      annotation="This screen helps supervisors understand one agent's performance in depth, including strengths, weak audit parameters, trends, and recent audited calls."
    >
      <ScreenFrame label="Agent Drilldown State">
        <StaticLayout active="agents" crumb="Rohan Mehta">
          <AgentDrilldown
            onBack={() => {}}
            backLabel="Back to Dashboard"
            onEvidence={() => {}}
            onCoaching={() => {}}
          />
        </StaticLayout>
      </ScreenFrame>
    </CsSection>
  );
}

// ─── Section 4: Evidence Drawer (static inline) ──────────────────────────────

function Sec4Evidence() {
  const E = VO_EVIDENCE;
  const R = VO_ROHAN;

  return (
    <CsSection
      num="4"
      title="Explainable AI Evidence"
      annotation="For any low audit score, the supervisor can inspect why the AI flagged the issue using highlighted transcript snippets and policy-based reasoning."
    >
      <ScreenFrame label="Evidence Drawer State">
        <StaticLayout active="agents" crumb="Rohan Mehta · Evidence">
          <div style={{ display: 'flex', minHeight: 720 }}>
            {/* Left: drilldown context (dimmed) */}
            <div
              style={{
                flex: 1,
                opacity: 0.32,
                padding: '24px',
                overflow: 'hidden',
                minWidth: 0,
              }}
            >
              <div
                className="pro-page-header"
                style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}
              >
                <Button icon={<ArrowLeftOutlined />} size="small">
                  Back to Dashboard
                </Button>
                <Avatar size={36} style={{ background: '#cf1322' }}>RM</Avatar>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{R.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{R.role}</div>
                </div>
                <Tag color="red">
                  <ExclamationCircleFilled /> High risk
                </Tag>
                <div style={{ marginLeft: 'auto' }}>
                  <Button type="primary" size="small">
                    Create coaching plan
                  </Button>
                </div>
              </div>
              <div style={{ padding: '16px 0' }}>
                <div
                  className="vo-kpi-strip"
                  style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 16 }}
                >
                  {R.summary.slice(0, 4).map((s) => (
                    <div className="vo-kpi-cell" key={s.title}>
                      <div className="stat-title">{s.title}</div>
                      <div
                        className="stat-value"
                        style={{ color: s.tone === 'bad' ? '#cf1322' : undefined }}
                      >
                        {s.value}
                        <span className="stat-suffix">{s.suffix}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    background: '#fff',
                    borderRadius: 10,
                    borderLeft: '3px solid #2f54eb',
                    padding: '14px 18px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                    marginBottom: 16,
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
                    AI performance summary
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: 'rgba(0,0,0,0.6)',
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {R.aiSummary.slice(0, 180)}…
                  </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {R.weaknesses.slice(0, 4).map((w) => (
                    <div className="vo-param-row" key={w.name} style={{ gridTemplateColumns: '1fr 80px 36px' }}>
                      <span className="vo-param-name">{w.name}</span>
                      <Bar value={w.value} height={6} />
                      <span className="vo-param-val" style={{ color: scoreTextColor(w.value) }}>
                        {w.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Evidence panel */}
            <div
              style={{
                width: 524,
                background: '#fff',
                borderLeft: '1px solid #e8e8e8',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
              }}
            >
              {/* Panel header */}
              <div
                style={{
                  padding: '18px 24px 14px',
                  borderBottom: '1px solid #f0f0f0',
                  background: '#fafafa',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <span className="vo-ai-chip">
                    <ThunderboltOutlined /> Explainable AI
                  </span>
                  <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                    {E.call} · Rohan Mehta
                  </span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.4, marginBottom: 12 }}>
                  {E.question}
                </div>
                {/* Score banner */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    border: '1px solid #ffccc7',
                    background: '#fff1f0',
                    borderRadius: 8,
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{E.parameter}</span>
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#cf1322',
                      fontFeatureSettings: '"tnum"',
                    }}
                  >
                    {E.score}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div style={{ flex: 1, padding: '20px 24px', overflowY: 'auto' }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 12,
                    color: 'rgba(0,0,0,0.55)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Flagged transcript moments
                </div>

                {E.snippets.map((s, i) => (
                  <div className="vo-snippet" key={i}>
                    <div className="vo-snippet-meta">
                      <SoundOutlined />
                      {E.call} · {s.time}
                    </div>
                    <div className="vo-snippet-lines">
                      {s.lines.map((l, j) => (
                        <div
                          className={`vo-line${l.highlight ? ' hl' : ''}`}
                          key={j}
                        >
                          <span className="who">{l.who}:</span>
                          <span className="txt">"{l.text}"</span>
                        </div>
                      ))}
                    </div>
                    <div className="vo-flag">
                      <FlagOutlined style={{ marginTop: 2, flexShrink: 0 }} />
                      <span>
                        <b>AI flag:</b> {s.flag}
                      </span>
                    </div>
                  </div>
                ))}

                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    margin: '20px 0 8px',
                    color: 'rgba(0,0,0,0.55)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  AI Reasoning
                </div>
                <div
                  style={{
                    border: '1px solid #f0f0f0',
                    borderRadius: 10,
                    overflow: 'hidden',
                    marginBottom: 16,
                  }}
                >
                  {E.reasoning.map((r) => (
                    <div className="vo-reason-row" key={r.label} style={{ padding: '10px 16px' }}>
                      <span className="vo-reason-label">{r.label}</span>
                      <span className="vo-reason-text">
                        {r.label === 'AI confidence' ? <b>{r.text}</b> : r.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  padding: '14px 24px',
                  borderTop: '1px solid #f0f0f0',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                  background: '#fafafa',
                }}
              >
                <Button type="primary" size="small" icon={<CheckCircleOutlined />}>
                  Accept AI finding
                </Button>
                <Button size="small">Mark as incorrect</Button>
                <Button size="small">Send to QA review</Button>
                <Button size="small" icon={<SolutionOutlined />}>
                  Create coaching plan
                </Button>
              </div>
            </div>
          </div>
        </StaticLayout>
      </ScreenFrame>
    </CsSection>
  );
}

// ─── Section 5: Coaching Modal (static) ─────────────────────────────────────

function Sec5Coaching() {
  const C = VO_COACHING;

  return (
    <CsSection
      num="5"
      title="AI-Assisted Coaching Approval Flow"
      annotation="The system converts audit patterns into a recommended coaching plan and lets the supervisor approve automated enrollment."
    >
      <ScreenFrame label="Coaching Approval State">
        <StaticLayout active="coaching" crumb="Coaching">
          <div style={{ position: 'relative', minHeight: 740 }}>
            {/* Dim overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.45)',
                zIndex: 1,
              }}
            />
            {/* Modal */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'center',
                padding: '40px 24px',
              }}
            >
              <div
                style={{
                  width: 640,
                  background: '#fff',
                  borderRadius: 14,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
                  overflow: 'hidden',
                }}
              >
                {/* Modal header */}
                <div
                  style={{
                    padding: '20px 24px 16px',
                    borderBottom: '1px solid #f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                      AI-Recommended Coaching Plan
                    </span>
                    <span className="vo-ai-chip">
                      <ThunderboltOutlined /> Rohan Mehta
                    </span>
                  </div>
                </div>

                {/* Modal body */}
                <div style={{ padding: '24px' }}>
                  <Steps
                    current={0}
                    size="small"
                    style={{ marginBottom: 24 }}
                    items={[
                      { title: 'Pattern detected' },
                      { title: 'Recommended training' },
                      { title: 'Automation approval' },
                    ]}
                  />

                  {/* Step 1 content */}
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.65,
                      margin: '0 0 16px',
                      color: 'rgba(0,0,0,0.85)',
                    }}
                  >
                    {C.pattern}
                  </p>
                  <div
                    style={{
                      border: '1px solid #f0f0f0',
                      borderRadius: 10,
                      padding: '16px 20px',
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'rgba(0,0,0,0.45)',
                        marginBottom: 10,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      Evidence
                    </div>
                    {C.evidence.map((ev) => (
                      <div
                        key={ev}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          marginBottom: 6,
                          fontSize: 14,
                        }}
                      >
                        <ExclamationCircleFilled style={{ color: '#cf1322', fontSize: 13 }} />
                        {ev}
                      </div>
                    ))}
                  </div>

                  {/* Module card (Step 2 preview) */}
                  <div className="vo-module" style={{ marginBottom: 16 }}>
                    <div className="vo-module-icon">
                      <RiseOutlined />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="vo-module-name">{C.module.name}</div>
                      <div className="vo-module-meta">
                        <span>
                          <ClockCircleOutlined /> {C.module.duration}
                        </span>
                        <span>
                          <AimOutlined /> {C.module.format}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: 13,
                          color: 'rgba(0,0,0,0.65)',
                          margin: '8px 0 0',
                          lineHeight: 1.6,
                        }}
                      >
                        {C.module.reason}
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Approval */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
                    {[
                      'Enroll agent automatically',
                      'Schedule follow-up audit',
                      'Notify agent',
                      'Add manager note',
                    ].map((opt) => (
                      <div
                        key={opt}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}
                      >
                        <Checkbox checked />
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      background: '#fafafa',
                      border: '1px solid #e8e8e8',
                      borderRadius: 8,
                      padding: '10px 14px',
                      fontSize: 13,
                      color: 'rgba(0,0,0,0.65)',
                      fontStyle: 'italic',
                    }}
                  >
                    "{C.note}"
                  </div>
                </div>

                {/* Footer */}
                <div
                  style={{
                    padding: '16px 24px',
                    borderTop: '1px solid #f0f0f0',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 8,
                  }}
                >
                  <Button>Cancel</Button>
                  <Button>Edit Plan</Button>
                  <Button type="primary" icon={<CheckCircleOutlined />}>
                    Approve Enrollment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </StaticLayout>
      </ScreenFrame>
    </CsSection>
  );
}

// ─── Section 6: Success State ────────────────────────────────────────────────

function Sec6Success() {
  const C = VO_COACHING;

  return (
    <CsSection
      num="6"
      title="Closed-Loop Coaching Success State"
      annotation="After approval, the system confirms that the agent has been enrolled and schedules a follow-up audit, closing the loop from insight to action."
    >
      <ScreenFrame label="Coaching Success State">
        <StaticLayout active="coaching" crumb="Coaching · Confirmation">
          <div style={{ position: 'relative', minHeight: 560 }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.45)',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'center',
                padding: '72px 24px',
              }}
            >
              <div
                style={{
                  width: 540,
                  background: '#fff',
                  borderRadius: 14,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.26)',
                  padding: '48px 40px',
                  textAlign: 'center',
                }}
              >
                <div className="vo-success">
                  <CheckCircleFilled className="big-icon" />
                  <h3>Coaching Plan Approved</h3>
                  <p>{C.success}</p>
                </div>
                <div
                  style={{
                    background: '#f6ffed',
                    border: '1px solid #b7eb8f',
                    borderRadius: 10,
                    padding: '16px 20px',
                    textAlign: 'left',
                    margin: '24px 0',
                  }}
                >
                  {[
                    'Follow-up audit scheduled for Friday',
                    'Agent notification sent',
                    'Manager note attached',
                    'Coaching progress will be tracked in the Coaching tab',
                  ].map((item) => (
                    <div
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 8,
                        fontSize: 13,
                      }}
                    >
                      <CheckCircleFilled style={{ color: '#52c41a', fontSize: 14, flexShrink: 0 }} />
                      <span style={{ color: 'rgba(0,0,0,0.72)' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                  <Button>View Coaching Plan</Button>
                  <Button type="primary">Return to Dashboard</Button>
                </div>
              </div>
            </div>
          </div>
        </StaticLayout>
      </ScreenFrame>
    </CsSection>
  );
}

// ─── Section 7: AI Natural Language Query ────────────────────────────────────

function Sec7AIQuery() {
  const A = VO_ASSISTANT;
  const maxBar = Math.max(...A.bars.map((b) => b.value));

  const assistantCols: ColumnsType<AssistantRow> = [
    {
      title: 'Agent',
      dataIndex: 'agent',
      key: 'agent',
      render: (a: string) => <b style={{ fontWeight: 500 }}>{a}</b>,
    },
    {
      title: 'Failed calls',
      dataIndex: 'failed',
      key: 'failed',
      align: 'right',
      width: 110,
    },
    { title: 'Common mistake', dataIndex: 'mistake', key: 'mistake' },
    {
      title: 'Latest failed call',
      dataIndex: 'call',
      key: 'call',
      width: 148,
      render: (c: string) => (
        <span style={{ color: '#1677ff', fontWeight: 500 }}>{c}</span>
      ),
    },
    {
      title: 'Suggested action',
      dataIndex: 'action',
      key: 'action',
      width: 175,
      render: (a: string) => (
        <Tag color={a === 'Monitor' ? 'blue' : a === 'QA review' ? 'gold' : 'volcano'}>
          {a}
        </Tag>
      ),
    },
  ];

  return (
    <CsSection
      num="7"
      title="Natural Language Interaction"
      annotation="Supervisors can ask complex operational questions in natural language and receive a visual answer with charts, tables, and recommended actions."
    >
      <ScreenFrame label="Natural Language Query Result State">
        <StaticLayout active="overview" crumb="Overview · AI Query">
          <div style={{ padding: '28px 32px 32px', background: '#f5f7fa' }}>
            <div
              style={{
                background: '#fff',
                borderRadius: 16,
                border: '1px solid #e2e5ea',
                boxShadow: '0 8px 32px rgba(0,0,0,0.09)',
                overflow: 'hidden',
              }}
            >
              {/* Query bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '16px 24px',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                <ThunderboltOutlined style={{ color: '#1d39c4', fontSize: 18, flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 16, fontWeight: 500, color: 'rgba(0,0,0,0.85)' }}>
                  {A.query}
                </span>
                <Button type="primary" icon={<SendOutlined />}>Ask</Button>
              </div>

              {/* Response */}
              <div style={{ padding: '20px 24px 28px' }}>
                {/* User bubble */}
                <div className="vo-user-q">
                  <Avatar size={28} style={{ background: '#13c2c2', flexShrink: 0 }}>S</Avatar>
                  <span className="bubble">{A.query}</span>
                </div>

                {/* AI label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span className="vo-ai-chip">
                    <ThunderboltOutlined /> AI answer
                  </span>
                  <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)' }}>
                    Analyzed 142 audited calls since policy update (Jun 2)
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    margin: '8px 0 6px',
                    letterSpacing: '-0.2px',
                  }}
                >
                  {A.responseTitle}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: 'rgba(0,0,0,0.55)',
                    lineHeight: 1.6,
                    margin: '0 0 18px',
                    maxWidth: 780,
                  }}
                >
                  {A.summary}
                </p>

                {/* Mini bar chart */}
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #f0f0f0',
                    borderRadius: 12,
                    padding: '16px 20px',
                    marginBottom: 16,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
                    Failed escalation-policy calls per agent
                  </div>
                  {A.bars.map((b) => (
                    <div className="vo-bar-row" key={b.name}>
                      <span style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{b.name}</span>
                      <span className="vo-bar-rail">
                        <span
                          className="vo-bar-fill"
                          style={{ width: `${(b.value / maxBar) * 100}%` }}
                        />
                      </span>
                      <span className="vo-bar-val">{b.value} calls</span>
                    </div>
                  ))}
                </div>

                {/* Table */}
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #f0f0f0',
                    borderRadius: 12,
                    overflow: 'hidden',
                    marginBottom: 16,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                >
                  <Table<AssistantRow>
                    rowKey="agent"
                    size="small"
                    pagination={false}
                    columns={assistantCols}
                    dataSource={A.rows}
                  />
                </div>

                {/* Suggested action */}
                <div className="vo-suggest">
                  <ReadOutlined style={{ fontSize: 18, color: '#1d39c4', flexShrink: 0 }} />
                  <span className="txt">{A.suggestion}</span>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <Button type="primary">Approve bulk enrollment</Button>
                    <Button>View call evidence</Button>
                    <Button icon={<ExportOutlined />}>Export findings</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StaticLayout>
      </ScreenFrame>
    </CsSection>
  );
}

// ─── Section 8: Design Rationale ─────────────────────────────────────────────

function Sec8Rationale() {
  const CARDS = [
    {
      title: 'From Monitoring to Action',
      text: 'The dashboard prioritizes AI-ranked interventions above raw metrics so supervisors can quickly decide where to focus.',
      icon: <ThunderboltOutlined style={{ color: '#1677ff', fontSize: 22 }} />,
      bg: '#e6f4ff',
      border: '#bae0ff',
    },
    {
      title: 'Explainable AI',
      text: 'Low audit scores are supported with transcript evidence, policy references, confidence levels, and QA review actions.',
      icon: <EyeOutlined style={{ color: '#0891b2', fontSize: 22 }} />,
      bg: '#ecfeff',
      border: '#a5f3fc',
    },
    {
      title: 'Coaching Automation',
      text: 'The system recommends training modules based on repeated audit failure patterns and allows supervisor approval before automation.',
      icon: <SolutionOutlined style={{ color: '#7c3aed', fontSize: 22 }} />,
      bg: '#f5f3ff',
      border: '#ddd6fe',
    },
    {
      title: 'Natural Language Exploration',
      text: 'Supervisors can ask complex team-performance questions and receive visual, actionable answers instead of plain text responses.',
      icon: <SearchOutlined style={{ color: '#0d9488', fontSize: 22 }} />,
      bg: '#f0fdf4',
      border: '#bbf7d0',
    },
  ];

  return (
    <CsSection num="8" title="Design Rationale">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
        {CARDS.map((c) => (
          <div
            key={c.title}
            style={{
              background: '#fff',
              border: '1px solid #e2e5ea',
              borderRadius: 12,
              padding: '28px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: c.bg,
                border: `1px solid ${c.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 18,
              }}
            >
              {c.icon}
            </div>
            <h4 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 10px', color: '#0a0a14' }}>
              {c.title}
            </h4>
            <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.65, margin: 0 }}>
              {c.text}
            </p>
          </div>
        ))}
      </div>
    </CsSection>
  );
}

// ─── Section 9: Requirement Mapping ──────────────────────────────────────────

function Sec9Requirements() {
  const ROWS = [
    {
      req: 'Supervisor Dashboard Main Screen',
      solution:
        'Designed as the main team performance dashboard with AI insights, KPIs, trends, and agent table.',
    },
    {
      req: 'Agent Performance Drilldown Screen',
      solution:
        "Designed as Rohan Mehta's detailed performance view with audit breakdown, strengths, weaknesses, trends, and recent calls.",
    },
    {
      req: 'Proactive AI Insights',
      solution:
        "Designed as Today's Priority Interventions with top 3 urgent AI-ranked actions.",
    },
    {
      req: 'Explainable AI',
      solution:
        'Designed as an evidence drawer with transcript snippets, AI flags, policy reasoning, and confidence score.',
    },
    {
      req: 'Agentic Steering / Closed-Loop Action',
      solution:
        'Designed as AI-recommended coaching approval flow with automatic enrollment and follow-up audit.',
    },
    {
      req: 'Natural Language Interaction',
      solution:
        'Designed as an AI query result with bar chart, filtered table, and recommended bulk action.',
    },
    {
      req: 'Ant Design System',
      solution:
        'Used Ant Design layout, cards, tables, tags, buttons, modals, drawers, filters, and Recharts for charts.',
    },
  ];

  const cols: ColumnsType<(typeof ROWS)[0]> = [
    {
      title: 'Assignment Requirement',
      dataIndex: 'req',
      key: 'req',
      width: '34%',
      render: (r: string) => (
        <span style={{ fontWeight: 600, fontSize: 14 }}>{r}</span>
      ),
    },
    {
      title: 'Designed Solution',
      dataIndex: 'solution',
      key: 'solution',
      render: (s: string) => (
        <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.72)' }}>{s}</span>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: 116,
      render: () => (
        <Tag color="green">
          <CheckCircleFilled /> Completed
        </Tag>
      ),
    },
  ];

  return (
    <CsSection num="9" title="Requirement Mapping">
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #e2e5ea',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}
      >
        <Table rowKey="req" columns={cols} dataSource={ROWS} pagination={false} />
      </div>
    </CsSection>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <div
      style={{
        background: '#0a0a14',
        padding: '48px',
        textAlign: 'center',
      }}
    >
      <div
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}
      >
        <ThunderboltOutlined style={{ color: '#4096ff', fontSize: 20 }} />
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>VoiceOps AI</span>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, margin: 0 }}>
        Product Design Case Study · High-fidelity prototype · React 18, TypeScript, Ant Design 5
      </p>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function CaseStudyPage() {
  return (
    <div
      style={{
        background: '#f0f2f5',
        minHeight: '100vh',
        fontFamily:
          'var(--ad-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
      }}
    >
      <Cover />
      <Sec1Dashboard />
      <Sec2Insights />
      <Sec3Drilldown />
      <Sec4Evidence />
      <Sec5Coaching />
      <Sec6Success />
      <Sec7AIQuery />
      <Sec8Rationale />
      <Sec9Requirements />
      <Footer />
    </div>
  );
}
