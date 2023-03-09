import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Home, Settings } from './pages';
import './App.css';
import { Onboarding } from './pages/Onboarding/Onboarding';
import { Tracker } from './pages/Tracker/Tracker';
import { useNetworkStatus } from './hooks/networkStatus';

export default function App() {
  const [, getNetworkStatus] = useNetworkStatus();

  useEffect(() => {
    getNetworkStatus();
  }, [getNetworkStatus]);

  return (
    <Router>
      <Routes>
        {/* Main window */}
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/issue/:issueId" element={<Home />} />
        {/* Side window */}
        <Route path="/tracker" element={<Tracker />} />
      </Routes>
    </Router>
  );
}
