
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, AlertTriangle, Lightbulb, ChevronRight } from 'lucide-react';
import { Feedback } from '../types';

interface FeedbackOverlayProps {
  feedback: Feedback | null;
  onClose: () => void;
}

const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({ feedback, onClose }) => {
  if (!feedback) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">Oracle Evaluation</h2>
                <p className="text-slate-400">Reasoning Assessment Results</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white transition-colors hover:bg-slate-800 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Score Gauge */}
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-slate-800"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={364.4}
                      initial={{ strokeDashoffset: 364.4 }}
                      animate={{ strokeDashoffset: 364.4 - (364.4 * feedback.score) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="text-indigo-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white">{feedback.score}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">SCORE</span>
                  </div>
                </div>
              </div>

              {/* XP Rewards */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                  <div className="p-2 bg-emerald-500 rounded-lg">
                    <Trophy className="w-5 h-5 text-emerald-950" />
                  </div>
                  <div>
                    <p className="text-emerald-400 text-sm font-bold">XP AWARDED</p>
                    <p className="text-2xl font-bold text-white">+{feedback.xpAwarded} XP</p>
                  </div>
                </div>

                {feedback.score >= 85 && (
                   <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
                   <div className="p-2 bg-amber-500 rounded-lg">
                     <Trophy className="w-5 h-5 text-amber-950" />
                   </div>
                   <div>
                     <p className="text-amber-400 text-sm font-bold">BADGE EARNED</p>
                     <p className="text-lg font-bold text-white">The Skeptic</p>
                   </div>
                 </div>
                )}
              </div>
            </div>

            <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
              <section>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Critique</h3>
                <div className="prose prose-invert prose-sm text-slate-300 leading-relaxed">
                  {feedback.feedbackMarkdown}
                </div>
              </section>

              {feedback.fallaciesArray.length > 0 && (
                <section>
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Fallacies Detected
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {feedback.fallaciesArray.map((f, i) => (
                      <span key={i} className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium rounded-full">
                        {f}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              <section className="bg-indigo-500/5 border border-indigo-500/20 p-5 rounded-xl">
                <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Strategic Pivot
                </h3>
                <p className="text-slate-300 text-sm italic leading-relaxed">
                  "{feedback.strategicPivot}"
                </p>
              </section>
            </div>

            <button 
              onClick={onClose}
              className="w-full mt-8 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 group"
            >
              Continue Journey
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FeedbackOverlay;
