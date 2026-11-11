import { Fragment } from "react";
import type { Card } from "@/lib/cases";
import styles from "./case.module.css";

/** Steps in a row with arrows between them; the first step is highlighted. */
export default function ProcessSteps({ steps }: { steps: Card[] }) {
  return (
    <div className={styles.steps}>
      {steps.map((step, i) => (
        <Fragment key={step.title}>
          {i > 0 ? (
            <span aria-hidden="true" className={styles.stepArrow}>
              →
            </span>
          ) : null}
          <div className={`${styles.step} ${i === 0 ? styles.stepFirst : ""}`}>
            <span className={styles.stepLabel}>{step.label}</span>
            <span className={styles.stepTitle}>{step.title}</span>
            <span className={styles.stepText}>{step.text}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
