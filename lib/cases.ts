import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import ui from "@/content/cases/ui.json";

// Order of the "Next case" loop; the last case links back to the first.
export const CASE_ORDER = [
  "roadmap-to-design-system",
  "evadav",
  "collectors-hub",
  "ai-search-website",
  "qualoo",
  "aetlas",
] as const;

export type CaseSlugName = (typeof CASE_ORDER)[number];

export type EvidenceType = "Measured" | "Counted" | "Shipped" | "Built" | "Adopted";

/** A figure that is either a real image or a drawn diagram. An image always wins. */
export type FigureData = {
  image?: string;
  alt?: string;
  caption?: string;
  /** Caption to use once a real image replaces a drawn diagram. */
  imageCaption?: string;
  width?: number;
  height?: number;
};

/** Optional screenshot slots: a group is hidden until at least one image path is filled in. */
export type SlotGroup = { minWidth?: number; figures: FigureData[] };

export type Note = { title: string; eyebrow?: string; text?: string; color: string };
export type Card = { label?: string; title: string; text: string; metric?: string; metricLabel?: string };

export type Section =
  | { type: "notes"; eyebrow: string; title: string; intro?: string; minWidth?: number; signed?: boolean; notes: Note[]; goal?: { label: string; text: string }; slots?: SlotGroup[] }
  | { type: "decisions"; eyebrow: string; title: string; rows: (Card & FigureData)[] }
  | { type: "figure"; eyebrow: string; title: string; intro?: string; figure: FigureData }
  | { type: "decisionCards"; eyebrow: string; title: string; figure: FigureData; cards: Card[] }
  | { type: "appCards"; eyebrow: string; title: string; cards: Card[]; system: { eyebrow: string; title: string; text: string; chips: string[] } }
  | { type: "system"; eyebrow: string; title: string; intro: string; diagram: TokenLayers; figure: FigureData; slots?: SlotGroup[]; callout: { badge: string; title: string; text: string } }
  | { type: "dashboard"; eyebrow: string; title: string; text: string; list: string[]; diagram: { beta: string }; figure: FigureData; slots?: SlotGroup[] }
  | { type: "audit"; eyebrow: string; title: string; intro: string; columns: string[]; rows: { element: string; found: string; recommendation: string }[]; slots?: SlotGroup[] }
  | { type: "landing"; eyebrow: string; title: string; feature: { title: string; text: string }; diagram: CalculatorText; figure: FigureData; slots?: SlotGroup[]; card: { title: string; text: string }; quote: { text: string; by: string }; cardSlots?: SlotGroup[] }
  | { type: "flow"; eyebrow: string; title: string; intro: string; steps: Card[]; slots?: SlotGroup[] }
  | { type: "tools"; eyebrow: string; title: string; cards: Card[] };

export type TokenLayers = {
  primitives: { label: string; text: string };
  semantic: { label: string; names: string[]; text: string };
  type: { label: string; sample: string; text: string };
  components: { label: string; chips: string[]; text: string };
  screens: { label: string; value: string; text: string };
};

export type CalculatorText = { amount: string; next: string; cta: string; faqs: string[] };

export type RoadmapBoardText = {
  teams: string[];
  matrix: string;
  doFirst: string;
  roadmap: string;
  weeks: string[];
  priorities: string[];
};

export type AiAnswerText = {
  assistant: string;
  question: string;
  source: string;
  rows: { label: string; tag: string; added?: boolean }[];
};

export type PhonesText = {
  leaderboard: { title: string; cta: string };
  onboarding: { title: string; options: string[]; cta: string };
  paywall: { title: string; badge: string; cta: string };
};

export type CaseHero =
  | ({ kind: "image"; note?: { name: string; text: string; left: string; top: string } } & FigureData)
  | { kind: "roadmap-board"; text: RoadmapBoardText; figure: FigureData }
  | { kind: "ai-answer"; text: AiAnswerText; figure: FigureData }
  | { kind: "phones"; text: PhonesText; note: string };

export type CaseData = {
  slug: CaseSlugName;
  seo: { title: string; description: string };
  nextLabel: string;
  breadcrumb: string;
  pill: string;
  title: string;
  summary: string;
  metaWidth?: number;
  meta: { label: string; value: string; href?: string }[];
  hero: CaseHero;
  evidence: {
    intro?: string;
    footnote?: string;
    minTile?: number;
    tiles: { type: EvidenceType; value: string; label: string; note?: string; dark?: boolean; size?: "xl" | "lg" | "md" | "sm" }[];
    planned?: { title: string; columns: string[]; rows: string[][] };
  };
  sections: Section[];
  learnings: string[];
  body: string;
};

const CASES_DIR = path.join(process.cwd(), "content", "cases");

export function getCase(slug: string): CaseData | null {
  if (!CASE_ORDER.includes(slug as CaseSlugName)) return null;
  const file = path.join(CASES_DIR, `${slug}.mdx`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { ...(data as Omit<CaseData, "slug" | "body">), slug: slug as CaseSlugName, body: content.trim() };
}

export function getNextCase(slug: CaseSlugName): CaseData {
  const i = CASE_ORDER.indexOf(slug);
  const next = CASE_ORDER[(i + 1) % CASE_ORDER.length];
  return getCase(next)!;
}

export function getCaseUi() {
  return ui;
}
