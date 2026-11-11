import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import CaseHero from "@/components/case/CaseHero";
import EvidencePanel from "@/components/case/EvidencePanel";
import CaseSections from "@/components/case/CaseSections";
import LearningsBand from "@/components/case/LearningsBand";
import NextCase from "@/components/case/NextCase";
import { CASE_ORDER, getCase, getCaseUi, getNextCase } from "@/lib/cases";
import styles from "@/components/case/case.module.css";

export function generateStaticParams() {
  return CASE_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const data = getCase(slug);
  if (!data) return {};
  return { title: data.seo.title, description: data.seo.description };
}

async function CaseContent({ params }: { params: PageProps<"/work/[slug]">["params"] }) {
  const { slug } = await params;
  const data = getCase(slug);
  if (!data) notFound();
  const next = getNextCase(data.slug);
  const ui = getCaseUi();

  return (
    <div className={styles.page}>
      <CaseHero data={data} />
      <EvidencePanel evidence={data.evidence} />
      <CaseSections sections={data.sections} />
      <LearningsBand items={data.learnings} />
      <NextCase slug={next.slug} label={ui.nextCase} title={next.nextLabel} />
    </div>
  );
}

// The params-dependent part sits in Suspense so the shared App Shell can prerender;
// every slug listed in generateStaticParams is still fully prerendered at build time.
export default function CasePage({ params }: PageProps<"/work/[slug]">) {
  return (
    <SiteShell>
      <Suspense>
        <CaseContent params={params} />
      </Suspense>
    </SiteShell>
  );
}
