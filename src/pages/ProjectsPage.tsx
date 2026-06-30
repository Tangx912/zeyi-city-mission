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
  const date = new Date().toISOString().slice(0, 10);
  const daily = state.dailyRecords.find((record) => record.date === date) ?? {
    date,
    movementDone: false,
    expressionDone: false,
    traceDone: false,
    notes: "",
    currentPackageId: packages[0]?.id
  };
  const currentPackage = packages.find((pack) => pack.id === daily.currentPackageId) ?? packages[0];
  const currentTask = currentPackage.tasks.find((task) => task.id === daily.currentTaskId) ?? currentPackage.tasks[0];

  function setTaskStatus(taskId: string, status: TaskStatus) {
    setState({ ...state, taskStatuses: { ...state.taskStatuses, [taskId]: status } });
  }

  function updateDaily(next: typeof daily) {
    setState({
      ...state,
      dailyRecords: [...state.dailyRecords.filter((record) => record.date !== date), next]
    });
  }

  function switchPackage(packageId: string) {
    const nextPackage = packages.find((pack) => pack.id === packageId) ?? packages[0];
    updateDaily({ ...daily, currentPackageId: nextPackage.id, currentTaskId: nextPackage.tasks[0]?.id });
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
    setState({
      ...state,
      customPackages: [custom, ...state.customPackages],
      dailyRecords: [
        ...state.dailyRecords.filter((record) => record.date !== date),
        { ...daily, currentPackageId: custom.id, currentTaskId: custom.tasks[0].id }
      ]
    });
    setTitle("");
    setGoal("");
  }

  return (
    <section className="page-stack">
      <div className="section-title">
        <p className="eyebrow">项目任务</p>
        <h2>今日具体任务</h2>
      </div>

      <div className="current-theme-card">
        <label>
          当前主题
          <select value={currentPackage.id} onChange={(event) => switchPackage(event.target.value)}>
            {packages.map((pack) => <option key={pack.id} value={pack.id}>{pack.title}</option>)}
          </select>
        </label>
        <p>{currentPackage.goal}</p>
      </div>

      <article className="package-card featured-task">
        <div className="mini-illustration flag" />
        <p className="eyebrow">{currentTask.category}</p>
        <h3>{currentTask.title}</h3>
        <div className="today-steps">
          {currentTask.steps.slice(0, 3).map((step) => <span key={step}>{step}</span>)}
        </div>
        <div className="prompt-box">
          {currentTask.prompts.slice(0, 2).map((prompt) => <span key={prompt}>{prompt}</span>)}
        </div>
        <label>
          完成状态
          <select value={state.taskStatuses[currentTask.id] ?? "not-started"} onChange={(event) => setTaskStatus(currentTask.id, event.target.value as TaskStatus)}>
            {statuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
          </select>
        </label>
      </article>

      <details className="subtask-menu">
        <summary>切换到这个主题里的其他任务</summary>
        <div className="other-task-list">
          {currentPackage.tasks.filter((task) => task.id !== currentTask.id).map((task) => (
            <button key={task.id} onClick={() => updateDaily({ ...daily, currentPackageId: currentPackage.id, currentTaskId: task.id })}>
              <strong>{task.title}</strong>
              <span>{task.steps.slice(0, 2).join(" / ")}</span>
            </button>
          ))}
        </div>
      </details>

      <div className="form-card compact add-theme-card">
        <strong>新增今天自己的主题</strong>
        <input value={title} placeholder="比如：今天去牙科、今天整理玩具" onChange={(event) => setTitle(event.target.value)} />
        <input value={goal} placeholder="今天想完成什么？可不填" onChange={(event) => setGoal(event.target.value)} />
        <button className="primary-button" onClick={addCustomPackage}>添加并设为当前主题</button>
      </div>
    </section>
  );
}
