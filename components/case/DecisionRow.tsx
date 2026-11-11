import type { Card, FigureData } from "@/lib/cases";
import Figure from "./Figure";
import styles from "./case.module.css";

/** Text next to an image; every second row puts the image first. */
export default function DecisionRow({ row, reverse }: { row: Card & FigureData; reverse: boolean }) {
  const text = (
    <div className={styles.decisionText}>
      <span className={styles.eyebrow}>{row.label}</span>
      <h3 className={styles.decisionTitle}>{row.title}</h3>
      <p className={styles.decisionBody}>{row.text}</p>
    </div>
  );
  const figure = <Figure figure={row} className={styles.decisionFigure} sizes="(max-width: 900px) 100vw, 760px" />;
  return reverse ? (
    <div className={`${styles.decision} ${styles.decisionReverse}`}>
      {figure}
      {text}
    </div>
  ) : (
    <div className={styles.decision}>
      {text}
      {figure}
    </div>
  );
}
