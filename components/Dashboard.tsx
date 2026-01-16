
import React from 'react';
import { useGameState } from '../context/GameStateContext';
import StatCard from './StatCard';
import { Brain, Sparkles, Scale, Lock, CheckCircle2, PlayCircle } from 'lucide-react';
import { SCENARIOS } from '../constants';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { stats, unlockedScenarios, completedScenarios } = useGameState();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-10">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold text-white mb-2"
        >
          Forge Your Mind
        </motion.h1>
        <p className="text-slate-400">Test your cognitive boundaries with AI-crafted challenges.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <StatCard 
          label="Logic Prowess" 
          value={stats.logicProwess} 
          icon={<Brain className="w-6 h-6 text-indigo-400" />} 
          color="bg-indigo-500" 
        />
        <StatCard 
          label="Cognitive Flexibility" 
          value={stats.cognitiveFlexibility} 
          icon={<Sparkles className="w-6 h-6 text-emerald-400" />} 
          color="bg-emerald-500" 
        />
        <StatCard 
          label="Ethical Nuance" 
          value={stats.ethicalNuance} 
          icon={<Scale className="w-6 h-6 text-amber-400" />} 
          color="bg-amber-500" 
        />
      </div>

      {/* The Path */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">The Path</h2>
          <span className="text-sm text-slate-500 font-medium">{completedScenarios.length} / {SCENARIOS.length} COMPLETED</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {SCENARIOS.map((scenario, index) => {
            const isUnlocked = unlockedScenarios.includes(scenario.id);
            const isCompleted = completedScenarios.includes(scenario.id);

            return (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative bg-slate-900 border ${isUnlocked ? 'border-slate-800 hover:border-indigo-500/50' : 'border-slate-800/50 opacity-60'} p-6 rounded-2xl transition-all overflow-hidden`}
              >
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : isUnlocked ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40' : 'bg-slate-800 text-slate-600 border border-slate-700'}`}>
                      {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : isUnlocked ? <PlayCircle className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                    </div>
                    {index < SCENARIOS.length - 1 && (
                      <div className="w-px h-full bg-slate-800 group-hover:bg-indigo-500/50 transition-colors" />
                    )}
                  </div>

                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border ${scenario.category === 'logic' ? 'text-indigo-400 border-indigo-500/30' : scenario.category === 'ethics' ? 'text-amber-400 border-amber-500/30' : 'text-emerald-400 border-emerald-500/30'}`}>
                        {scenario.category}
                      </span>
                      {isCompleted && <span className="text-[10px] font-bold text-emerald-500 uppercase">Mastered</span>}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{scenario.title}</h3>
                    <p className="text-slate-400 text-sm line-clamp-2 mb-6">
                      {scenario.narrative}
                    </p>
                    
                    {isUnlocked ? (
                      <Link 
                        to={`/arena/${scenario.id}`}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl transition-all group-hover:translate-x-1"
                      >
                        {isCompleted ? 'Review Scenario' : 'Enter Arena'}
                        <PlayCircle className="w-4 h-4" />
                      </Link>
                    ) : (
                      <button disabled className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-800/50 text-slate-600 text-sm font-bold rounded-xl cursor-not-allowed">
                        Locked
                        <Lock className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
