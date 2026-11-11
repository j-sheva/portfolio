import SiteShell from "@/components/SiteShell";

// Phase 1: layout shell only. Sections arrive in phase 2.
export default function Home() {
  return (
    <SiteShell>
      <div style={{ minHeight: "60vh" }} />
    </SiteShell>
  );
}
