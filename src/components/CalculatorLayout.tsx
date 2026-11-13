"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ShareTool } from "@/components/ShareTool";
import { useCalculatorEngagementTracking } from "@/lib/analytics";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function CalculatorLayout({
  form,
  result,
  children,
  calculatorName = "",
  resultReady = false,
  resultSummary,
}: {
  form: ReactNode;
  result: ReactNode;
  children?: ReactNode;
  calculatorName?: string;
  resultReady?: boolean;
  /** Short live result shown in a sticky bar on phones while the result card is off screen. */
  resultSummary?: string;
}) {
  const reduceMotion = useReducedMotion();
  const markInteraction = useCalculatorEngagementTracking(calculatorName, resultReady);
  const resultRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [resultVisible, setResultVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === resultRef.current) setResultVisible(entry.isIntersecting);
        if (entry.target === formRef.current) setFormVisible(entry.isIntersecting);
      }
    });
    if (resultRef.current) observer.observe(resultRef.current);
    if (formRef.current) observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

  const showMobileBar = Boolean(resultSummary) && resultReady && formVisible && !resultVisible;

  return (
    <div className="space-y-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.82fr)] lg:items-start">
        <motion.div
          ref={formRef}
          onChangeCapture={markInteraction}
          onSubmitCapture={markInteraction}
          className="space-y-5"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease: easeOut }}
        >
          {form}
        </motion.div>
        <motion.div
          ref={resultRef}
          className="scroll-mt-20 space-y-4 lg:sticky lg:top-24"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease: easeOut, delay: reduceMotion ? 0 : 0.06 }}
        >
          {result}
          <ShareTool />
        </motion.div>
      </div>
      {showMobileBar ? (
        <button
          type="button"
          onClick={() =>
            resultRef.current?.scrollIntoView({
              behavior: reduceMotion ? "auto" : "smooth",
              block: "start",
            })
          }
          className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-3 rounded-xl border border-rule bg-surface px-4 py-3 text-left shadow-card lg:hidden"
        >
          <span className="min-w-0">
            <span className="block text-xs font-semibold text-muted">Your result</span>
            <span className="block truncate text-sm font-bold text-ink">{resultSummary}</span>
          </span>
          <span className="shrink-0 text-sm font-semibold text-accent">View ↓</span>
        </button>
      ) : null}
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
      className="border-t border-rule pt-5 first:border-t-0 first:pt-0"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.24,
        ease: easeOut,
        delay: reduceMotion ? 0 : stepNumber * 0.035,
      }}
    >
      <div className="mb-4">
        <p className="text-sm font-semibold text-accent">{step}</p>
        <h3 className="mt-0.5 text-lg font-bold text-ink">{title}</h3>
        {description ? (
          <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
        ) : null}
      </div>
      <div className={`grid gap-4 ${columns}`}>{children}</div>
    </motion.section>
  );
}

export function HowEstimateWorks({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.aside
      className="premium-card p-5"
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.24, ease: easeOut, delay: reduceMotion ? 0 : 0.08 }}
    >
      <p className="text-sm font-semibold text-ink">How this estimate works</p>
      <p className="mt-2 text-sm leading-6 text-muted">{children}</p>
    </motion.aside>
  );
}
