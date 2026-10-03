import { estimateDisclaimer } from "@/lib/site";

export function DisclaimerBox({ children }: { children?: React.ReactNode }) {
  return (
    <aside className="border-l-2 border-rule-strong pl-4">
      <h2 className="text-base font-bold text-ink">Important disclaimer</h2>
      <p className="mt-1 text-[15px] leading-7 text-muted">
        {children ?? estimateDisclaimer}
      </p>
    </aside>
  );
}
