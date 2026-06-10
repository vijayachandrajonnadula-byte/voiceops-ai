import { Card, Button, Radio } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';
import { InsightCard } from '../components/InsightCard';
import { KpiStrip } from '../components/KpiStrip';
import { TrendChart } from '../components/TrendChart';
import { AgentTable } from '../components/AgentTable';
import { VO_INSIGHTS, VO_KPIS, VO_TEAM_TREND } from '../data/mockData';
import type { AgentData } from '../data/mockData';

interface Props {
  onOpenAgent: (agent: AgentData) => void;
  onAction: (action: string) => void;
}

export function DashboardScreen({ onOpenAgent, onAction }: Props) {
  return (
    <div>
      {/* Page header — same level as all other pages */}
      <div
        className="pro-page-header"
        style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}
      >
        <div style={{ flex: 1 }}>
          <h1 className="pro-page-title">Supervisor Dashboard</h1>
          <div className="pro-page-sub">
            Voice Support Team A · Morning shift · Live until 2:00 PM
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Radio.Group defaultValue="team-a" buttonStyle="solid" size="small">
            <Radio.Button value="team-a">Voice Support Team A</Radio.Button>
          </Radio.Group>
          <Radio.Group defaultValue="today" buttonStyle="outline" size="small">
            <Radio.Button value="today">Today</Radio.Button>
            <Radio.Button value="7d">7 days</Radio.Button>
          </Radio.Group>
          <Radio.Group defaultValue="morning" buttonStyle="outline" size="small">
            <Radio.Button value="morning">Morning Shift</Radio.Button>
          </Radio.Group>
        </div>
      </div>

      <div className="pro-body">
        {/* Priority Interventions */}
        <div className="vo-section">
          <div className="vo-section-head">
            <div>
              <h2 className="vo-section-title">
                <ThunderboltOutlined style={{ color: '#1d39c4' }} />
                Today's priority interventions
              </h2>
              <div className="vo-section-sub">
                AI-ranked actions based on performance, audit risk, and customer impact.
              </div>
            </div>
            <Button type="link">View all 7 insights</Button>
          </div>
          <div className="vo-insight-grid">
            {VO_INSIGHTS.map((ins) => (
              <InsightCard key={ins.id} ins={ins} onAction={onAction} />
            ))}
          </div>
        </div>

        {/* KPI strip */}
        <div className="vo-section">
          <KpiStrip items={VO_KPIS} />
        </div>

        {/* Team trend */}
        <div className="vo-section">
          <Card
            title="Team performance trend"
            extra={
              <Radio.Group defaultValue="7d" optionType="button" size="small">
                <Radio.Button value="today">Today</Radio.Button>
                <Radio.Button value="7d">7 days</Radio.Button>
                <Radio.Button value="30d">30 days</Radio.Button>
              </Radio.Group>
            }
          >
            <TrendChart data={VO_TEAM_TREND} height={240} />
          </Card>
        </div>

        {/* Agent table */}
        <div className="vo-section" style={{ marginBottom: 0 }}>
          <AgentTable onOpenAgent={onOpenAgent} />
        </div>
      </div>
    </div>
  );
}
