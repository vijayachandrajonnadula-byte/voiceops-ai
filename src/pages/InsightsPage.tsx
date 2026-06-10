import { Button } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';
import { InsightCard } from '../components/InsightCard';
import { VO_INSIGHTS } from '../data/mockData';

interface Props {
  onAction: (action: string) => void;
  onOpenAssistant: () => void;
}

export function InsightsPage({ onAction, onOpenAssistant }: Props) {
  return (
    <div>
      <div className="pro-page-header" style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <h1 className="pro-page-title">Insights</h1>
          <div className="pro-page-sub">
            AI-ranked actions based on performance, audit risk, and customer impact.
          </div>
        </div>
      </div>
      <div className="pro-body">
        <div className="vo-section">
          <div className="vo-insight-grid">
            {VO_INSIGHTS.map((ins) => (
              <InsightCard key={ins.id} ins={ins} onAction={onAction} />
            ))}
          </div>
        </div>

        {/* AI assistant prompt */}
        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            padding: '20px 24px',
            boxShadow:
              '0 1px 2px rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.02)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            flexWrap: 'wrap',
          }}
        >
          <ThunderboltOutlined style={{ fontSize: 20, color: '#1d39c4' }} />
          <span style={{ flex: 1, minWidth: 220 }}>
            <b>Ask a question instead.</b>{' '}
            <span style={{ color: 'var(--ad-color-text-secondary)' }}>
              e.g. "Which agents are struggling with the new escalation policy?"
            </span>
          </span>
          <Button type="primary" onClick={onOpenAssistant}>
            Ask VoiceOps AI
          </Button>
        </div>
      </div>
    </div>
  );
}
