import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import AdminPanel from './AdminPanel';
import './styles.css';

const Root = window.location.pathname.startsWith('/admin') ? AdminPanel : App;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
