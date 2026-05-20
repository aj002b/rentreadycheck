import type { ReactNode } from "react";

export function PublicPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-container space-y-10 py-10 sm:py-12">
      {children}
    </div>
  );
}

export function PublicPageHero({
  eyebrow = "Last updated: May 2026",
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[1.5rem] border border-[#d8e5f7] bg-[linear-gradient(135deg,#ffffff_0%,#eef6ff_100%)] p-6 shadow-[0_24px_60px_rgba(37,99,235,0.12)] md:p-8">
      <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#2563eb]">
        {eyebrow}
      </p>
      <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight tracking-[-0.03em] text-[#0f1f3a] md:text-5xl">
        {title}
      </h1>
      <div className="mt-4 max-w-3xl text-lg leading-8 text-[#334765]">
        {children}
      </div>
    </section>
  );
}
