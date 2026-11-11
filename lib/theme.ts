export type Accent = "coral" | "lime" | "sky" | "lilac";
export type Mode = "light" | "dark";

export const ACCENTS: Accent[] = ["coral", "lime", "sky", "lilac"];
export const MODES: Mode[] = ["light", "dark"];

export const ACCENT_HEX: Record<Accent, string> = {
  coral: "#FF8A65",
  lime: "#B8F25B",
  sky: "#7CC4FF",
  lilac: "#C3A6FF",
};

export const STORAGE_KEY = "ys-inspector";

/**
 * Runs inside the home theme scope before hydration, so a returning visitor never
 * sees the default theme flash. Stored values first, then prefers-color-scheme.
 */
export const THEME_BOOT_SCRIPT = `(function(){try{var el=document.currentScript.parentElement;var s={};try{s=JSON.parse(localStorage.getItem(${JSON.stringify(
  STORAGE_KEY,
)})||"{}")}catch(e){}var m=s.mode==="dark"||s.mode==="light"?s.mode:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");el.setAttribute("data-mode",m);if(${JSON.stringify(
  ACCENTS,
)}.indexOf(s.accent)>-1)el.setAttribute("data-accent",s.accent)}catch(e){}})();`;
