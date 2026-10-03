"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { estimateDisclaimer } from "@/lib/site";

type ResultCardProps = {
  title: string;
  description: string;
  tone?: "positive" | "warning" | "neutral";
  badgeLabel?: string;
  children?: React.ReactNode;
};

const badgeStyles = {
  positive: "bg-good-soft text-good",
  warning: "bg-warn-soft text-warn",
  neutral: "bg-accent-soft text-accent-dark",
};

export function ResultCard({
  title,
  description,
  tone = "neutral",
  badgeLabel = "Estimate",
  children,
}: ResultCardProps) {
  const reduceMotion = useReducedMotion();
  const contentKey = `${tone}-${badgeLabel}-${title}-${description}`;
  const duration = reduceMotion ? 0 : 0.24;

  return (
    <section
      aria-live="polite"
      className="form-card p-5 sm:p-6"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={contentKey}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
          transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-muted">Estimate result</p>
            <motion.span
              key={badgeLabel}
              initial={reduceMotion ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-full px-3 py-1 text-xs font-bold ${badgeStyles[tone]}`}
            >
              {badgeLabel}
            </motion.span>
          </div>
          <h2 className="mt-3 text-2xl font-bold text-ink">
            {title}
          </h2>
          <p className="mt-2 leading-7 text-ink-2">{description}</p>
        </motion.div>
      </AnimatePresence>
      {children ? (
        <motion.div
          key={`stats-${contentKey}`}
          className="mt-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.04,
                delayChildren: reduceMotion ? 0 : 0.03,
              },
            },
          }}
        >
          {children}
        </motion.div>
      ) : null}
      <p className="mt-5 border-t border-rule pt-4 text-xs leading-6 text-muted">
        {estimateDisclaimer}
      </p>
    </section>
  );
}
