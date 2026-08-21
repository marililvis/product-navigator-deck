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

export const Route = createFileRoute("/stakeholders")({
  head: () => ({
    meta: [
      { title: "Stakeholder Engagement — PO Console" },
      {
        name: "description",
        content:
          "Plan continuous stakeholder engagement and rehearse data-backed 'no' conversations tied to the Product Goal.",
      },
      { property: "og:title", content: "Stakeholder Engagement — PO Console" },
      {
        property: "og:description",
        content: "Engage beyond the Sprint Review and decline requests with evidence.",
      },
    ],
  }),
  component: StakeholdersPage,
});

const STAKEHOLDERS = [
  { name: "Support lead", interest: "High", influence: "Medium", cadence: "Weekly triage" },
  { name: "Sales director", interest: "High", influence: "High", cadence: "Sprint Review" },
  { name: "Compliance", interest: "Medium", influence: "High", cadence: "Monthly checkpoint" },
  { name: "Power users", interest: "High", influence: "Low", cadence: "Continuous interviews" },
];

function StakeholdersPage() {
  const [request, setRequest] = useState("Add a custom report builder for one enterprise account");
  const [goalLink, setGoalLink] = useState("No — it does not move first-sign-in reliability");
  const [evidence, setEvidence] = useState("Used by 1 account; current value impact under 0.5%");
  const [alternative, setAlternative] = useState("CSV export today, revisit after the next goal");

  return (
    <AppShell
      ref="PO-303"
      title="Stakeholder Engagement"
      meta="Not just at Sprint Review"
      actions={
        <>
          <PrimaryButton>Log conversation</PrimaryButton>
          <GhostButton
            onClick={() => {
              setRequest("");
              setGoalLink("");
              setEvidence("");
              setAlternative("");
            }}
          >
            Clear script
          </GhostButton>
        </>
      }
    >
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 enter">
        <div className="space-y-4">
          <SectionTitle>Engagement map</SectionTitle>
          <Panel className="overflow-hidden">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-subtle border-b border-border">
                  <th className="p-4 label-mono">Stakeholder</th>
                  <th className="p-4 label-mono">Interest</th>
                  <th className="p-4 label-mono">Influence</th>
                  <th className="p-4 label-mono">Cadence</th>
                </tr>
              </thead>
              <tbody>
                {STAKEHOLDERS.map((s) => (
                  <tr key={s.name} className="border-b border-border last:border-0">
                    <td className="p-4 font-semibold">{s.name}</td>
                    <td className="p-4 font-mono text-xs">{s.interest}</td>
                    <td className="p-4 font-mono text-xs">{s.influence}</td>
                    <td className="p-4 text-muted text-xs">{s.cadence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>

        <div className="space-y-4">
          <SectionTitle>Data-backed “no” script</SectionTitle>
          <Panel className="p-6 space-y-4">
            {[
              ["The request", request, setRequest],
              ["Link to the Product Goal", goalLink, setGoalLink],
              ["Evidence (usage, CV / UV)", evidence, setEvidence],
              ["What we offer instead", alternative, setAlternative],
            ].map(([label, value, setter]) => (
              <label key={String(label)} className="block space-y-1.5">
                <span className="label-mono block">{String(label)}</span>
                <input
                  className={inputClass}
                  value={value as string}
                  onChange={(e) => (setter as (v: string) => void)(e.target.value)}
                />
              </label>
            ))}
            <div className="border-t border-border pt-4">
              <span className="label-mono">Rehearsed answer</span>
              <p className="mt-2 text-sm leading-relaxed">
                “{request || "…"}” — {goalLink || "…"}. The evidence: {evidence || "…"}.
                What we can do now: {alternative || "…"}.
              </p>
            </div>
          </Panel>
        </div>
      </section>

      <Panel className="p-6 enter">
        <SectionTitle>Feedback loops</SectionTitle>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          The Sprint Review is the core loop, but engagement is continuous: customers,
          internal stakeholders, partners and influencers all feed the backlog. The Product
          Owner actively decides based on that feedback rather than relaying it.
        </p>
      </Panel>
    </AppShell>
  );
}
