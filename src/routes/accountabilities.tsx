import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, GhostButton, Panel, PrimaryButton } from "@/components/AppShell";

export const Route = createFileRoute("/accountabilities")({
  head: () => ({
    meta: [
      { title: "PO Accountabilities & Myths — PO Console" },
      {
        name: "description",
        content:
          "The Scrum Guide's four Product Owner accountabilities, broader applied product ownership tasks, and the myths about what a PO is not.",
      },
      { property: "og:title", content: "PO Accountabilities & Myths — PO Console" },
      {
        property: "og:description",
        content: "A working reference for what the Product Owner is and is not accountable for.",
      },
    ],
  }),
  component: AccountabilitiesPage,
});

const CORE = [
  "Developing and explicitly communicating the Product Goal",
  "Creating and clearly communicating Product Backlog items",
  "Ordering Product Backlog items",
  "Ensuring the Product Backlog is transparent, visible and understood",
];

const APPLIED = [
  "Own and evolve the Product Vision with stakeholder and team input",
  "Define the Product Strategy, including the roadmap",
  "Set and revise the Product Goal when new information invalidates it",
  "Order the backlog on value, risk, dependencies, learning and size",
  "Split large items into smaller vertical slices",
  "Run and participate in Product Backlog refinement",
  "Say no to requests that don't serve the Product Goal — and explain why",
  "Engage stakeholders continuously to gather feedback",
  "Measure product value and inspect and adapt on evidence",
  "Conduct release planning and forecasting where releases aren't continuous",
  "Track the product through its life cycle and adapt strategy",
  "Understand the market, competitors and technology landscape",
  "Develop pricing strategy",
  "Understand and optimise the value stream",
];

const MYTHS = [
  "Must personally write every backlog item — work can be delegated, accountability cannot",
  "Is a project manager owning scope, budget and deadlines",
  "Must be technical to make good product decisions",
  "Is a passive messenger between stakeholders and the team",
];

function AccountabilitiesPage() {
  const [checked, setChecked] = useState<string[]>([]);
  const toggle = (item: string) =>
    setChecked((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );

  return (
    <AppShell
      ref="PO-401"
      title="Accountabilities &amp; Myths"
      meta="Scrum Guide + applied product ownership"
      actions={
        <>
          <PrimaryButton>
            {checked.length} of {APPLIED.length} practised
          </PrimaryButton>
          <GhostButton onClick={() => setChecked([])}>Clear</GhostButton>
        </>
      }
    >
      <Panel className="p-8 enter">
        <span className="label-mono">Scrum Guide accountabilities</span>
        <ol className="mt-4 grid gap-4 md:grid-cols-2">
          {CORE.map((c, i) => (
            <li key={c} className="flex gap-3">
              <span className="font-mono text-primary text-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold leading-snug">{c}</span>
            </li>
          ))}
        </ol>
      </Panel>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 enter">
        <Panel className="lg:col-span-2 p-6 space-y-4">
          <span className="label-mono">Applied product ownership — self-assessment</span>
          <ul className="grid gap-2 md:grid-cols-2">
            {APPLIED.map((a) => {
              const on = checked.includes(a);
              return (
                <li key={a}>
                  <button
                    onClick={() => toggle(a)}
                    className={`w-full text-left flex gap-3 p-3 rounded-lg border text-sm transition-colors ${
                      on ? "border-primary bg-primary/5" : "border-border hover:bg-foreground/5"
                    }`}
                  >
                    <span className={`font-mono ${on ? "text-primary" : "text-muted"}`}>
                      {on ? "✓" : "○"}
                    </span>
                    <span className="leading-snug">{a}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel className="p-6 space-y-4">
          <span className="label-mono">What a PO is not</span>
          <ul className="space-y-3 text-sm text-muted leading-relaxed">
            {MYTHS.map((m) => (
              <li key={m} className="flex gap-2">
                <span className="text-destructive font-mono" aria-hidden>
                  ✕
                </span>
                {m}
              </li>
            ))}
          </ul>
        </Panel>
      </section>
    </AppShell>
  );
}
