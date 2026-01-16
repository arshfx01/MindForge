
import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col gap-4 relative overflow-hidden group"
    >
      <div className="flex items-center justify-between">
        <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">{label}</span>
        <div className={`p-2 rounded-lg bg-slate-800 border border-slate-700`}>
          {icon}
        </div>
      </div>
      
      <div className="flex flex-col gap-1">
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-slate-100 leading-none">{value}</span>
          <span className="text-sm text-slate-500 pb-1">/ 100</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full mt-2">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`h-full rounded-full ${color}`}
          />
        </div>
      </div>

      {/* Background Glow */}
      <div className={`absolute -right-10 -bottom-10 w-32 h-32 blur-[80px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-500 ${color.replace('bg-', 'bg-')}`} />
    </motion.div>
  );
};

export default StatCard;
