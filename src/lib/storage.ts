import type { AppState } from "../types";

const STORAGE_KEY = "zeyi-city-mission-state";

export const emptyState: AppState = {
  dailyRecords: [],
  movementRecords: [],
  homeworkRecords: [],
  artifacts: [],
  taskStatuses: {},
  customPackages: []
};

export function loadState(): AppState {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return emptyState;

  try {
    return { ...emptyState, ...JSON.parse(raw) };
  } catch {
    return emptyState;
  }
}

export function saveState(state: AppState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetState() {
  window.localStorage.removeItem(STORAGE_KEY);
}
