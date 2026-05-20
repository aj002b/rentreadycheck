import { CalculatorCard } from "@/components/CalculatorCard";
import { tools } from "@/lib/site";

export function RelatedTools({ currentPath }: { currentPath?: string }) {
  const relatedTools = tools.filter((tool) => tool.href !== currentPath).slice(0, 3);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-[#0f1f3a]">Related tools</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {relatedTools.map((tool, index) => (
          <CalculatorCard key={tool.href} badge={`${index + 1}`} {...tool} />
        ))}
      </div>
    </section>
  );
}
