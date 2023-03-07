import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Settings } from './pages';
import './App.css';
import { Onboarding } from './pages/Onboarding/Onboarding';
import { Tracker } from './pages/Tracker/Tracker';

export default function App() {
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
