"use client";

import { getHome } from "@/lib/content";
import Draggable from "./Draggable";
import { ACCENT_HEX } from "@/lib/theme";
import { useHome } from "./HomeState";
import styles from "./Stickers.module.css";

/** Decorative, draggable stickers around the Inspector. */
export default function Stickers() {
  const { stickyNote, stickers } = getHome();
  const { accent, resetBoard } = useHome();
  const frames = stickers.frames;

  return (
    <>
      <Draggable id="note" label={frames.note} base={1} stayBelow handles className={`${styles.sticker} ${styles.notePos}`}>
        <div className={styles.note}>
          <p className={styles.noteText}>{stickyNote}</p>
          <button type="button" className={styles.reset} onClick={resetBoard}>
            {stickers.reset}
          </button>
        </div>
      </Draggable>

      <Draggable id="type" label={frames.type} base={5} ariaHidden className={`${styles.sticker} ${styles.typePos}`}>
        <div className={styles.type}>
          <span className={styles.typeSample}>{stickers.typeSample}</span>
          <span className={styles.typeName}>{stickers.typeName}</span>
        </div>
      </Draggable>

      <Draggable id="curve" label={frames.curve} base={5} ariaHidden className={`${styles.sticker} ${styles.curvePos}`}>
        <svg width="160" height="110" viewBox="0 0 160 110" className={styles.curve}>
          <path d="M18 88 C 40 20, 110 100, 142 26" fill="none" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />
          <path d="M18 88 C 40 20, 110 100, 142 26" fill="none" stroke="#1C1A17" strokeWidth="4" strokeLinecap="round" />
          <path d="M18 88 L40 20 M142 26 L110 100" stroke="var(--accent-ink)" strokeWidth="1.5" />
          <circle cx="40" cy="20" r="5" fill="#FFFFFF" stroke="var(--accent-ink)" strokeWidth="2" />
          <circle cx="110" cy="100" r="5" fill="#FFFFFF" stroke="var(--accent-ink)" strokeWidth="2" />
          <rect x="12" y="82" width="12" height="12" fill="#FFFFFF" stroke="#1C1A17" strokeWidth="2" />
          <rect x="136" y="20" width="12" height="12" fill="#FFFFFF" stroke="#1C1A17" strokeWidth="2" />
        </svg>
      </Draggable>

      <Draggable id="token" label={frames.token} base={6} ariaHidden className={`${styles.sticker} ${styles.tokenPos}`}>
        <div className={styles.token}>
          <span className={styles.tokenSwatch} />
          <span className={styles.tokenText}>
            <span className={styles.tokenName}>{stickers.tokenName}</span>
            <span className={styles.tokenValue}>{ACCENT_HEX[accent]}</span>
          </span>
        </div>
      </Draggable>

      <Draggable id="comp" label={frames.comp} base={6} ariaHidden className={`${styles.sticker} ${styles.compPos}`}>
        <div className={styles.comp}>
          <span className={styles.compName}>{stickers.componentName}</span>
          <span className={styles.compButtons}>
            <span className={styles.compPrimary}>{stickers.componentPrimary}</span>
            <span className={styles.compSecondary}>{stickers.componentSecondary}</span>
          </span>
        </div>
      </Draggable>
    </>
  );
}
