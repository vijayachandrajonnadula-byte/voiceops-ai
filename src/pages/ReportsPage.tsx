import { Button, Select, Card, Radio, message } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { KpiStrip } from '../components/KpiStrip';
import { TrendChart } from '../components/TrendChart';
import { VO_KPIS, VO_TEAM_TREND } from '../data/mockData';

export function ReportsPage() {
  const [msgApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <div>
        <div
          className="pro-page-header"
          style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}
        >
          <div style={{ flex: 1 }}>
            <h1 className="pro-page-title">Reports</h1>
            <div className="pro-page-sub">
              Team performance summary for the selected period.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Select
              defaultValue="Last 7 days"
              options={[
                { value: 'Today', label: 'Today' },
                { value: 'Last 7 days', label: 'Last 7 days' },
                { value: 'Last 30 days', label: 'Last 30 days' },
                { value: 'This quarter', label: 'This quarter' },
              ]}
              style={{ width: 140 }}
            />
            <Button
              icon={<ExportOutlined />}
              onClick={() => msgApi.success('Report exported to CSV')}
            >
              Export CSV
            </Button>
          </div>
        </div>
        <div className="pro-body">
          <div className="vo-section">
            <KpiStrip items={VO_KPIS} foot="vs previous period" />
          </div>
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
            <TrendChart data={VO_TEAM_TREND} height={280} />
          </Card>
        </div>
      </div>
    </>
  );
}
