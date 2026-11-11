import Image from "next/image";
import { getHome } from "@/lib/content";
import { MarkerHighlight } from "./Highlight";
import styles from "./About.module.css";

export default function About() {
  const { about } = getHome();
  return (
    <section id="about" aria-labelledby="about-title" className={styles.section}>
      <figure className={styles.figure}>
        <span aria-hidden="true" className={styles.tape} />
        <div className={styles.paper}>
          <Image
            src={about.portrait}
            alt={about.portraitAlt}
            width={300}
            height={360}
            unoptimized
            className={styles.portrait}
          />
        </div>
        <figcaption className={styles.caption}>{about.portraitCaption}</figcaption>
      </figure>
      <div className={styles.text}>
        <h2 id="about-title" className={styles.title}>
          {about.titleBefore} <MarkerHighlight>{about.highlight}</MarkerHighlight>
          {about.titleAfter}
        </h2>
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
        <div className={styles.tools}>
          {about.tools.map((tool) => (
            <span key={tool} className={styles.tool}>
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
