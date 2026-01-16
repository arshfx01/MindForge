
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SCENARIOS } from '../constants';
import { useGameState } from '../context/GameStateContext';
import { evaluateReasoning } from '../services/geminiService';
import { Feedback } from '../types';
import FeedbackOverlay from './FeedbackOverlay';
import { motion } from 'framer-motion';
import { BrainCircuit, Send, ListChecks, ArrowLeft, Loader2 } from 'lucide-react';

const Arena: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scenario = SCENARIOS.find(s => s.id === id);
  const { addXP, completeScenario, updateStats } = useGameState();

  const [analysis, setAnalysis] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  if (!scenario) {
    return <div className="p-8 text-white">Scenario not found.</div>;
  }

  const handleSubmit = async () => {
    if (!analysis.trim()) return;
    
    setIsEvaluating(true);
    const result = await evaluateReasoning(scenario.title, scenario.narrative, analysis);
    
    setFeedback(result);
    setIsEvaluating(false);

    // Apply rewards
    addXP(result.xpAwarded);
    completeScenario(scenario.id);
    updateStats(scenario.category, Math.floor(result.score / 10));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 h-[calc(100vh-80px)] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Path
        </button>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Arena ID: #{scenario.id}</span>
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_indigo]" />
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-2 gap-8 overflow-hidden min-h-0">
        {/* Left: Narrative */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-6 overflow-y-auto pr-4 custom-scrollbar"
        >
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl relative">
            <h1 className="text-3xl font-bold text-white mb-6 leading-tight">{scenario.title}</h1>
            <div className="space-y-4">
              <p className="text-slate-300 leading-relaxed text-lg italic">
                "{scenario.narrative}"
              </p>
            </div>
            {/* Ambient decoration */}
            <div className="absolute top-0 right-0 p-4">
              <BrainCircuit className="w-12 h-12 text-indigo-500/20" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="flex items-center gap-2 text-slate-100 font-bold mb-4 uppercase tracking-wider text-sm">
              <ListChecks className="w-4 h-4 text-emerald-400" />
              Key Variables
            </h3>
            <ul className="grid gap-3">
              {scenario.variables.map((v, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-700" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right: Input */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
        >
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
            <span className="text-sm font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest">
              Your Analysis
            </span>
            <span className="text-[10px] text-slate-600">INPUT READY</span>
          </div>
          
          <textarea
            value={analysis}
            onChange={(e) => setAnalysis(e.target.value)}
            placeholder="Break down the problem, identify stakeholders, consider alternative outcomes, and justify your logical stance..."
            className="flex-1 bg-transparent p-6 text-slate-200 resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500/30 placeholder:text-slate-600 leading-relaxed font-mono text-sm"
          />

          <div className="p-6 border-t border-slate-800 bg-slate-900/80 backdrop-blur-sm">
            <button
              onClick={handleSubmit}
              disabled={!analysis.trim() || isEvaluating}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-indigo-600/10 group overflow-hidden relative"
            >
              {isEvaluating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Invoking the AI Oracle...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Submit to AI Oracle
                </>
              )}
              {/* Particle effect placeholder */}
              {isEvaluating && (
                <div className="absolute inset-0 bg-indigo-400/10 animate-pulse" />
              )}
            </button>
          </div>
        </motion.div>
      </div>

      <FeedbackOverlay feedback={feedback} onClose={() => setFeedback(null)} />
    </div>
  );
};

export default Arena;
