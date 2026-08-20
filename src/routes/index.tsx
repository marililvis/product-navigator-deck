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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vision Statement Builder — PO Console" },
      {
        name: "description",
        content:
          "Build an aspirational Product Vision incrementally: audience, problem, value and differentiator, with a live statement preview.",
      },
      { property: "og:title", content: "Vision Statement Builder — PO Console" },
      {
        property: "og:description",
        content: "Craft and refine a Product Vision with stakeholder and team input.",
      },
    ],
  }),
  component: VisionPage,
});

const DEFAULTS = {
  audience: "early-stage product teams",
  need: "struggle to connect strategy to what the team builds next",
  product: "PO Console",
  category: "product ownership workspace",
  benefit: "every ordering decision is traceable to evidence of value",
  differentiator: "generic roadmap tools",
  differentiation: "it is built around Scrum accountabilities, not Gantt charts",
};

function VisionPage() {
  const [v, setV] = useState(DEFAULTS);
  const set = (k: keyof typeof DEFAULTS) => (e: { target: { value: string } }) =>
    setV((p) => ({ ...p, [k]: e.target.value }));

  const fields: { key: keyof typeof DEFAULTS; label: string }[] = [
    { key: "audience", label: "For (target audience)" },
    { key: "need", label: "Who (need / problem)" },
    { key: "product", label: "The (product name)" },
    { key: "category", label: "Is a (category)" },
    { key: "benefit", label: "That (key benefit)" },
    { key: "differentiator", label: "Unlike (alternative)" },
    { key: "differentiation", label: "Our product (differentiation)" },
  ];

  return (
    <AppShell
      ref="PO-101"
      title="Product Vision Canvas"
      meta="Revisited every quarter"
      actions={
        <>
          <PrimaryButton>Share with stakeholders</PrimaryButton>
          <GhostButton onClick={() => setV(DEFAULTS)}>Reset</GhostButton>
        </>
      }
    >
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-6 enter">
        <Panel className="lg:col-span-2 p-6 space-y-4">
          <SectionTitle>Vision inputs</SectionTitle>
          {fields.map((f) => (
            <label key={f.key} className="block space-y-1.5">
              <span className="label-mono block">{f.label}</span>
              <input className={inputClass} value={v[f.key]} onChange={set(f.key)} />
            </label>
          ))}
        </Panel>

        <div className="lg:col-span-3 space-y-6">
          <Panel className="p-8">
            <span className="label-mono">Live vision statement</span>
            <p className="mt-4 text-2xl font-display font-bold tracking-tight leading-snug">
              For {v.audience} who {v.need}, {v.product} is a {v.category} that {v.benefit}
              . Unlike {v.differentiator}, {v.differentiation}.
            </p>
          </Panel>

          <Panel className="p-6 space-y-4">
            <SectionTitle>Quality checks</SectionTitle>
            <ul className="space-y-3 text-sm">
              {[
                ["Aspirational, not a feature list", v.benefit.length > 20],
                ["Names a concrete audience", v.audience.length > 5],
                ["States the problem being solved", v.need.length > 10],
                ["Explains why we are different", v.differentiation.length > 15],
              ].map(([label, ok]) => (
                <li key={String(label)} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 font-mono ${ok ? "text-success" : "text-destructive"}`}
                  >
                    {ok ? "✓" : "✕"}
                  </span>
                  <span className={ok ? "" : "text-muted"}>{label}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="p-6">
            <SectionTitle>How the vision is used</SectionTitle>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              The vision is built incrementally with stakeholder and team input. It anchors
              the Product Strategy and roadmap, and every Product Goal must be a concrete,
              measurable step toward it.
            </p>
          </Panel>
        </div>
      </section>
    </AppShell>
  );
}
