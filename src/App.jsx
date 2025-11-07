import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Hero3D from './components/Hero3D';
import ResumeInput from './components/ResumeInput';
import Scoreboard from './components/Scoreboard';
import InsightsPanel from './components/InsightsPanel';

function simpleAnalyze(text) {
  // Lightweight client-side heuristic to provide immediate visual feedback
  const lengthScore = Math.min(100, Math.round((text.length / 1500) * 100));
  const hasSections = /experience|education|skills|projects/i.test(text) ? 1 : 0;
  const bulletConsistency = (text.match(/\n- |\n\* |•/g) || []).length > 3 ? 1 : 0;
  const keywords = ['react', 'python', 'sql', 'node', 'aws', 'typescript'];
  const keywordHits = keywords.filter((k) => new RegExp(`\\b${k}\\b`, 'i').test(text)).length;
  const keywordScore = Math.round((keywordHits / keywords.length) * 100);

  const formatting = Math.round((hasSections * 50 + bulletConsistency * 50));
  const skills = Math.min(100, keywordScore + (lengthScore > 40 ? 10 : 0));
  const overall = Math.round((skills + formatting + Math.min(100, lengthScore)) / 3);

  const missing = keywords.filter((k) => !new RegExp(`\\b${k}\\b`, 'i').test(text));

  const insights = {
    tips: [
      'Tailor your summary to the role and highlight 2-3 signature strengths.',
      'Quantify results (time saved, revenue impacted, conversion uplift).',
    ],
    improvements: [
      bulletConsistency
        ? 'Great bullet usage — consider grouping by theme for readability.'
        : 'Use consistent bullet style and lead with strong action verbs.',
      hasSections ? 'Clear sections detected.' : 'Add clear sections like Experience, Education, Skills.',
    ],
    warnings: [
      lengthScore > 100 ? 'Resume may be too long. Aim for 1–2 pages.' : undefined,
    ].filter(Boolean),
    highlights: {
      missing,
    },
  };

  return {
    scores: { overall, keywords: keywordScore, formatting, skills },
    insights,
  };
}

const App = () => {
  const [analysis, setAnalysis] = useState(null);
  const [rawText, setRawText] = useState('');

  const handleAnalyze = (text) => {
    setRawText(text);
    const result = simpleAnalyze(text || '');
    setAnalysis(result);
  };

  const highlightedText = useMemo(() => {
    if (!rawText) return '';
    const keywords = ['react', 'python', 'sql', 'node', 'aws', 'typescript'];
    let html = rawText;
    keywords.forEach((k) => {
      const regex = new RegExp(`(\\b${k}\\b)`, 'gi');
      html = html.replace(regex, '<mark class="rounded bg-cyan-500/20 px-1 text-cyan-200">$1</mark>');
    });
    return html.replace(/\n/g, '<br />');
  }, [rawText]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-10 px-6 py-6 md:py-10">
        <Hero3D />

        <div className="grid gap-6 md:grid-cols-5">
          <div className="md:col-span-3 space-y-6">
            <ResumeInput onAnalyze={handleAnalyze} />
            {rawText && (
              <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
                <h3 className="mb-3 text-lg font-semibold text-white">Highlights</h3>
                <div className="prose prose-invert max-w-none">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-slate-200" dangerouslySetInnerHTML={{ __html: highlightedText }} />
                </div>
              </section>
            )}
          </div>
          <div className="md:col-span-2 space-y-6">
            <Scoreboard scores={analysis?.scores} />
            <InsightsPanel insights={analysis?.insights} />
          </div>
        </div>

        <footer className="py-8 text-center text-sm text-slate-500">
          Built with a focus on clarity, confidence, and career momentum.
        </footer>
      </div>
    </div>
  );
};

export default App;
