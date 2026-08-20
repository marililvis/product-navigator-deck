import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, GhostButton, Panel, PrimaryButton } from "@/components/AppShell";

export const Route = createFileRoute("/story-mapping")({
  head: () => ({
    meta: [
      { title: "User Story Map — PO Console" },
      {
        name: "description",
        content:
          "Map the user journey across the backbone and slice releases horizontally using Jeff Patton's story mapping technique.",
      },
      { property: "og:title", content: "User Story Map — PO Console" },
      {
        property: "og:description",
        content: "See the whole story: activities, steps and release slices.",
      },
    ],
  }),
  component: StoryMappingPage,
});

const BACKBONE = ["Discover", "Sign up", "Set up product", "Work daily", "Report to stakeholders"];

const ROWS = [
  {
    name: "Release 1 — walking skeleton",
    cells: [
      ["Landing page"],
      ["Email sign-up"],
      ["Create one product"],
      ["Add backlog items"],
      ["Export a value snapshot"],
    ],
  },
  {
    name: "Release 2 — make it usable",
    cells: [
      ["Comparison page"],
      ["Social sign-in"],
      ["Import from CSV"],
      ["Order with weights"],
      ["Scheduled reports"],
    ],
  },
  {
    name: "Later",
    cells: [["Case studies"], ["SSO"], ["Templates"], ["Refinement assistant"], ["Portfolio roll-up"]],
  },
];

function StoryMappingPage() {
  const [activeRow, setActiveRow] = useState(0);

  return (
    <AppShell
      ref="PO-203"
      title="User Story Map"
      meta="Jeff Patton method"
      actions={
        <>
          <PrimaryButton>Slice release</PrimaryButton>
          <GhostButton onClick={() => setActiveRow(0)}>Focus first release</GhostButton>
        </>
      }
    >
      <Panel className="p-6 overflow-x-auto enter">
        <div className="min-w-[860px] space-y-4">
          <div className="grid grid-cols-5 gap-3">
            {BACKBONE.map((step, i) => (
              <div key={step} className="space-y-1">
                <span className="label-mono">Step {String(i + 1).padStart(2, "0")}</span>
                <div className="bg-foreground text-background rounded p-3 text-sm font-semibold">
                  {step}
                </div>
              </div>
            ))}
          </div>

          {ROWS.map((row, ri) => (
            <div key={row.name} className="space-y-2">
              <button
                onClick={() => setActiveRow(ri)}
                className={`label-mono ${ri === activeRow ? "text-primary" : ""}`}
              >
                {row.name}
              </button>
              <div
                className={`grid grid-cols-5 gap-3 rounded-lg p-2 transition-colors ${
                  ri === activeRow ? "bg-primary/5 ring-1 ring-primary/20" : ""
                }`}
              >
                {row.cells.map((cell, ci) => (
                  <div key={ci} className="space-y-2">
                    {cell.map((story) => (
                      <div
                        key={story}
                        className="border border-border rounded p-3 text-xs bg-card"
                      >
                        {story}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="p-6 enter">
        <p className="text-sm text-muted leading-relaxed">
          The backbone across the top is the user's journey. Each horizontal band is a slice of
          the backlog that still delivers a complete story end to end — the top band is the
          thinnest version that a customer could actually use.
        </p>
      </Panel>
    </AppShell>
  );
}
