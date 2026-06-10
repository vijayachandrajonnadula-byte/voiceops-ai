import { Button } from 'antd';
import {
  ExclamationCircleFilled,
  RiseOutlined,
  ArrowDownOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import type { InsightData } from '../data/mockData';

interface Props {
  ins: InsightData;
  onAction: (action: string) => void;
}

export function InsightCard({ ins, onAction }: Props) {
  const sevIcon =
    ins.severity === 'positive' ? <RiseOutlined /> : <ExclamationCircleFilled />;

  return (
    <div className={`vo-insight ${ins.severity}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className={`vo-sev ${ins.severity}`}>
          <span className="ic">{sevIcon}</span>
          <span className="lbl">{ins.severityLabel}</span>
        </span>
        <span className="vo-ai-chip">
          <ThunderboltOutlined /> AI ranked
        </span>
      </div>

      <div className="vo-insight-title">{ins.title}</div>
      <div className="vo-insight-details">{ins.details}</div>

      <div className="vo-insight-impact">
        {ins.severity === 'positive' ? (
          <RiseOutlined style={{ color: '#389e0d' }} />
        ) : (
          <ArrowDownOutlined style={{ color: '#cf1322' }} />
        )}
        <span>
          <b>Impact:</b> {ins.impact}
        </span>
      </div>

      <div className="vo-insight-actions">
        {ins.actions.map((a) => (
          <Button key={a.label} type={a.type} size="small" onClick={() => onAction(a.action)}>
            {a.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
