import { AgentTable } from '../components/AgentTable';
import type { AgentData } from '../data/mockData';

interface Props {
  onOpenAgent: (agent: AgentData) => void;
}

export function AgentsPage({ onOpenAgent }: Props) {
  return (
    <div>
      <div className="pro-page-header" style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <h1 className="pro-page-title">Agents</h1>
          <div className="pro-page-sub">
            All agents on Voice Support Team A — sorted by overall score, lowest first.
          </div>
        </div>
      </div>
      <div className="pro-body">
        <AgentTable onOpenAgent={onOpenAgent} title="5 agents · Morning shift" />
      </div>
    </div>
  );
}
