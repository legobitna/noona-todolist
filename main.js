let addButton = document.getElementById("add-button");
let taskInput = document.getElementById("task-input");
let tasks = [];

let task;
addButton.addEventListener("click", addTask);

function addTask() {
  let taskValue = taskInput.value;
  let item = {
    id: randomIdGenerator(),
    task: taskValue,
    status: "plan",
  };

  let task = document.createElement("li");
  task.classList.add("task");
  task.setAttribute("draggable", "true");
  task.addEventListener("dragstart", dragStart);

  let taskContent = document.createElement("div");
  taskContent.textContent = taskValue;
  taskContent.classList.add("task-content");

  let toolBox = document.createElement("div");
  toolBox.classList.add("tool-box");
  toolBox.innerHTML = ` <i class="fas fa-save display-none" onclick="save(event)"></i><i class="fas fa-edit" onclick="editTask(event)"></i>
  <i class="fas fa-trash-alt " onclick="deleteTask(event)"></i>`;

  task.appendChild(taskContent);
  task.appendChild(toolBox);

  let tasks = document.getElementById("plan");
  tasks.appendChild(task);
}

function deleteTask(event) {
  var tasks = event.target.parentNode.parentNode.parentNode;
  var task = event.target.parentNode.parentNode;
  tasks.removeChild(task);
}

function editTask(event) {
  event.currentTarget.classList.add("display-none");
  document.querySelector(".fa-save").classList.remove("display-none");

  let parents = event.currentTarget.parentNode.parentNode;
  let textBlock = event.currentTarget.parentNode.previousSibling;
  let textAreaBlock = document.createElement("textarea");
  textAreaBlock.innerHTML = textBlock.innerHTML;
  textAreaBlock.classList.add("input-modify");
  parents.replaceChild(textAreaBlock, textBlock);
}

function save(event) {
  event.currentTarget.classList.add("display-none");
  document.querySelector(".fa-edit").classList.remove("display-none");
  let parents = event.currentTarget.parentNode.parentNode;

  let textAreaBlock = document.querySelector("textarea");
  let value = textAreaBlock.value;
  let textBlock = document.createElement("div");
  textBlock.innerHTML = value;
  textBlock.classList.add("task-content");
  parents.replaceChild(textBlock, textAreaBlock);
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

function randomIdGenerator() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
console.log("id", randomIdGenerator());
