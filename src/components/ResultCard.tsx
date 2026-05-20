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

const toneStyles = {
  positive: "border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)]",
  warning: "border-[#bfdbfe] bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]",
  neutral: "border-[#bfdbfe] bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]",
};

const badgeStyles = {
  positive: "border-[#93c5fd] bg-[#eff6ff] text-[#1d4ed8]",
  warning: "border-[#bfdbfe] bg-[#f8fbff] text-[#1e40af]",
  neutral: "border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8]",
};

function getSignalBadgeStyle(label: string, tone: "positive" | "warning" | "neutral") {
  const normalized = label.toLowerCase();

  if (normalized.includes("strong")) {
    return "border-[#93c5fd] bg-[#eff6ff] text-[#1d4ed8]";
  }

  if (normalized.includes("possible")) {
    return "border-[#bfdbfe] bg-[#f8fbff] text-[#1e40af]";
  }

  if (normalized.includes("borderline")) {
    return "border-[#bfdbfe] bg-[#f8fbff] text-[#1e40af]";
  }

  if (normalized.includes("help")) {
    return "border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8]";
  }

  if (normalized.includes("support") || normalized.includes("check")) {
    return "border-[#bfdbfe] bg-[#f8fbff] text-[#1e40af]";
  }

  return badgeStyles[tone];
}

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
      className={`rounded-2xl border p-5 shadow-[0_18px_45px_rgba(15,31,58,0.08)] sm:p-6 ${toneStyles[tone]}`}
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
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#53657f]">
              Estimate result
            </p>
            <motion.span
              key={badgeLabel}
              initial={reduceMotion ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-full border px-3 py-1 text-xs font-extrabold ${getSignalBadgeStyle(badgeLabel, tone)}`}
            >
              {badgeLabel}
            </motion.span>
          </div>
          <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.02em] text-[#0f1f3a]">
            {title}
          </h2>
          <p className="mt-3 leading-7 text-[#334765]">{description}</p>
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
      <p className="mt-5 rounded-xl border border-[#d8e5f7] bg-white/70 p-4 text-xs leading-6 text-[#53657f] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
        {estimateDisclaimer}
      </p>
    </section>
  );
}
