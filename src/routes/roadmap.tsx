import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AppShell,
  GhostButton,
  Panel,
  PrimaryButton,
  inputClass,
} from "@/components/AppShell";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Goal-Oriented Roadmap — PO Console" },
      {
        name: "description",
        content:
          "A high-level, goal-oriented product roadmap with decreasing detail over time — Now, Next, Later, Horizon.",
      },
      { property: "og:title", content: "Goal-Oriented Roadmap — PO Console" },
      {
        property: "og:description",
        content: "Share upcoming Product Goals without locking dates and features.",
      },
    ],
  }),
  component: RoadmapPage,
});

type Item = { id: number; title: string; outcome: string };
type Column = { key: string; label: string; hint: string; items: Item[] };

let nextId = 100;

const INITIAL: Column[] = [
  {
    key: "now",
    label: "Now",
    hint: "Detailed · current Product Goal",
    items: [
      {
        id: 1,
        title: "Trustworthy sign-in",
        outcome: "99.9% success rate on social login flows",
      },
      { id: 2, title: "Onboarding in one sitting", outcome: "Time-to-first-value < 10 min" },
    ],
  },
  {
    key: "next",
    label: "Next",
    hint: "Coarse · candidate goals",
    items: [
      { id: 3, title: "Evidence exports", outcome: "Stakeholders self-serve value reports" },
    ],
  },
  {
    key: "later",
    label: "Later",
    hint: "Directional only",
    items: [{ id: 4, title: "Assisted refinement", outcome: "Fewer oversized backlog items" }],
  },
  {
    key: "horizon",
    label: "Horizon",
    hint: "Bets to validate",
    items: [{ id: 5, title: "Portfolio view", outcome: "Multi-product value comparison" }],
  },
];

function RoadmapPage() {
  const [columns, setColumns] = useState<Column[]>(INITIAL);
  const [draft, setDraft] = useState({ title: "", outcome: "", column: "now" });

  const move = (colIdx: number, itemId: number, dir: -1 | 1) => {
    const target = colIdx + dir;
    if (target < 0 || target >= columns.length) return;
    setColumns((prev) =>
      prev.map((c, i) => {
        if (i === colIdx) return { ...c, items: c.items.filter((it) => it.id !== itemId) };
        if (i === target) {
          const item = prev[colIdx].items.find((it) => it.id === itemId)!;
          return { ...c, items: [...c.items, item] };
        }
        return c;
      }),
    );
  };

  const add = () => {
    if (!draft.title.trim()) return;
    const item = { id: nextId++, title: draft.title, outcome: draft.outcome };
    setColumns((prev) =>
      prev.map((c) => (c.key === draft.column ? { ...c, items: [...c.items, item] } : c)),
    );
    setDraft({ title: "", outcome: "", column: draft.column });
  };

  return (
    <AppShell
      ref="PO-102"
      title="Goal-Oriented Roadmap"
      meta="No dates, no feature promises"
      actions={
        <>
          <PrimaryButton onClick={add}>Add goal</PrimaryButton>
          <GhostButton onClick={() => setColumns(INITIAL)}>Reset</GhostButton>
        </>
      }
    >
      <Panel className="p-6 grid grid-cols-1 md:grid-cols-[1fr_1.4fr_auto] gap-3 items-end enter">
        <label className="space-y-1.5">
          <span className="label-mono block">Goal</span>
          <input
            className={inputClass}
            value={draft.title}
            placeholder="e.g. Reliable data import"
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          />
        </label>
        <label className="space-y-1.5">
          <span className="label-mono block">Measurable outcome</span>
          <input
            className={inputClass}
            value={draft.outcome}
            placeholder="e.g. 90% of imports finish without support"
            onChange={(e) => setDraft({ ...draft, outcome: e.target.value })}
          />
        </label>
        <label className="space-y-1.5">
          <span className="label-mono block">Horizon</span>
          <select
            className={inputClass}
            value={draft.column}
            onChange={(e) => setDraft({ ...draft, column: e.target.value })}
          >
            {INITIAL.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
      </Panel>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 enter">
        {columns.map((col, colIdx) => (
          <div key={col.key} className="space-y-3">
            <div className="space-y-1">
              <h2 className="font-display font-bold uppercase tracking-tight">{col.label}</h2>
              <p className="label-mono">{col.hint}</p>
            </div>
            <div className="space-y-3 min-h-40">
              {col.items.map((item) => (
                <Panel key={item.id} className="p-4 space-y-2">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-muted leading-snug">{item.outcome}</p>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => move(colIdx, item.id, -1)}
                      disabled={colIdx === 0}
                      className="font-mono text-[10px] px-2 py-1 border border-border rounded disabled:opacity-30 hover:bg-foreground/5"
                    >
                      ← sooner
                    </button>
                    <button
                      onClick={() => move(colIdx, item.id, 1)}
                      disabled={colIdx === columns.length - 1}
                      className="font-mono text-[10px] px-2 py-1 border border-border rounded disabled:opacity-30 hover:bg-foreground/5"
                    >
                      later →
                    </button>
                  </div>
                </Panel>
              ))}
              {col.items.length === 0 ? (
                <div className="border-2 border-dashed border-border rounded-lg h-24 grid place-items-center">
                  <span className="label-mono">Empty</span>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </section>
    </AppShell>
  );
}
