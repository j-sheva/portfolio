import { getHome } from "@/lib/content";
import styles from "./ResultsStrip.module.css";

export default function ResultsStrip() {
  const { stats, statsLabel } = getHome();
  return (
    <section aria-label={statsLabel} className={styles.strip}>
      {stats.map((stat) => (
        <div key={stat.tag} className={styles.stat}>
          <span className={styles.value}>{stat.value}</span>
          <span className={styles.label}>{stat.label}</span>
        </div>
      ))}
    </section>
  );
}
