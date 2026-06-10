import type { ReactNode } from 'react';
import { ConfigProvider, Table, Tag, Button, Steps, Checkbox, Input, Avatar } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  ThunderboltOutlined,
  CheckCircleFilled,
  RiseOutlined,
  ReadOutlined,
  ExportOutlined,
  ClockCircleOutlined,
  AimOutlined,
  SendOutlined,
  CheckCircleOutlined,
  FlagOutlined,
  SoundOutlined,
  SolutionOutlined,
  SearchOutlined,
  CloseOutlined,
  WarningFilled,
} from '@ant-design/icons';
import { Sidebar } from '../components/Sidebar';
import { HeaderBar } from '../components/HeaderBar';
import type { PageKey } from '../components/Sidebar';
import { DashboardScreen } from './DashboardScreen';
import { AgentDrilldown } from './AgentDrilldown';
import { CoachingPage } from './CoachingPage';
import {
  VO_EVIDENCE,
  VO_COACHING,
  VO_ASSISTANT,
} from '../data/mockData';
import type { AssistantRow } from '../data/mockData';

// ─── Theme & Layout Shell ────────────────────────────────────────────────────

const THEME = {
  token: {
    borderRadius: 8,
    colorBorderSecondary: '#f0f0f0',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
};

/**
 * Uses the exact same Sidebar + HeaderBar as App.tsx, but without
 * height:100vh / overflow:hidden so all content is visible in the scrollable case study.
 */
function RealLayout({ page = 'overview', children }: { page?: PageKey; children: ReactNode }) {
  return (
    <ConfigProvider theme={THEME}>
      <div style={{ display: 'flex', background: '#f5f7fa' }}>
        <Sidebar collapsed={false} page={page} onNav={() => {}} />
        <div className="pro-main">
          <HeaderBar
            collapsed={false}
            onToggle={() => {}}
            onOpenAssistant={() => {}}
            page={page}
          />
          <div className="pro-content" style={{ overflow: 'visible', minHeight: 900 }}>
            {children}
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

// ─── Case-study section wrapper ──────────────────────────────────────────────

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
        maxWidth: 1920,
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

/** Browser-chrome frame that wraps each screen mockup */
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
        boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
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

/** Matches the small × close button inside antd Drawer / Modal headers */
function CloseBtn() {
  return (
    <button
      style={{
        width: 22,
        height: 22,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 0,
        background: 'none',
        cursor: 'default',
        color: 'rgba(0,0,0,0.45)',
        fontSize: 12,
        borderRadius: 4,
        flexShrink: 0,
        padding: 0,
      }}
    >
      <CloseOutlined />
    </button>
  );
}

/** Callout cards rendered below each screen explaining key design decisions */
function ScreenAnnotations({ items }: { items: { label: string; text: string }[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 12,
        marginTop: 20,
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            background: '#fff',
            border: '1px solid #e2e5ea',
            borderRadius: 10,
            padding: '14px 18px',
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
          }}
        >
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: '#e6f4ff',
              color: '#1677ff',
              fontSize: 11,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: 1,
            }}
          >
            {i + 1}
          </span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 3 }}>
              {item.label}
            </div>
            <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.55 }}>{item.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Cover ───────────────────────────────────────────────────────────────────

function Cover() {
  const META = [
    { label: 'Role', value: 'Product Designer' },
    { label: 'Domain', value: 'Contact Center / B2B SaaS' },
    { label: 'Design System', value: 'Ant Design v5' },
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
      <div style={{ maxWidth: 1920, margin: '0 auto', position: 'relative' }}>
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
          VoiceOps AI —<br />
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

// ─── Section 1 — Supervisor Dashboard main screen ────────────────────────────

function Sec1Dashboard() {
  return (
    <CsSection
      num="1"
      title="Supervisor Dashboard — Main Screen"
      annotation="Gives supervisors a fast at-a-glance view of team health, urgent AI-ranked interventions, KPIs, trends, and individual agent performance."
    >
      <ScreenFrame label="Main Dashboard">
        <RealLayout page="overview">
          <DashboardScreen onOpenAgent={() => {}} onAction={() => {}} />
        </RealLayout>
      </ScreenFrame>
      <ScreenAnnotations
        items={[
          {
            label: 'AI-ranked interventions at the top',
            text: "Priority Interventions are placed above every other section — the most urgent action is the first thing a supervisor sees, not buried under raw metrics.",
          },
          {
            label: 'KPI strip — 7 metrics in one row',
            text: 'CSAT, AHT, FCR, audit pass rate, escalation rate, hold time, and interactions are shown in a single scannable strip with trend arrows so the supervisor never has to visit a separate report page.',
          },
          {
            label: 'Team performance trend chart',
            text: 'CSAT, Audit Score, and FCR are plotted together over 7 days. Showing all three on one chart makes it easy to spot when they diverge — e.g. audit score rising while CSAT falls.',
          },
          {
            label: 'Agent table with inline score bars',
            text: 'Each agent row has a score bar, weakest parameter, status tag, and an AI-recommended action. Supervisors can triage the whole team without drilling into individual profiles.',
          },
        ]}
      />
    </CsSection>
  );
}

// ─── Section 2 — Agent Performance Drilldown ────────────────────────────────

function Sec3Drilldown() {
  return (
    <CsSection
      num="2"
      title="Agent Performance Drilldown"
      annotation="Supervisors can drill into one agent's performance in depth — strengths, weak audit parameters, CSAT trends, and every audited call."
    >
      <ScreenFrame label="Agent Drilldown — Rohan Mehta">
        <RealLayout page="agent">
          <AgentDrilldown
            onBack={() => {}}
            backLabel="Back to Dashboard"
            onEvidence={() => {}}
            onCoaching={() => {}}
          />
        </RealLayout>
      </ScreenFrame>
      <ScreenAnnotations
        items={[
          {
            label: 'Agent header with risk tag and immediate action',
            text: 'Name, role, team, risk tag ("High risk"), and the coaching CTA are all on one row — the supervisor has full context before reading any metric.',
          },
          {
            label: 'Score bars on KPI cells',
            text: 'Percentage metrics like Overall QA Score and CSAT include an inline score bar so low values are visible at a glance without needing to read the number.',
          },
          {
            label: 'AI-generated performance summary',
            text: 'The summary is auto-generated from the last 18 audited calls — it explains the pattern in plain language so supervisors understand the root cause, not just the score.',
          },
          {
            label: 'Strengths vs. Weaknesses side-by-side',
            text: 'Placing strengths and weaknesses in adjacent cards makes the contrast visible immediately — supervisor can identify peer coaching opportunities as easily as risks.',
          },
          {
            label: 'Audit breakdown + trend chart',
            text: 'The parameter breakdown shows every QA dimension, and the trend chart alongside it reveals whether scores are recovering or continuing to decline — critical for timing the coaching intervention.',
          },
          {
            label: 'Recent audited calls table',
            text: 'Shows call IDs, customer sentiment, audit score, and failed parameters for the last 3 calls with a "View evidence" link — so supervisors can go from trend to specific call in one click.',
          },
        ]}
      />
    </CsSection>
  );
}

// ─── Section 3 — Evidence Drawer ─────────────────────────────────────────────

function Sec4Evidence() {
  const E = VO_EVIDENCE;

  return (
    <CsSection
      num="3"
      title="Explainable AI Evidence"
      annotation="For any low audit score the supervisor can inspect WHY the AI flagged the issue — highlighted transcript snippets, policy violations, and AI confidence."
    >
      <ScreenFrame label="Evidence Drawer — Open">
        <RealLayout page="agent">
          <div style={{ position: 'relative', minHeight: 900, overflow: 'hidden' }}>

            {/* Background: real AgentDrilldown — dimmed like antd Drawer mask shows it */}
            <div style={{ opacity: 0.25, pointerEvents: 'none' }}>
              <AgentDrilldown
                onBack={() => {}}
                backLabel="Back to Dashboard"
                onEvidence={() => {}}
                onCoaching={() => {}}
              />
            </div>

            {/* antd Drawer default mask */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.45)',
                zIndex: 1,
              }}
            />

            {/* ── Drawer panel — antd Drawer right placement, width=560 ── */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: 560,
                background: '#fff',
                zIndex: 2,
                boxShadow:
                  '-6px 0 16px -8px rgba(0,0,0,.08),-9px 0 28px 0 rgba(0,0,0,.05),-12px 0 48px 16px rgba(0,0,0,.03)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* antd Drawer header */}
              <div
                style={{
                  padding: '16px 24px',
                  borderBottom: '1px solid rgba(5,5,5,.06)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 8,
                }}
              >
                <div style={{ flex: 1 }}>
                  {/* Same content as EvidenceDrawer title prop */}
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
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 400,
                        color: 'var(--ad-color-text-secondary)',
                      }}
                    >
                      {E.call} · Rohan Mehta
                    </span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.4 }}>
                    {E.question}
                  </div>
                </div>
                <CloseBtn />
              </div>

              {/* antd Drawer body — exact same as EvidenceDrawer body */}
              <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
                {/* Score banner */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    border: '1px solid #ffccc7',
                    background: '#fff1f0',
                    borderRadius: 8,
                    marginBottom: 20,
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{E.parameter}</span>
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: '#cf1322',
                      fontFeatureSettings: '"tnum"',
                    }}
                  >
                    {E.score}
                  </span>
                </div>

                {/* Transcript snippets */}
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>
                  Flagged transcript moments
                </div>
                {E.snippets.map((s, i) => (
                  <div className="vo-snippet" key={i}>
                    <div className="vo-snippet-meta">
                      <SoundOutlined />
                      {E.call} · {s.time}
                      <span style={{ marginLeft: 'auto' }}>
                        <Button type="link" size="small">
                          Play audio
                        </Button>
                      </span>
                    </div>
                    <div className="vo-snippet-lines">
                      {s.lines.map((l, j) => (
                        <div className={`vo-line${l.highlight ? ' hl' : ''}`} key={j}>
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

                {/* AI Reasoning — same as EvidenceDrawer */}
                <div style={{ fontSize: 14, fontWeight: 600, margin: '20px 0 4px' }}>
                  AI reasoning
                </div>
                <div>
                  {E.reasoning.map((r) => (
                    <div className="vo-reason-row" key={r.label}>
                      <span className="vo-reason-label">{r.label}</span>
                      <span className="vo-reason-text">
                        {r.label === 'AI confidence' ? <b>{r.text}</b> : r.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* antd Drawer footer — same buttons as EvidenceDrawer */}
              <div
                style={{
                  padding: '8px 24px',
                  borderTop: '1px solid rgba(5,5,5,.06)',
                  display: 'flex',
                  gap: 8,
                  flexWrap: 'wrap',
                }}
              >
                <Button type="primary" icon={<CheckCircleOutlined />}>
                  Accept AI finding
                </Button>
                <Button>Mark as incorrect</Button>
                <Button>Send to QA review</Button>
                <Button icon={<SolutionOutlined />}>Create coaching plan</Button>
              </div>
            </div>
          </div>
        </RealLayout>
      </ScreenFrame>
      <ScreenAnnotations
        items={[
          {
            label: 'Drawer slides in — drilldown stays visible',
            text: 'The underlying agent drilldown remains partially visible through the dim mask, so supervisors never lose their place. They can dismiss and return to the exact same view.',
          },
          {
            label: 'Score banner anchors the context',
            text: '"Compliance & process adherence — 2/5" is the first thing visible when the drawer opens. The supervisor immediately knows what is being explained before reading any transcript.',
          },
          {
            label: 'Highlighted transcript lines',
            text: 'The specific agent lines that triggered the AI flag are underlined in red. Supervisors see the exact words, not a summary — making the evidence concrete and challengeable.',
          },
          {
            label: 'AI reasoning table makes the model auditable',
            text: 'Required policy, detected issue, customer impact, compliance risk, and AI confidence are shown in a structured table — supervisors can agree or disagree with each row, not just the final score.',
          },
          {
            label: 'Four resolution paths in the footer',
            text: 'Accept finding, mark as incorrect, send to QA, or create a coaching plan — the supervisor controls what happens next. The AI recommends; the human decides.',
          },
        ]}
      />
    </CsSection>
  );
}

// ─── Section 4 — Coaching Approval Modal (All 3 Steps) ───────────────────────
// Shows all 3 steps of CoachingModal.tsx side by side

const MODAL_SHADOW =
  '0 6px 16px 0 rgba(0,0,0,.08),0 3px 6px -4px rgba(0,0,0,.12),0 9px 28px 8px rgba(0,0,0,.05)';

const STEPPER_ITEMS = [
  { title: 'Pattern detected' },
  { title: 'Recommended training' },
  { title: 'Automation approval' },
];

/** Shared modal chrome (header + flex column wrapper) */
function ModalShell({
  stepLabel,
  stepIndex,
  children,
  footer,
}: {
  stepLabel: string;
  stepIndex: number;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div>
      {/* Step badge above the modal */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: '#1677ff',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: '#1677ff',
            color: '#fff',
            fontSize: 12,
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {stepIndex + 1}
        </span>
        {stepLabel}
      </div>

      {/* Modal card */}
      <div
        style={{
          background: '#fff',
          borderRadius: 8,
          boxShadow: MODAL_SHADOW,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header — identical across all steps */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 24px',
            borderBottom: '1px solid rgba(5,5,5,.06)',
            gap: 8,
          }}
        >
          <div style={{ flex: 1, fontSize: 16, fontWeight: 600 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              AI-recommended coaching plan
              <span className="vo-ai-chip">
                <ThunderboltOutlined /> Rohan Mehta
              </span>
            </span>
          </div>
          <CloseBtn />
        </div>

        {/* Body */}
        <div style={{ padding: '16px 24px 0' }}>
          <Steps
            current={stepIndex}
            size="small"
            style={{ marginBottom: 24 }}
            items={STEPPER_ITEMS}
          />
          {children}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 8,
            padding: '16px 24px',
          }}
        >
          {footer}
        </div>
      </div>
    </div>
  );
}

function Sec5Coaching() {
  const C = VO_COACHING;

  return (
    <CsSection
      num="4"
      title="AI-Assisted Coaching Approval — 3-Step Flow"
      annotation="The coaching dialog walks the supervisor through three steps: detecting the performance pattern from audit data, reviewing the AI-recommended training module, and approving automated enrollment with follow-up actions."
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>

        {/* ── Step 1: Pattern detected ── */}
        <ModalShell
          stepIndex={0}
          stepLabel="Pattern Detected"
          footer={
            <>
              <Button>Cancel</Button>
              <Button type="primary">Next: recommended training</Button>
            </>
          }
        >
          <p style={{ fontSize: 14, lineHeight: 1.6, margin: '0 0 14px' }}>
            {C.pattern}
          </p>
          <div
            style={{
              border: '1px solid #f0f0f0',
              borderRadius: 8,
              padding: '8px 16px',
              marginBottom: 8,
            }}
          >
            {C.evidence.map((e) => (
              <div className="vo-evidence-li" key={e}>
                <WarningFilled style={{ color: '#faad14', marginTop: 3 }} />
                <span>{e}</span>
              </div>
            ))}
          </div>
        </ModalShell>

        {/* ── Step 2: Recommended training ── */}
        <ModalShell
          stepIndex={1}
          stepLabel="Recommended Training"
          footer={
            <>
              <Button>Back</Button>
              <Button>Edit plan</Button>
              <Button type="primary">Next: approval</Button>
            </>
          }
        >
          <div className="vo-module">
            <span className="vo-module-icon">
              <ReadOutlined />
            </span>
            <span style={{ flex: 1 }}>
              <div className="vo-module-name">{C.module.name}</div>
              <div className="vo-module-meta">
                <span>
                  <ClockCircleOutlined /> {C.module.duration}
                </span>
                <span>
                  <AimOutlined /> {C.module.format}
                </span>
              </div>
            </span>
          </div>
          <div style={{ marginTop: 14, marginBottom: 8 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--ad-color-text-secondary)',
                marginBottom: 4,
              }}
            >
              Why this module
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>{C.module.reason}</p>
          </div>
        </ModalShell>

        {/* ── Step 3: Automation approval ── */}
        <ModalShell
          stepIndex={2}
          stepLabel="Automation Approval"
          footer={
            <>
              <Button>Back</Button>
              <Button>Cancel</Button>
              <Button type="primary" icon={<CheckCircleOutlined />}>
                Approve enrollment
              </Button>
            </>
          }
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              marginBottom: 8,
            }}
          >
            {[
              'Enroll agent automatically',
              'Schedule follow-up audit (Friday, Jun 12)',
              'Notify agent',
              'Add manager note',
            ].map((label) => (
              <Checkbox key={label} checked>
                {label}
              </Checkbox>
            ))}
          </div>
          <div style={{ marginTop: 8, marginBottom: 8 }}>
            <label
              style={{
                fontSize: 13,
                color: 'var(--ad-color-text-secondary)',
                display: 'block',
                marginBottom: 6,
              }}
            >
              Manager note (visible to Rohan)
            </label>
            <Input.TextArea rows={3} value={C.note} readOnly />
          </div>
        </ModalShell>

      </div>
      <ScreenAnnotations
        items={[
          {
            label: 'Step 1 — Pattern before persuasion',
            text: 'The supervisor sees exactly what AI detected — the pattern description and four concrete evidence bullets — before being asked to approve anything. Informed consent, not blind automation.',
          },
          {
            label: 'Step 2 — AI-selected module with reasoning',
            text: 'The recommended module shows duration, format, and a natural-language "Why this module" explanation tailored to this agent\'s specific failures — not a generic training catalogue.',
          },
          {
            label: 'Step 3 — Granular automation control',
            text: 'Each automated action (enrollment, follow-up audit, agent notification, manager note) is a separate checkbox. The supervisor controls exactly what fires — the AI recommends, the human approves.',
          },
          {
            label: 'Stepper keeps the supervisor oriented',
            text: 'The Steps component at the top of each modal state shows progress through the 3-step flow. Supervisors always know where they are and can navigate back to previous steps.',
          },
        ]}
      />
    </CsSection>
  );
}

// ─── Section 5 — Coaching Success State ──────────────────────────────────────

function Sec6Success() {
  const C = VO_COACHING;

  return (
    <CsSection
      num="5"
      title="Closed-Loop Coaching Success State"
      annotation="After approval, the system confirms enrollment, schedules a follow-up audit, and notifies the agent — closing the loop from AI insight to human-approved action."
    >
      <ScreenFrame label="Coaching Modal — Success State">
        <RealLayout page="coaching">
          <div style={{ position: 'relative', minHeight: 900, overflow: 'hidden' }}>

            <div style={{ opacity: 0.25, pointerEvents: 'none' }}>
              <CoachingPage onCoaching={() => {}} />
            </div>

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.45)',
                zIndex: 1,
              }}
            />

            {/* ── Modal step=3 ── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
              }}
            >
              <div
                style={{
                  width: 640,
                  maxWidth: '100%',
                  background: '#fff',
                  borderRadius: 8,
                  boxShadow:
                    '0 6px 16px 0 rgba(0,0,0,.08),0 3px 6px -4px rgba(0,0,0,.12),0 9px 28px 8px rgba(0,0,0,.05)',
                }}
              >
                {/* Modal header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px 24px',
                    borderBottom: '1px solid rgba(5,5,5,.06)',
                    gap: 8,
                  }}
                >
                  <div style={{ flex: 1, fontSize: 16, fontWeight: 600 }}>
                    <span
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
                    >
                      AI-recommended coaching plan
                      <span className="vo-ai-chip">
                        <ThunderboltOutlined /> Rohan Mehta
                      </span>
                    </span>
                  </div>
                  <CloseBtn />
                </div>

                {/* Modal body — step=3 success state (no Steps shown, matches CoachingModal) */}
                <div style={{ padding: '24px' }}>
                  <div className="vo-success">
                    <div className="big-icon">
                      <CheckCircleFilled style={{ color: '#52c41a', fontSize: 48 }} />
                    </div>
                    <h3>Coaching plan approved</h3>
                    <p>{C.success}</p>
                  </div>
                </div>

                {/* Modal footer — step=3 buttons */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 8,
                    padding: '0 24px 16px',
                  }}
                >
                  <Button>View coaching plan</Button>
                  <Button type="primary">Done</Button>
                </div>
              </div>
            </div>
          </div>
        </RealLayout>
      </ScreenFrame>
      <ScreenAnnotations
        items={[
          {
            label: 'Large checkmark — the job is done',
            text: 'The success state uses a 48px green CheckCircleFilled icon at the centre. The visual weight signals completion clearly — there is no ambiguity about whether the action fired.',
          },
          {
            label: 'Confirmation message is specific',
            text: '"Rohan has been enrolled in Active Listening for Escalated Voice Calls. Follow-up audit scheduled for Friday." — not a generic "success". The supervisor knows exactly what was automated.',
          },
          {
            label: 'Two CTAs — review or move on',
            text: '"View coaching plan" lets supervisors inspect what was created. "Done" takes them back to the dashboard immediately so they can move on to the next intervention.',
          },
        ]}
      />
    </CsSection>
  );
}

// ─── Section 6 — Natural Language AI Query ───────────────────────────────────

function Sec7AIQuery() {
  const A = VO_ASSISTANT;
  const maxBar = Math.max(...A.bars.map((b) => b.value));

  const assistantCols: ColumnsType<AssistantRow> = [
    {
      title: 'Agent',
      dataIndex: 'agent',
      key: 'agent',
      width: 150,
      render: (a: string) => <b style={{ fontWeight: 500 }}>{a}</b>,
    },
    {
      title: 'Failed calls',
      dataIndex: 'failed',
      key: 'failed',
      width: 110,
      align: 'right',
    },
    { title: 'Common mistake', dataIndex: 'mistake', key: 'mistake' },
    {
      title: 'Latest failed call',
      dataIndex: 'call',
      key: 'call',
      width: 150,
      render: (c: string) => (
        <span style={{ color: '#1677ff', fontWeight: 500 }}>{c}</span>
      ),
    },
    {
      title: 'Suggested action',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      render: (a: string) => (
        <Tag color={a === 'Monitor' ? 'blue' : a === 'QA review' ? 'gold' : 'volcano'}>
          {a}
        </Tag>
      ),
    },
  ];

  return (
    <CsSection
      num="6"
      title="Natural Language AI Query"
      annotation="Supervisors can ask complex operational questions in plain language and receive visual answers with charts, tables, and recommended actions — triggered via the ⌘K command bar."
    >
      <ScreenFrame label="Ask AI Panel — Query Result">
        <RealLayout page="overview">
          <div style={{ position: 'relative', overflow: 'hidden' }}>

            {/* Background: dimmed dashboard (same content visible behind the mask) */}
            <div style={{ opacity: 0.25, pointerEvents: 'none' }}>
              <DashboardScreen onOpenAgent={() => {}} onAction={() => {}} />
            </div>

            {/*
              Dark overlay — matches .vo-assistant-mask visual exactly,
              but uses position:absolute so it's contained in the case study frame
              rather than covering the whole viewport.
            */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,21,41,0.45)',
                zIndex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '24px',
              }}
            >
              {/*
                .vo-assistant panel — uses the exact same CSS class as AskAIPanel.
                Override max-height so all content is visible in the static case study.
              */}
              <div
                className="vo-assistant"
                style={{ maxHeight: 'none', position: 'relative' }}
              >
                {/* Input bar — exact same as .vo-assistant-input in AskAIPanel */}
                <div className="vo-assistant-input">
                  <ThunderboltOutlined
                    style={{ color: '#1d39c4', fontSize: 18, flexShrink: 0 }}
                  />
                  <input
                    defaultValue={A.query}
                    readOnly
                    aria-label="Ask about your team"
                    placeholder="Ask about your team — agents, audits, policies, coaching…"
                  />
                  <Button type="primary" icon={<SendOutlined />}>
                    Ask
                  </Button>
                  <button
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'default',
                      border: 0,
                      background: 'none',
                      color: 'var(--ad-color-text-secondary)',
                      fontSize: 14,
                    }}
                    aria-label="Close assistant"
                  >
                    <CloseOutlined />
                  </button>
                </div>

                {/* Response body — exact same as .vo-assistant-body in AskAIPanel */}
                <div className="vo-assistant-body" style={{ overflowY: 'visible' }}>
                  {/* User bubble */}
                  <div className="vo-user-q">
                    <Avatar size={28} style={{ background: '#13c2c2', flexShrink: 0 }}>
                      S
                    </Avatar>
                    <span className="bubble">{A.query}</span>
                  </div>

                  {/* AI chip + analysis note */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 4,
                    }}
                  >
                    <span className="vo-ai-chip">
                      <ThunderboltOutlined /> AI answer
                    </span>
                    <span style={{ fontSize: 13, color: 'var(--ad-color-text-secondary)' }}>
                      Analyzed 142 audited calls since policy update (Jun 2)
                    </span>
                  </div>

                  {/* Title + summary */}
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      margin: '8px 0 6px',
                      letterSpacing: '-0.2px',
                    }}
                  >
                    {A.responseTitle}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: 'var(--ad-color-text-secondary)',
                      lineHeight: 1.6,
                      margin: '0 0 18px',
                      maxWidth: 720,
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
                      boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
                      Failed escalation-policy calls per agent
                    </div>
                    {A.bars.map((b) => (
                      <div className="vo-bar-row" key={b.name}>
                        <span
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontWeight: 500,
                          }}
                        >
                          {b.name}
                        </span>
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

                  {/* Filtered table */}
                  <div
                    style={{
                      background: '#fff',
                      border: '1px solid #f0f0f0',
                      borderRadius: 12,
                      overflow: 'hidden',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                    }}
                  >
                    <Table<AssistantRow>
                      rowKey="agent"
                      size="small"
                      pagination={false}
                      columns={assistantCols}
                      dataSource={A.rows}
                      scroll={{ x: 700 }}
                    />
                  </div>

                  {/* Suggested action */}
                  <div className="vo-suggest">
                    <ReadOutlined
                      style={{ fontSize: 18, color: '#1d39c4', flexShrink: 0 }}
                    />
                    <span className="txt">{A.suggestion}</span>
                    <span style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <Button type="primary">Approve bulk enrollment</Button>
                      <Button>View call evidence</Button>
                      <Button icon={<ExportOutlined />}>Export findings</Button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RealLayout>
      </ScreenFrame>
      <ScreenAnnotations
        items={[
          {
            label: '⌘K triggers the panel from anywhere',
            text: 'The command bar in the header is always visible. Supervisors never have to navigate to a separate "AI" page — one keyboard shortcut opens the query panel over whatever they are viewing.',
          },
          {
            label: 'Query appears as a chat bubble',
            text: 'The user question is shown as an avatar + bubble above the AI response. The familiar chat metaphor lowers the learning curve — supervisors interact with it the same way they\'d use a search bar.',
          },
          {
            label: 'Bar chart gives instant visual ranking',
            text: 'Before the table, a horizontal bar chart shows which agents have the most escalation-policy failures. Visual comparison is faster than scanning numbers in a table column.',
          },
          {
            label: 'Table pre-filtered to the query subject',
            text: 'The table shows only the 4 agents relevant to the question — not the full 8-agent roster. The AI applies the filter; the supervisor gets a focused answer, not a raw data dump.',
          },
          {
            label: 'Bulk action card converts insight to action',
            text: '"Approve bulk enrollment" is one click away from the answer. The AI doesn\'t just answer the question — it surfaces the logical next action and lets the supervisor approve it immediately.',
          },
        ]}
      />
    </CsSection>
  );
}

