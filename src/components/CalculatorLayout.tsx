"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ShareTool } from "@/components/ShareTool";
import { useCalculatorEngagementTracking } from "@/lib/analytics";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function CalculatorLayout({
  form,
  result,
  children,
  calculatorName = "",
  resultReady = false,
}: {
  form: ReactNode;
  result: ReactNode;
  children?: ReactNode;
  calculatorName?: string;
  resultReady?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const markInteraction = useCalculatorEngagementTracking(calculatorName, resultReady);

  return (
    <div className="space-y-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.82fr)] lg:items-start">
        <motion.div
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
          className="space-y-4 lg:sticky lg:top-24"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease: easeOut, delay: reduceMotion ? 0 : 0.06 }}
        >
          {result}
          <ShareTool />
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
