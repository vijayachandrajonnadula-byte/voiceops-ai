import { useState } from 'react';
import { Card, Switch } from 'antd';

interface Pref {
  k: 'digest' | 'risk' | 'coach';
  label: string;
  description: string;
}

const PREFS: Pref[] = [
  {
    k: 'digest',
    label: 'Daily performance digest',
    description: 'Summary email at the start of each shift.',
  },
  {
    k: 'risk',
    label: 'High-risk agent alerts',
    description: 'Immediate notification when an agent is flagged high risk.',
  },
  {
    k: 'coach',
    label: 'Coaching reminders',
    description: 'Reminders for pending coaching plan approvals.',
  },
];

export function SettingsPage() {
  const [prefs, setPrefs] = useState({ digest: true, risk: true, coach: false });

  return (
    <div>
      <div className="pro-page-header" style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <h1 className="pro-page-title">Settings</h1>
          <div className="pro-page-sub">Notification preferences for Sana Kapoor.</div>
        </div>
      </div>
      <div className="pro-body">
        <Card title="Notifications">
          {PREFS.map((p) => (
            <div
              key={p.k}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '12px 0',
                borderBottom: '1px solid var(--ad-color-border-secondary)',
              }}
            >
              <span style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{p.label}</div>
                <div style={{ fontSize: 13, color: 'var(--ad-color-text-secondary)' }}>
                  {p.description}
                </div>
              </span>
              <Switch
                checked={prefs[p.k]}
                onChange={(v) => setPrefs((prev) => ({ ...prev, [p.k]: v }))}
                aria-label={p.label}
              />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
