import { useEffect, useState } from "react";
import { BottomNav } from "./components/BottomNav";
import { loadState, saveState } from "./lib/storage";
import { ArtifactsPage } from "./pages/ArtifactsPage";
import { HomeworkPage } from "./pages/HomeworkPage";
import { MovementPage } from "./pages/MovementPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { TodayPage } from "./pages/TodayPage";
import type { AppState, TabKey } from "./types";

export function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("today");
  const [state, setState] = useState<AppState>(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <main className="app-shell">
      <header className="hero-map">
        <div className="map-path" />
        <p className="eyebrow">2026 暑假</p>
        <h1>泽一城市任务局</h1>
        <p>城市、运动、作业和作品，都变成今天的小任务。</p>
      </header>

      {activeTab === "today" && <TodayPage state={state} setState={setState} goTo={setActiveTab} />}
      {activeTab === "movement" && <MovementPage state={state} setState={setState} />}
      {activeTab === "projects" && <ProjectsPage state={state} setState={setState} />}
      {activeTab === "homework" && <HomeworkPage state={state} setState={setState} />}
      {activeTab === "artifacts" && <ArtifactsPage state={state} setState={setState} />}

      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
    </main>
  );
}
