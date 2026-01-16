
import React from 'react';
import { LEADERBOARD } from '../constants';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star } from 'lucide-react';

const Leaderboard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-10 text-center">
        <div className="inline-flex p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl mb-4">
          <Trophy className="w-10 h-10 text-amber-500" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Hall of Reason</h1>
        <p className="text-slate-400">The most disciplined minds in the Forge.</p>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
      >
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-800/50 border-b border-slate-800">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Rank</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">User</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Title</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">XP Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {LEADERBOARD.map((user, idx) => (
              <tr key={user.name} className="group hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-6">
                  {user.rank === 1 ? (
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center">
                      <Medal className="w-4 h-4 text-amber-500" />
                    </div>
                  ) : user.rank === 2 ? (
                    <div className="w-8 h-8 rounded-lg bg-slate-300/10 border border-slate-300/30 flex items-center justify-center">
                      <Medal className="w-4 h-4 text-slate-300" />
                    </div>
                  ) : user.rank === 3 ? (
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
                      <Medal className="w-4 h-4 text-orange-500" />
                    </div>
                  ) : (
                    <span className="text-slate-600 font-bold ml-3">{user.rank}</span>
                  )}
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-4">
                    <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-slate-800 group-hover:border-indigo-500/50 transition-colors" alt={user.name} />
                    <div>
                      <p className="text-slate-100 font-bold">{user.name}</p>
                      {user.rank === 1 && <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Current Champion</span>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className="text-sm font-medium text-slate-400 group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                    <Star className="w-3 h-3" />
                    {user.title}
                  </span>
                </td>
                <td className="px-6 py-6 text-right">
                  <span className="text-xl font-bold text-slate-100 tabular-nums">
                    {user.xp.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <div className="mt-8 bg-indigo-500/5 border border-indigo-500/20 p-6 rounded-2xl flex items-center justify-between">
        <div>
          <p className="text-slate-100 font-bold">You are in the top 12%</p>
          <p className="text-slate-400 text-sm">Gain 450 more XP to surpass StoicMind.</p>
        </div>
        <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-all">
          Invite Rivals
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
