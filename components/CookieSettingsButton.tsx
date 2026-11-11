"use client";

export const OPEN_COOKIE_SETTINGS = "open-cookie-settings";

type Props = { className?: string; children: React.ReactNode };

/** Reopens the consent banner (the banner listens for this event, phase 5). */
export default function CookieSettingsButton({ className, children }: Props) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
    >
      {children}
    </button>
  );
}
