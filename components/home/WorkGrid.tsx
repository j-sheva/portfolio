"use client";

import Image from "next/image";
import Link from "next/link";
import { getHome, type CaseSlug } from "@/lib/content";
import { track } from "@/lib/analytics";
import { useHome } from "./HomeState";
import { NdaCover, RoadmapCover, SeoCover } from "./CoverArt";
import styles from "./WorkGrid.module.css";

const ROTATION = [-1.4, 1.1, -0.8, 1.6, -1.2, 0.9];
const TOP_OFFSET = [0, 22, 6, 18, 0, 26];
const CHIP_COLORS = ["#FFE3D8", "#DCEBFF", "#E3F4E8", "#FFF1C2"];

const ART_COVERS: Record<string, () => React.ReactElement> = {
  "art:roadmap": RoadmapCover,
  "art:seo": SeoCover,
  "art:nda": NdaCover,
};

function Cover({ cover, alt }: { cover: string; alt?: string }) {
  const Art = ART_COVERS[cover];
  if (Art) return <Art />;
  return (
    <Image
      src={cover}
      alt={alt ?? ""}
      width={1800}
      height={1249}
      sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 380px"
      className={styles.image}
    />
  );
}

export default function WorkGrid() {
  const { work, inspector } = getHome();
  const { audience } = useHome();
  const order = work.order[audience] as CaseSlug[];
  const count = String(order.length).padStart(2, "0");

  return (
    <section id="work" aria-labelledby="work-title" className={styles.section}>
      <div className={styles.head}>
        <h2 id="work-title" className={styles.title}>
          {work.title}
        </h2>
        <span className={styles.sorted}>
          {work.sortedFor} {inspector.audiences[audience]} · {count}
        </span>
      </div>
      <div className={styles.grid}>
        {order.map((slug, i) => {
          const card = work.cards[slug];
          const alt = "coverAlt" in card ? card.coverAlt : undefined;
          return (
            <Link
              key={slug}
              href={`/work/${slug}`}
              className={styles.card}
              onClick={() => track("case_open", { slug, source: "card" })}
              style={{ "--rot": `${ROTATION[i]}deg`, marginTop: TOP_OFFSET[i] } as React.CSSProperties}
            >
              <span aria-hidden="true" className={styles.sticker}>
                {work.hoverSticker}
              </span>
              <Cover cover={card.cover} alt={alt} />
              <div className={styles.body}>
                <div className={styles.meta}>
                  <span>{card.kind}</span>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.desc}>{card.desc}</p>
                <div className={styles.chips}>
                  {card.facts.map((fact, j) => (
                    <span key={fact} className={styles.chip} style={{ background: CHIP_COLORS[j % CHIP_COLORS.length] }}>
                      {fact}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
