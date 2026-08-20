import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AppShell,
  GhostButton,
  Panel,
  PrimaryButton,
  SectionTitle,
  inputClass,
} from "@/components/AppShell";

export const Route = createFileRoute("/product-goal")({
  head: () => ({
    meta: [
      { title: "Product Goal Tracker — PO Console" },
      {
        name: "description",
        content:
          "Set, measure and revise the Product Goal — the measurable bridge between the vision and each Sprint Goal.",
      },
      { property: "og:title", content: "Product Goal Tracker — PO Console" },
      {
        property: "og:description",
        content: "Track progress and abandon the goal when new evidence invalidates it.",
      },
    ],
  }),
  component: ProductGoalPage,
});

const SPRINT_GOALS = [
  { sprint: "Sprint 41", goal: "Social login end-to-end for one provider", done: true },
  { sprint: "Sprint 42", goal: "Recovery flow without support contact", done: true },
  { sprint: "Sprint 43", goal: "Session handling hardened under load", done: false },
];

function ProductGoalPage() {
  const [goal, setGoal] = useState("Make first sign-in reliable enough to stop support tickets");
  const [metric, setMetric] = useState("Login-related support tickets per week");
  const [baseline, setBaseline] = useState(140);
  const [target, setTarget] = useState(20);
  const [current, setCurrent] = useState(62);

  const span = baseline - target || 1;
  const progress = Math.max(0, Math.min(100, ((baseline - current) / span) * 100));

  return (
    <AppShell
      ref="PO-103"
      title="Product Goal"
      meta="Inspect and adapt every Sprint Review"
      actions={
        <>
          <PrimaryButton>Commit goal</PrimaryButton>
          <GhostButton>Abandon &amp; reformulate</GhostButton>
        </>
      }
    >
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 enter">
        <Panel className="lg:col-span-2 p-8 space-y-6">
          <div className="space-y-2">
            <span className="label-mono">Current Product Goal</span>
            <textarea
              className={`${inputClass} text-xl font-display font-bold tracking-tight leading-snug min-h-24`}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="space-y-1.5 col-span-2">
              <span className="label-mono block">Success metric</span>
              <input
                className={inputClass}
                value={metric}
                onChange={(e) => setMetric(e.target.value)}
              />
            </label>
            {[
              ["Baseline", baseline, setBaseline],
              ["Current", current, setCurrent],
              ["Target", target, setTarget],
            ].map(([label, value, setter]) => (
              <label key={String(label)} className="space-y-1.5">
                <span className="label-mono block">{String(label)}</span>
                <input
                  type="number"
                  className={`${inputClass} font-mono`}
                  value={value as number}
                  onChange={(e) =>
                    (setter as (n: number) => void)(Number(e.target.value) || 0)
                  }
                />
              </label>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between label-mono">
              <span>Progress toward goal</span>
              <span className="font-mono text-foreground">{progress.toFixed(0)}%</span>
            </div>
            <div className="h-2 bg-subtle rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-6 space-y-4">
            <SectionTitle>Sprint Goals under it</SectionTitle>
            <ul className="space-y-3">
              {SPRINT_GOALS.map((s) => (
                <li key={s.sprint} className="flex gap-3 text-sm">
                  <span
                    className={`font-mono ${s.done ? "text-success" : "text-muted"}`}
                    aria-hidden
                  >
                    {s.done ? "✓" : "○"}
                  </span>
                  <span>
                    <span className="font-mono text-[10px] text-muted block">{s.sprint}</span>
                    {s.goal}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel className="p-6 space-y-3">
            <SectionTitle>Revision triggers</SectionTitle>
            <ul className="text-sm text-muted space-y-2 leading-relaxed">
              <li>Evidence shows the outcome no longer matters to customers.</li>
              <li>The goal has been achieved — set the next one.</li>
              <li>Market or technology change invalidates the assumption.</li>
            </ul>
          </Panel>
        </div>
      </section>
    </AppShell>
  );
}
