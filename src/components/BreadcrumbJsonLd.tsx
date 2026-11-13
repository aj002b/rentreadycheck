import { siteConfig } from "@/lib/siteConfig";

type BreadcrumbItem = {
  name: string;
  href: string;
};

// The site is exported with trailingSlash: true, so every canonical URL ends
// in "/". Normalize here so breadcrumb items never point at a redirect.
export function absoluteUrl(href: string) {
  const base = siteConfig.domain.replace(/\/+$/, "");
  const path = href.startsWith("/") ? href : `/${href}`;
  return `${base}${path.endsWith("/") ? path : `${path}/`}`;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
