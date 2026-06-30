import { BookOpen, ClipboardList, Map, NotebookTabs, UserRound } from "lucide-react";
import type { TabKey } from "../types";

const tabs = [
  { key: "home" as const, label: "首页", icon: BookOpen },
  { key: "tasks" as const, label: "任务卡", icon: ClipboardList },
  { key: "map" as const, label: "探索地图", icon: Map },
  { key: "growth" as const, label: "成长记录", icon: NotebookTabs },
  { key: "profile" as const, label: "我的", icon: UserRound }
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
