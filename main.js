let addButton = document.getElementById("add-button");
let taskInput = document.getElementById("task-input");
let task;
addButton.addEventListener("click", addTask);

function addTask() {
  let taskValue = taskInput.value;
  let task = document.createElement("li");
  task.classList.add("task");
  task.setAttribute("draggable", "true");
  task.addEventListener("dragstart", dragStart);

  let taskContent = document.createElement("div");
  taskContent.textContent = taskValue;
  taskContent.classList.add("task-content");

  let toolBox = document.createElement("div");
  toolBox.classList.add("tool-box");
  toolBox.innerHTML = ` <i class="fas fa-edit"></i>
  <i class="fas fa-trash-alt "></i>`;

  task.appendChild(taskContent);
  task.appendChild(toolBox);

  let tasks = document.getElementById("plan-tasks");
  tasks.appendChild(task);
}

function dragStart(e) {
  e.target.classList.add("hold");
  task = e.target;
}

function dragEnter(e) {
  if (e.target.classList.contains("column")) {
    e.target.classList.add("enter");
  }
}

function dragLeave(event) {
  event.target.classList.remove("enter");
}

function drop(event) {
  event.target.classList.remove("enter");
  console.log(task);
  event.target.childNodes[3].append(task);
}
function dragOver(event) {
  event.preventDefault(); // https://stackoverflow.com/a/35428657
}

let columns = document.querySelectorAll(".column");
console.log(columns);
for (let i = 0; i < columns.length; i++) {
  let column = columns[i];
  console.log(column);
  column.addEventListener("dragenter", dragEnter);
  column.addEventListener("dragover", dragOver);
  column.addEventListener("dragleave", dragLeave);
  column.addEventListener("drop", drop);
}
