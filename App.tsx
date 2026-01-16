
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { GameStateProvider } from './context/GameStateContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Arena from './components/Arena';
import Leaderboard from './components/Leaderboard';

const App: React.FC = () => {
  return (
    <Router>
      <GameStateProvider>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/arena/:id" element={<Arena />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </main>
          
          {/* Global Ambient Glow */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/5 blur-[150px] rounded-full" />
          </div>
        </div>
      </GameStateProvider>
    </Router>
  );
};

export default App;
