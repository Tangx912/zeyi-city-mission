import { useState } from "react";
import { getBadges, getOutcomeProgress } from "../lib/achievements";
import { getTodayRecord, saveTodayRecord } from "../lib/today";
import type { AppState, HomeworkSubject, MovementType } from "../types";

const movementGoals = ["户外活动或运动 45 分钟", "晚饭后散步或轻松走一走", "喝水休息，不把体重变成压力话题"];
const homeworkGoals = ["完成一小块书面练习", "读/认/说一个新内容", "遇到偏难时先少做一点"];
const movementTypes: MovementType[] = ["快走", "游泳", "球类", "攀爬/平衡", "散步", "跑酷", "足球", "其他"];
const subjects: HomeworkSubject[] = ["数学", "拼音", "认字", "英语", "阅读", "科学", "其他"];

export function GrowthRecordPage({ state, setState }: { state: AppState; setState: (state: AppState) => void }) {
  const daily = getTodayRecord(state);
  const [movementType, setMovementType] = useState<MovementType>("散步");
  const [movementNote, setMovementNote] = useState("");
  const [subject, setSubject] = useState<HomeworkSubject>("数学");
  const [homeworkNote, setHomeworkNote] = useState("");
  const progress = getOutcomeProgress(state);
  const badges = getBadges(state);

  function toggleGoal(kind: "movementGoals" | "homeworkGoals", goal: string) {
    const nextGoals = { ...(daily[kind] ?? {}), [goal]: !(daily[kind] ?? {})[goal] };
    setState(saveTodayRecord(state, { ...daily, [kind]: nextGoals, movementDone: kind === "movementGoals" ? Object.values(nextGoals).some(Boolean) : daily.movementDone }));
  }

  function addMovementDetail() {
    setState({
      ...state,
      movementRecords: [{ id: crypto.randomUUID(), date: daily.date, type: movementType, durationMinutes: 30, place: "", withMom: true, intensity: "刚刚好", note: movementNote }, ...state.movementRecords]
    });
    setMovementNote("");
  }

  function addHomeworkDetail() {
    setState({
      ...state,
      homeworkRecords: [{ id: crypto.randomUUID(), date: daily.date, subject, title: `${subject}今日练习`, amount: "", durationMinutes: 15, difficulty: "合适", mood: "配合", note: homeworkNote }, ...state.homeworkRecords]
    });
    setHomeworkNote("");
  }

  return (
    <section className="screen-stack">
      <header className="page-topbar"><span /><h1>成长记录</h1><span /></header>
      <section className="profile-summary">
        <div className="avatar large">探</div>
        <div><strong>小探险家</strong><p>探索天数 {state.dailyRecords.length} 天 · 完成任务 {Object.keys(state.taskStatuses).length} 个</p></div>
      </section>
      <section className="medal-row">{(badges.length ? badges : ["观察小达人", "记录小能手", "探索小助手"]).slice(0, 4).map((badge) => <span key={badge}>{badge}</span>)}</section>

      <section className="growth-block">
        <h2>今日目标</h2>
        {[...movementGoals.map((goal) => ["movementGoals", goal] as const), ...homeworkGoals.map((goal) => ["homeworkGoals", goal] as const)].map(([kind, goal]) => (
          <label className="soft-check" key={`${kind}-${goal}`}>
            <input type="checkbox" checked={Boolean((daily[kind] ?? {})[goal])} onChange={() => toggleGoal(kind, goal)} />
            <span>{goal}</span>
          </label>
        ))}
      </section>

      <section className="growth-block">
        <h2>补充记录</h2>
        <div className="inline-form">
          <select value={movementType} onChange={(event) => setMovementType(event.target.value as MovementType)}>{movementTypes.map((item) => <option key={item}>{item}</option>)}</select>
          <input value={movementNote} placeholder="运动补充，可不填" onChange={(event) => setMovementNote(event.target.value)} />
          <button onClick={addMovementDetail}>记运动</button>
        </div>
        <div className="inline-form">
          <select value={subject} onChange={(event) => setSubject(event.target.value as HomeworkSubject)}>{subjects.map((item) => <option key={item}>{item}</option>)}</select>
          <input value={homeworkNote} placeholder="作业补充，可不填" onChange={(event) => setHomeworkNote(event.target.value)} />
          <button onClick={addHomeworkDetail}>记作业</button>
        </div>
      </section>

      <section className="timeline">
        <h2>成长轨迹</h2>
        {progress.map((item) => <p key={item.label}><span />{item.label}：{item.current}/{item.target}</p>)}
      </section>
    </section>
  );
}
