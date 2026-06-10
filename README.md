# VoiceOps AI — Supervisor Dashboard

AI-powered supervisor dashboard for voice contact centers. Built with Vite + React 18 + TypeScript, Ant Design v5, and Recharts.

## Screens

| Screen | Route key |
|---|---|
| Supervisor Dashboard | `overview` |
| Agent Drilldown | `agent` |
| Audits | `audits` |
| Coaching | `coaching` |
| Insights | `insights` |
| Reports | `reports` |
| Settings | `settings` |

Overlay panels: Evidence Drawer, Coaching Modal, Ask AI Panel (Ctrl/Cmd+K).

## Stack

- **Vite 5** + **React 18** + **TypeScript 5** (strict, bundler module resolution)
- **Ant Design 5** — layout, tables, modals, drawers, menus
- **Recharts 2** — trend line charts
- **CSS custom properties** — design tokens aligned with antd v5 defaults
- Dummy data only — no backend

## Dev

```bash
npm install
npm run dev       # http://localhost:5173
npm run build
npm run typecheck
```
