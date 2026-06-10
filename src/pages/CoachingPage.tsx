import { Table, Tag } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { VO_PLANS } from '../data/mockData';
import type { CoachingPlan } from '../data/mockData';

interface Props {
  onCoaching: () => void;
}

function buildColumns(onCoaching: () => void): ColumnsType<CoachingPlan> {
  return [
    {
      title: 'Agent',
      dataIndex: 'agent',
      key: 'agent',
      render: (a: string) => <b style={{ fontWeight: 500 }}>{a}</b>,
    },
    { title: 'Training module', dataIndex: 'module', key: 'module' },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      render: (s: string) => (
        <span className="vo-ai-chip">
          <ThunderboltOutlined /> {s}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => (
        <Tag color={s === 'In progress' ? 'blue' : 'gold'}>{s}</Tag>
      ),
    },
    { title: 'Follow-up', dataIndex: 'followUp', key: 'followUp' },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, r: CoachingPlan) => (
        <button className="row-action" onClick={onCoaching}>
          {r.status === 'Pending approval' ? 'Review' : 'View plan'}
        </button>
      ),
    },
  ];
}

export function CoachingPage({ onCoaching }: Props) {
  return (
    <div>
      <div className="pro-page-header" style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <h1 className="pro-page-title">Coaching</h1>
          <div className="pro-page-sub">
            Active coaching plans and pending AI recommendations.
          </div>
        </div>
      </div>
      <div className="pro-body">
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
              padding: '16px 24px',
              borderBottom: '1px solid #f5f5f5',
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Coaching plans
          </div>
          <Table<CoachingPlan>
            rowKey="agent"
            columns={buildColumns(onCoaching)}
            dataSource={VO_PLANS}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
}
