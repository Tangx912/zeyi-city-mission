import { useState } from "react";
import { taskPackages } from "../data/taskPackages";
import { countStars, getBadges, getOutcomeProgress } from "../lib/achievements";
import { buildBackupJson, buildPortfolioMarkdown, downloadText, getPackageTitle } from "../lib/exporters";
import type { AppState, ArtifactType } from "../types";

const artifactTypes: { value: ArtifactType; label: string }[] = [
  { value: "photo", label: "照片" },
  { value: "quote", label: "孩子原话" },
  { value: "career-card", label: "职业卡" },
  { value: "route-map", label: "路线图" },
  { value: "nature-page", label: "自然观察页" },
  { value: "build-work", label: "积木/搭建作品" },
  { value: "shop-exhibit", label: "模拟商店/展览作品" },
  { value: "video-note", label: "视频讲解记录" },
  { value: "note", label: "普通记录" }
];

export function ArtifactsPage({ state, setState }: { state: AppState; setState: (state: AppState) => void }) {
  const packages = [...taskPackages, ...state.customPackages];
  const [type, setType] = useState<ArtifactType>("photo");
  const [packageId, setPackageId] = useState(packages[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [childQuote, setChildQuote] = useState("");
  const [momNote, setMomNote] = useState("");
  const [text, setText] = useState("");
  const [place, setPlace] = useState("");
  const [tags, setTags] = useState("");
  const [imageName, setImageName] = useState("");

  const stars = countStars(state);
  const badges = getBadges(state);
  const progress = getOutcomeProgress(state);

  function addArtifact() {
    setState({
      ...state,
      artifacts: [
        {
          id: crypto.randomUUID(),
          date: new Date().toISOString().slice(0, 10),
          packageId,
          taskId: "",
          type,
          title: title || artifactTypes.find((item) => item.value === type)?.label || "素材",
          text,
          childQuote,
          momNote,
          place,
          tags: tags.split(/[，,\s]/).map((tag) => tag.trim()).filter(Boolean),
          imageName
        },
        ...state.artifacts
      ]
    });
    setTitle("");
    setChildQuote("");
    setMomNote("");
    setText("");
    setPlace("");
    setTags("");
    setImageName("");
  }

  return (
    <section className="page-stack">
      <div className="section-title">
        <p className="eyebrow">素材与成果</p>
        <h2>把故事装进作品盒子</h2>
      </div>

      <div className="achievement-card">
        <strong>{stars} 颗星</strong>
        <div className="badge-row">{(badges.length ? badges : ["称号养成中"]).map((badge) => <span key={badge}>{badge}</span>)}</div>
        <div className="progress-list">{progress.map((item) => <p key={item.label}>{item.label}：{item.current}/{item.target}</p>)}</div>
      </div>

      <div className="form-card">
        <label>素材类型<select value={type} onChange={(event) => setType(event.target.value as ArtifactType)}>{artifactTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
        <label>关联主题<select value={packageId} onChange={(event) => setPackageId(event.target.value)}>{packages.map((pack) => <option key={pack.id} value={pack.id}>{pack.title}</option>)}</select></label>
        <label>标题<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="比如：第一次画地铁路线" /></label>
        <label>孩子原话<textarea value={childQuote} onChange={(event) => setChildQuote(event.target.value)} placeholder="直接记孩子说的话。" /></label>
        <label>妈妈备注<textarea value={momNote} onChange={(event) => setMomNote(event.target.value)} placeholder="你想补充的背景、感受、提醒。" /></label>
        <label>内容<textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="职业卡、路线图、自然观察页的文字内容。" /></label>
        <label>地点<input value={place} onChange={(event) => setPlace(event.target.value)} placeholder="超市、公园、地铁站..." /></label>
        <label>图片文件名<input value={imageName} onChange={(event) => setImageName(event.target.value)} placeholder="先记文件名，后续素材打包用。" /></label>
        <label>标签<input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="职业,路线,自然" /></label>
        <button className="primary-button" onClick={addArtifact}>保存素材</button>
      </div>

      <div className="export-grid">
        <button onClick={() => downloadText("泽一城市任务局-作品册草稿.md", buildPortfolioMarkdown(state), "text/markdown;charset=utf-8")}>导出作品册草稿</button>
        <button onClick={() => downloadText("zeyi-city-mission-backup.json", buildBackupJson(state), "application/json;charset=utf-8")}>导出 JSON 备份</button>
      </div>

      <div className="list-card">
        {state.artifacts.length ? state.artifacts.map((artifact) => (
          <article key={artifact.id}>
            <strong>{artifact.title}</strong>
            <p>{artifact.date} · {getPackageTitle(packages, artifact.packageId)} · {artifactTypes.find((item) => item.value === artifact.type)?.label}</p>
            {artifact.childQuote && <p>“{artifact.childQuote}”</p>}
          </article>
        )) : <p>还没有素材。今天先记一句孩子原话也很好。</p>}
      </div>
    </section>
  );
}
