import { Bell, ChevronRight, Heart, MapPinned, NotebookTabs } from "lucide-react";
import { countStars, getBadges } from "../lib/achievements";
import { getCurrentPackage, getCurrentTask, getPackages, getTodayRecord, saveTodayRecord } from "../lib/today";
import type { AppState, TabKey } from "../types";

export function HomePage({
  state,
  setState,
  goTo
}: {
  state: AppState;
  setState: (state: AppState) => void;
  goTo: (tab: TabKey) => void;
}) {
  const daily = getTodayRecord(state);
  const packages = getPackages(state);
  const currentPackage = getCurrentPackage(state);
  const currentTask = getCurrentTask(state);
  const stars = countStars(state);
  const badges = getBadges(state);

  function switchPackage(packageId: string) {
    const nextPackage = packages.find((pack) => pack.id === packageId) ?? packages[0];
    setState(saveTodayRecord(state, { ...daily, currentPackageId: nextPackage.id, currentTaskId: nextPackage.tasks[0]?.id }));
  }

  return (
    <section className="screen-stack">
      <header className="home-greeting">
        <div className="avatar">探</div>
        <div>
          <strong>Hi，小探险家</strong>
          <p>今天也要去发现新世界呀！</p>
        </div>
        <button aria-label="提醒"><Bell size={20} /></button>
      </header>

      <section className="watercolor-hero">
        <div>
          <span>这个夏天</span>
          <strong>一起去探索城市吧！</strong>
        </div>
      </section>

      <section className="honor-card">
        <div>
          <p>我的荣誉</p>
          <strong>{badges[0] ?? "探索小新手"}</strong>
        </div>
        <div className="star-badge">{stars} 星</div>
      </section>

      <nav className="home-shortcuts">
        <button onClick={() => goTo("tasks")}><NotebookTabs size={24} />任务卡</button>
        <button onClick={() => goTo("map")}><MapPinned size={24} />探索地图</button>
        <button onClick={() => goTo("growth")}><BookIcon />成长记录</button>
        <button onClick={() => goTo("profile")}><Heart size={24} />我的收藏</button>
      </nav>

      <section className="current-mission">
        <div className="section-row">
          <h2>今日任务</h2>
          <button onClick={() => goTo("tasks")}>查看全部 <ChevronRight size={14} /></button>
        </div>
        <label>
          当前主题
          <select value={currentPackage.id} onChange={(event) => switchPackage(event.target.value)}>
            {packages.map((pack) => <option key={pack.id} value={pack.id}>{pack.title}</option>)}
          </select>
        </label>
        <button className="mission-preview" onClick={() => goTo("tasks")}>
          <div className="mission-thumb city" />
          <div>
            <strong>{currentTask.title}</strong>
            <p>{currentTask.steps.slice(0, 2).join("，")}</p>
            <span>0/3</span>
          </div>
          <ChevronRight size={18} />
        </button>
      </section>
    </section>
  );
}

function BookIcon() {
  return <span className="line-icon">记</span>;
}
