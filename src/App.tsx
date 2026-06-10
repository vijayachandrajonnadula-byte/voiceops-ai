import { useState, useEffect } from 'react';
import { ConfigProvider, message } from 'antd';
import { Sidebar } from './components/Sidebar';
import { HeaderBar } from './components/HeaderBar';
import { DashboardScreen } from './pages/DashboardScreen';
import { AgentDrilldown } from './pages/AgentDrilldown';
import { AgentsPage } from './pages/AgentsPage';
import { AuditsPage } from './pages/AuditsPage';
import { CoachingPage } from './pages/CoachingPage';
import { InsightsPage } from './pages/InsightsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { EvidenceDrawer } from './components/EvidenceDrawer';
import { CoachingModal } from './components/CoachingModal';
import { AskAIPanel } from './components/AskAIPanel';
import type { PageKey } from './components/Sidebar';
import type { AgentData } from './data/mockData';

export default function App() {
  const [page, setPage] = useState<PageKey>('overview');
  const [cameFrom, setCameFrom] = useState<PageKey>('overview');
  const [collapsed, setCollapsed] = useState(false);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [coachingOpen, setCoachingOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [msgApi, contextHolder] = message.useMessage();

  const toast = (text: string) => msgApi.success(text);

  const openAgent = (fromPage: PageKey) => {
    setCameFrom(fromPage);
    setPage('agent');
  };

  const handleAction = (action: string) => {
    if (action === 'evidence') {
      setEvidenceOpen(true);
    } else if (action === 'coaching') {
      setCoachingOpen(true);
    } else if (action === 'assistant') {
      setAssistantOpen(true);
    } else if (action.startsWith('toast:')) {
      toast(action.slice(6));
    }
  };

  // Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setAssistantOpen(true);
      }
      if (e.key === 'Escape') setAssistantOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const backLabel = cameFrom === 'overview' ? 'Back to dashboard' : 'Back to agents';

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 8,
          colorBorderSecondary: '#f0f0f0',
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        },
      }}
    >
      {contextHolder}
      <div className="pro-layout">
        <Sidebar
          collapsed={collapsed}
          page={page}
          onNav={(key) => setPage(key)}
        />

        <div className="pro-main">
          <HeaderBar
            collapsed={collapsed}
            onToggle={() => setCollapsed((v) => !v)}
            onOpenAssistant={() => setAssistantOpen(true)}
            page={page}
          />

          <div className="pro-content">
            {page === 'overview' && (
              <DashboardScreen
                onOpenAgent={(agent: AgentData) => {
                  if (agent.id === 'rohan') openAgent('overview');
                  else openAgent('overview');
                }}
                onAction={handleAction}
              />
            )}

            {page === 'agent' && (
              <AgentDrilldown
                onBack={() => setPage(cameFrom)}
                backLabel={backLabel}
                onEvidence={() => setEvidenceOpen(true)}
                onCoaching={() => setCoachingOpen(true)}
              />
            )}

            {page === 'agents' && (
              <AgentsPage
                onOpenAgent={() => openAgent('agents')}
              />
            )}

            {page === 'audits' && (
              <AuditsPage onEvidence={() => setEvidenceOpen(true)} />
            )}

            {page === 'coaching' && (
              <CoachingPage onCoaching={() => setCoachingOpen(true)} />
            )}

            {page === 'insights' && (
              <InsightsPage
                onAction={handleAction}
                onOpenAssistant={() => setAssistantOpen(true)}
              />
            )}

            {page === 'reports' && <ReportsPage />}

            {page === 'settings' && <SettingsPage />}
          </div>
        </div>

        {/* Overlays */}
        {evidenceOpen && (
          <EvidenceDrawer
            onClose={() => setEvidenceOpen(false)}
            onCoaching={() => {
              setEvidenceOpen(false);
              setCoachingOpen(true);
            }}
          />
        )}

        {coachingOpen && (
          <CoachingModal onClose={() => setCoachingOpen(false)} />
        )}

        {assistantOpen && (
          <AskAIPanel onClose={() => setAssistantOpen(false)} />
        )}
      </div>
    </ConfigProvider>
  );
}
