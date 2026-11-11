import type { RoadmapBoardText } from "@/lib/cases";
import styles from "./diagrams.module.css";

const TEAM_NOTES = [
  { color: "#FFE27A", rot: [-2, 1.5, -1] },
  { color: "#FFC2D4", rot: [2, -1.5, 1, -2] },
  { color: "#CFE1FF", rot: [1, -2] },
];

const DOTS = [
  { left: "14%", top: "14%", hot: true },
  { left: "30%", top: "26%", hot: true },
  { left: "20%", top: "36%", hot: true },
  { left: "62%", top: "22%" },
  { left: "70%", top: "66%" },
  { left: "28%", top: "70%" },
];

// Bars per priority row: [start column, end column, colour] on a 9-column grid (label + 8 weeks).
const BARS: [number, number, string][][] = [
  [[2, 6, "#FF8A65"], [6, 10, "#FFC9B6"]],
  [[3, 8, "#CFE1FF"]],
  [[2, 4, "#C6EFD0"], [5, 8, "#C6EFD0"]],
  [[6, 10, "#FFE27A"]],
];

export function SketchArrow({ flip }: { flip?: boolean }) {
  return (
    <div aria-hidden="true" className={styles.arrow}>
      {flip ? (
        <svg width="56" height="28" viewBox="0 0 64 32">
          <path d="M60 18 C 46 6, 30 28, 12 14" fill="none" stroke="#5B564D" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M20 10 L11 14 L17 22" fill="none" stroke="#5B564D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="48" height="24" viewBox="0 0 64 32">
          <path d="M4 18 C 18 6, 34 28, 52 14" fill="none" stroke="#5B564D" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M44 10 L53 14 L47 22" fill="none" stroke="#5B564D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

/** Requests from three teams → impact × effort matrix → 8-week roadmap. */
export default function RoadmapBoard({ text }: { text: RoadmapBoardText }) {
  return (
    <div className={styles.board}>
      <div className={styles.teams}>
        {text.teams.map((team, i) => (
          <div key={team} className={styles.team}>
            <span className={styles.label}>{team}</span>
            {TEAM_NOTES[i]?.rot.map((rot, j) => (
              <span key={j} className={styles.teamNote} style={{ background: TEAM_NOTES[i].color, transform: `rotate(${rot}deg)` }} />
            ))}
          </div>
        ))}
      </div>
      <SketchArrow />
      <div className={styles.matrixCol}>
        <span className={styles.label}>{text.matrix}</span>
        <div className={styles.matrix}>
          {DOTS.map((dot, i) => (
            <span key={i} className={styles.dot} style={{ left: dot.left, top: dot.top, background: dot.hot ? "#FF8A65" : "#C9C1B1" }} />
          ))}
          <span className={styles.doFirst}>{text.doFirst}</span>
        </div>
      </div>
      <SketchArrow />
      <div className={styles.roadmapCol}>
        <span className={styles.label}>{text.roadmap}</span>
        <div className={styles.gantt}>
          <span />
          {text.weeks.map((week) => (
            <span key={week}>{week}</span>
          ))}
          {text.priorities.map((priority, row) => (
            <div key={priority} className={styles.ganttRow}>
              <span>{priority}</span>
              {BARS[row]?.map(([start, end, color], j) => (
                <span key={j} className={styles.bar} style={{ gridColumn: `${start} / ${end}`, background: color }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
