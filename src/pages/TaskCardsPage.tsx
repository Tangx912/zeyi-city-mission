import { ChevronLeft, Star } from "lucide-react";
import { getCurrentPackage, getCurrentTask, getPackages, getTodayRecord, saveTodayRecord } from "../lib/today";
import type { AppState, TaskPackage, TaskStatus } from "../types";

const categories = ["全部", "城市探索", "自然观察", "文化体验", "创意手工"];
const statuses: { value: TaskStatus; label: string }[] = [
  { value: "not-started", label: "未开始" },
  { value: "in-progress", label: "进行中" },
  { value: "done", label: "完成任务" },
  { value: "artifact-ready", label: "已有成果" }
];

export function TaskCardsPage({ state, setState }: { state: AppState; setState: (state: AppState) => void }) {
  const packages = getPackages(state);
  const daily = getTodayRecord(state);
  const currentPackage = getCurrentPackage(state);
  const currentTask = getCurrentTask(state);

  function selectTask(pack: TaskPackage, taskId: string) {
    setState(saveTodayRecord(state, { ...daily, currentPackageId: pack.id, currentTaskId: taskId }));
  }

  function setTaskStatus(status: TaskStatus) {
    setState({ ...state, taskStatuses: { ...state.taskStatuses, [currentTask.id]: status } });
  }

  return (
    <section className="screen-stack">
      <header className="page-topbar"><ChevronLeft size={20} /><h1>任务卡</h1><select aria-label="筛选"><option>全部主题</option></select></header>
      <div className="category-tabs">{categories.map((item) => <button key={item}>{item}</button>)}</div>

      <article className="task-detail-card">
        <div className="detail-hero" />
        <button className="favorite"><Star size={18} /></button>
        <h2>{currentTask.title}</h2>
        <p>{currentPackage.goal}</p>
        <div className="task-objectives">
          <strong>任务目标</strong>
          <ol>{currentTask.steps.slice(0, 3).map((step) => <li key={step}>{step}</li>)}</ol>
        </div>
        <div className="task-actions">
          {currentTask.prompts.slice(0, 3).map((prompt) => <button key={prompt}>{prompt}</button>)}
        </div>
        <select value={state.taskStatuses[currentTask.id] ?? "not-started"} onChange={(event) => setTaskStatus(event.target.value as TaskStatus)}>
          {statuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
        </select>
      </article>

      <section className="task-list">
        {packages.map((pack, index) => (
          <article key={pack.id} className="task-row">
            <div className={`task-row-img tone-${index % 4}`} />
            <div>
              <strong>{pack.title}</strong>
              <p>{pack.tasks[0]?.title}</p>
              <span>{pack.tasks.filter((task) => state.taskStatuses[task.id] === "done" || state.taskStatuses[task.id] === "artifact-ready").length}/{pack.tasks.length}</span>
            </div>
            <button onClick={() => selectTask(pack, pack.tasks[0].id)}>设为今日</button>
          </article>
        ))}
      </section>
    </section>
  );
}
