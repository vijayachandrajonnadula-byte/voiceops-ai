import { Menu } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  AuditOutlined,
  SolutionOutlined,
  BulbOutlined,
  BarChartOutlined,
  SettingOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';

export type PageKey =
  | 'overview'
  | 'agents'
  | 'agent'
  | 'audits'
  | 'coaching'
  | 'insights'
  | 'reports'
  | 'settings';

interface Props {
  collapsed: boolean;
  page: PageKey;
  onNav: (key: PageKey) => void;
}

const MENU_ITEMS = [
  {
    type: 'group' as const,
    label: 'Monitor',
    children: [
      { key: 'overview', label: 'Overview', icon: <DashboardOutlined /> },
      { key: 'agents', label: 'Agents', icon: <TeamOutlined /> },
    ],
  },
  {
    type: 'group' as const,
    label: 'Quality',
    children: [
      { key: 'audits', label: 'Audits', icon: <AuditOutlined /> },
      { key: 'coaching', label: 'Coaching', icon: <SolutionOutlined /> },
    ],
  },
  {
    type: 'group' as const,
    label: 'Analyze',
    children: [
      { key: 'insights', label: 'Insights', icon: <BulbOutlined /> },
      { key: 'reports', label: 'Reports', icon: <BarChartOutlined /> },
    ],
  },
  { type: 'divider' as const },
  { key: 'settings', label: 'Settings', icon: <SettingOutlined /> },
];

export function Sidebar({ collapsed, page, onNav }: Props) {
  const navKey = page === 'agent' ? 'agents' : page;

  return (
    <div className={`pro-sider light${collapsed ? ' collapsed' : ''}`}>
      <div className="pro-logo">
        <span className="vo-logo-mark">
          <CustomerServiceOutlined style={{ fontSize: 15, color: '#fff' }} />
        </span>
        {!collapsed && <span className="logo-text">VoiceOps AI</span>}
      </div>
      <Menu
        mode="inline"
        theme="light"
        items={MENU_ITEMS}
        selectedKeys={[navKey]}
        inlineCollapsed={collapsed}
        onClick={({ key }) => onNav(key as PageKey)}
        style={{
          background: 'transparent',
          borderInlineEnd: 0,
          flex: 1,
          overflowY: 'auto',
        }}
      />
    </div>
  );
}
