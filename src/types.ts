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

export type HomeworkSubject = "数学" | "拼音" | "认字" | "英语" | "阅读" | "科学" | "其他";

export type MovementType =
  | "快走"
  | "游泳"
  | "球类"
  | "攀爬/平衡"
  | "散步"
  | "跑酷"
  | "足球"
  | "其他";

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
  custom?: boolean;
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
  type: MovementType;
  durationMinutes: number;
  place: string;
  withMom: boolean;
  intensity: "轻松" | "刚刚好" | "有点累";
  note: string;
}

export interface HomeworkRecord {
  id: string;
  date: string;
  subject: HomeworkSubject;
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
  customPackages: TaskPackage[];
}
