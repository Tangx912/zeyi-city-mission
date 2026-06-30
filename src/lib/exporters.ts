import { taskPackages } from "../data/taskPackages";
import type { AppState, TaskPackage } from "../types";

const artifactNames: Record<string, string> = {
  photo: "照片",
  quote: "孩子原话",
  "career-card": "职业卡",
  "route-map": "路线图",
  "nature-page": "自然观察页",
  "build-work": "积木/搭建作品",
  "shop-exhibit": "模拟商店/展览作品",
  "video-note": "视频讲解记录",
  note: "普通记录"
};

export function buildPortfolioMarkdown(state: AppState) {
  const packages = [...taskPackages, ...state.customPackages];
  const lines = [
    "# 泽一城市任务局作品册",
    "",
    "## 暑假总览",
    "",
    `- 运动记录：${state.movementRecords.length} 条`,
    `- 作业记录：${state.homeworkRecords.length} 条`,
    `- 素材记录：${state.artifacts.length} 条`,
    `- 自定义主题：${state.customPackages.length} 个`,
    ""
  ];

  for (const pack of packages) {
    const related = state.artifacts.filter((artifact) => artifact.packageId === pack.id);
    lines.push(`## ${pack.title}`, "", `目标：${pack.goal}`, "");

    if (related.length === 0) {
      lines.push("- 暂无素材，后续补充。", "");
      continue;
    }

    for (const artifact of related) {
      lines.push(`### ${artifact.title || artifactNames[artifact.type]}`, "");
      lines.push(`- 日期：${artifact.date}`);
      lines.push(`- 类型：${artifactNames[artifact.type]}`);
      if (artifact.place) lines.push(`- 地点：${artifact.place}`);
      if (artifact.childQuote) lines.push(`- 孩子原话：${artifact.childQuote}`);
      if (artifact.momNote) lines.push(`- 妈妈备注：${artifact.momNote}`);
      if (artifact.text) lines.push(`- 内容：${artifact.text}`);
      if (artifact.imageName) lines.push(`- 图片文件：${artifact.imageName}`);
      lines.push("");
    }
  }

  lines.push("## 运动记录", "");
  for (const record of state.movementRecords) {
    lines.push(`- ${record.date}：${record.type} ${record.durationMinutes} 分钟，${record.place || "未填地点"}，状态 ${record.intensity}`);
  }

  lines.push("", "## 作业记录", "");
  for (const record of state.homeworkRecords) {
    lines.push(`- ${record.date}：${record.subject}《${record.title}》，${record.amount}，${record.durationMinutes} 分钟，状态 ${record.mood}`);
  }

  return lines.join("\n");
}

export function buildBackupJson(state: AppState) {
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      app: "zeyi-city-mission",
      state
    },
    null,
    2
  );
}

export function downloadText(filename: string, content: string, type = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function getPackageTitle(packages: TaskPackage[], id: string) {
  return packages.find((pack) => pack.id === id)?.title ?? "未关联主题";
}
