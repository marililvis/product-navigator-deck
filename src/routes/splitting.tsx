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

export const Route = createFileRoute("/splitting")({
  head: () => ({
    meta: [
      { title: "PBI Splitting Canvas — PO Console" },
      {
        name: "description",
        content:
          "Split oversized backlog items into vertical slices by user roles, workflow steps, CRUD operations, business scenarios or business rules.",
      },
      { property: "og:title", content: "PBI Splitting Canvas — PO Console" },
      {
        property: "og:description",
        content: "Five splitting techniques plus the User Story Burger method.",
      },
    ],
  }),
  component: SplittingPage,
});

const METHODS: { key: string; label: string; hint: string; slices: string[] }[] = [
  {
    key: "roles",
    label: "User Roles",
    hint: "One slice per distinct role using the capability",
    slices: ["Admin can …", "Team member can …", "External viewer can …"],
  },
  {
    key: "workflow",
    label: "Workflow Steps",
    hint: "Slice along the steps of the journey (User Story Burger)",
    slices: ["Start the flow", "Complete the core step", "Confirm and receive proof"],
  },
  {
    key: "crud",
    label: "Operations (CRUD)",
    hint: "Create, read, update, delete as separate slices",
    slices: ["Create", "Read / list", "Update", "Delete"],
  },
  {
    key: "scenarios",
    label: "Business Scenarios",
    hint: "Happy path first, alternates later",
    slices: ["Happy path", "Alternate path", "Error / exception path"],
  },
  {
    key: "rules",
    label: "Business Rules",
    hint: "One slice per rule or policy variation",
    slices: ["Simplest rule set", "Add discount rules", "Add regional rules"],
  },
];

function SplittingPage() {
  const [item, setItem] = useState("As a customer I can pay for my order");
  const [method, setMethod] = useState(METHODS[1]!);
  const [slices, setSlices] = useState<string[]>(METHODS[1]!.slices);

  const pick = (m: (typeof METHODS)[number]) => {
    setMethod(m);
    setSlices(m.slices);
  };

  return (
    <AppShell
      ref="PO-202"
      title="Splitting Canvas"
      meta="Vertical slices only"
      actions={
        <>
          <PrimaryButton onClick={() => setSlices([...slices, "New slice"])}>
            Add slice
          </PrimaryButton>
          <GhostButton onClick={() => setSlices(method.slices)}>Reset slices</GhostButton>
        </>
      }
    >
      <Panel className="p-6 space-y-2 enter">
        <span className="label-mono">Oversized backlog item</span>
        <input className={inputClass} value={item} onChange={(e) => setItem(e.target.value)} />
      </Panel>

      <section className="space-y-4 enter">
        <SectionTitle>Splitting technique</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {METHODS.map((m) => (
            <button
              key={m.key}
              onClick={() => pick(m)}
              className={`text-left p-4 rounded-[12px] border transition-colors ${
                m.key === method.key
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-foreground/5"
              }`}
            >
              <span className="block text-sm font-semibold">{m.label}</span>
              <span className="block text-xs text-muted mt-1 leading-snug">{m.hint}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 enter">
        <div className="lg:col-span-2 space-y-4">
          <SectionTitle>Resulting vertical slices</SectionTitle>
          <Panel className="p-6 space-y-4">
            <div className="flex flex-wrap gap-3 justify-between">
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded">
                Vertical slice active
              </span>
              <span className="font-mono text-xs text-muted">
                Splitting method: {method.label}
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {slices.map((s, i) => (
                <div
                  key={i}
                  className="border-2 border-dashed border-border rounded-lg p-3 space-y-2"
                >
                  <span className="label-mono">Slice {String(i + 1).padStart(2, "0")}</span>
                  <textarea
                    className="w-full text-sm bg-transparent outline-none resize-none min-h-16"
                    value={s}
                    onChange={(e) =>
                      setSlices(slices.map((x, j) => (j === i ? e.target.value : x)))
                    }
                  />
                  <button
                    onClick={() => setSlices(slices.filter((_, j) => j !== i))}
                    className="font-mono text-[10px] text-muted hover:text-destructive"
                  >
                    remove
                  </button>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-4">
          <SectionTitle>Slice checklist</SectionTitle>
          <Panel className="p-6">
            <ul className="space-y-3 text-sm text-muted leading-relaxed">
              <li>Each slice cuts through every layer — no “backend only” items.</li>
              <li>Each slice is independently valuable and demonstrable.</li>
              <li>Near-term slices are detailed; far-term items stay coarse.</li>
              <li>Splitting happens in refinement, with the Developers.</li>
            </ul>
          </Panel>
        </div>
      </section>
    </AppShell>
  );
}
