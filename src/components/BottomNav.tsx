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
