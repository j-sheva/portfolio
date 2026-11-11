import type { CaseData, EvidenceType } from "@/lib/cases";
import { getCaseUi } from "@/lib/cases";
import styles from "./case.module.css";

const TYPE_CLASS: Record<EvidenceType, string> = {
  Measured: styles.typeMeasured,
  Counted: styles.typeCounted,
  Shipped: styles.typeDone,
  Built: styles.typeDone,
  Adopted: styles.typeDone,
};

const SIZE_CLASS = { xl: styles.valueXl, lg: styles.valueLg, md: styles.valueMd, sm: styles.valueSm };

export default function EvidencePanel({ evidence }: { evidence: CaseData["evidence"] }) {
  const ui = getCaseUi();
  const types = [...new Set(evidence.tiles.map((tile) => tile.type))];

  return (
    <section aria-labelledby="case-evidence" className={styles.evidence}>
      <div className={styles.evidenceHead}>
        <h2 id="case-evidence" className={styles.evidenceTitle}>
          {ui.evidenceTitle}
        </h2>
        <div aria-label={ui.evidenceTypesLabel} className={styles.legend}>
          {types.map((type) => (
            <span key={type} className={`${styles.typeTag} ${TYPE_CLASS[type]}`}>
              {type}
            </span>
          ))}
          {evidence.planned ? <span className={`${styles.typeTag} ${styles.typePlanned}`}>{ui.planned}</span> : null}
        </div>
      </div>
      {evidence.intro ? <p className={styles.evidenceIntro}>{evidence.intro}</p> : null}
      <div
        className={styles.tiles}
        style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(${evidence.minTile ?? 240}px, 100%), 1fr))` }}
      >
        {evidence.tiles.map((tile) => {
          const size = tile.size ?? "lg";
          return (
            <div key={tile.value} className={`${styles.tile} ${tile.dark ? styles.tileDark : ""} ${size === "xl" ? styles.tileXl : ""}`}>
              <span className={`${styles.tileTag} ${TYPE_CLASS[tile.type]}`}>{tile.type}</span>
              <span className={`${styles.tileValue} ${SIZE_CLASS[size]}`}>{tile.value}</span>
              <span className={styles.tileLabel}>{tile.label}</span>
              {tile.note ? <span className={styles.tileNote}>{tile.note}</span> : null}
            </div>
          );
        })}
      </div>
      {evidence.planned ? (
        <div className={styles.planned}>
          <div className={styles.plannedHead}>
            <span className={`${styles.tileTag} ${styles.typePlanned}`}>{ui.planned}</span>
            <span className={styles.plannedTitle}>{evidence.planned.title}</span>
          </div>
          <div className={styles.tableScroll}>
            <table className={styles.plannedTable}>
              <thead>
                <tr>
                  {evidence.planned.columns.map((column) => (
                    <th key={column} scope="col">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {evidence.planned.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) => (
                      <td key={i}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
      {evidence.footnote ? <p className={styles.evidenceFootnote}>{evidence.footnote}</p> : null}
    </section>
  );
}
