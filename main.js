let tasks = [];
let filter = "all";

const list = document.getElementById("taskList");
const input = document.getElementById("taskInput");
const countEl = document.getElementById("count");
const dateEl = document.getElementById("dateDisplay");

dateEl.textContent = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

async function loadTasks() {
  const res = await fetch("/api/tasks");
  tasks = await res.json();
  render();
}

async function addTask() {
  const text = input.value.trim();
  if (!text) return;
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  const task = await res.json();
  tasks.push(task);
  input.value = "";
  render();
}

async function toggleTask(id) {
  const res = await fetch(`/api/tasks/${id}`, { method: "PATCH" });
  const updated = await res.json();
  tasks = tasks.map(t => t.id === id ? updated : t);
  render();
}
window.toggleTask = toggleTask;

async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  tasks = tasks.filter(t => t.id !== id);
  render();
}
window.deleteTask = deleteTask;

function render() {
  const visible = tasks.filter(t => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  countEl.textContent = `${tasks.length} task${tasks.length !== 1 ? "s" : ""}`;

  if (!visible.length) {
    list.innerHTML = `<div class="empty-state">✦ Nothing here yet</div>`;
    return;
  }

  list.innerHTML = visible.map(t => `
    <li class="task-item ${t.done ? "done" : ""}" data-id="${t.id}">
      <button class="check-btn" onclick="toggleTask(${t.id})">✓</button>
      <span class="task-text">${escapeHtml(t.text)}</span>
      <span class="task-meta">${t.created}</span>
      <button class="del-btn" onclick="deleteTask(${t.id})">✕</button>
    </li>
  `).join("");
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

document.getElementById("addBtn").addEventListener("click", addTask);
input.addEventListener("keydown", e => { if (e.key === "Enter") addTask(); });

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    render();
  });
});

loadTasks();
