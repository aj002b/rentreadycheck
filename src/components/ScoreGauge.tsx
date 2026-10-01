"use client";

import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Semicircle from (16,100) to (184,100). pathLength={100} lets the dash
// array use the score directly.
const ARC = "M16 100 A84 84 0 0 1 184 100";
const CENTER = { x: 100, y: 100 };
const RADIUS = 84;

// Score boundaries between labels, marked as ticks on the dial.
const THRESHOLDS = [50, 70, 85];

function levelColor(score: number) {
  if (score >= 85) return "#0d9488";
  if (score >= 70) return "#2563eb";
  if (score >= 50) return "#d97706";
  return "#dc2626";
}

function pointOnArc(score: number, radius: number) {
  const angle = Math.PI * (1 - score / 100);
  return {
    x: CENTER.x + radius * Math.cos(angle),
    y: CENTER.y - radius * Math.sin(angle),
  };
}

export function ScoreGauge({
  score,
  label,
  size = "md",
}: {
  // null shows an empty dial, for when there is nothing to score yet.
  score: number | null;
  label?: string;
  size?: "md" | "lg";
}) {
  const reduceMotion = useReducedMotion();
  const target = score ?? 0;
  const [animated, setAnimated] = useState(target);
  const shownRef = useRef(target);
  // With reduced motion the dial jumps straight to the score.
  const shown = reduceMotion ? target : animated;

  useEffect(() => {
    if (reduceMotion) {
      shownRef.current = target;
      return;
    }

    const controls = animate(shownRef.current, target, {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => {
        shownRef.current = value;
        setAnimated(value);
      },
    });

    return () => controls.stop();
  }, [target, reduceMotion]);

  const color = levelColor(target);
  const knob = pointOnArc(shown, RADIUS);

  return (
    <div className={`relative mx-auto w-full ${size === "lg" ? "max-w-[20rem]" : "max-w-[16rem]"}`}>
      <svg
        viewBox="0 0 200 116"
        className="block w-full"
        role="img"
        aria-label={
          score === null
            ? "Rent readiness score not calculated yet"
            : `Rent readiness score ${score} out of 100${label ? `, ${label}` : ""}`
        }
      >
        <path d={ARC} fill="none" stroke="#e2e8f0" strokeWidth="14" strokeLinecap="round" />
        {score !== null ? (
          <>
            <path
              d={ARC}
              fill="none"
              stroke={color}
              strokeWidth="14"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={`${Math.max(shown, 0.01)} 100`}
              style={{ transition: reduceMotion ? undefined : "stroke 300ms ease" }}
            />
            <circle
              cx={knob.x}
              cy={knob.y}
              r="6"
              fill="#ffffff"
              stroke={color}
              strokeWidth="3"
              style={{ transition: reduceMotion ? undefined : "stroke 300ms ease" }}
            />
          </>
        ) : null}
        {THRESHOLDS.map((threshold) => {
          const inner = pointOnArc(threshold, RADIUS + 10);
          const outer = pointOnArc(threshold, RADIUS + 15);
          return (
            <line
              key={threshold}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="#94a3b8"
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center" aria-hidden="true">
        <p
          className={`font-black leading-none tracking-[-0.03em] text-[#0f1f3a] ${size === "lg" ? "text-6xl" : "text-5xl"}`}
        >
          {score === null ? "–" : Math.round(shown)}
          <span className={`font-extrabold text-[#64748b] ${size === "lg" ? "text-2xl" : "text-xl"}`}>
            /100
          </span>
        </p>
      </div>
    </div>
  );
}
