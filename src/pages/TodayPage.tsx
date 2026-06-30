import { MapPinned, PlusCircle, Sparkles } from "lucide-react";
import { taskPackages } from "../data/taskPackages";
import { getBadges, countStars } from "../lib/achievements";
import type { AppState, TabKey } from "../types";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function TodayPage({
  state,
  setState,
  goTo
}: {
  state: AppState;
  setState: (state: AppState) => void;
  goTo: (tab: TabKey) => void;
}) {
  const date = todayKey();
  const daily = state.dailyRecords.find((record) => record.date === date) ?? {
    date,
    movementDone: false,
    expressionDone: false,
    traceDone: false,
    notes: "",
    currentPackageId: taskPackages[0].id
  };
  const packages = [...taskPackages, ...state.customPackages];
  const currentPackage = packages.find((pack) => pack.id === daily.currentPackageId) ?? packages[0];
  const currentTasks = currentPackage.tasks.slice(0, 3);
  const todayMovement = state.movementRecords.filter((record) => record.date === date);
  const todayHomework = state.homeworkRecords.filter((record) => record.date === date);
  const todayArtifacts = state.artifacts.filter((record) => record.date === date);
  const stars = countStars(state);
  const badges = getBadges(state);

  function updateDaily(next: typeof daily) {
    setState({
      ...state,
      dailyRecords: [...state.dailyRecords.filter((record) => record.date !== date), next]
    });
  }

  return (
    <section className="page-stack">
      <div className="mission-hero map-panel">
        <div className="mini-illustration compass" />
        <p className="eyebrow">今日任务局</p>
        <h2>今天去哪里探索？</h2>
        <div className="honor-strip">
          <span><Sparkles size={16} />{stars} 星</span>
          {(badges.length ? badges.slice(0, 2) : ["城市小队员养成中"]).map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      </div>

      <div className="current-theme-card">
        <div>
          <p className="eyebrow">当前主题</p>
          <h3>{currentPackage.title}</h3>
          <p>{currentPackage.goal}</p>
        </div>
        <label>
          切换主题
          <select value={currentPackage.id} onChange={(event) => updateDaily({ ...daily, currentPackageId: event.target.value, currentTaskId: undefined })}>
            {packages.map((pack) => <option key={pack.id} value={pack.id}>{pack.title}</option>)}
          </select>
        </label>
        <button className="secondary-button" onClick={() => goTo("projects")}>新增或调整主题</button>
      </div>

      <div className="today-task-list">
        {currentTasks.map((task) => (
          <button key={task.id} onClick={() => goTo("projects")}>
            <MapPinned size={18} />
            <span>
              <strong>{task.title}</strong>
              <small>{task.steps.slice(0, 2).join(" / ")}</small>
            </span>
          </button>
        ))}
      </div>

      <label className="field-card">
        <span>今天随手记</span>
        <textarea value={daily.notes} placeholder="孩子说了什么？今天哪里最顺？哪里要少一点？" onChange={(event) => updateDaily({ ...daily, notes: event.target.value })} />
      </label>

      <div className="quick-grid">
        <button onClick={() => goTo("movement")}><PlusCircle size={18} />记运动</button>
        <button onClick={() => goTo("projects")}><PlusCircle size={18} />今日任务</button>
        <button onClick={() => goTo("homework")}><PlusCircle size={18} />记作业</button>
        <button onClick={() => goTo("artifacts")}><PlusCircle size={18} />加素材</button>
      </div>

      <div className="summary-card">
        <div>
          <p className="eyebrow">今日进度</p>
          <h3>{todayMovement.length} 运动 · {todayHomework.length} 作业 · {todayArtifacts.length} 素材</h3>
        </div>
        <div className="star-pill"><Sparkles size={16} />荣誉</div>
      </div>
    </section>
  );
}
