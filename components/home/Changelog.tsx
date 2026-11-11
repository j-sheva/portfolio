import { getHome } from "@/lib/content";
import styles from "./Changelog.module.css";

export default function Changelog() {
  const { changelog } = getHome();
  return (
    <section id="changelog" aria-labelledby="changelog-title" className={styles.section}>
      <div className={styles.head}>
        <h2 id="changelog-title" className={styles.title}>
          {changelog.title}
        </h2>
        <span className={styles.subtitle}>{changelog.subtitle}</span>
      </div>
      <ol className={styles.list}>
        {changelog.items.map((item, i) => (
          <li key={item.v} className={styles.row}>
            <span className={i === 0 ? `${styles.tag} ${styles.tagLatest}` : styles.tag}>{item.v}</span>
            <span className={styles.when}>{item.when}</span>
            <span className={styles.entry}>
              <span className={styles.role}>{item.role}</span>
              <span className={styles.text}>{item.text}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
