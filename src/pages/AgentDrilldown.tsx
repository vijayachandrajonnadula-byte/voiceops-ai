import { Card, Button, Tag, Alert, Table, Avatar } from 'antd';
import {
  ArrowLeftOutlined,
  ExclamationCircleFilled,
  SolutionOutlined,
  EyeOutlined,
  RiseOutlined,
  WarningFilled,
  ThunderboltOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { TrendChart } from '../components/TrendChart';
import { VO_ROHAN, scoreColor, scoreTextColor } from '../data/mockData';
import type { AuditCall } from '../data/mockData';

interface Props {
  onBack: () => void;
  backLabel?: string;
  onEvidence: () => void;
  onCoaching: () => void;
}

/* ─── Reusable horizontal score bar (same pattern as agent table) ─────────── */
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

function callColumns(onEvidence: () => void): ColumnsType<AuditCall> {
  return [
    {
      title: 'Call ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <b style={{ fontWeight: 500 }}>{id}</b>,
    },
    {
      title: 'Customer sentiment',
      dataIndex: 'sentiment',
      key: 'sentiment',
      render: (s: string) => (
        <span className="vo-sent">
          <span
            className="d"
            style={{
              background:
                s === 'Negative' ? '#f5222d' : s === 'Neutral' ? '#d48806' : '#389e0d',
            }}
          />
          {s}
        </span>
      ),
    },
    {
      title: 'Audit score',
      dataIndex: 'score',
      key: 'score',
      align: 'right' as const,
      render: (v: string) => <b style={{ color: '#cf1322' }}>{v}</b>,
    },
    {
      title: 'Failed parameters',
      dataIndex: 'failed',
      key: 'failed',
      render: (failed: string[]) => (
        <span style={{ display: 'inline-flex', gap: 4, flexWrap: 'wrap' }}>
          {failed.map((f) => (
            <Tag key={f} color="red">
              {f}
            </Tag>
          ))}
        </span>
      ),
    },
    {
      title: 'AI confidence',
      dataIndex: 'confidence',
      key: 'confidence',
      align: 'right' as const,
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <button className="row-action" onClick={onEvidence}>
          View evidence
        </button>
      ),
    },
  ];
}

