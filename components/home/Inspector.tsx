"use client";

import { getHome, AUDIENCES } from "@/lib/content";
import { ACCENTS, ACCENT_HEX, MODES } from "@/lib/theme";
import { useHome } from "./HomeState";
import styles from "./Inspector.module.css";

export default function Inspector() {
  const { inspector } = getHome();
  const { audience, accent, mode, grid, setAudience, setAccent, setMode, toggleGrid } = useHome();

  return (
    <aside aria-label={inspector.groupLabels.panel} className={styles.panel}>
      <div className={styles.head}>
        <p className={styles.title}>{inspector.title}</p>
        <p className={styles.subtitle}>{inspector.subtitle}</p>
      </div>

      <div className={styles.control}>
        <span className={styles.label}>{inspector.labels.audience}</span>
        <div role="group" aria-label={inspector.groupLabels.audience} className={styles.segmented3}>
          {AUDIENCES.map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={audience === id}
              className={styles.segment}
              onClick={() => setAudience(id)}
            >
              {inspector.audiences[id]}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.control}>
        <span className={styles.label}>{inspector.labels.accent}</span>
        <div role="group" aria-label={inspector.groupLabels.accent} className={styles.swatches}>
          {ACCENTS.map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={accent === id}
              aria-label={`${inspector.groupLabels.accent}: ${inspector.accents[id]}`}
              className={styles.swatch}
              style={{ background: ACCENT_HEX[id] }}
              onClick={() => setAccent(id)}
            />
          ))}
        </div>
      </div>

      <div className={styles.control}>
        <span className={styles.label}>{inspector.labels.mode}</span>
        <div role="group" aria-label={inspector.groupLabels.mode} className={styles.segmented2}>
          {MODES.map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={mode === id}
              className={styles.segment}
              onClick={() => setMode(id)}
            >
              {inspector.modes[id]}
            </button>
          ))}
        </div>
      </div>

      <button type="button" aria-pressed={grid} className={styles.toggle} onClick={toggleGrid}>
        <span>{inspector.gridToggle}</span>
        <span aria-hidden="true" className={styles.track}>
          <span className={styles.knob} />
        </span>
      </button>

      <pre className={styles.code}>
        <code>
          <span className={styles.codeKey}>{inspector.code.audience}</span> {audience};{"\n"}
          <span className={styles.codeKey}>{inspector.code.accent}</span> {ACCENT_HEX[accent]};{"\n"}
          <span className={styles.codeKey}>{inspector.code.mode}</span> {mode};{"\n"}
          <span className={styles.codeKey}>{inspector.code.grid}</span>{" "}
          {grid ? inspector.code.on : inspector.code.off};
        </code>
      </pre>
    </aside>
  );
}
