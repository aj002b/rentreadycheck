import type { FAQItem } from "@/lib/site";

export function FAQSection({ items }: { items: FAQItem[] }) {
  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-bold text-ink md:text-[1.75rem]">
        Frequently asked questions
      </h2>
      <div className="max-w-3xl">
        {items.map((item) => (
          <details
            key={item.question}
            className="group border-t border-rule last:border-b"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-[1.05rem] font-bold text-ink [&::-webkit-details-marker]:hidden">
              <span className="leading-6">{item.question}</span>
              <span
                aria-hidden="true"
                className="relative mt-0.5 h-6 w-6 shrink-0 text-accent transition group-open:rotate-180"
              >
                <span className="absolute left-1/2 top-1/2 h-0.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                <span className="absolute left-1/2 top-1/2 h-3.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition group-open:opacity-0" />
              </span>
            </summary>
            <p className="max-w-[64ch] pb-5 leading-7 text-ink-2">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
