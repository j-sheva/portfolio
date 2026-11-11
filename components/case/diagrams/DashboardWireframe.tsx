import styles from "./diagrams.module.css";

const KPIS = [
  ["60%", "45%"],
  ["70%", "35%"],
  ["50%", "40%"],
];

/** Dashboard direction, re-drawn without real data. */
export default function DashboardWireframe({ beta }: { beta: string }) {
  return (
    <div aria-hidden="true" className={styles.wire}>
      <div className={styles.wireHead}>
        <span className={styles.wireTitle} />
        <span className={styles.wireButton} />
      </div>
      <div className={styles.kpis}>
        {KPIS.map(([label, value], i) => (
          <div key={i} className={styles.wireCard}>
            <span className={styles.lineMuted} style={{ width: label }} />
            <span className={styles.lineValue} style={{ width: value }} />
          </div>
        ))}
      </div>
      <div className={styles.wireCard}>
        <svg viewBox="0 0 400 90" className={styles.chart}>
          <path d="M0 70 C 50 60, 80 40, 130 46 S 220 20, 270 34 S 350 30, 400 18" fill="none" stroke="#FF8A65" strokeWidth="3" />
          <path d="M0 80 H400" stroke="#EFEBE1" strokeWidth="2" />
        </svg>
      </div>
      <div className={styles.insights}>
        <div className={styles.wireCard}>
          <span className={styles.lineMuted} style={{ width: "70%" }} />
          <span className={styles.lineFaint} style={{ width: "90%" }} />
        </div>
        <div className={`${styles.wireCard} ${styles.wireBeta}`}>
          <span className={styles.betaTag}>{beta}</span>
          <span className={styles.lineFaint} style={{ width: "80%" }} />
        </div>
      </div>
    </div>
  );
}
