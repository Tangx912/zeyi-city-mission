import { useState } from "react";
import { taskPackages } from "../data/taskPackages";
import type { AppState, TaskPackage, TaskStatus } from "../types";

const statuses: { value: TaskStatus; label: string }[] = [
  { value: "not-started", label: "未开始" },
  { value: "in-progress", label: "进行中" },
  { value: "done", label: "已完成" },
  { value: "artifact-ready", label: "已有成果" }
];

export function ProjectsPage({ state, setState }: { state: AppState; setState: (state: AppState) => void }) {
  const packages = [...taskPackages, ...state.customPackages];
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");

  function setTaskStatus(taskId: string, status: TaskStatus) {
    setState({ ...state, taskStatuses: { ...state.taskStatuses, [taskId]: status } });
  }

  function addCustomPackage() {
    if (!title.trim()) return;
    const custom: TaskPackage = {
      id: `custom-${crypto.randomUUID()}`,
      title,
      theme: "自定义城市任务",
      goal: goal || "根据今天真实情况新增的小主题。",
      abilities: ["观察", "表达", "记录"],
      outcomeTargets: ["照片", "孩子原话", "妈妈备注"],
      custom: true,
      tasks: [
        {
          id: `custom-task-${crypto.randomUUID()}`,
          title,
          category: "自定义",
          steps: ["准备", "观察/体验", "表达", "留下成果"],
          prompts: ["你看见了什么？", "你最想讲给谁听？"],
          outputTypes: ["photo", "quote", "note"]
        }
      ]
    };
    setState({ ...state, customPackages: [custom, ...state.customPackages] });
    setTitle("");
    setGoal("");
  }

  return (
    <section className="page-stack">
      <div className="section-title">
        <p className="eyebrow">PBL 任务地图</p>
        <h2>主题可以穿插做</h2>
      </div>

      <div className="form-card compact">
        <strong>临时新增主题</strong>
        <input value={title} placeholder="比如：今天去牙科、今天整理玩具" onChange={(event) => setTitle(event.target.value)} />
        <input value={goal} placeholder="这个主题想练什么？可不填" onChange={(event) => setGoal(event.target.value)} />
        <button className="primary-button" onClick={addCustomPackage}>添加主题</button>
      </div>

      <div className="package-list">
        {packages.map((pack) => (
          <article className="package-card" key={pack.id}>
            <div className="route-line" />
            <p className="eyebrow">{pack.theme}</p>
            <h3>{pack.title}</h3>
            <p>{pack.goal}</p>
            <div className="chip-row">{pack.abilities.map((item) => <span key={item}>{item}</span>)}</div>
            <details>
              <summary>展开任务和引导</summary>
              {pack.tasks.map((task) => (
                <div className="task-card" key={task.id}>
                  <h4>{task.title}</h4>
                  <p>{task.category}</p>
                  <ol>{task.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                  <div className="prompt-box">{task.prompts.map((prompt) => <span key={prompt}>{prompt}</span>)}</div>
                  <select value={state.taskStatuses[task.id] ?? "not-started"} onChange={(event) => setTaskStatus(task.id, event.target.value as TaskStatus)}>
                    {statuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
                  </select>
                </div>
              ))}
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}
