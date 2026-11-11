import SiteShell from "@/components/SiteShell";
import Hero from "@/components/home/Hero";
import ResultsStrip from "@/components/home/ResultsStrip";
import WorkGrid from "@/components/home/WorkGrid";
import About from "@/components/home/About";
import Changelog from "@/components/home/Changelog";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <SiteShell interactive>
      <Hero />
      <ResultsStrip />
      <WorkGrid />
      <About />
      <Changelog />
      <Contact />
    </SiteShell>
  );
}
