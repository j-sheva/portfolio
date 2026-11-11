import { getHome, resolveHref, type Audience } from "@/lib/content";
import { FrameHighlight } from "./Highlight";
import Inspector, { type InspectorState } from "./Inspector";
import Stickers from "./Stickers";
import styles from "./Hero.module.css";

type Props = InspectorState;

function CtaLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  const isCv = href === "cv";
  return (
    <a href={resolveHref(href)} className={className} download={isCv || undefined}>
      {children}
    </a>
  );
}

export default function Hero(props: Props) {
  const { hero, inspector, meta } = getHome();
  const copy = hero[props.audience as Audience];

  return (
    <section aria-labelledby="hero-title" className={styles.hero}>
      <div className={styles.copy}>
        <div className={styles.pills}>
          <span className={styles.pill}>
            {inspector.viewingAsPill} <strong>{inspector.audiences[props.audience]}</strong>
          </span>
          <span className={styles.pill}>
            <span aria-hidden="true" className={styles.statusDot} />
            {meta.status}
          </span>
        </div>
        <h1 id="hero-title" className={styles.title}>
          {copy.title} <FrameHighlight>{copy.highlight}</FrameHighlight>
          {copy.after ? ` ${copy.after}` : null}
        </h1>
        <p className={styles.text}>{copy.text}</p>
        <div className={styles.actions}>
          <CtaLink href={copy.primary.href} className={styles.primary}>
            {copy.primary.label}
          </CtaLink>
          <CtaLink href={copy.secondary.href} className={styles.secondary}>
            {copy.secondary.label}
          </CtaLink>
        </div>
      </div>

      <div className={styles.board}>
        <Inspector {...props} />
        <Stickers accent={props.accent} />
      </div>
    </section>
  );
}
