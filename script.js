const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const prioritySelect = document.getElementById("priority");
const categorySelect = document.getElementById("category");
const themeToggle = document.getElementById("theme-toggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";
    taskInfo.innerHTML = `<strong>${task.text}</strong><div class="task-meta">${task.priority.toUpperCase()} | ${task.category}</div>`;

    const actions = document.createElement("div");
    actions.className = "actions";

    const completeBtn = document.createElement("button");
    completeBtn.innerText = task.completed ? "Undo" : "Done";
    completeBtn.onclick = () => toggleComplete(index);

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => deleteTask(index);

    actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(taskInfo);
    li.appendChild(actions);

    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  const priority = prioritySelect.value;
  const category = categorySelect.value;

  if (text === "") return;

  tasks.push({ text, priority, category, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText) {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

renderTasks();
