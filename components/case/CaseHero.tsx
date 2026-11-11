import Link from "next/link";
import type { CaseData } from "@/lib/cases";
import { getCaseUi } from "@/lib/cases";
import Figure, { CaseImage } from "./Figure";
import RoadmapBoard from "./diagrams/RoadmapBoard";
import AiAnswer from "./diagrams/AiAnswer";
import Phones from "./diagrams/Phones";
import styles from "./case.module.css";

function HeroVisual({ hero }: { hero: CaseData["hero"] }) {
  switch (hero.kind) {
    case "image":
      return (
        <figure className={styles.heroFigure}>
          <CaseImage figure={hero} sizes="(max-width: 1200px) 100vw, 1152px" className={styles.heroPhoto} />
          {hero.note ? (
            <div aria-hidden="true" className={styles.heroNote} style={{ left: hero.note.left, top: hero.note.top }}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M4 2l16 9-7 2-3 7z" fill="#C2410C" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              <span className={styles.heroNoteBubble}>
                <strong>{hero.note.name}</strong> · {hero.note.text}
              </span>
            </div>
          ) : null}
        </figure>
      );
    case "roadmap-board":
      return (
        <Figure
          figure={hero.figure}
          caption="mono"
          className={hero.figure.image ? styles.heroImage : styles.heroDiagram}
          diagram={<RoadmapBoard text={hero.text} />}
        />
      );
    case "ai-answer":
      return (
        <Figure
          figure={hero.figure}
          caption="mono"
          className={hero.figure.image ? styles.heroImage : styles.heroDiagram}
          diagram={<AiAnswer text={hero.text} />}
        />
      );
    case "phones":
      return (
        <>
          <Phones text={hero.text} />
          <p className={styles.phonesNote}>{hero.note}</p>
        </>
      );
  }
}

export default function CaseHero({ data }: { data: CaseData }) {
  const ui = getCaseUi();
  return (
    <section aria-labelledby="case-title" className={styles.hero}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <Link href="/#work">{ui.breadcrumbRoot}</Link>
        <span aria-hidden="true">/</span>
        <span>{data.breadcrumb}</span>
      </nav>
      <div className={styles.heroTop}>
        <div className={styles.heroCopy}>
          <span className={styles.pill}>{data.pill}</span>
          <h1 id="case-title" className={styles.title}>
            {data.title}
          </h1>
          <p className={styles.summary}>{data.summary}</p>
        </div>
        <dl className={styles.meta} style={{ gridTemplateColumns: `${data.metaWidth ?? 84}px minmax(0, 1fr)` }}>
          {data.meta.map((item) => (
            <div key={item.label} className={styles.metaRow}>
              <dt>{item.label}</dt>
              <dd>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener">
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <HeroVisual hero={data.hero} />
    </section>
  );
}
