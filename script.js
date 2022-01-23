//  Define vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//  Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear tasks event
  clearBtn.addEventListener("click", clearTasks);
  // Filter task
  filter.addEventListener("keyup", filterTasks);
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);
}
//Get tasks from li
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}
//  Add Task

function addTask(e) {
  if (taskInput.value == "") {
    alert("Write a Task");
  }
  //  Create li el
  const li = document.createElement("li");
  // Add a class and append text
  li.className = "collection-item";
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link el
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  //  Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);
  //Store in LC

  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = "";
  e.preventDefault();
}

// Store Task

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Remove Task

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure ?")) {
      e.target.parentElement.parentElement.remove();
      // Remove from LC

      removeTaskFromLC(e.target.parentElement.parentElement);
    }
  }
}
//Remove from LC
function removeTaskFromLC(taskItem) {
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent == task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear tasks

function clearTasks(e) {
  //   taskList.innerHTML = "";
  // Faster way
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // Clear from LC
  clearTasksFromLC();
}

//  Clear from LC
function clearTasksFromLC() {
  localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (tesk) {
    const item = tesk.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      tesk.style.display = "block";
    } else tesk.style.display = "none";
  });
}
