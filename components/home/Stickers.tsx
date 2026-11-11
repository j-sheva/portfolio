import { getHome } from "@/lib/content";
import { ACCENT_HEX, type Accent } from "./Inspector";
import styles from "./Stickers.module.css";

/** Decorative stickers around the Inspector. Dragging is added in phase 3. */
export default function Stickers({ accent }: { accent: Accent }) {
  const { stickyNote, stickers } = getHome();
  return (
    <>
      <div className={`${styles.sticker} ${styles.notePos}`}>
        <div className={styles.note}>
          <p className={styles.noteText}>{stickyNote}</p>
          <button type="button" className={styles.reset}>
            {stickers.reset}
          </button>
        </div>
      </div>

      <div aria-hidden="true" className={`${styles.sticker} ${styles.typePos}`}>
        <div className={styles.type}>
          <span className={styles.typeSample}>{stickers.typeSample}</span>
          <span className={styles.typeName}>{stickers.typeName}</span>
        </div>
      </div>

      <div aria-hidden="true" className={`${styles.sticker} ${styles.curvePos}`}>
        <svg width="160" height="110" viewBox="0 0 160 110" className={styles.curve}>
          <path d="M18 88 C 40 20, 110 100, 142 26" fill="none" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />
          <path d="M18 88 C 40 20, 110 100, 142 26" fill="none" stroke="#1C1A17" strokeWidth="4" strokeLinecap="round" />
          <path d="M18 88 L40 20 M142 26 L110 100" stroke="var(--accent-ink)" strokeWidth="1.5" />
          <circle cx="40" cy="20" r="5" fill="#FFFFFF" stroke="var(--accent-ink)" strokeWidth="2" />
          <circle cx="110" cy="100" r="5" fill="#FFFFFF" stroke="var(--accent-ink)" strokeWidth="2" />
          <rect x="12" y="82" width="12" height="12" fill="#FFFFFF" stroke="#1C1A17" strokeWidth="2" />
          <rect x="136" y="20" width="12" height="12" fill="#FFFFFF" stroke="#1C1A17" strokeWidth="2" />
        </svg>
      </div>

      <div aria-hidden="true" className={`${styles.sticker} ${styles.tokenPos}`}>
        <div className={styles.token}>
          <span className={styles.tokenSwatch} />
          <span className={styles.tokenText}>
            <span className={styles.tokenName}>{stickers.tokenName}</span>
            <span className={styles.tokenValue}>{ACCENT_HEX[accent]}</span>
          </span>
        </div>
      </div>

      <div aria-hidden="true" className={`${styles.sticker} ${styles.compPos}`}>
        <div className={styles.comp}>
          <span className={styles.compName}>{stickers.componentName}</span>
          <span className={styles.compButtons}>
            <span className={styles.compPrimary}>{stickers.componentPrimary}</span>
            <span className={styles.compSecondary}>{stickers.componentSecondary}</span>
          </span>
        </div>
      </div>
    </>
  );
}
