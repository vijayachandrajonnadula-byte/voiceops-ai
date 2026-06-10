import { useState } from 'react';
import { Button, Table, Tag, Avatar, message } from 'antd';
import {
  ThunderboltOutlined,
  CloseOutlined,
  SendOutlined,
  ReadOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { VO_ASSISTANT } from '../data/mockData';
import type { AssistantRow } from '../data/mockData';

interface Props {
  onClose: () => void;
}

const assistantColumns = (onToast: (s: string) => void): ColumnsType<AssistantRow> => [
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
    sorter: (a, b) => a.failed - b.failed,
  },
  { title: 'Common mistake', dataIndex: 'mistake', key: 'mistake' },
  {
    title: 'Latest failed call',
    dataIndex: 'call',
    key: 'call',
    width: 150,
    render: (c: string) => (
      <button className="row-action" onClick={() => onToast(`Opening ${c}`)}>
        {c}
      </button>
    ),
  },
  {
    title: 'Suggested action',
    dataIndex: 'action',
    key: 'action',
    width: 180,
    render: (a: string) => (
      <Tag color={a === 'Monitor' ? 'blue' : a === 'QA review' ? 'gold' : 'volcano'}>{a}</Tag>
    ),
  },
];

export function AskAIPanel({ onClose }: Props) {
  const A = VO_ASSISTANT;
  const [query, setQuery] = useState(A.query);
  const [asked, setAsked] = useState(true);
  const [msgApi, contextHolder] = message.useMessage();
  const maxBar = Math.max(...A.bars.map((b) => b.value));

  const toast = (s: string) => msgApi.success(s);

  return (
    <>
      {contextHolder}
      {/* Backdrop */}
      <div className="vo-assistant-mask" onClick={onClose}>
        <div
          className="vo-assistant"
          role="dialog"
          aria-modal="true"
          aria-label="VoiceOps AI assistant"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Input bar */}
          <div className="vo-assistant-input">
            <ThunderboltOutlined style={{ color: '#1d39c4', fontSize: 18, flexShrink: 0 }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Ask about your team"
              placeholder="Ask about your team — agents, audits, policies, coaching…"
              onKeyDown={(e) => {
                if (e.key === 'Enter') setAsked(true);
              }}
            />
            <Button type="primary" icon={<SendOutlined />} onClick={() => setAsked(true)}>
              Ask
            </Button>
            <button
              style={{
                width: 32, height: 32, borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', border: 0, background: 'none',
                color: 'var(--ad-color-text-secondary)', fontSize: 14,
              }}
              aria-label="Close assistant"
              onClick={onClose}
            >
              <CloseOutlined />
            </button>
          </div>

          {/* Response body */}
          {asked && (
            <div className="vo-assistant-body">
              {/* User bubble */}
              <div className="vo-user-q">
                <Avatar size={28} style={{ background: '#13c2c2', flexShrink: 0 }}>
                  S
                </Avatar>
                <span className="bubble">{A.query}</span>
              </div>

              {/* AI label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span className="vo-ai-chip">
                  <ThunderboltOutlined /> AI answer
                </span>
                <span style={{ fontSize: 13, color: 'var(--ad-color-text-secondary)' }}>
                  Analyzed 142 audited calls since policy update (Jun 2)
                </span>
              </div>

              {/* Title + summary */}
              <h3 style={{ fontSize: 18, fontWeight: 600, margin: '8px 0 6px', letterSpacing: '-0.2px' }}>
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
                  columns={assistantColumns(toast)}
                  dataSource={A.rows}
                  scroll={{ x: 700 }}
                />
              </div>

              {/* Suggested action */}
              <div className="vo-suggest">
                <ReadOutlined style={{ fontSize: 18, color: '#1d39c4', flexShrink: 0 }} />
                <span className="txt">{A.suggestion}</span>
                <span style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <Button
                    type="primary"
                    onClick={() => toast('4 agents enrolled in New Escalation Policy Refresher')}
                  >
                    Approve bulk enrollment
                  </Button>
                  <Button onClick={() => toast('Opening call evidence')}>
                    View call evidence
                  </Button>
                  <Button
                    icon={<ExportOutlined />}
                    onClick={() => toast('Findings exported to CSV')}
                  >
                    Export findings
                  </Button>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
