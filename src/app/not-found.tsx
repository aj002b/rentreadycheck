import Link from "next/link";
import { CalculatorCard } from "@/components/CalculatorCard";
import { tools } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-14 sm:px-6 lg:px-8">
      <section className="max-w-2xl">
        <p className="text-sm font-bold text-bad">Page not found</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-ink">
          This page is not available
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          The page may have moved, or the address may be incorrect. You can go
          back to the homepage or open one of the rental calculators below.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-md bg-good px-5 py-3 font-semibold text-white hover:bg-good focus:outline-none focus:ring-2 focus:ring-good focus:ring-offset-4"
        >
          Go to homepage
        </Link>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-ink">Popular calculators</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {tools.slice(0, 3).map((tool) => (
            <CalculatorCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
