"use client";

import { useHome } from "./HomeState";
import styles from "./Draggable.module.css";

type Props = {
  id: string;
  label: string;
  /** Resting z-index. */
  base: number;
  /** Keep this item under its neighbours even after it was dragged (the sticky note). */
  stayBelow?: boolean;
  handles?: boolean;
  className?: string;
  ariaHidden?: boolean;
  children: React.ReactNode;
};

/** Wraps an element so it can be moved on the board, with an accent frame on hover. */
export default function Draggable({ id, label, base, stayBelow, handles, className, ariaHidden, children }: Props) {
  const { positions, dragging, top, startDrag } = useHome();
  const p = positions[id] ?? { x: 0, y: 0 };
  const isDragging = dragging === id;
  let z = isDragging ? 60 : top === id ? 40 : base;
  if (stayBelow && !isDragging) z = base;

  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className={`${styles.draggable} ${isDragging ? styles.isDragging : ""} ${className ?? ""}`}
      style={{ transform: `translate(${Math.round(p.x)}px, ${Math.round(p.y)}px)`, zIndex: z }}
      onPointerDown={(event) => startDrag(id, event)}
    >
      <span aria-hidden="true" className={styles.frame}>
        {handles ? (
          <>
            <span className={`${styles.handle} ${styles.topLeft}`} />
            <span className={`${styles.handle} ${styles.bottomRight}`} />
          </>
        ) : null}
        <span className={styles.label}>{label}</span>
      </span>
      {children}
    </div>
  );
}
