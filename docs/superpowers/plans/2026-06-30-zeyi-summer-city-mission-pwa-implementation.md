# Zeyi Summer City Mission PWA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first PWA prototype for 张泽一 2026 暑假城市任务局 that can be used tomorrow to record daily movement, PBL tasks, homework, artifacts, achievements, and exports.

**Architecture:** A single-page React + Vite app with local-only persistence. Static curriculum/task package data lives in source files; user records are stored in browser localStorage for the first version; export utilities generate Markdown and JSON client-side.

**Tech Stack:** React, TypeScript, Vite, CSS modules or plain CSS, localStorage, browser download APIs.

---

## File Structure

- `package.json`: npm scripts and dependencies.
- `index.html`: PWA entry shell.
- `src/main.tsx`: React mount.
- `src/App.tsx`: top-level app state, tab navigation, and page routing.
- `src/styles.css`: city-map adventure visual system and mobile layout.
- `src/data/taskPackages.ts`: the 8 PBL task packages extracted from the Obsidian lesson plan.
- `src/lib/storage.ts`: typed localStorage load/save/reset helpers.
- `src/lib/achievements.ts`: star and badge calculation.
- `src/lib/exporters.ts`: Markdown and JSON export builders.
- `src/types.ts`: shared app types.
- `src/components/BottomNav.tsx`: fixed bottom tab navigation.
- `src/components/RecordModal.tsx`: reusable quick-add form for movement, homework, and artifacts.
- `src/pages/TodayPage.tsx`: daily mission dashboard.
- `src/pages/MovementPage.tsx`: movement log and weekly summary.
- `src/pages/ProjectsPage.tsx`: task package map and PBL step logging.
- `src/pages/HomeworkPage.tsx`: math/pinyin/recognition practice log.
- `src/pages/ArtifactsPage.tsx`: artifact library, achievement summary, and export buttons.

## Task 1: Scaffold The React PWA

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`
- Create: `src/types.ts`

- [ ] **Step 1: Create package metadata**

Create `package.json`:

```json
{
  "name": "zeyi-city-mission",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "tsc && vite build",
    "preview": "vite preview --host 0.0.0.0"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.0",
    "typescript": "^5.7.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.468.0"
  },
  "devDependencies": {}
}
```

- [ ] **Step 2: Create the HTML shell**

Create `index.html`:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#dff3fb" />
    <title>泽一城市任务局</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Define shared types**

Create `src/types.ts`:

```ts
export type TabKey = "today" | "movement" | "projects" | "homework" | "artifacts";

export type TaskStatus = "not-started" | "in-progress" | "done" | "artifact-ready";

export type ArtifactType =
  | "photo"
  | "quote"
  | "career-card"
  | "route-map"
  | "nature-page"
  | "build-work"
  | "shop-exhibit"
  | "video-note"
  | "note";

export interface MissionTask {
  id: string;
  title: string;
  category: string;
  steps: string[];
  prompts: string[];
  outputTypes: ArtifactType[];
}

export interface TaskPackage {
  id: string;
  title: string;
  theme: string;
  goal: string;
  abilities: string[];
  tasks: MissionTask[];
  outcomeTargets: string[];
}

export interface DailyRecord {
  date: string;
  movementDone: boolean;
  expressionDone: boolean;
  traceDone: boolean;
  notes: string;
}

export interface MovementRecord {
  id: string;
  date: string;
  type: string;
  durationMinutes: number;
  place: string;
  withMom: boolean;
  intensity: "轻松" | "刚刚好" | "有点累";
  note: string;
}

export interface HomeworkRecord {
  id: string;
  date: string;
  subject: "数学" | "拼音" | "认字" | "其他";
  title: string;
  amount: string;
  durationMinutes: number;
  difficulty: "简单" | "合适" | "偏难";
  mood: "主动" | "配合" | "抗拒";
  note: string;
}

