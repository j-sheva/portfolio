import { getHome } from "@/lib/content";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

type Props = {
  children: React.ReactNode;
  mode?: "light" | "dark";
  accent?: "coral" | "lime" | "sky" | "lilac";
};

/** Page frame: theme scope with dotted background, header, main and footer bar. */
export default function SiteShell({ children, mode = "light", accent = "coral" }: Props) {
  const { header } = getHome();
  return (
    <div className="theme-scope" data-mode={mode} data-accent={accent}>
      <a className="skip-link" href="#main">
        {header.skipLink}
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
