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
      <aside className="w-64 shrink-0 border-r border-border flex flex-col sticky top-0 h-screen bg-sidebar">
        <div className="p-6 flex items-center gap-3">
          <div className="size-8 bg-foreground rounded flex items-center justify-center">
            <div className="size-3 border-2 border-background rotate-45" />
          </div>
          <span className="font-display text-lg tracking-tight font-bold uppercase">
            PO Console
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-8 mt-2 overflow-y-auto">
          {NAV.map((group) => (
            <div key={group.group}>
              <h3 className="px-2 label-mono mb-3">{group.group}</h3>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      activeOptions={{ exact: item.to === "/" }}
                      activeProps={{ className: "bg-foreground/5 text-foreground" }}
                      inactiveProps={{ className: "text-muted hover:bg-foreground/5" }}
                      className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-border">
          <div className="bg-subtle rounded-lg p-3 flex items-center gap-3">
            <div className="size-8 rounded-full bg-foreground/15 ring-1 ring-border" />
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold truncate">Product Owner</p>
              <p className="text-[10px] text-muted truncate">Single product team</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-10">
          <header className="flex flex-wrap gap-4 justify-between items-end border-b border-border pb-8 enter">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-tighter text-muted">
                <span className="px-1.5 py-0.5 border border-border">Ref: {ref}</span>
                {meta ? (
                  <>
                    <span>&bull;</span>
                    <span>{meta}</span>
                  </>
                ) : null}
              </div>
              <h1 className="text-5xl font-display font-extrabold tracking-tighter text-balance uppercase">
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
