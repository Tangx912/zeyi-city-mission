import { ChevronRight, Download, Heart, Medal, Settings, UserRound } from "lucide-react";
import { buildBackupJson, buildPortfolioMarkdown, downloadText } from "../lib/exporters";
import type { AppState } from "../types";

export function ProfilePage({ state }: { state: AppState }) {
  const items = [
    { label: "我的收藏", icon: Heart },
    { label: "我的作品", icon: Download },
    { label: "我的勋章", icon: Medal },
    { label: "任务历史", icon: UserRound },
    { label: "设置", icon: Settings }
  ];

  return (
    <section className="profile-screen">
      <header className="page-topbar"><span /><h1>我的</h1><span /></header>
      <section className="profile-head"><div className="avatar large">探</div><strong>小探险家</strong><button>编辑资料</button></section>
      <section className="profile-menu">
        {items.map(({ label, icon: Icon }) => (
          <button key={label}><Icon size={20} />{label}<ChevronRight size={18} /></button>
        ))}
        <button onClick={() => downloadText("泽一城市任务局-作品册草稿.md", buildPortfolioMarkdown(state), "text/markdown;charset=utf-8")}><Download size={20} />导出作品册<ChevronRight size={18} /></button>
        <button onClick={() => downloadText("zeyi-city-mission-backup.json", buildBackupJson(state), "application/json;charset=utf-8")}><Download size={20} />导出备份<ChevronRight size={18} /></button>
      </section>
      <div className="camp-illustration" />
    </section>
  );
}
