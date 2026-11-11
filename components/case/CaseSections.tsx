import type { Section } from "@/lib/cases";
import { getCaseUi } from "@/lib/cases";
import Figure, { Slots } from "./Figure";
import StickyNoteGrid from "./StickyNoteGrid";
import DecisionRow from "./DecisionRow";
import ProcessSteps from "./ProcessSteps";
import TokenArchitecture from "./diagrams/TokenArchitecture";
import DashboardWireframe from "./diagrams/DashboardWireframe";
import CalculatorWireframe from "./diagrams/CalculatorWireframe";
import styles from "./case.module.css";

function SectionHead({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2 id={id} className={styles.sectionTitle}>
        {title}
      </h2>
    </>
  );
}

function CaseSection({ section, id }: { section: Section; id: string }) {
  const ui = getCaseUi();
  const head = <SectionHead id={id} eyebrow={section.eyebrow} title={section.title} />;

  switch (section.type) {
    case "notes":
      return (
        <section aria-labelledby={id} className={styles.section}>
          {head}
          {section.intro ? <p className={styles.intro}>{section.intro}</p> : null}
          <StickyNoteGrid notes={section.notes} minWidth={section.minWidth} signed={section.signed} signature={ui.noteSignature} />
          {section.goal ? (
            <p className={styles.goal}>
              <strong>{section.goal.label}</strong> {section.goal.text}
            </p>
          ) : null}
          <Slots groups={section.slots} />
        </section>
      );

    case "decisions":
      return (
        <section aria-labelledby={id} className={`${styles.section} ${styles.sectionWide}`}>
          {head}
          {section.rows.map((row, i) => (
            <DecisionRow key={row.title} row={row} reverse={i % 2 === 1} />
          ))}
        </section>
      );

    case "figure":
      return (
        <section aria-labelledby={id} className={`${styles.section} ${styles.sectionTight}`}>
          {head}
          {section.intro ? <p className={styles.intro}>{section.intro}</p> : null}
          <Figure figure={section.figure} />
        </section>
      );

    case "decisionCards":
      return (
        <section aria-labelledby={id} className={`${styles.section} ${styles.sectionWide}`}>
          {head}
          <Figure figure={section.figure} />
          <div className={styles.cardGrid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))" }}>
            {section.cards.map((card) => (
              <div key={card.title} className={styles.card}>
                <span className={styles.eyebrow}>{card.label}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.text}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case "appCards":
      return (
        <section aria-labelledby={id} className={`${styles.section} ${styles.sectionWide}`}>
          {head}
          <div className={styles.cardGrid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))" }}>
            {section.cards.map((card) => (
              <article key={card.title} className={`${styles.card} ${styles.appCard}`}>
                <span className={styles.cardKind}>{card.label}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.text}</p>
                <div className={styles.appMetric}>
                  <span className={styles.appMetricValue}>{card.metric}</span>
                  <span className={styles.appMetricLabel}>{card.metricLabel}</span>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.systemStrip}>
            <div className={styles.systemStripText}>
              <span className={styles.cardEyebrow}>{section.system.eyebrow}</span>
              <h3 className={styles.cardTitle}>{section.system.title}</h3>
              <p className={styles.cardText}>{section.system.text}</p>
            </div>
            <div aria-hidden="true" className={styles.systemChips}>
              {section.system.chips.map((chip, i) => (
                <span key={chip} className={`${styles.systemChip} ${styles[`systemChip${i}`]}`}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </section>
      );

    case "system":
      return (
        <section aria-labelledby={id} className={styles.section}>
          {head}
          <p className={styles.intro}>{section.intro}</p>
          <Figure
            figure={section.figure}
            caption="mono"
            className={section.figure.image ? undefined : styles.diagramCard}
            diagram={<TokenArchitecture layers={section.diagram} />}
          />
          <Slots groups={section.slots} />
          <div className={styles.callout}>
            <span aria-hidden="true" className={styles.calloutBadge}>
              {section.callout.badge}
            </span>
            <div className={styles.calloutText}>
              <span className={styles.calloutTitle}>{section.callout.title}</span>
              <span className={styles.calloutBody}>{section.callout.text}</span>
            </div>
          </div>
        </section>
      );

    case "dashboard":
      return (
        <section aria-labelledby={id} className={styles.section}>
          {head}
          <div className={styles.split}>
            <div className={styles.splitText}>
              <p className={styles.intro}>{section.text}</p>
              <ul className={styles.numbered}>
                {section.list.map((item, i) => (
                  <li key={item}>
                    <span aria-hidden="true" className={styles.number}>
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.splitFigure}>
              <Figure figure={section.figure} caption="mono" diagram={<DashboardWireframe beta={section.diagram.beta} />} />
              <Slots groups={section.slots} />
            </div>
          </div>
        </section>
      );

    case "audit":
      return (
        <section aria-labelledby={id} className={styles.section}>
          {head}
          <p className={styles.intro}>{section.intro}</p>
          <div className={styles.auditTable}>
            <table>
              <thead>
                <tr>
                  {section.columns.map((column) => (
                    <th key={column} scope="col">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row) => (
                  <tr key={row.element}>
                    <td className={styles.auditElement}>{row.element}</td>
                    <td>
                      <span className={styles.auditStatus}>{row.found}</span>
                    </td>
                    <td className={styles.auditRecommendation}>{row.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Slots groups={section.slots} />
        </section>
      );

    case "landing":
      return (
        <section aria-labelledby={id} className={styles.section}>
          {head}
          <div className={styles.split}>
            <div className={styles.featureText}>
              <h3 className={styles.featureTitle}>{section.feature.title}</h3>
              <p className={styles.decisionBody}>{section.feature.text}</p>
            </div>
            <div className={styles.featureFigure}>
              <Figure figure={section.figure} caption="mono" diagram={<CalculatorWireframe text={section.diagram} />} />
            </div>
          </div>
          <Slots groups={section.slots} />
          <div className={styles.quoteRow}>
            <div className={`${styles.card} ${styles.quoteCard}`}>
              <h3 className={styles.cardTitle}>{section.card.title}</h3>
              <p className={styles.cardText}>{section.card.text}</p>
            </div>
            <blockquote className={styles.quote}>
              <p>{section.quote.text}</p>
              <footer>{section.quote.by}</footer>
            </blockquote>
          </div>
          <Slots groups={section.cardSlots} />
        </section>
      );

    case "flow":
      return (
        <section aria-labelledby={id} className={styles.section}>
          {head}
          <p className={styles.intro}>{section.intro}</p>
          <ProcessSteps steps={section.steps} />
          <Slots groups={section.slots} />
        </section>
      );

    case "tools":
      return (
        <section aria-labelledby={id} className={styles.section}>
          {head}
          <div className={styles.cardGrid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))" }}>
            {section.cards.map((card) => (
              <div key={card.title} className={styles.toolCard}>
                <span className={styles.cardEyebrow}>{card.label}</span>
                <span className={styles.toolTitle}>{card.title}</span>
                <span className={styles.toolText}>{card.text}</span>
              </div>
            ))}
          </div>
        </section>
      );
  }
}

export default function CaseSections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section, i) => (
        <CaseSection key={section.title} section={section} id={`case-section-${i + 1}`} />
      ))}
    </>
  );
}
