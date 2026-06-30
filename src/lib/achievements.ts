import type { AppState } from "../types";

export function countStars(state: AppState) {
  const dailyStars = state.dailyRecords.reduce((sum, record) => {
    const base = [record.movementDone, record.expressionDone, record.traceDone].filter(Boolean).length;
    return sum + base + (base === 3 ? 2 : 0);
  }, 0);

  return dailyStars + state.movementRecords.length + state.homeworkRecords.length + state.artifacts.length;
}

export function getBadges(state: AppState) {
  const stars = countStars(state);
  const badges: string[] = [];
  const artifacts = state.artifacts;

  if (stars >= 10) badges.push("城市小队员");
  if (artifacts.filter((item) => item.type === "career-card").length >= 3) badges.push("职业观察员");
  if (artifacts.filter((item) => item.type === "nature-page").length >= 3) badges.push("自然调查员");
  if (artifacts.filter((item) => item.type === "route-map").length >= 2) badges.push("路线小队长");
  if (artifacts.some((item) => item.type === "shop-exhibit")) badges.push("小小店长");
  if (artifacts.some((item) => item.type === "video-note")) badges.push("小馆长预备役");

  return badges;
}

export function getOutcomeProgress(state: AppState) {
  const artifacts = state.artifacts;

  return [
    { label: "职业卡", current: artifacts.filter((item) => item.type === "career-card").length, target: 8 },
    { label: "路线图", current: artifacts.filter((item) => item.type === "route-map").length, target: 4 },
    { label: "任务照片", current: artifacts.filter((item) => item.type === "photo").length, target: 8 },
    { label: "自然观察页", current: artifacts.filter((item) => item.type === "nature-page").length, target: 5 },
    {
      label: "作品/展览",
      current: artifacts.filter((item) => ["build-work", "shop-exhibit"].includes(item.type)).length,
      target: 3
    },
    { label: "讲解视频", current: artifacts.filter((item) => item.type === "video-note").length, target: 1 }
  ];
}
