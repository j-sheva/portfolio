import { getHome } from "@/lib/content";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { THEME_BOOT_SCRIPT } from "@/lib/theme";
import { HomeScope } from "./home/HomeState";

type Props = {
  children: React.ReactNode;
  /** Home page: theme and board are driven by the Inspector. */
  interactive?: boolean;
};

/** Page frame: theme scope with dotted background, header, main and footer bar. */
export default function SiteShell({ children, interactive = false }: Props) {
  const { header } = getHome();
  const content = (
    <>
      <a className="skip-link" href="#main">
        {header.skipLink}
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );

  if (!interactive) {
    // Case pages and others use the light palette only.
    return (
      <div className="theme-scope" data-mode="light" data-accent="coral">
        {content}
      </div>
    );
  }

  return (
    <HomeScope>
      <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      {content}
    </HomeScope>
  );
}
