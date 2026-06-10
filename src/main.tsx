import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CaseStudyPage } from './pages/CaseStudyPage';
import 'antd/dist/reset.css';
import './styles/globals.css';

const isCaseStudy = window.location.pathname === '/case-study';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isCaseStudy ? <CaseStudyPage /> : <App />}
  </React.StrictMode>
);
