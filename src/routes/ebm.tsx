import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AppShell,
  GhostButton,
  Panel,
  PrimaryButton,
  SectionTitle,
} from "@/components/AppShell";

export const Route = createFileRoute("/ebm")({
  head: () => ({
    meta: [
      { title: "Evidence-Based Management — PO Console" },
      {
        name: "description",
        content:
          "Track the four EBM Key Value Areas — Current Value, Unrealized Value, Time to Market and Ability to Innovate — with product metrics by category.",
      },
      { property: "og:title", content: "Evidence-Based Management — PO Console" },
      {
        property: "og:description",
        content: "Measure product value with evidence and avoid vanity-metric anti-patterns.",
      },
    ],
  }),
  component: EbmPage,
});

type Kva = { key: string; name: string; short: string; value: string; pct: number; note: string };

const KVAS: Kva[] = [
  {
    key: "cv",
    name: "Current Value",
    short: "CV",
    value: "84.2",
    pct: 84,
    note: "Value delivered to customers today",
  },
  {
    key: "uv",
    name: "Unrealized Value",
    short: "UV",
    value: "12.5k",
    pct: 62,
    note: "Potential value still on the table",
  },
  {
    key: "t2m",
    name: "Time to Market",
    short: "T2M",
    value: "14d",
    pct: 48,
    note: "Speed of delivering new capabilities",
  },
  {
    key: "a2i",
    name: "Ability to Innovate",
    short: "A2I",
    value: "62%",
    pct: 62,
    note: "Capacity to deliver new capability, not overhead",
  },
];

const CATEGORIES = [
  {
    name: "Customer-centricity",
    metrics: ["Customer satisfaction", "Usage index", "Feature adoption"],
  },
  { name: "Business impact", metrics: ["Revenue per employee", "Cost ratio", "Market share"] },
  { name: "Product quality", metrics: ["Escaped defects", "Technical debt", "Incident rate"] },
  {
    name: "Speed & capacity",
    metrics: ["Cycle time", "Release frequency", "On-product index"],
  },
];

const ANTI_PATTERNS = [
  "Vanity metrics that look good but drive no decision",
  "Turning a KPI into the goal itself",
  "Over-measuring: more dashboards than decisions",
  "Outdated metrics nobody revisits",
  "Confirmation bias: only reading data that agrees with us",
];

function EbmPage() {
  const [selected, setSelected] = useState<Kva>(KVAS[0]!);

  return (
    <AppShell
      ref="PO-302"
      title="Evidence-Based Management"
      meta="Four Key Value Areas"
      actions={
        <>
          <PrimaryButton>Capture measurement</PrimaryButton>
          <GhostButton onClick={() => setSelected(KVAS[0]!)}>Reset focus</GhostButton>
        </>
      }
    >
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 enter">
        {KVAS.map((k) => (
          <button
            key={k.key}
            onClick={() => setSelected(k)}
            className={`text-left p-5 rounded-[12px] space-y-2 transition-colors ${
              selected.key === k.key
                ? "bg-foreground text-background"
                : "panel hover:bg-foreground/5"
            }`}
          >
            <span
              className={`font-mono text-[10px] uppercase tracking-widest block ${
                selected.key === k.key ? "opacity-70" : "text-muted"
              }`}
            >
              {k.name} ({k.short})
            </span>
            <span className="text-3xl font-display font-bold block">{k.value}</span>
            <span className="block h-1 bg-current/15 rounded-full overflow-hidden">
              <span
                className={`block h-full ${selected.key === k.key ? "bg-background" : "bg-primary"}`}
                style={{ width: `${k.pct}%` }}
              />
            </span>
          </button>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 enter">
        <Panel className="lg:col-span-2 p-6 space-y-4">
          <SectionTitle>{selected.name} — what it tells us</SectionTitle>
          <p className="text-sm text-muted leading-relaxed">{selected.note}.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CATEGORIES.map((c) => (
              <div key={c.name} className="border border-border rounded-lg p-4 space-y-2">
                <span className="label-mono block">{c.name}</span>
                <ul className="text-sm space-y-1">
                  {c.metrics.map((m) => (
                    <li key={m} className="flex justify-between gap-3">
                      <span>{m}</span>
                      <span className="font-mono text-muted text-xs">tracked</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-6 space-y-3">
            <SectionTitle>Anti-patterns</SectionTitle>
            <ul className="space-y-2 text-sm text-muted leading-relaxed">
              {ANTI_PATTERNS.map((a) => (
                <li key={a} className="flex gap-2">
                  <span className="text-destructive font-mono" aria-hidden>
                    ✕
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel className="p-6 space-y-3">
            <SectionTitle>Qualitative evidence</SectionTitle>
            <ul className="text-sm text-muted space-y-2">
              <li>Observation of real usage</li>
              <li>Customer interviews</li>
              <li>Targeted surveys</li>
            </ul>
          </Panel>
        </div>
      </section>
    </AppShell>
  );
}
