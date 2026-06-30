import { useEffect, useState } from "react";
import { BottomNav } from "./components/BottomNav";
import { loadState, saveState } from "./lib/storage";
import { ExploreMapPage } from "./pages/ExploreMapPage";
import { GrowthRecordPage } from "./pages/GrowthRecordPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { TaskCardsPage } from "./pages/TaskCardsPage";
import type { AppState, TabKey } from "./types";

export function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [state, setState] = useState<AppState>(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <main className="app-shell">
      {activeTab === "home" && <HomePage state={state} setState={setState} goTo={setActiveTab} />}
      {activeTab === "tasks" && <TaskCardsPage state={state} setState={setState} />}
      {activeTab === "map" && <ExploreMapPage />}
      {activeTab === "growth" && <GrowthRecordPage state={state} setState={setState} />}
      {activeTab === "profile" && <ProfilePage state={state} />}

      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
    </main>
  );
}
