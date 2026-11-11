import styles from "./Highlight.module.css";

/** Word in a selection frame: accent border with two corner handles. */
export function FrameHighlight({ children }: { children: React.ReactNode }) {
  return (
    <span className={styles.frame}>
      {children}
      <span aria-hidden="true" className={`${styles.handle} ${styles.topLeft}`} />
      <span aria-hidden="true" className={`${styles.handle} ${styles.bottomRight}`} />
    </span>
  );
}

/** Word on an accent marker background. */
export function MarkerHighlight({ children }: { children: React.ReactNode }) {
  return <span className={styles.marker}>{children}</span>;
}
