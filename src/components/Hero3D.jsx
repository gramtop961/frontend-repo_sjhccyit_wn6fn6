import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const Hero3D = () => {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-end px-6 pb-10 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            <span className="text-cyan-200">AI-powered insights</span>
          </div>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            Make your resume shine with real-time, personalized guidance
          </h1>
          <p className="mx-auto max-w-2xl text-slate-300">
            Upload or paste your resume. Get clarity on skill gaps, formatting, and keyword strength with a polished, modern interface.
          </p>
          <div className="mt-2 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-emerald-400/10 px-4 py-2 text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              <span>ATS-friendly suggestions</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero3D;
