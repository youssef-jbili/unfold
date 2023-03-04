import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Settings } from './pages';
import './App.css';
import { Onboarding } from './pages/Onboarding/Onboarding';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </Router>
  );
}
