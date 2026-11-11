"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import styles from "./case.module.css";

type Props = { slug: string; label: string; title: string };

export default function NextCase({ slug, label, title }: Props) {
  return (
    <Link href={`/work/${slug}`} className={styles.next} onClick={() => track("case_open", { slug, source: "next" })}>
      <span className={styles.nextText}>
        <span className={styles.nextLabel}>{label}</span>
        <span className={styles.nextTitle}>{title}</span>
      </span>
      <span aria-hidden="true" className={styles.nextArrow}>
        →
      </span>
    </Link>
  );
}
