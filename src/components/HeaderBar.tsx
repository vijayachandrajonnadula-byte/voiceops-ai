import { Avatar, Dropdown } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ThunderboltOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import type { PageKey } from './Sidebar';

const PAGE_TITLES: Record<PageKey, string> = {
  overview: 'Overview',
  agents: 'Agents',
  agent: 'Agents',
  audits: 'Audits',
  coaching: 'Coaching',
  insights: 'Insights',
  reports: 'Reports',
  settings: 'Settings',
};

interface Props {
  collapsed: boolean;
  onToggle: () => void;
  onOpenAssistant: () => void;
  page: PageKey;
}

const userMenuItems = [
  { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
  { key: 'prefs', icon: <SettingOutlined />, label: 'Preferences' },
  { type: 'divider' as const },
  { key: 'out', icon: <LogoutOutlined />, label: 'Sign out', danger: true },
];

export function HeaderBar({ collapsed, onToggle, onOpenAssistant, page }: Props) {
  return (
    <div className="pro-header">
      <button
        className="pro-trigger"
        aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        onClick={onToggle}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </button>

      <div className="pro-breadcrumb">
        VoiceOps AI / <b>{PAGE_TITLES[page]}</b>
      </div>

      {/* AI command bar */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 12px',
        }}
      >
        <div
          className="vo-cmdbar"
          role="button"
          tabIndex={0}
          aria-label="Ask VoiceOps AI"
          onClick={onOpenAssistant}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenAssistant();
            }
          }}
        >
          <ThunderboltOutlined style={{ color: '#1d39c4', flexShrink: 0 }} />
          <span className="q">Ask VoiceOps AI anything about your team…</span>
          <span className="kbd">⌘K</span>
        </div>
      </div>

      <div className="pro-header-actions">
        <button className="pro-action" aria-label="Notifications, 3 unread">
          <BellOutlined />
          <span className="pro-badge-count">3</span>
        </button>
        <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
          <button className="pro-user">
            <Avatar size={28} style={{ background: '#13c2c2', flexShrink: 0 }}>
              S
            </Avatar>
            <span style={{ fontSize: 14 }}>Sana Kapoor</span>
          </button>
        </Dropdown>
      </div>
    </div>
  );
}
