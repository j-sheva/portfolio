"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AUDIENCES, type Audience } from "@/lib/content";
import { track } from "@/lib/analytics";
import { ACCENTS, MODES, STORAGE_KEY, type Accent, type Mode } from "@/lib/theme";
import styles from "./HomeState.module.css";

export type Point = { x: number; y: number };

type Drag = { id: string; sx: number; sy: number; ox: number; oy: number; scale: number; moved: boolean };

type HomeState = {
  audience: Audience;
  accent: Accent;
  mode: Mode;
  grid: boolean;
  positions: Record<string, Point>;
  dragging: string | null;
  top: string | null;
  setAudience: (audience: Audience) => void;
  setAccent: (accent: Accent) => void;
  setMode: (mode: Mode) => void;
  toggleGrid: () => void;
  startDrag: (id: string, event: React.PointerEvent<HTMLElement>) => void;
  resetBoard: () => void;
};

const HomeContext = createContext<HomeState | null>(null);

export function useHome(): HomeState {
  const ctx = useContext(HomeContext);
  if (!ctx) throw new Error("useHome must be used inside <HomeScope>");
  return ctx;
}

type Stored = { audience?: Audience; accent?: Accent; mode?: Mode };

function readStored(): Stored {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Stored;
    return {
      audience: AUDIENCES.includes(raw.audience as Audience) ? raw.audience : undefined,
      accent: ACCENTS.includes(raw.accent as Accent) ? raw.accent : undefined,
      mode: MODES.includes(raw.mode as Mode) ? raw.mode : undefined,
    };
  } catch {
    return {};
  }
}

function writeStored(patch: Stored) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readStored(), ...patch }));
  } catch {
    // Storage unavailable (private mode): preferences just won't persist.
  }
}

const canDrag = () => typeof window !== "undefined" && !window.matchMedia("(pointer: coarse)").matches;

/** Theme scope for the home page: owns Inspector state, the grid overlay and dragging. */
export function HomeScope({ children }: { children: React.ReactNode }) {
  const [audience, setAudienceState] = useState<Audience>("recruiter");
  const [accent, setAccentState] = useState<Accent>("coral");
  const [mode, setModeState] = useState<Mode>("light");
  const [grid, setGrid] = useState(false);
  const [positions, setPositions] = useState<Record<string, Point>>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const [top, setTop] = useState<string | null>(null);
  const drag = useRef<Drag | null>(null);

  useEffect(() => {
    const stored = readStored();
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    // Sync with what the boot script already applied to the DOM.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored.audience) setAudienceState(stored.audience);
    if (stored.accent) setAccentState(stored.accent);
    setModeState(stored.mode ?? (systemDark ? "dark" : "light"));
  }, []);

  const setAudience = useCallback((value: Audience) => {
    setAudienceState(value);
    writeStored({ audience: value });
    track("view_as_select", { audience: value });
  }, []);

  const setAccent = useCallback((value: Accent) => {
    setAccentState(value);
    writeStored({ accent: value });
    track("accent_change", { accent: value });
  }, []);

  const setMode = useCallback((value: Mode) => {
    setModeState(value);
    writeStored({ mode: value });
    track("mode_change", { mode: value });
  }, []);

  const toggleGrid = useCallback(() => {
    setGrid(!grid);
    track("grid_toggle", { on: !grid });
  }, [grid]);

  const startDrag = useCallback(
    (id: string, event: React.PointerEvent<HTMLElement>) => {
      if (event.button !== 0 || !canDrag()) return;
      const target = event.target as HTMLElement;
      if (target.closest("button, a, input")) return;
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      const scale = el.offsetWidth ? rect.width / el.offsetWidth : 1;
      const p = positions[id] ?? { x: 0, y: 0 };
      drag.current = { id, sx: event.clientX, sy: event.clientY, ox: p.x, oy: p.y, scale: scale || 1, moved: false };
      try {
        el.setPointerCapture(event.pointerId);
      } catch {
        // Capture can fail if the pointer is already gone; dragging still works.
      }
      event.preventDefault();
      setDragging(id);
      setTop(id);
    },
    [positions],
  );

  const onPointerMove = (event: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    d.moved = true;
    setPositions((prev) => ({
      ...prev,
      [d.id]: { x: d.ox + (event.clientX - d.sx) / d.scale, y: d.oy + (event.clientY - d.sy) / d.scale },
    }));
  };

  const endDrag = () => {
    const d = drag.current;
    if (!d) return;
    if (d.moved) track("sticker_drag", { id: d.id });
    drag.current = null;
    setDragging(null);
  };

  const resetBoard = useCallback(() => {
    drag.current = null;
    setPositions({});
    setTop(null);
    setDragging(null);
    track("board_reset");
  }, []);

  const value: HomeState = {
    audience,
    accent,
    mode,
    grid,
    positions,
    dragging,
    top,
    setAudience,
    setAccent,
    setMode,
    toggleGrid,
    startDrag,
    resetBoard,
  };

  return (
    <HomeContext.Provider value={value}>
      <div
        className="theme-scope"
        data-mode={mode}
        data-accent={accent}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        suppressHydrationWarning
      >
        {children}
        {grid ? (
          <div aria-hidden="true" className={styles.gridOverlay}>
            <div className={styles.gridColumns}>
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </HomeContext.Provider>
  );
}