export function AgentDrilldown({ onBack, backLabel = 'Back', onEvidence, onCoaching }: Props) {
  const R = VO_ROHAN;

  return (
    <div>
      {/* Page header */}
      <div
        className="pro-page-header"
        style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}
      >
        <Button icon={<ArrowLeftOutlined />} onClick={onBack}>
          {backLabel}
        </Button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar size={40} style={{ background: '#cf1322', flexShrink: 0 }}>
            RM
          </Avatar>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <h1 className="pro-page-title" style={{ fontSize: 18 }}>
                {R.name}
              </h1>
              <Tag color="red">
                <ExclamationCircleFilled /> High risk
              </Tag>
            </div>
            <div className="pro-page-sub" style={{ marginTop: 0 }}>
              {R.role} · Voice Support Team A
            </div>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button type="primary" icon={<SolutionOutlined />} onClick={onCoaching}>
            Create coaching plan
          </Button>
        </div>
      </div>

      <div className="pro-body">
        {/* Summary KPI strip */}
        <div className="vo-section">
          <div
            className="vo-kpi-strip"
            style={{ gridTemplateColumns: `repeat(${R.summary.length}, 1fr)` }}
          >
            {R.summary.map((s) => (
              <div className="vo-kpi-cell" key={s.title}>
                <div className="stat-title">{s.title}</div>
                {/* Show score bar for percentage metrics */}
                {s.suffix === '%' ? (
                  <div style={{ marginTop: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span
                        className="stat-value"
                        style={{
                          fontSize: 22,
                          color: s.tone === 'bad' ? '#cf1322' : undefined,
                        }}
                      >
                        {s.value}
                        <span className="stat-suffix">%</span>
                      </span>
                    </div>
                    <Bar value={parseInt(s.value)} height={6} />
                  </div>
                ) : (
                  <div
                    className="stat-value"
                    style={{ fontSize: 22, color: s.tone === 'bad' ? '#cf1322' : undefined }}
                  >
                    {s.value}
                    <span className="stat-suffix">{s.suffix}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Performance Summary */}
        <div className="vo-section">
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              borderLeft: '3px solid #2f54eb',
              padding: '20px 24px',
              boxShadow:
                '0 1px 2px rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 16, fontWeight: 600 }}>AI performance summary</span>
              <span className="vo-ai-chip">
                <ThunderboltOutlined /> AI generated · 18 calls analyzed
              </span>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                lineHeight: 1.65,
                color: 'var(--ad-color-text)',
                maxWidth: 880,
              }}
            >
              {R.aiSummary}
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button icon={<EyeOutlined />} onClick={onEvidence}>
                View evidence
              </Button>
              <Button icon={<SolutionOutlined />} onClick={onCoaching}>
                Generate coaching plan
              </Button>
            </div>
          </div>
        </div>

        {/* Strengths + Weaknesses */}
        <div
          className="vo-section"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
        >
          <Card
            title={
              <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                <RiseOutlined style={{ color: '#389e0d' }} /> Strengths
              </span>
            }
          >
            {R.strengths.map((s) => (
              <div className="vo-sw-row" key={s.name}>
                <span className="vo-sw-name">{s.name}</span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    flex: '0 0 180px',
                  }}
                >
                  <Bar value={s.value} height={6} />
                  <span
                    style={{
                      color: '#2c7a0b',
                      width: 38,
                      textAlign: 'right',
                      fontWeight: 600,
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                  >
                    {s.value}%
                  </span>
                </div>
              </div>
            ))}
          </Card>

          <Card
            title={
              <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                <WarningFilled style={{ color: '#d48806' }} /> Needs improvement
              </span>
            }
          >
            {R.weaknesses.map((s) => (
              <div className="vo-sw-row" key={s.name}>
                <span className="vo-sw-name">{s.name}</span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    flex: '0 0 180px',
                  }}
                >
                  <Bar value={s.value} height={6} />
                  <span
                    style={{
                      color: '#cf1322',
                      width: 38,
                      textAlign: 'right',
                      fontWeight: 600,
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                  >
                    {s.value}%
                  </span>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Audit breakdown + Trend */}
        <div
          className="vo-section"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
        >
          <Card
            title="Audit parameter breakdown"
            extra={
              <span style={{ fontSize: 13, color: 'var(--ad-color-text-secondary)' }}>
                18 audited calls
              </span>
            }
          >
            {R.auditParams.map((p) => (
              <div className="vo-param-row" key={p.name}>
                <span className="vo-param-name">{p.name}</span>
                <Bar value={p.value} height={8} />
                <span
                  className="vo-param-val"
                  style={{ color: scoreTextColor(p.value) }}
                >
                  {p.value}%
                </span>
              </div>
            ))}
          </Card>

          <Card
            title="Trend over time"
            extra={
              <span style={{ fontSize: 13, color: 'var(--ad-color-text-secondary)' }}>
                Last 7 days
              </span>
            }
          >
            <TrendChart data={R.trend} height={260} yMin={50} yMax={90} />
            <Alert
              type="warning"
              showIcon
              style={{ marginTop: 12 }}
              message="Empathy has declined for 6 consecutive days and is now the strongest driver of CSAT loss."
            />
          </Card>
        </div>

        {/* Recent audited calls */}
        <div className="vo-section" style={{ marginBottom: 0 }}>
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow:
                '0 1px 2px rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.02)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px',
                borderBottom: '1px solid #f5f5f5',
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 600 }}>Recent audited calls</span>
              <Button type="link">View all 18 calls</Button>
            </div>
            <Table<AuditCall>
              rowKey="id"
              columns={callColumns(onEvidence)}
              dataSource={R.calls}
              pagination={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
