import type { PhonesText } from "@/lib/cases";
import styles from "./diagrams.module.css";

/** Illustrations of the three feature types (the real screens are under NDA). */
export default function Phones({ text }: { text: PhonesText }) {
  return (
    <figure aria-hidden="true" className={styles.phones}>
      <div className={styles.phone} style={{ width: 210, transform: "rotate(-4deg)" }}>
        <span className={styles.phoneTitle}>{text.leaderboard.title}</span>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`${styles.rank} ${i === 0 ? styles.rankFirst : ""}`}>
            <span className={styles.rankAvatar} />
            <span className={styles.rankLine} />
          </span>
        ))}
        <span className={styles.phoneCta}>{text.leaderboard.cta}</span>
      </div>
      <div className={`${styles.phone} ${styles.phoneTall}`} style={{ width: 230 }}>
        <span className={styles.progress}>
          <span />
          <span />
          <span />
        </span>
        <span className={styles.phoneQuestion}>{text.onboarding.title}</span>
        {text.onboarding.options.map((option, i) => (
          <span key={option} className={`${styles.option} ${i === 0 ? styles.optionSelected : ""}`}>
            {option}
          </span>
        ))}
        <span className={styles.phoneCta}>{text.onboarding.cta}</span>
      </div>
      <div className={styles.phone} style={{ width: 210, transform: "rotate(4deg)" }}>
        <span className={styles.phoneTitle}>{text.paywall.title}</span>
        <span className={`${styles.plan} ${styles.planBest}`}>
          <span className={styles.planBadge}>{text.paywall.badge}</span>
          <span className={styles.planLine} style={{ width: "60%" }} />
        </span>
        <span className={styles.plan}>
          <span className={styles.planLineMuted} style={{ width: "50%" }} />
        </span>
        <span className={`${styles.phoneCta} ${styles.phoneCtaAccent}`}>{text.paywall.cta}</span>
      </div>
    </figure>
  );
}
