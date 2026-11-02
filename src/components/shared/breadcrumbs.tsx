import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Container } from "./container";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border/70 bg-ice-blue/60">
      <Container>
        <ol className="flex flex-wrap items-center gap-1.5 py-3 text-xs font-medium text-muted-foreground sm:text-sm">
          <li className="flex items-center gap-1.5">
            <Link href="/" className="flex items-center gap-1 hover:text-western-red" aria-label="Home">
              <Home className="size-3.5" />
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.label} className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5 text-castle-grey" aria-hidden />
              {item.href && index !== items.length - 1 ? (
                <Link href={item.href} className="hover:text-western-red">
                  {item.label}
                </Link>
              ) : (
                <span className="text-deep-ink" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  );
}
