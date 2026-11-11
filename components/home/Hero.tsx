"use client";

import { useState } from "react";
import { getHome, resolveHref } from "@/lib/content";
import { FrameHighlight } from "./Highlight";
import { useHome } from "./HomeState";
import Inspector from "./Inspector";
import Stickers from "./Stickers";
import styles from "./Hero.module.css";

function CtaLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  const isCv = href === "cv";
  return (
    <a href={resolveHref(href)} className={className} download={isCv || undefined}>
      {children}
    </a>
  );
}

export default function Hero() {
  const { hero, inspector, meta, cursors } = getHome();
  const { audience, dragging } = useHome();
  const [you, setYou] = useState<{ x: number; y: number } | null>(null);
  const copy = hero[audience];

  // The "You" label follows the visitor's mouse (fine pointers only).
  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const scale = el.offsetWidth ? rect.width / el.offsetWidth : 1;
    setYou({ x: (event.clientX - rect.left) / scale, y: (event.clientY - rect.top) / scale });
  };

  return (
    <section
      aria-labelledby="hero-title"
      className={styles.hero}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setYou(null)}
    >
      <div className={styles.copy}>
        <div className={styles.pills}>
          <span className={styles.pill}>
            {inspector.viewingAsPill} <strong>{inspector.audiences[audience]}</strong>
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
        <Inspector />
        <Stickers />
      </div>

      <div aria-hidden="true" className={styles.yCursor}>
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path d="M4 2l16 9-7 2-3 7z" fill="var(--ink)" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <span className={styles.yLabel}>{cursors.yuliia}</span>
      </div>
      {you && !dragging ? (
        <span aria-hidden="true" className={styles.youLabel} style={{ left: Math.round(you.x + 16), top: Math.round(you.y + 20) }}>
          {cursors.you}
        </span>
      ) : null}
    </section>
  );
}