// ─── Section 7 — Design Rationale ────────────────────────────────────────────

function Sec8Rationale() {
  const CARDS = [
    {
      title: 'From Monitoring to Action',
      text: 'The dashboard prioritizes AI-ranked interventions above raw metrics so supervisors can quickly decide where to focus today.',
      icon: <ThunderboltOutlined style={{ color: '#1677ff', fontSize: 22 }} />,
      bg: '#e6f4ff',
      border: '#bae0ff',
    },
    {
      title: 'Explainable AI',
      text: 'Every low audit score is supported with transcript evidence, policy references, AI confidence levels, and QA review actions.',
      icon: <SearchOutlined style={{ color: '#0891b2', fontSize: 22 }} />,
      bg: '#ecfeff',
      border: '#a5f3fc',
    },
    {
      title: 'Coaching Automation',
      text: 'The system recommends training modules based on repeated failure patterns and allows supervisor approval before any automation runs.',
      icon: <SolutionOutlined style={{ color: '#7c3aed', fontSize: 22 }} />,
      bg: '#f5f3ff',
      border: '#ddd6fe',
    },
    {
      title: 'Natural Language',
      text: 'Supervisors can ask complex team-performance questions and receive visual, actionable answers instead of plain text responses.',
      icon: <RiseOutlined style={{ color: '#0d9488', fontSize: 22 }} />,
      bg: '#f0fdf4',
      border: '#bbf7d0',
    },
  ];

  return (
    <CsSection num="7" title="Design Rationale">
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
            <h4
              style={{
                fontSize: 16,
                fontWeight: 700,
                margin: '0 0 10px',
                color: '#0a0a14',
              }}
            >
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

// ─── Section 9 — Requirement Mapping ─────────────────────────────────────────

function Sec9Requirements() {
  const ROWS = [
    {
      req: 'Supervisor Dashboard Main Screen',
      solution:
        'Designed as the main team performance dashboard with AI insights, KPIs, trend chart, and agent table.',
    },
    {
      req: 'Agent Performance Drilldown Screen',
      solution:
        "Designed as Rohan Mehta's detailed performance view with audit breakdown, strengths/weaknesses, trend chart, and recent calls.",
    },
    {
      req: 'Proactive AI Insights',
      solution:
        "Designed as Today's Priority Interventions — top 3 urgent AI-ranked actions with severity, impact, and action buttons.",
    },
    {
      req: 'Explainable AI',
      solution:
        'Designed as an evidence drawer with highlighted transcript snippets, AI flags, policy reasoning, and confidence score.',
    },
    {
      req: 'Agentic Coaching / Closed-Loop Action',
      solution:
        'Designed as a 3-step AI-recommended coaching approval modal with auto-enrollment, follow-up audit scheduling, and agent notification.',
    },
    {
      req: 'Natural Language Interaction',
      solution:
        'Designed as an AI query panel (⌘K) with bar chart, filtered table, and recommended bulk action.',
    },
    {
      req: 'Ant Design System',
      solution:
        'Used Ant Design layout, cards, tables, tags, buttons, modals, drawers, steps, checkboxes, and Recharts for trend charts.',
    },
  ];

  const cols: ColumnsType<(typeof ROWS)[0]> = [
    {
      title: 'Requirement',
      dataIndex: 'req',
      key: 'req',
      width: '34%',
      render: (r: string) => <span style={{ fontWeight: 600, fontSize: 14 }}>{r}</span>,
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
    <CsSection num="8" title="Requirement Mapping">
      <ConfigProvider theme={THEME}>
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
      </ConfigProvider>
    </CsSection>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <div style={{ background: '#0a0a14', padding: '48px', textAlign: 'center' }}>
      <div
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}
      >
        <ThunderboltOutlined style={{ color: '#4096ff', fontSize: 20 }} />
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>VoiceOps AI</span>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, margin: 0 }}>
        Product Design Case Study · High-fidelity prototype · React 18 + TypeScript +
        Ant Design v5
      </p>
    </div>
  );
}

// ─── Page entry point ─────────────────────────────────────────────────────────

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
