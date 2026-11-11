import { getHome } from "@/lib/content";
import { MarkerHighlight } from "./Highlight";
import styles from "./Contact.module.css";

export default function Contact() {
  const { contact, meta } = getHome();
  return (
    <section id="contact" aria-labelledby="contact-title" className={styles.section}>
      <div className={styles.inner}>
        <h2 id="contact-title" className={styles.title}>
          {contact.titleBefore} <MarkerHighlight>{contact.highlight}</MarkerHighlight>
          {contact.titleAfter}
        </h2>
        <p className={styles.text}>{contact.text}</p>
        <div className={styles.actions}>
          <a href={`mailto:${meta.email}`} className={`${styles.button} ${styles.email}`}>
            {meta.email}
          </a>
          <a href={meta.cv} download className={`${styles.button} ${styles.cv}`}>
            {contact.buttons.cv}
          </a>
          <a href={meta.linkedin} className={`${styles.button} ${styles.outline}`} rel="noopener" target="_blank">
            {contact.buttons.linkedin}
          </a>
          <a href={meta.behance} className={`${styles.button} ${styles.outline}`} rel="noopener" target="_blank">
            {contact.buttons.behance}
          </a>
        </div>
      </div>
    </section>
  );
}
