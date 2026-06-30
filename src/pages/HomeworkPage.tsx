import { useState } from "react";
import type { AppState, HomeworkSubject } from "../types";

const subjects: HomeworkSubject[] = ["数学", "拼音", "认字", "英语", "阅读", "科学", "其他"];

export function HomeworkPage({ state, setState }: { state: AppState; setState: (state: AppState) => void }) {
  const [subject, setSubject] = useState<HomeworkSubject>("数学");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(15);
  const [difficulty, setDifficulty] = useState<"简单" | "合适" | "偏难">("合适");
  const [mood, setMood] = useState<"主动" | "配合" | "抗拒">("配合");
  const [note, setNote] = useState("");

  function addRecord() {
    setState({
      ...state,
      homeworkRecords: [
        {
          id: crypto.randomUUID(),
          date: new Date().toISOString().slice(0, 10),
          subject,
          title: title || `${subject}小练习`,
          amount,
          durationMinutes,
          difficulty,
          mood,
          note
        },
        ...state.homeworkRecords
      ]
    });
    setTitle("");
    setAmount("");
    setNote("");
  }

  return (
    <section className="page-stack">
      <div className="section-title">
        <p className="eyebrow">作业情况</p>
        <h2>小练习，轻一点</h2>
      </div>
      <div className="form-card">
        <label>分类<select value={subject} onChange={(event) => setSubject(event.target.value as HomeworkSubject)}>{subjects.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>内容<input value={title} placeholder="数学 5 题、拼音卡、认字游戏..." onChange={(event) => setTitle(event.target.value)} /></label>
        <label>数量<input value={amount} placeholder="5 题 / 1 页 / 10 个字" onChange={(event) => setAmount(event.target.value)} /></label>
        <label>用时（分钟）<input type="number" min="1" value={durationMinutes} onChange={(event) => setDurationMinutes(Number(event.target.value))} /></label>
        <label>难度<select value={difficulty} onChange={(event) => setDifficulty(event.target.value as typeof difficulty)}><option>简单</option><option>合适</option><option>偏难</option></select></label>
        <label>状态<select value={mood} onChange={(event) => setMood(event.target.value as typeof mood)}><option>主动</option><option>配合</option><option>抗拒</option></select></label>
        <label>备注<textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="哪里卡住了？下次要减少还是增加？" /></label>
        <button className="primary-button" onClick={addRecord}>保存作业</button>
      </div>
      <div className="list-card">{state.homeworkRecords.length ? state.homeworkRecords.map((record) => <p key={record.id}>{record.date} · {record.subject} · {record.title} · {record.amount || "未填数量"} · {record.mood}</p>) : <p>还没有作业记录。</p>}</div>
    </section>
  );
}
