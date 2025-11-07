import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, ClipboardPaste, FileText } from 'lucide-react';

const ResumeInput = ({ onAnalyze }) => {
  const fileInputRef = useRef(null);
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFile = (file) => {
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result?.toString() || '';
      setText(content);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handlePaste = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      if (clip) setText((prev) => (prev ? prev + '\n' + clip : clip));
    } catch {
      // ignore
    }
  };

  return (
    <section className="w-full">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl transition hover:border-slate-700"
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500/10 via-transparent to-fuchsia-500/10 opacity-0 transition group-hover:opacity-100" />
        <div className="relative z-10 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-slate-300">Paste your resume</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste plain text or extracted content from PDF/Docx"
              className="min-h-[220px] w-full resize-y rounded-xl border border-slate-700 bg-slate-950/60 p-4 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-slate-200 transition hover:bg-slate-700"
              >
                <Upload className="h-4 w-4" /> Upload file
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              <button
                type="button"
                onClick={handlePaste}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-slate-200 transition hover:bg-slate-700"
              >
                <ClipboardPaste className="h-4 w-4" /> Paste from clipboard
              </button>
              {fileName && (
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-800/80 px-3 py-1 text-xs text-slate-300">
                  <FileText className="h-3 w-3" /> {fileName}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-slate-300">Quick tips</label>
            <ul className="grid gap-2 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-slate-300">
              <li>• Keep it to 1-2 pages with clear section headings.</li>
              <li>• Emphasize measurable impact (metrics, KPIs).</li>
              <li>• Mirror keywords from the job description.</li>
              <li>• Use consistent formatting and bullet styles.</li>
            </ul>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => onAnalyze(text)}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 font-medium text-white shadow-lg shadow-cyan-600/20 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Analyze Resume
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeInput;
