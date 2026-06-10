import { Table, Tag, Avatar, Input, Button } from 'antd';
import { ThunderboltOutlined, SearchOutlined, ExportOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { scoreColor, scoreTextColor, VO_AGENTS } from '../data/mockData';
import type { AgentData } from '../data/mockData';

interface Props {
  onOpenAgent: (agent: AgentData) => void;
  title?: string;
}

function buildColumns(onOpenAgent: (a: AgentData) => void): ColumnsType<AgentData> {
  return [
    {
      title: 'Agent',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left' as const,
      render: (_: string, a: AgentData) => (
        <button
          className="vo-agent-link"
          onClick={() => onOpenAgent(a)}
          aria-label={`Open ${a.name}'s performance drilldown`}
        >
          <div className="vo-agent-cell">
            <Avatar size={28} style={{ background: a.avatarBg, flexShrink: 0 }}>
              {a.initials}
            </Avatar>
            <span className="nm">{a.name}</span>
          </div>
        </button>
      ),
    },
    {
      title: 'Overall score',
      dataIndex: 'score',
      key: 'score',
      sorter: (a, b) => a.score - b.score,
      defaultSortOrder: 'ascend',
      render: (score: number) => (
        <span className="vo-score">
          <span className="num" style={{ color: scoreTextColor(score) }}>
            {score}
          </span>
          <span className="vo-score-rail">
            <span
              className="vo-score-bar"
              style={{ width: `${score}%`, background: scoreColor(score) }}
            />
          </span>
        </span>
      ),
    },
    {
      title: 'CSAT',
      dataIndex: 'csat',
      key: 'csat',
      align: 'right' as const,
      sorter: (a, b) => parseInt(a.csat) - parseInt(b.csat),
    },
    { title: 'AHT', dataIndex: 'aht', key: 'aht' },
    {
      title: 'FCR',
      dataIndex: 'fcr',
      key: 'fcr',
      align: 'right' as const,
      sorter: (a, b) => parseInt(a.fcr) - parseInt(b.fcr),
    },
    {
      title: 'Escalation',
      dataIndex: 'esc',
      key: 'esc',
      align: 'right' as const,
      sorter: (a, b) => parseInt(a.esc) - parseInt(b.esc),
    },
    {
      title: 'Weakest parameter',
      dataIndex: 'weakest',
      key: 'weakest',
      render: (w: string) =>
        w === 'None' ? (
          <span style={{ color: 'rgba(0,0,0,0.25)' }}>—</span>
        ) : (
          w
        ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, a: AgentData) => (
        <Tag color={a.statusColor}>{status}</Tag>
      ),
    },
    {
      title: 'AI recommendation',
      dataIndex: 'rec',
      key: 'rec',
      render: (rec: string, a: AgentData) => (
        <span
          className="vo-ai-chip"
          style={
            a.status === 'Top performer'
              ? { background: '#f6ffed', color: '#389e0d', borderColor: '#b7eb8f' }
              : {}
          }
        >
          <ThunderboltOutlined /> {rec}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, a: AgentData) => (
        <button className="row-action" onClick={() => onOpenAgent(a)}>
          View
        </button>
      ),
    },
  ];
}

export function AgentTable({ onOpenAgent, title = 'Agent performance' }: Props) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 12,
        boxShadow:
          '0 1px 2px rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.02)',
        overflow: 'hidden',
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
        <span style={{ fontSize: 16, fontWeight: 600 }}>{title}</span>
        <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Input
            prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,0.45)' }} />}
            placeholder="Search agents"
            style={{ width: 200 }}
            allowClear
          />
          <Button icon={<ExportOutlined />}>Export</Button>
        </span>
      </div>
      <Table<AgentData>
        rowKey="id"
        columns={buildColumns(onOpenAgent)}
        dataSource={VO_AGENTS}
        pagination={false}
        scroll={{ x: 900 }}
      />
    </div>
  );
}