export interface Artifact {
  id: string;
  date: string;
  packageId: string;
  taskId: string;
  type: ArtifactType;
  title: string;
  text: string;
  childQuote: string;
  momNote: string;
  place: string;
  tags: string[];
  imageName?: string;
}

export interface AppState {
  dailyRecords: DailyRecord[];
  movementRecords: MovementRecord[];
  homeworkRecords: HomeworkRecord[];
  artifacts: Artifact[];
  taskStatuses: Record<string, TaskStatus>;
}
```

- [ ] **Step 4: Add app mount and temporary layout**

Create `src/main.tsx`:

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

Create `src/App.tsx`:

```tsx
import { useState } from "react";
import type { TabKey } from "./types";

const tabs: { key: TabKey; label: string }[] = [
  { key: "today", label: "今日" },
  { key: "movement", label: "运动" },
  { key: "projects", label: "项目" },
  { key: "homework", label: "作业" },
  { key: "artifacts", label: "素材" }
];

export function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("today");

  return (
    <main className="app-shell">
      <section className="hero-map">
        <p className="eyebrow">2026 暑假</p>
        <h1>泽一城市任务局</h1>
        <p>今天去哪里探索？</p>
      </section>
      <section className="page-card">
        <h2>{tabs.find((tab) => tab.key === activeTab)?.label}</h2>
        <p>任务页面开发中。</p>
      </section>
      <nav className="bottom-nav">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? "active" : ""}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </main>
  );
}
```

Create `src/styles.css`:

```css
:root {
  font-family: Inter, "PingFang SC", "Microsoft YaHei", sans-serif;
  color: #163447;
  background: #dff3fb;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

button,
input,
select,
textarea {
  font: inherit;
}

.app-shell {
  min-height: 100vh;
  padding: 16px 16px 92px;
  background:
    radial-gradient(circle at 22% 18%, rgba(255, 211, 101, 0.55), transparent 18%),
    linear-gradient(180deg, #dff3fb 0%, #f7fbec 100%);
}

.hero-map,
.page-card {
  border: 2px solid #19445c;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 5px 5px 0 #19445c;
}

.hero-map {
  padding: 18px;
  margin-bottom: 16px;
}

.hero-map h1 {
  margin: 4px 0 8px;
  font-size: 28px;
  letter-spacing: 0;
}

.hero-map p {
  margin: 0;
}

.eyebrow {
  color: #e4573d;
  font-weight: 800;
}

.page-card {
  padding: 16px;
}

.bottom-nav {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: 12px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
  padding: 8px;
  border: 2px solid #19445c;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 4px 4px 0 #19445c;
}

.bottom-nav button {
  min-height: 44px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #31556b;
  font-weight: 800;
}

.bottom-nav button.active {
  background: #ffd66b;
  color: #163447;
}
```

- [ ] **Step 5: Install dependencies and verify scaffold**

Run: `npm install`

Run: `npm run build`

Expected: TypeScript and Vite build complete with no errors.

- [ ] **Step 6: Commit scaffold**

```bash
git add package.json package-lock.json index.html src
git commit -m "feat: scaffold city mission pwa"
```

## Task 2: Add Curriculum Data And Local Storage

**Files:**
- Create: `src/data/taskPackages.ts`
- Create: `src/lib/storage.ts`
- Modify: `src/App.tsx`

- [ ] **Step 1: Add task package data**

Create `src/data/taskPackages.ts` with 8 packages from the spec. Each package should include at least 3 first-version tasks, with prompts and output types:

```ts
import type { TaskPackage } from "../types";

export const taskPackages: TaskPackage[] = [
  {
    id: "travel-captain",
    title: "我是旅行小队长",
    theme: "路线感、选择能力、表达",
    goal: "建立暑假仪式感，让孩子知道自己是小队长。",
    abilities: ["路线感", "选择", "表达"],
    outcomeTargets: ["队徽", "家到公园路线图", "半日游计划"],
    tasks: [
      {
        id: "travel-badge",
        title: "制作城市任务局徽章",
        category: "出发准备",
        steps: ["写上名字", "画队徽", "说出今天的小队口号"],
        prompts: ["你的队伍叫什么？", "今天从哪里出发？"],
        outputTypes: ["photo", "note"]
      },
      {
        id: "home-park-route",
        title: "画家到公园路线",
        category: "路线探索",
        steps: ["数路口", "找方向", "回来画路线"],
        prompts: ["先经过哪里？然后呢？", "哪里需要等红绿灯？"],
        outputTypes: ["route-map", "quote"]
      },
      {
        id: "half-day-plan",
        title: "安排一次半日游",
        category: "计划表达",
        steps: ["选地点", "排先后顺序", "讲旅行计划"],
        prompts: ["先做什么，再做什么？", "你觉得谁在这里工作？"],
        outputTypes: ["quote", "photo"]
      }
    ]
  }
];
```

Then fill the remaining seven package objects using the exact themes from the design spec.

- [ ] **Step 2: Add storage helpers**

Create `src/lib/storage.ts`:

```ts
import type { AppState } from "../types";

const STORAGE_KEY = "zeyi-city-mission-state";

export const emptyState: AppState = {
  dailyRecords: [],
  movementRecords: [],
  homeworkRecords: [],
  artifacts: [],
  taskStatuses: {}
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
```

- [ ] **Step 3: Wire persisted state into App**

Modify `src/App.tsx` so it loads state once and saves on every change:

```tsx
import { useEffect, useState } from "react";
import type { AppState, TabKey } from "./types";
import { loadState, saveState } from "./lib/storage";

export function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("today");
  const [state, setState] = useState<AppState>(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <main className="app-shell">
      {/* keep current shell, pass state/setState to pages in later tasks */}
    </main>
  );
}
```

- [ ] **Step 4: Build**

Run: `npm run build`

Expected: Build passes.

- [ ] **Step 5: Commit**

```bash
git add src/data/taskPackages.ts src/lib/storage.ts src/App.tsx
git commit -m "feat: add mission data and local storage"
```

## Task 3: Build Navigation And Today Recording

**Files:**
- Create: `src/components/BottomNav.tsx`
- Create: `src/pages/TodayPage.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Extract bottom navigation**

Create `src/components/BottomNav.tsx`:

```tsx
import { Bike, BookOpen, CalendarDays, FolderOpen, Map } from "lucide-react";
import type { TabKey } from "../types";

const tabs = [
  { key: "today" as const, label: "今日", icon: CalendarDays },
  { key: "movement" as const, label: "运动", icon: Bike },
  { key: "projects" as const, label: "项目", icon: Map },
  { key: "homework" as const, label: "作业", icon: BookOpen },
  { key: "artifacts" as const, label: "素材", icon: FolderOpen }
];

export function BottomNav({ activeTab, onChange }: { activeTab: TabKey; onChange: (tab: TabKey) => void }) {
  return (
    <nav className="bottom-nav" aria-label="主导航">
      {tabs.map(({ key, label, icon: Icon }) => (
        <button key={key} className={activeTab === key ? "active" : ""} onClick={() => onChange(key)}>
          <Icon size={18} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
```

- [ ] **Step 2: Create Today page**

Create `src/pages/TodayPage.tsx`:

```tsx
import type { AppState } from "../types";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function TodayPage({ state, setState }: { state: AppState; setState: (state: AppState) => void }) {
  const date = todayKey();
  const daily = state.dailyRecords.find((record) => record.date === date) ?? {
    date,
    movementDone: false,
    expressionDone: false,
    traceDone: false,
    notes: ""
  };

  function updateDaily(next: typeof daily) {
    setState({
      ...state,
      dailyRecords: [...state.dailyRecords.filter((record) => record.date !== date), next]
    });
  }

  return (
    <section className="page-stack">
      <div className="mission-hero">
        <p className="eyebrow">今日任务局</p>
        <h2>今天去哪里探索？</h2>
        <p>完成 70% 就算成功，留下一个痕迹就很好。</p>
      </div>
      <div className="mission-grid">
        <button className={daily.movementDone ? "mission-tile done" : "mission-tile"} onClick={() => updateDaily({ ...daily, movementDone: !daily.movementDone })}>
          <strong>运动到了</strong>
          <span>户外、游泳、散步都算</span>
        </button>
        <button className={daily.expressionDone ? "mission-tile done" : "mission-tile"} onClick={() => updateDaily({ ...daily, expressionDone: !daily.expressionDone })}>
          <strong>说出来了</strong>
          <span>讲今天看到的 3 件事</span>
        </button>
        <button className={daily.traceDone ? "mission-tile done" : "mission-tile"} onClick={() => updateDaily({ ...daily, traceDone: !daily.traceDone })}>
          <strong>留痕了</strong>
          <span>画、贴、拍、讲四选一</span>
        </button>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire page and nav in App**

Modify `src/App.tsx` to import `BottomNav` and `TodayPage`, render `TodayPage` for `activeTab === "today"`, and render simple “页面开发中” cards for the other tabs until their dedicated pages are added in later tasks.

- [ ] **Step 4: Add page styles**

Add to `src/styles.css`:

```css
.page-stack {
  display: grid;
  gap: 14px;
}

.mission-hero,
.mission-tile {
  border: 2px solid #19445c;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 4px 4px 0 #19445c;
}

.mission-hero {
  padding: 16px;
}

.mission-grid {
  display: grid;
  gap: 12px;
}

.mission-tile {
  min-height: 92px;
  padding: 14px;
  text-align: left;
}

.mission-tile strong,
.mission-tile span {
  display: block;
}

.mission-tile.done {
  background: #a8d98d;
}
```

- [ ] **Step 5: Build and manually test**

Run: `npm run build`

Expected: Tapping the three mission tiles toggles their state and refresh preserves it.

- [ ] **Step 6: Commit**

```bash
git add src
git commit -m "feat: add today mission dashboard"
```

## Task 4: Add Movement, Homework, And Artifact Forms

**Files:**
- Create: `src/pages/MovementPage.tsx`
- Create: `src/pages/HomeworkPage.tsx`
- Create: `src/pages/ArtifactsPage.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Create Movement page**

Implement `MovementPage` with controlled fields for type, duration, place, withMom, intensity, and note. On submit, append a `MovementRecord` with `crypto.randomUUID()`.

- [ ] **Step 2: Create Homework page**

Implement `HomeworkPage` with fields for subject, title, amount, duration, difficulty, mood, and note. On submit, append a `HomeworkRecord`.

- [ ] **Step 3: Create Artifacts page**

Implement `ArtifactsPage` with fields for type, title, childQuote, momNote, place, and tags. On submit, append an `Artifact`.

- [ ] **Step 4: Wire pages into App**

Render the three pages for their tabs and pass `state` and `setState`.

- [ ] **Step 5: Build and manually test**

Run: `npm run build`

Expected: Each page can add a record, show the latest records, and preserve data after refresh.

- [ ] **Step 6: Commit**

```bash
git add src
git commit -m "feat: add movement homework and artifact logs"
```

## Task 5: Add Project Task Packages And Step Logging

**Files:**
- Create: `src/pages/ProjectsPage.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Create package list**

Create `ProjectsPage` that renders all `taskPackages` as map-style cards. Each card shows title, goal, abilities, outcome targets, and task count.

- [ ] **Step 2: Add task status updates**

For each task, show a segmented status control with `未开始`, `进行中`, `已完成`, `已有成果`. Updating the status writes to `state.taskStatuses[task.id]`.

- [ ] **Step 3: Add quick artifact link**

For each task, show its prompts and expected outputs so the user can copy the child quote or manually create an artifact in the素材 page.

- [ ] **Step 4: Build and manually test**

Run: `npm run build`

Expected: Task statuses persist after refresh.

- [ ] **Step 5: Commit**

```bash
git add src
git commit -m "feat: add pbl task package map"
```

## Task 6: Add Achievements And Exports

**Files:**
- Create: `src/lib/achievements.ts`
- Create: `src/lib/exporters.ts`
- Modify: `src/pages/ArtifactsPage.tsx`
- Modify: `src/pages/TodayPage.tsx`

- [ ] **Step 1: Add achievement calculation**

Create `src/lib/achievements.ts`:

```ts
import type { AppState } from "../types";

export function countStars(state: AppState) {
  const dailyStars = state.dailyRecords.reduce((sum, record) => {
    const base = [record.movementDone, record.expressionDone, record.traceDone].filter(Boolean).length;
    const bonus = base === 3 ? 2 : 0;
    return sum + base + bonus;
  }, 0);

  return dailyStars + state.movementRecords.length + state.homeworkRecords.length + state.artifacts.length;
}

export function getBadges(state: AppState) {
  const stars = countStars(state);
  const badges = [];
  if (stars >= 10) badges.push("城市小队员");
  if (state.artifacts.filter((item) => item.type === "career-card").length >= 3) badges.push("职业观察员");
  if (state.artifacts.filter((item) => item.type === "nature-page").length >= 3) badges.push("自然调查员");
  if (state.artifacts.some((item) => item.type === "route-map")) badges.push("路线小队长");
  if (state.artifacts.some((item) => item.type === "shop-exhibit")) badges.push("小小店长");
  return badges;
}
```

- [ ] **Step 2: Add exporters**

Create `src/lib/exporters.ts` with `buildPortfolioMarkdown(state, taskPackages)` and `buildBackupJson(state)` functions. Use Blob download helpers in the page.

- [ ] **Step 3: Add export buttons to Artifacts page**

Buttons:

- 导出作品册草稿
- 导出数据备份

Expected filenames:

- `泽一城市任务局-作品册草稿.md`
- `zeyi-city-mission-backup.json`

- [ ] **Step 4: Build and manually test**

Run: `npm run build`

Expected: Export buttons download valid files containing current records.

- [ ] **Step 5: Commit**

```bash
git add src
git commit -m "feat: add achievements and exports"
```

## Task 7: Visual Polish And Mobile QA

**Files:**
- Modify: `src/styles.css`
- Modify: pages as needed for class names only

- [ ] **Step 1: Apply city-map visual polish**

Use blue-green base, yellow/red/green task colors, route lines, station dots, sticker-like badges, and hand-drawn borders. Keep text legible and bottom nav stable.

- [ ] **Step 2: Run production build**

Run: `npm run build`

Expected: Build passes.

- [ ] **Step 3: Start local server**

Run: `npm run dev`

Expected: Vite prints a local URL.

- [ ] **Step 4: Mobile viewport QA**

Open the app at a mobile viewport and verify:

- Bottom nav does not overlap form submit buttons.
- Long Chinese labels wrap cleanly.
- Record forms can be completed with one hand.
- Today page does not look like a spreadsheet or generic checklist.

- [ ] **Step 5: Commit**

```bash
git add src
git commit -m "style: polish city mission interface"
```

## Self-Review

- Spec coverage: The plan covers the five bottom tabs, local data model, daily mission flow, movement, homework, PBL packages, artifacts, achievements, Markdown export, JSON backup, and city-map visual direction.
- Deferred requirements: Image persistence is intentionally first-version lightweight; if browser storage becomes a problem, first version stores image names/notes rather than cloud files.
- Red-flag scan: No open-ended implementation gap is required for execution. The remaining package data in Task 2 must use the approved spec and source lesson plan.
- Type consistency: All tasks use `AppState`, `TaskPackage`, `MovementRecord`, `HomeworkRecord`, `Artifact`, and `TaskStatus` from `src/types.ts`.
