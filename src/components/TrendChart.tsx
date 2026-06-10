import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { TrendData } from '../data/mockData';

interface Props {
  data: TrendData;
  height?: number;
  yMin?: number;
  yMax?: number;
}

const DASH_PATTERNS = ['', '7 4', '2 4'];

export function TrendChart({ data, height = 240, yMin = 50, yMax = 100 }: Props) {
  const chartData = data.labels.map((label, i) => {
    const point: Record<string, string | number> = { label };
    data.series.forEach((s) => {
      point[s.name] = s.values[i];
    });
    return point;
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData} margin={{ top: 5, right: 16, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: '#595959' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[yMin, yMax]}
          tick={{ fontSize: 12, fill: '#595959' }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: '1px solid #f0f0f0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            fontSize: 13,
          }}
        />
        <Legend
          iconType="plainline"
          wrapperStyle={{ fontSize: 13, paddingTop: 8 }}
        />
        {data.series.map((s, i) => (
          <Line
            key={s.name}
            type="monotone"
            dataKey={s.name}
            stroke={s.color}
            strokeWidth={2.5}
            strokeDasharray={DASH_PATTERNS[i % DASH_PATTERNS.length]}
            dot={{ r: 3.5, fill: '#fff', strokeWidth: 2, stroke: s.color }}
            activeDot={{ r: 5, fill: '#fff', strokeWidth: 2.5, stroke: s.color }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
