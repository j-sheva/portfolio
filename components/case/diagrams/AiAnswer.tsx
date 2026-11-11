import type { AiAnswerText } from "@/lib/cases";
import { SketchArrow } from "./RoadmapBoard";
import styles from "./diagrams.module.css";

/** An AI assistant citing a page that has a summary, FAQ and structured data. */
export default function AiAnswer({ text }: { text: AiAnswerText }) {
  return (
    <div className={styles.aiRow}>
      <div className={styles.chat}>
        <div className={styles.chatHead}>
          <span aria-hidden="true" className={styles.avatar} />
          <span className={styles.label}>{text.assistant}</span>
        </div>
        <span className={styles.question}>{text.question}</span>
        <span className={styles.answerLines}>
          <span style={{ width: "92%" }} />
          <span style={{ width: "80%" }} />
          <span style={{ width: "64%" }} />
        </span>
        <span className={styles.sourceChip}>{text.source}</span>
      </div>
      <SketchArrow flip />
      <div className={styles.page}>
        <div className={styles.pageBar}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.pageBody}>
          {text.rows.map((row) => (
            <div key={row.label} className={styles.pageRow}>
              <span className={styles.pageRowLabel}>{row.label}</span>
              <span className={row.added ? styles.addedTag : styles.plainTag}>{row.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
