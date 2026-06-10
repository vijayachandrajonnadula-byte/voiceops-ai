import { Drawer, Button, message } from 'antd';
import {
  ThunderboltOutlined,
  SoundOutlined,
  FlagOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  AuditOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { VO_EVIDENCE } from '../data/mockData';

interface Props {
  onClose: () => void;
  onCoaching: () => void;
}

export function EvidenceDrawer({ onClose, onCoaching }: Props) {
  const E = VO_EVIDENCE;
  const [msg, contextHolder] = message.useMessage();

  const toast = (text: string) => msg.success(text);

  return (
    <>
      {contextHolder}
      <Drawer
        open
        onClose={onClose}
        width={560}
        title={
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span className="vo-ai-chip">
                <ThunderboltOutlined /> Explainable AI
              </span>
              <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--ad-color-text-secondary)' }}>
                {E.call} · Rohan Mehta
              </span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.4 }}>{E.question}</div>
          </div>
        }
        footer={
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={() => toast('AI finding accepted and logged')}
            >
              Accept AI finding
            </Button>
            <Button
              icon={<CloseCircleOutlined />}
              onClick={() => toast('Finding flagged as incorrect — sent to model review')}
            >
              Mark as incorrect
            </Button>
            <Button
              icon={<AuditOutlined />}
              onClick={() => toast('Sent to QA review queue')}
            >
              Send to QA review
            </Button>
            <Button icon={<SolutionOutlined />} onClick={onCoaching}>
              Create coaching plan
            </Button>
          </div>
        }
        styles={{ body: { padding: '24px' } }}
      >
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
                <Button
                  type="link"
                  size="small"
                  onClick={() => toast(`Playing audio from ${s.time}`)}
                >
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

        {/* AI Reasoning */}
        <div style={{ fontSize: 14, fontWeight: 600, margin: '20px 0 4px' }}>AI reasoning</div>
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
      </Drawer>
    </>
  );
}
