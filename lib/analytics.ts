// Event tracking. Phase 5 wires this to GA4 and Clarity behind consent;
// until then it is a no-op so components can already call it.
export type EventParams = Record<string, string | number | boolean>;

export function track(name: string, params: EventParams = {}): void {
  void name;
  void params;
}
