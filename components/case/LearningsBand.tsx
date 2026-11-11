import { getCaseUi } from "@/lib/cases";
import styles from "./case.module.css";

export default function LearningsBand({ items }: { items: string[] }) {
  const ui = getCaseUi();
  return (
    <section aria-labelledby="case-learn" className={styles.learnings}>
      <h2 id="case-learn" className={styles.learningsTitle}>
        {ui.learningsTitle}
      </h2>
      {items.map((item) => (
        <p key={item} className={styles.learning}>
          {item}
        </p>
      ))}
    </section>
  );
}
