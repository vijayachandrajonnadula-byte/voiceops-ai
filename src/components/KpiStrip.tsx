import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import type { KpiData } from '../data/mockData';

interface Props {
  items: KpiData[];
  foot?: string;
}

export function KpiStrip({ items, foot = 'vs yesterday' }: Props) {
  return (
    <div
      className="vo-kpi-strip"
      style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
    >
      {items.map((k) => {
        const isBad = k.trend !== k.good;
        return (
          <div className="vo-kpi-cell" key={k.title}>
            <div className="stat-title">{k.title}</div>
            <div className="stat-value">
              {k.value}
              <span className="stat-suffix">{k.suffix}</span>
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: 13,
                display: 'flex',
                gap: 6,
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  color: isBad ? '#cf1322' : '#389e0d',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 3,
                }}
              >
                {k.trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {k.trendValue}
              </span>
              <span style={{ color: 'var(--ad-color-text-secondary)' }}>{foot}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
