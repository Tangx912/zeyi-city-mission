import { taskPackages } from "../data/taskPackages";
import type { AppState, DailyRecord, TaskPackage } from "../types";

export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function getPackages(state: AppState): TaskPackage[] {
  return [...taskPackages, ...state.customPackages];
}

export function getTodayRecord(state: AppState): DailyRecord {
  const date = todayKey();
  return (
    state.dailyRecords.find((record) => record.date === date) ?? {
      date,
      movementDone: false,
      expressionDone: false,
      traceDone: false,
      notes: "",
      currentPackageId: taskPackages[0].id
    }
  );
}

export function saveTodayRecord(state: AppState, daily: DailyRecord): AppState {
  return {
    ...state,
    dailyRecords: [...state.dailyRecords.filter((record) => record.date !== daily.date), daily]
  };
}

export function getCurrentPackage(state: AppState) {
  const packages = getPackages(state);
  const daily = getTodayRecord(state);
  return packages.find((pack) => pack.id === daily.currentPackageId) ?? packages[0];
}

export function getCurrentTask(state: AppState) {
  const daily = getTodayRecord(state);
  const currentPackage = getCurrentPackage(state);
  return currentPackage.tasks.find((task) => task.id === daily.currentTaskId) ?? currentPackage.tasks[0];
}
