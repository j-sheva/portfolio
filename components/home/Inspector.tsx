import { getHome, type Audience } from "@/lib/content";
import styles from "./Inspector.module.css";

export type Accent = "coral" | "lime" | "sky" | "lilac";
export type Mode = "light" | "dark";

export const ACCENT_HEX: Record<Accent, string> = {
  coral: "#FF8A65",
  lime: "#B8F25B",
  sky: "#7CC4FF",
  lilac: "#C3A6FF",
};

export type InspectorState = {
  audience: Audience;
  accent: Accent;
  mode: Mode;
  grid: boolean;
};

export default function Inspector({ audience, accent, mode, grid }: InspectorState) {
  const { inspector } = getHome();
  const audiences = Object.keys(inspector.audiences) as Audience[];
  const accents = Object.keys(inspector.accents) as Accent[];
  const modes = Object.keys(inspector.modes) as Mode[];

  return (
    <aside aria-label={inspector.groupLabels.panel} className={styles.panel}>
      <div className={styles.head}>
        <p className={styles.title}>{inspector.title}</p>
        <p className={styles.subtitle}>{inspector.subtitle}</p>
      </div>

      <div className={styles.control}>
        <span className={styles.label}>{inspector.labels.audience}</span>
        <div role="group" aria-label={inspector.groupLabels.audience} className={styles.segmented3}>
          {audiences.map((id) => (
            <button key={id} type="button" aria-pressed={audience === id} className={styles.segment}>
              {inspector.audiences[id]}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.control}>
        <span className={styles.label}>{inspector.labels.accent}</span>
        <div role="group" aria-label={inspector.groupLabels.accent} className={styles.swatches}>
          {accents.map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={accent === id}
              aria-label={`${inspector.groupLabels.accent}: ${inspector.accents[id]}`}
              className={styles.swatch}
              style={{ background: ACCENT_HEX[id] }}
            />
          ))}
        </div>
      </div>

      <div className={styles.control}>
        <span className={styles.label}>{inspector.labels.mode}</span>
        <div role="group" aria-label={inspector.groupLabels.mode} className={styles.segmented2}>
          {modes.map((id) => (
            <button key={id} type="button" aria-pressed={mode === id} className={styles.segment}>
              {inspector.modes[id]}
            </button>
          ))}
        </div>
      </div>

      <button type="button" aria-pressed={grid} className={styles.toggle}>
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
