"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function CalculatorLayout({
  form,
  result,
  children,
}: {
  form: ReactNode;
  result: ReactNode;
  children?: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.82fr)] lg:items-start">
        <motion.div
          className="space-y-5"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease: easeOut }}
        >
          {form}
        </motion.div>
        <motion.div
          className="space-y-4 lg:sticky lg:top-24"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease: easeOut, delay: reduceMotion ? 0 : 0.06 }}
        >
          {result}
        </motion.div>
      </div>
      {children}
    </div>
  );
}

export function FormSection({
  step,
  title,
  description,
  children,
  columns = "md:grid-cols-2",
}: {
  step: string;
  title: string;
  description?: string;
  children: ReactNode;
  columns?: string;
}) {
  const reduceMotion = useReducedMotion();
  const stepNumber = Number(step.replace(/\D/g, "")) || 1;

  return (
    <motion.section
      className="rounded-2xl border border-[#d8e5f7] bg-[#f8fbff] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] sm:p-5"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.24,
        ease: easeOut,
        delay: reduceMotion ? 0 : stepNumber * 0.035,
      }}
    >
      <div className="mb-4 flex items-start gap-3">
        <span className="inline-flex h-8 shrink-0 items-center rounded-full border border-[#bdd3f5] bg-white px-3 text-xs font-extrabold uppercase tracking-[0.08em] text-[#2563eb]">
          {step}
        </span>
        <div>
          <h3 className="font-extrabold tracking-[-0.015em] text-[#0f1f3a]">
            {title}
          </h3>
          {description ? (
            <p className="mt-1 text-sm leading-6 text-[#53657f]">{description}</p>
          ) : null}
        </div>
      </div>
      <div className={`grid gap-4 ${columns}`}>{children}</div>
    </motion.section>
  );
}

export function HowEstimateWorks({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.aside
      className="rounded-2xl border border-[#d8e5f7] bg-white/90 p-5 shadow-[0_12px_28px_rgba(15,31,58,0.07)]"
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.24, ease: easeOut, delay: reduceMotion ? 0 : 0.08 }}
    >
      <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#2563eb]">
        How this estimate works
      </p>
      <p className="mt-3 text-sm leading-6 text-[#53657f]">{children}</p>
    </motion.aside>
  );
}
