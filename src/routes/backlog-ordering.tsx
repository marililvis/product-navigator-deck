import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  AppShell,
  GhostButton,
  Panel,
  PrimaryButton,
  SectionTitle,
} from "@/components/AppShell";

export const Route = createFileRoute("/backlog-ordering")({
  head: () => ({
    meta: [
      { title: "Strategic Ordering Canvas — PO Console" },
      {
        name: "description",
        content:
          "Order the Product Backlog holistically using value, risk reduction, learning, dependencies and size — not a simple priority sort.",
      },
      { property: "og:title", content: "Strategic Ordering Canvas — PO Console" },
      {
        property: "og:description",
        content: "Compute an ordering score across value, risk, learning and size.",
      },
    ],
  }),
  component: BacklogOrderingPage,
});

type Pbi = {
  id: number;
  title: string;
  note: string;
  value: number;
  risk: number;
  learning: number;
  size: number;
};

const INITIAL: Pbi[] = [
  {
    id: 1,
    title: "Passwordless sign-in",
    note: "Core dependency for the mobile rollout",
    value: 90,
    risk: 40,
    learning: 30,
    size: 5,
  },
  {
    id: 2,
    title: "Delivery pipeline telemetry",
    note: "Reduces Time to Market by exposing bottlenecks",
    value: 75,
    risk: 20,
    learning: 60,
    size: 3,
  },
  {
    id: 3,
    title: "Legacy database refactoring",
    note: "High technical risk, unlocks scalability",
    value: 60,
    risk: 80,
    learning: 20,
    size: 13,
  },
  {
    id: 4,
    title: "Stakeholder reporting export",
    note: "Compliance requirement for the quarterly audit",
    value: 30,
    risk: 10,
    learning: 10,
    size: 2,
  },
];

const WEIGHTS_DEFAULT = { value: 1, risk: 0.6, learning: 0.4 };

function BacklogOrderingPage() {
  const [items, setItems] = useState<Pbi[]>(INITIAL);
  const [weights, setWeights] = useState(WEIGHTS_DEFAULT);

  const ordered = useMemo(
    () =>
      items
        .map((i) => ({
          ...i,
          score:
            (i.value * weights.value + i.risk * weights.risk + i.learning * weights.learning) /
            Math.max(1, i.size),
        }))
        .sort((a, b) => b.score - a.score),
    [items, weights],
  );

  const update = (id: number, key: keyof Pbi, value: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [key]: value } : i)));

  const cell = (item: Pbi, key: "value" | "risk" | "learning" | "size") => (
    <td className="p-4">
      <input
        type="number"
        aria-label={`${key} for ${item.title}`}
        value={item[key]}
        onChange={(e) => update(item.id, key, Number(e.target.value) || 0)}
        className="w-full text-center py-1 border border-border rounded font-mono text-sm"
      />
    </td>
  );

  return (
    <AppShell
      ref="PO-201"
      title="Strategic Ordering Canvas"
      meta="Ordering ≠ prioritising"
      actions={
        <>
          <PrimaryButton>Confirm order</PrimaryButton>
          <GhostButton
            onClick={() => {
              setItems(INITIAL);
              setWeights(WEIGHTS_DEFAULT);
            }}
          >
            Reset
          </GhostButton>
        </>
      }
    >
      <Panel className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 enter">
        {(["value", "risk", "learning"] as const).map((k) => (
          <label key={k} className="space-y-2">
            <span className="label-mono block">
              Weight · {k} <span className="font-mono text-foreground">{weights[k].toFixed(1)}</span>
            </span>
            <input
              type="range"
              min={0}
              max={2}
              step={0.1}
              value={weights[k]}
              onChange={(e) => setWeights({ ...weights, [k]: Number(e.target.value) })}
              className="w-full accent-primary"
            />
          </label>
        ))}
      </Panel>

      <section className="enter">
        <Panel className="overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-subtle border-b border-border">
                <th className="p-4 label-mono w-12">Pos</th>
                <th className="p-4 label-mono">Product Backlog Item</th>
                <th className="p-4 label-mono w-24 text-center">Value</th>
                <th className="p-4 label-mono w-24 text-center">Risk</th>
                <th className="p-4 label-mono w-24 text-center">Learning</th>
                <th className="p-4 label-mono w-24 text-center">Size</th>
                <th className="p-4 label-mono w-28 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {ordered.map((item, idx) => (
                <tr
                  key={item.id}
                  className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors"
                >
                  <td className="p-4 font-mono text-muted">
                    {String(idx + 1).padStart(2, "0")}
                  </td>
                  <td className="p-4">
                    <span className="font-semibold block">{item.title}</span>
                    <span className="text-xs text-muted">{item.note}</span>
                  </td>
                  {cell(item, "value")}
                  {cell(item, "risk")}
                  {cell(item, "learning")}
                  {cell(item, "size")}
                  <td
                    className={`p-4 text-right font-display font-bold text-lg ${idx === 0 ? "text-primary" : ""}`}
                  >
                    {item.score.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </section>

      <section className="enter">
        <Panel className="p-6 space-y-3">
          <SectionTitle>Why holistic ordering</SectionTitle>
          <p className="text-sm text-muted leading-relaxed">
            Sorting by priority alone is only one technique and rarely the best. Re-positioning
            an item changes the return on investment of everything around it, so the whole
            backlog is considered together: value, risk reduction, learning, dependencies and
            size.
          </p>
        </Panel>
      </section>
    </AppShell>
  );
}
