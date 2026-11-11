import { getHome } from "@/lib/content";
import CookieSettingsButton from "./CookieSettingsButton";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  const { meta, footer } = getHome();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.available}>
          <span aria-hidden="true" className={styles.dot} />
          {footer.available}
        </span>
        <span>{meta.location}</span>
        <a href={`mailto:${meta.email}`} className={styles.link}>
          {meta.email}
        </a>
        <CookieSettingsButton className={styles.link}>{footer.cookieSettings}</CookieSettingsButton>
        <span>{footer.copyright}</span>
      </div>
    </footer>
  );
}
