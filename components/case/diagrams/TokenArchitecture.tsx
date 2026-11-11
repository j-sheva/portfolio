import type { TokenLayers } from "@/lib/cases";
import styles from "./diagrams.module.css";

const SWATCHES = ["#1C1A17", "#5B564D", "#FF8A65", "#CFE1FF", "#C6EFD0"];
const TYPE_SIZES = [28, 20, 14];

/** Five layers of the design system, from primitives to screens. */
export default function TokenArchitecture({ layers }: { layers: TokenLayers }) {
  return (
    <div className={styles.layers}>
      <div className={styles.layer}>
        <span className={styles.layerLabel}>{layers.primitives.label}</span>
        <span className={styles.swatches}>
          {SWATCHES.map((color) => (
            <span key={color} style={{ background: color }} />
          ))}
        </span>
        <span className={styles.layerText}>{layers.primitives.text}</span>
      </div>
      <div className={styles.layer}>
        <span className={styles.layerLabel}>{layers.semantic.label}</span>
        <span className={styles.tokenNames}>
          {layers.semantic.names.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </span>
        <span className={styles.layerText}>{layers.semantic.text}</span>
      </div>
      <div className={styles.layer}>
        <span className={styles.layerLabel}>{layers.type.label}</span>
        <span className={styles.typeScale}>
          {TYPE_SIZES.map((size) => (
            <span key={size} style={{ fontSize: size }}>
              {layers.type.sample}
            </span>
          ))}
        </span>
        <span className={styles.layerText}>{layers.type.text}</span>
      </div>
      <div className={styles.layer}>
        <span className={styles.layerLabel}>{layers.components.label}</span>
        <span className={styles.componentChips}>
          {layers.components.chips.map((chip, i) => (
            <span key={chip} className={styles[`componentChip${i}`]}>
              {chip}
            </span>
          ))}
        </span>
        <span className={styles.layerText}>{layers.components.text}</span>
      </div>
      <div className={`${styles.layer} ${styles.layerDark}`}>
        <span className={styles.layerLabel}>{layers.screens.label}</span>
        <span className={styles.layerValue}>{layers.screens.value}</span>
        <span className={styles.layerText}>{layers.screens.text}</span>
      </div>
    </div>
  );
}
