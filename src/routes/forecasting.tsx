import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  AppShell,
  GhostButton,
  Panel,
  PrimaryButton,
  SectionTitle,
} from "@/components/AppShell";

export const Route = createFileRoute("/forecasting")({
  head: () => ({
    meta: [
      { title: "Release Forecasting — PO Console" },
      {
        name: "description",
        content:
          "Throughput-based release forecasting with a burn-up chart and cone of uncertainty from optimistic and pessimistic trend lines.",
      },
      { property: "og:title", content: "Release Forecasting — PO Console" },
      {
        property: "og:description",
        content: "Forecast probabilistically from historical throughput, not from promises.",
      },
    ],
  }),
  component: ForecastingPage,
});

const HISTORY = [7, 11, 9, 14, 8, 12, 10, 13];

function ForecastingPage() {
  const [remaining, setRemaining] = useState(72);
  const [done, setDone] = useState(48);
  const [optimistic, setOptimistic] = useState(14);
  const [pessimistic, setPessimistic] = useState(8);

  const total = remaining + done;
  const best = Math.ceil(remaining / Math.max(1, optimistic));
  const worst = Math.ceil(remaining / Math.max(1, pessimistic));
  const avg = HISTORY.reduce((a, b) => a + b, 0) / HISTORY.length;
  const likely = Math.ceil(remaining / avg);

  const chart = useMemo(() => {
    const w = 640;
    const h = 260;
    const sprintsAhead = Math.max(worst, 1);
    const spanX = HISTORY.length + sprintsAhead;
    const x = (i: number) => (i / spanX) * w;
    const y = (v: number) => h - (v / Math.max(total, 1)) * h;

    let cum = 0;
    const history = HISTORY.map((t, i) => {
      cum += t;
      return `${x(i + 1)},${y(cum)}`;
    });
    const start = { x: x(HISTORY.length), y: y(cum) };
    const bestPt = { x: x(HISTORY.length + best), y: y(total) };
    const worstPt = { x: x(HISTORY.length + worst), y: y(total) };
    const likelyPt = { x: x(HISTORY.length + likely), y: y(total) };
    return { w, h, history: history.join(" "), start, bestPt, worstPt, likelyPt, y };
  }, [best, worst, likely, total]);

  const num = (label: string, value: number, set: (n: number) => void) => (
    <label className="space-y-1.5">
      <span className="label-mono block">{label}</span>
      <input
        type="number"
        className="w-full px-3 py-2 border border-border rounded font-mono text-sm"
        value={value}
        onChange={(e) => set(Number(e.target.value) || 0)}
      />
    </label>
  );

  return (
    <AppShell
      ref="PO-301"
      title="Release Forecast"
      meta="Throughput-based, probabilistic"
      actions={
        <>
          <PrimaryButton>Share forecast</PrimaryButton>
          <GhostButton
            onClick={() => {
              setRemaining(72);
              setDone(48);
              setOptimistic(14);
              setPessimistic(8);
            }}
          >
            Reset
          </GhostButton>
        </>
      }
    >
      <Panel className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 enter">
        {num("Items done", done, setDone)}
        {num("Items remaining", remaining, setRemaining)}
        {num("Optimistic throughput", optimistic, setOptimistic)}
        {num("Pessimistic throughput", pessimistic, setPessimistic)}
      </Panel>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 enter">
        <div className="lg:col-span-2 space-y-4">
          <SectionTitle>Burn-up with cone of uncertainty</SectionTitle>
          <Panel className="p-6">
            <svg
              viewBox={`0 0 ${chart.w} ${chart.h}`}
              className="w-full h-64"
              role="img"
              aria-label="Burn-up chart with optimistic and pessimistic forecast lines"
            >
              <line
                x1="0"
                y1={chart.y(total)}
                x2={chart.w}
                y2={chart.y(total)}
                stroke="currentColor"
                className="text-muted"
                strokeDasharray="4 4"
                opacity="0.5"
              />
              <polygon
                points={`${chart.start.x},${chart.start.y} ${chart.bestPt.x},${chart.bestPt.y} ${chart.worstPt.x},${chart.worstPt.y}`}
                className="fill-primary/10"
              />
              <polyline
                points={chart.history}
                fill="none"
                stroke="currentColor"
                className="text-foreground"
                strokeWidth="2"
              />
              {[
                [chart.bestPt, "4 4"],
                [chart.likelyPt, ""],
                [chart.worstPt, "4 4"],
              ].map(([pt, dash], i) => (
                <line
                  key={i}
                  x1={chart.start.x}
                  y1={chart.start.y}
                  x2={(pt as { x: number }).x}
                  y2={(pt as { y: number }).y}
                  stroke="currentColor"
                  className="text-primary"
                  strokeWidth="2"
                  strokeDasharray={dash as string}
                />
              ))}
              <circle
                cx={chart.likelyPt.x}
                cy={chart.likelyPt.y}
                r="5"
                className="fill-primary"
              />
            </svg>
            <p className="label-mono mt-4">
              Scope line = {total} items · history = last {HISTORY.length} sprints
            </p>
          </Panel>
        </div>

        <div className="space-y-4">
          <SectionTitle>Forecast</SectionTitle>
          <Panel className="divide-y divide-border">
            {[
              ["Optimistic", `${best} sprints`],
              ["Most likely (avg throughput)", `${likely} sprints`],
              ["Pessimistic", `${worst} sprints`],
              ["Historical average", `${avg.toFixed(1)} items / sprint`],
            ].map(([label, value]) => (
              <div key={label} className="p-4 space-y-1">
                <span className="label-mono block">{label}</span>
                <span className="text-lg font-mono">{value}</span>
              </div>
            ))}
          </Panel>
          <Panel className="p-6">
            <p className="text-sm text-muted leading-relaxed">
              Forecasts are ranges, not dates. Communicate the cone, refresh it every Sprint,
              and let the width of the cone tell stakeholders how much is still unknown.
            </p>
          </Panel>
        </div>
      </section>
    </AppShell>
  );
}
