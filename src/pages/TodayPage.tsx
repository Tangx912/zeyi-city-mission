import { PlusCircle, Sparkles } from "lucide-react";
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
    notes: ""
  };
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
        <p className="eyebrow">今日任务局</p>
        <h2>今天去哪里探索？</h2>
        <p>完成 70% 就算成功，普通日子只要有运动、聊天和一个记录就很好。</p>
      </div>

      <div className="mission-grid">
        <button className={daily.movementDone ? "mission-tile done" : "mission-tile"} onClick={() => updateDaily({ ...daily, movementDone: !daily.movementDone })}>
          <strong>运动啦</strong>
          <span>户外、游泳、跑酷、足球、散步都算</span>
        </button>
        <button className={daily.expressionDone ? "mission-tile done" : "mission-tile"} onClick={() => updateDaily({ ...daily, expressionDone: !daily.expressionDone })}>
          <strong>聊一聊</strong>
          <span>讲今天看到的 3 件事</span>
        </button>
        <button className={daily.traceDone ? "mission-tile done" : "mission-tile"} onClick={() => updateDaily({ ...daily, traceDone: !daily.traceDone })}>
          <strong>来记录</strong>
          <span>画、贴、拍、讲四选一</span>
        </button>
      </div>

      <label className="field-card">
        <span>今天随手记</span>
        <textarea value={daily.notes} placeholder="孩子说了什么？今天哪里最顺？哪里要少一点？" onChange={(event) => updateDaily({ ...daily, notes: event.target.value })} />
      </label>

      <div className="quick-grid">
        <button onClick={() => goTo("movement")}><PlusCircle size={18} />记运动</button>
        <button onClick={() => goTo("projects")}><PlusCircle size={18} />选任务</button>
        <button onClick={() => goTo("homework")}><PlusCircle size={18} />记作业</button>
        <button onClick={() => goTo("artifacts")}><PlusCircle size={18} />加素材</button>
      </div>

      <div className="summary-card">
        <div>
          <p className="eyebrow">今日进度</p>
          <h3>{todayMovement.length} 运动 · {todayHomework.length} 作业 · {todayArtifacts.length} 素材</h3>
        </div>
        <div className="star-pill"><Sparkles size={16} />{stars} 星</div>
      </div>

      <div className="badge-row">
        {(badges.length ? badges : ["城市小队员养成中"]).map((badge) => (
          <span key={badge}>{badge}</span>
        ))}
      </div>
    </section>
  );
}
