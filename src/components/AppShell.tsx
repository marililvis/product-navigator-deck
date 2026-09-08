import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const NAV: { group: string; items: { to: string; label: string }[] }[] = [
  {
    group: "Product Strategy",
    items: [
      { to: "/", label: "Vision Statement" },
      { to: "/roadmap", label: "Product Roadmap" },
      { to: "/product-goal", label: "Product Goal" },
    ],
  },
  {
    group: "Backlog",
    items: [
      { to: "/backlog-ordering", label: "Backlog Ordering" },
      { to: "/splitting", label: "Splitting Canvas" },
      { to: "/story-mapping", label: "Story Mapping" },
    ],
  },
  {
    group: "Value Tracking",
    items: [
      { to: "/ebm", label: "EBM Dashboard" },
      { to: "/forecasting", label: "Forecasts" },
      { to: "/stakeholders", label: "Stakeholders" },
    ],
  },
  {
    group: "Reference",
    items: [{ to: "/accountabilities", label: "PO Accountabilities" }],
  },
];

export function AppShell({
  ref,
  title,
  meta,
  actions,
  children,
}: {
  ref: string;
  title: string;
  meta?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <aside className="hidden md:flex w-56 shrink-0 border-r border-border flex-col sticky top-0 h-screen bg-sidebar">
        <div className="px-4 py-4 flex items-center gap-2.5 shrink-0">
          <div className="size-7 bg-foreground rounded flex items-center justify-center">
            <div className="size-2.5 border-2 border-background rotate-45" />
          </div>
          <span className="font-display text-base tracking-tight font-bold uppercase">
            PO Console
          </span>
        </div>

        <nav className="flex-1 min-h-0 px-3 space-y-5 overflow-y-auto pb-4">
          {NAV.map((group) => (
            <div key={group.group}>
              <h3 className="px-2 label-mono mb-2">{group.group}</h3>
              <ul className="space-y-0.5">
                {group.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      activeOptions={{ exact: item.to === "/" }}
                      activeProps={{ className: "bg-foreground/5 text-foreground" }}
                      inactiveProps={{ className: "text-muted hover:bg-foreground/5" }}
                      className="flex items-center gap-3 px-3 py-1.5 text-[13px] font-medium rounded-md transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-3 shrink-0 border-t border-border">
          <div className="bg-subtle rounded-lg p-2.5 flex items-center gap-2.5">
            <div className="size-7 rounded-full bg-foreground/15 ring-1 ring-border" />
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold truncate">Product Owner</p>
              <p className="text-[10px] text-muted truncate">Single product team</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0 px-5 py-6 lg:px-8">
        <nav className="md:hidden -mx-5 mb-5 px-5 flex gap-2 overflow-x-auto pb-2 border-b border-border">
          {NAV.flatMap((g) => g.items).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-foreground text-background" }}
              inactiveProps={{ className: "bg-subtle text-muted" }}
              className="whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="max-w-6xl mx-auto space-y-6">
          <header className="flex flex-wrap gap-3 justify-between items-end border-b border-border pb-5 enter">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-tighter text-muted">
                <span className="px-1.5 py-0.5 border border-border">Ref: {ref}</span>
                {meta ? (
                  <>
                    <span>&bull;</span>
                    <span>{meta}</span>
                  </>
                ) : null}
              </div>
              <h1 className="text-2xl lg:text-3xl font-display font-extrabold tracking-tight text-balance uppercase">
                {title}
              </h1>
            </div>
            {actions ? <div className="flex gap-2">{actions}</div> : null}
          </header>
          {children}
        </div>
      </main>
    </div>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`panel ${className}`}>{children}</div>;
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-sm font-bold uppercase tracking-widest text-muted">{children}</h2>
  );
}

export function PrimaryButton({
  children,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-4 py-2 bg-foreground text-background text-sm font-semibold rounded hover:opacity-90 transition-opacity"
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 border border-border text-sm font-semibold rounded hover:bg-foreground/5 transition-colors"
    >
      {children}
    </button>
  );
}

export const inputClass =
  "w-full px-3 py-2 border border-border rounded text-sm outline-none focus:ring-2 focus:ring-ring/40";
