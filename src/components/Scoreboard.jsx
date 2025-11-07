import React from 'react';
import { motion } from 'framer-motion';

const ScoreBar = ({ label, score, colorFrom, colorTo }) => {
  const pct = Math.max(0, Math.min(100, Math.round(score)));
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-slate-300">
        <span>{label}</span>
        <span className="tabular-nums text-slate-400">{pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${colorFrom} ${colorTo}`}
        />
      </div>
    </div>
  );
};

const Scoreboard = ({ scores }) => {
  const { overall = 72, keywords = 65, formatting = 80, skills = 60 } = scores || {};
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Resume Quality</h3>
          <p className="text-sm text-slate-400">Visual feedback based on best practices</p>
        </div>
        <div className="rounded-xl bg-slate-950 px-4 py-2 text-right">
          <div className="text-2xl font-semibold text-white">{overall}</div>
          <div className="text-xs uppercase tracking-wide text-slate-400">Overall</div>
        </div>
      </div>
      <div className="grid gap-4">
        <ScoreBar label="Keyword Match" score={keywords} colorFrom="from-violet-500" colorTo="to-fuchsia-500" />
        <ScoreBar label="Formatting" score={formatting} colorFrom="from-cyan-500" colorTo="to-blue-500" />
        <ScoreBar label="Skills Coverage" score={skills} colorFrom="from-emerald-500" colorTo="to-teal-500" />
      </div>
    </section>
  );
};

export default Scoreboard;
