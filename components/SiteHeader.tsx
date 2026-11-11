import Link from "next/link";
import { getHome } from "@/lib/content";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  const { meta, nav, header } = getHome();
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        <span className={styles.name}>{meta.name}</span>
        <span className={styles.role}>{meta.role}</span>
      </Link>
      <nav aria-label="Main" className={styles.nav}>
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className={styles.link}>
            {item.label}
          </Link>
        ))}
        <a href={meta.cv} download className={styles.cv}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 4v11" />
            <path d="M7 10l5 5 5-5" />
            <path d="M5 20h14" />
          </svg>
          {header.cv}
        </a>
        <a href={`mailto:${meta.email}`} className={styles.email}>
          {header.email}
        </a>
      </nav>
    </header>
  );
}
