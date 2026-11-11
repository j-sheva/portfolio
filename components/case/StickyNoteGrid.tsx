import type { Note } from "@/lib/cases";
import styles from "./case.module.css";

const ROTATION = [-2, 1.5, -1, 2];

type Props = { notes: Note[]; minWidth?: number; signed?: boolean; signature?: string };

/** Problem or process notes styled as tilted sticky notes. */
export default function StickyNoteGrid({ notes, minWidth = 240, signed, signature }: Props) {
  const variant = notes.some((n) => n.eyebrow) ? styles.noteStep : signed ? styles.noteSigned : styles.notePlain;
  return (
    <div className={styles.notes} style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(${minWidth}px, 100%), 1fr))` }}>
      {notes.map((note, i) => (
        <div
          key={note.title}
          className={`${styles.note} ${variant}`}
          style={{ background: note.color, transform: `rotate(${ROTATION[i % ROTATION.length]}deg)` }}
        >
          {note.eyebrow ? <span className={styles.noteEyebrow}>{note.eyebrow}</span> : null}
          <span className={styles.noteTitle}>{note.title}</span>
          {note.text ? <span className={styles.noteText}>{note.text}</span> : null}
          {signed && signature ? (
            <span className={styles.noteSign}>
              <span aria-hidden="true" className={styles.noteAvatar}>
                {signature.charAt(0)}
              </span>
              {signature}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
