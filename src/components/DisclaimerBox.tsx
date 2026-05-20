import { estimateDisclaimer } from "@/lib/site";

export function DisclaimerBox({ children }: { children?: React.ReactNode }) {
  return (
    <aside className="rounded-2xl border border-[#bdd3f5] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-5 shadow-[0_14px_34px_rgba(15,31,58,0.06)]">
      <h2 className="text-xl font-extrabold tracking-[-0.015em] text-[#0f1f3a]">
        Important disclaimer
      </h2>
      <p className="mt-2 leading-7 text-[#53657f]">
        {children ?? estimateDisclaimer}
      </p>
    </aside>
  );
}
