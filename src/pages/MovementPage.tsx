import { useState } from "react";
import type { AppState, MovementType } from "../types";

const movementTypes: MovementType[] = ["快走", "游泳", "球类", "攀爬/平衡", "散步", "跑酷", "足球", "其他"];
const movementGoals = [
  "户外活动或运动 45 分钟",
  "晚饭后散步或轻松走一走",
  "喝水休息，不把体重变成压力话题"
];

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function MovementPage({ state, setState }: { state: AppState; setState: (state: AppState) => void }) {
  const [type, setType] = useState<MovementType>("散步");
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [place, setPlace] = useState("");
  const [withMom, setWithMom] = useState(true);
  const [intensity, setIntensity] = useState<"轻松" | "刚刚好" | "有点累">("刚刚好");
  const [note, setNote] = useState("");

  const weeklyMinutes = state.movementRecords.reduce((sum, record) => sum + record.durationMinutes, 0);
  const date = todayKey();
  const daily = state.dailyRecords.find((record) => record.date === date) ?? {
    date,
    movementDone: false,
    expressionDone: false,
    traceDone: false,
    notes: "",
    movementGoals: {}
  };

  function toggleGoal(goal: string) {
    const movementGoalState = { ...(daily.movementGoals ?? {}), [goal]: !(daily.movementGoals ?? {})[goal] };
    const doneCount = Object.values(movementGoalState).filter(Boolean).length;
    setState({
      ...state,
      dailyRecords: [
        ...state.dailyRecords.filter((record) => record.date !== date),
        { ...daily, movementGoals: movementGoalState, movementDone: doneCount > 0 }
      ]
    });
  }

  function addRecord() {
    setState({
      ...state,
      movementRecords: [
        {
          id: crypto.randomUUID(),
          date: new Date().toISOString().slice(0, 10),
          type,
          durationMinutes,
          place,
          withMom,
          intensity,
          note
        },
        ...state.movementRecords
      ]
    });
    setPlace("");
    setNote("");
  }

  return (
    <section className="page-stack">
      <div className="section-title">
        <p className="eyebrow">运动情况</p>
        <h2>今日目标</h2>
      </div>
      <div className="goal-card">
        {movementGoals.map((goal) => (
          <label className="goal-check" key={goal}>
            <input type="checkbox" checked={Boolean((daily.movementGoals ?? {})[goal])} onChange={() => toggleGoal(goal)} />
            <span>{goal}</span>
          </label>
        ))}
      </div>
      <div className="form-card">
        <strong>补充详情（可填可不填）</strong>
        <label>运动类型<select value={type} onChange={(event) => setType(event.target.value as MovementType)}>{movementTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>时长（分钟）<input type="number" min="1" value={durationMinutes} onChange={(event) => setDurationMinutes(Number(event.target.value))} /></label>
        <label>地点<input value={place} placeholder="公园、泳池、小区..." onChange={(event) => setPlace(event.target.value)} /></label>
        <label>状态<select value={intensity} onChange={(event) => setIntensity(event.target.value as typeof intensity)}><option>轻松</option><option>刚刚好</option><option>有点累</option></select></label>
        <label className="check-line"><input type="checkbox" checked={withMom} onChange={(event) => setWithMom(event.target.checked)} />妈妈一起运动</label>
        <label>备注<textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="今天踢球很兴奋，或者游泳踢腿 3 组。" /></label>
        <button className="primary-button" onClick={addRecord}>保存运动</button>
      </div>
      <div className="summary-card"><span>累计运动</span><strong>{weeklyMinutes} 分钟</strong></div>
      <RecordList records={state.movementRecords.map((record) => `${record.date} · ${record.type} · ${record.durationMinutes} 分钟 · ${record.place || "未填地点"}`)} />
    </section>
  );
}

function RecordList({ records }: { records: string[] }) {
  return <div className="list-card">{records.length ? records.map((record) => <p key={record}>{record}</p>) : <p>还没有运动记录。</p>}</div>;
}
