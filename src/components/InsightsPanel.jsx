import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ListChecks, TriangleAlert } from 'lucide-react';

const Item = ({ type = 'tip', text }) => {
  const iconMap = {
    tip: <Lightbulb className="h-4 w-4 text-amber-300" />,
    improvement: <ListChecks className="h-4 w-4 text-cyan-300" />,
    warning: <TriangleAlert className="h-4 w-4 text-rose-300" />,
  };
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3 }}
      className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-950/50 p-3 text-slate-300"
    >
      {iconMap[type]}
      <span>{text}</span>
    </motion.li>
  );
};

const InsightsPanel = ({ insights }) => {
  const tips = insights?.tips || [
    'Use consistent date formats across all sections.',
    'Add metrics to showcase impact (e.g., increased conversion by 18%).',
    'Include a concise summary with your top 3 strengths.',
  ];
  const improvements = insights?.improvements || [
    'Mention proficiency level for Python, React, and SQL.',
    'Reduce passive voice in experience bullets.',
  ];
  const warnings = insights?.warnings || [
    'Avoid using images or tables that may break ATS parsing.',
  ];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
      <h3 className="mb-4 text-lg font-semibold text-white">Personalized Insights</h3>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-amber-300">Quick Wins</h4>
          <ul className="space-y-2">
            {tips.map((t, i) => (
              <Item key={`tip-${i}`} type="tip" text={t} />
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-cyan-300">Improvements</h4>
          <ul className="space-y-2">
            {improvements.map((t, i) => (
              <Item key={`imp-${i}`} type="improvement" text={t} />
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-rose-300">Warnings</h4>
          <ul className="space-y-2">
            {warnings.map((t, i) => (
              <Item key={`warn-${i}`} type="warning" text={t} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default InsightsPanel;
