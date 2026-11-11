import home from "@/content/home.json";

export type HomeContent = typeof home;
export type Audience = keyof HomeContent["hero"];
export type CaseSlug = keyof HomeContent["work"]["cards"];

export const AUDIENCES = Object.keys(home.hero) as Audience[];

export function getHome(): HomeContent {
  return home;
}

/** Resolves the short link keys used in content ("cv", "email") to real hrefs. */
export function resolveHref(href: string): string {
  if (href === "cv") return home.meta.cv;
  if (href === "email") return `mailto:${home.meta.email}`;
  return href;
}
