import type { CalculatorText } from "@/lib/cases";
import styles from "./diagrams.module.css";

/** Childcare costs calculator where the result leads to a next step. */
export default function CalculatorWireframe({ text }: { text: CalculatorText }) {
  return (
    <div aria-hidden="true" className={styles.wire}>
      <span className={styles.calcTitle} />
      <div className={styles.calcRow}>
        <div className={styles.calcResult}>
          <span className={styles.lineMuted} style={{ width: "50%" }} />
          <span className={styles.calcAmount}>{text.amount}</span>
          <span className={styles.lineFaint} style={{ width: "70%" }} />
        </div>
        <div className={styles.calcNext}>
          <span className={styles.calcNextLabel}>{text.next}</span>
          <span className={styles.calcCta}>{text.cta}</span>
        </div>
      </div>
      <div className={styles.faqs}>
        {text.faqs.map((faq) => (
          <span key={faq} className={styles.faq}>
            {faq}
            <span>+</span>
          </span>
        ))}
      </div>
    </div>
  );
}
