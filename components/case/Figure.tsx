import Image from "next/image";
import type { FigureData, SlotGroup } from "@/lib/cases";
import styles from "./case.module.css";

type Props = {
  figure: FigureData;
  /** Drawn diagram shown until a real image is added in the MDX frontmatter. */
  diagram?: React.ReactNode;
  /** "mono" for drawn diagrams, "sans" for screenshots. */
  caption?: "mono" | "sans";
  className?: string;
  sizes?: string;
};

export function CaseImage({ figure, sizes, className }: { figure: FigureData; sizes?: string; className?: string }) {
  return (
    <Image
      src={figure.image!}
      alt={figure.alt ?? ""}
      width={figure.width ?? 1800}
      height={figure.height ?? 1081}
      sizes={sizes ?? "(max-width: 1200px) 100vw, 1152px"}
      className={className ?? styles.image}
    />
  );
}

/** Image or drawn diagram with a caption. Renders nothing when neither exists. */
export default function Figure({ figure, diagram, caption = "sans", className, sizes }: Props) {
  if (figure.image) {
    const text = figure.imageCaption ?? figure.caption;
    return (
      <figure className={`${styles.figure} ${className ?? ""}`}>
        <CaseImage figure={figure} sizes={sizes} />
        {text ? <figcaption className={styles.captionSans}>{text}</figcaption> : null}
      </figure>
    );
  }
  if (!diagram) return null;
  return (
    <figure className={`${styles.figure} ${className ?? ""}`}>
      {diagram}
      {figure.caption ? (
        <figcaption className={caption === "mono" ? styles.captionMono : styles.captionSans}>{figure.caption}</figcaption>
      ) : null}
    </figure>
  );
}

/** Screenshot slots: only figures with an image are shown, empty groups disappear. */
export function Slots({ groups }: { groups?: SlotGroup[] }) {
  if (!groups) return null;
  return (
    <>
      {groups.map((group, i) => {
        const filled = group.figures.filter((f) => f.image);
        if (filled.length === 0) return null;
        return (
          <div
            key={i}
            className={styles.slotGrid}
            style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(${group.minWidth ?? 300}px, 100%), 1fr))` }}
          >
            {filled.map((figure, j) => (
              <Figure key={j} figure={figure} sizes="(max-width: 760px) 100vw, 600px" />
            ))}
          </div>
        );
      })}
    </>
  );
}
