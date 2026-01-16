
import React from 'react';
import { useGameState } from '../context/GameStateContext';
import { Hexagon, User, Flame, TrendingUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { level, xp, streak } = useGameState();
  const location = useLocation();
  
  const xpInLevel = xp % 500;
  const progressPercent = (xpInLevel / 500) * 100;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 group">
          <Hexagon className="w-8 h-8 text-indigo-500 fill-indigo-500/20 group-hover:rotate-90 transition-transform duration-500" />
          <span className="text-xl font-bold tracking-tight text-slate-100">MindForge</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <Link to="/" className={`hover:text-slate-100 transition-colors ${location.pathname === '/' ? 'text-indigo-400' : ''}`}>Dashboard</Link>
          <Link to="/leaderboard" className={`hover:text-slate-100 transition-colors ${location.pathname === '/leaderboard' ? 'text-indigo-400' : ''}`}>Leaderboard</Link>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        {/* Streak */}
        <div className="flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
          <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
          <span className="text-sm font-bold text-slate-200">{streak}</span>
        </div>

        {/* Level Progress */}
        <div className="hidden sm:flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span className="text-xs font-semibold text-slate-400">LEVEL {level}</span>
          </div>
          <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-1000" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
          <div className="hidden lg:block text-right">
            <p className="text-xs font-medium text-slate-200">The Thinker</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">{xp} XP TOTAL</p>
          </div>
          <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center border border-indigo-400/50 shadow-lg shadow-indigo-500/20">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
