import type { PersistedState } from "./types";

const KEY = "break-a-mountain-save-v1";

export function loadPersisted(): Partial<PersistedState> | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<PersistedState>;
  } catch {
    return null;
  }
}

export function savePersisted(state: PersistedState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore quota */
  }
}

export function clearPersisted(): void {
  localStorage.removeItem(KEY);
}
