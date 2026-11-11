import SiteShell from "@/components/SiteShell";
import Hero from "@/components/home/Hero";
import ResultsStrip from "@/components/home/ResultsStrip";
import WorkGrid from "@/components/home/WorkGrid";
import About from "@/components/home/About";
import Changelog from "@/components/home/Changelog";
import Contact from "@/components/home/Contact";

// Phase 2: static defaults. The Inspector drives these in phase 3.
const DEFAULTS = { audience: "recruiter", accent: "coral", mode: "light", grid: false } as const;

export default function Home() {
  return (
    <SiteShell mode={DEFAULTS.mode} accent={DEFAULTS.accent}>
      <Hero {...DEFAULTS} />
      <ResultsStrip />
      <WorkGrid audience={DEFAULTS.audience} />
      <About />
      <Changelog />
      <Contact />
    </SiteShell>
  );
}
