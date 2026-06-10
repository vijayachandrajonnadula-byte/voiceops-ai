import { Table, Tag, Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { VO_AUDITS, scoreTextColor } from '../data/mockData';
import type { AuditRow } from '../data/mockData';

interface Props {
  onEvidence: () => void;
}

function buildColumns(onEvidence: () => void): ColumnsType<AuditRow> {
  return [
    {
      title: 'Call ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <b style={{ fontWeight: 500 }}>{id}</b>,
    },
    { title: 'Agent', dataIndex: 'agent', key: 'agent' },
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
      sorter: (a, b) => a.score - b.score,
      defaultSortOrder: 'ascend',
      render: (v: number) => (
        <b style={{ color: scoreTextColor(v) }}>{v}%</b>
      ),
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

export function AuditsPage({ onEvidence }: Props) {
  return (
    <div>
      <div className="pro-page-header" style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <h1 className="pro-page-title">Audits</h1>
          <div className="pro-page-sub">
            Calls audited by AI and quality analysts across the team.
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 24px',
              borderBottom: '1px solid #f5f5f5',
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 600 }}>Recent audited calls</span>
            <Button icon={<ExportOutlined />}>Export</Button>
          </div>
          <Table<AuditRow>
            rowKey="id"
            columns={buildColumns(onEvidence)}
            dataSource={VO_AUDITS}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
}
