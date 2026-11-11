"use client";

import { getHome } from "@/lib/content";
import Draggable from "./Draggable";
import styles from "./ResultsStrip.module.css";

export default function ResultsStrip() {
  const { stats, statsLabel } = getHome();
  return (
    <section aria-label={statsLabel} className={styles.strip}>
      {stats.map((stat, i) => (
        <Draggable key={stat.tag} id={`s${i + 1}`} label={stat.tag} base={1} handles className={styles.stat}>
          <span className={styles.value}>{stat.value}</span>
          <span className={styles.label}>{stat.label}</span>
        </Draggable>
      ))}
    </section>
  );
}
