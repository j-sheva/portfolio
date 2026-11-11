import { getHome } from "@/lib/content";
import styles from "./CoverArt.module.css";

const NOTE_COLORS = ["#FFE27A", "#FFC2D4", "#CFE1FF", "#FFC2D4", "#FFE27A", "#C6EFD0"];
const NOTE_ROT = [-3, 2, -1, 3, -2, 1];
const BARS = [
  { width: "70%", offset: "0", color: "#FF8A65" },
  { width: "50%", offset: "22%", color: "#CFE1FF" },
  { width: "38%", offset: "0", color: "#C6EFD0" },
  { width: "55%", offset: "40%", color: "#FFE27A" },
];

/** Drawn cover: sticky notes turning into a roadmap. */
export function RoadmapCover() {
  return (
    <div aria-hidden="true" className={`${styles.cover} ${styles.roadmap}`}>
      <div className={styles.notes}>
        {NOTE_COLORS.map((color, i) => (
          <span key={i} className={styles.note} style={{ background: color, transform: `rotate(${NOTE_ROT[i]}deg)` }} />
        ))}
      </div>
      <div className={styles.bars}>
        {BARS.map((bar, i) => (
          <span key={i} className={styles.bar} style={{ width: bar.width, marginLeft: bar.offset, background: bar.color }} />
        ))}
      </div>
    </div>
  );
}

/** Drawn cover: a page cited as a source, with a structured-content checklist. */
export function SeoCover() {
  const { seo } = getHome().work.covers;
  return (
    <div aria-hidden="true" className={`${styles.cover} ${styles.seo}`}>
      <div className={styles.page}>
        <span className={styles.line} style={{ width: "92%" }} />
        <span className={styles.line} style={{ width: "74%" }} />
        <span className={styles.source}>{seo.source}</span>
      </div>
      <div className={styles.checks}>
        {seo.checks.map((check) => (
          <span key={check} className={styles.check}>
            {check}
            <span className={styles.tick}>✓</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Drawn cover: results only, for work under NDA. */
export function NdaCover() {
  const { nda } = getHome().work.covers;
  return (
    <div className={`${styles.cover} ${styles.nda}`}>
      <span className={styles.badge}>{nda.badge}</span>
      <div className={styles.metrics}>
        {nda.metrics.map((metric) => (
          <span key={metric.label} className={styles.metric}>
            <span className={styles.metricValue}>{metric.value}</span>
            <span className={styles.metricLabel}>{metric.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
