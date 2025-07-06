// Retrieve task array from local storage or initialize with empty array
let taskArr = JSON.parse(localStorage.getItem("taskArr")) || [];

// Accessing necessary DOM elements
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");

const taskCount = document.querySelector("#taskCount");
const completedtaskCount = document.querySelector("#completedTaskCount");
const pendingTaskCount = document.querySelector("#pendingTaskCount");

const addButton = document.querySelector("#addTaskBtn");
const deleteAllButton = document.querySelector("#deleteAllBtn");

const toggleButton = document.querySelector(".theme-toggle");

// Set up event listeners after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add task when Enter key is pressed in the input field
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  });

  // Apply dark mode if previously selected
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Toggle theme when toggle button is clicked
  toggleButton.addEventListener("click", () => {
    toggleTheme();
  });

  // Add task on button click
  addButton.addEventListener("click", addTask);

  // Delete all tasks on button click
  deleteAllButton.addEventListener("click", deleteAllTasks);

  // Display tasks and initialize drag-and-drop
  displayTasks();
  initializeSortable();

  // Update task counters
  updateCount();
});

// Add a new task to the task array
function addTask() {
  const newTask = taskInput.value.trim();

  if (newTask !== "") {
    taskArr.push({
      text: newTask,
      disabled: false, // Task is not completed by default
    });
  }

  // Save updated task array and refresh UI
  saveToLocalStorage();
  taskInput.value = "";
  displayTasks();
}

// Remove all tasks
function deleteAllTasks() {
  taskArr.length = 0; // Clear task array
  saveToLocalStorage();
  displayTasks();
}

// Display all tasks in the task list
function displayTasks() {
  taskList.innerHTML = ""; // Clear current list

  taskArr.forEach((task, index) => {
    // Create list item
    const li = document.createElement("li");
    li.id = `${index}`;
    li.className = task.disabled ? "disabled" : "";

    const taskContent = document.createElement("div");
    taskContent.className = "task-content";

    // Create custom checkbox
    const label = document.createElement("label");
    label.className = "custom-checkbox";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.disabled;
    checkbox.addEventListener("change", () => toggleTask(index));

    const checkmark = document.createElement("span");
    checkmark.className = "checkmark";

    // Create task text
    const text = document.createElement("span");
    text.textContent = task.text;
    text.className = "text-span";
    text.addEventListener("click", () => editTask(index));

    // Create drag handle
    const drag = document.createElement("div");
    drag.textContent = "≡";
    drag.className = "drag-div";

    // Assemble task item
    label.append(checkbox, checkmark);
    taskContent.append(label, text, drag);
    li.appendChild(taskContent);
    taskList.appendChild(li);
  });

  // Update task counts
  updateCount();
}

// Toggle task between completed and pending
function toggleTask(taskIndex) {
  taskArr[taskIndex].disabled = !taskArr[taskIndex].disabled;
  saveToLocalStorage();
  displayTasks();
}

// Save the current task array to local storage
function saveToLocalStorage() {
  localStorage.setItem("taskArr", JSON.stringify(taskArr));
}

// Update task counters: total, completed, and pending
function updateCount() {
  taskCount.textContent = taskArr.length;

  const completedCount = taskArr.filter((task) => task.disabled).length;
  completedtaskCount.textContent = completedCount;

  pendingTaskCount.textContent = taskArr.length - completedCount;
}

// Replace task text with an input field for editing
function editTask(index) {
  const li = document.getElementById(index);
  const textSpan = li.querySelector(".task-content .text-span");

  // Create input element with existing task text
  const input = document.createElement("input");
  input.value = textSpan.textContent;
  input.className = "editTaskInput";

  // Save changes on blur or when Enter is pressed
  input.addEventListener("blur", () => saveEdit(index, input));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      input.blur();
    }
  });

  // Replace the text span with input
  textSpan.replaceWith(input);
  input.focus();
}

// Save the edited task text
function saveEdit(index, inputElement) {
  const newText = inputElement.value.trim();

  if (newText !== "") {
    taskArr[index].text = newText;
    saveToLocalStorage();
  }

  displayTasks();
}

// Initialize sortable drag-and-drop functionality using SortableJS
function initializeSortable() {
  Sortable.create(taskList, {
    animation: 150,
    handle: ".drag-div",
    onEnd: (e) => {
      // Rebuild the task array based on new order
      taskArr.length = 0;
      const listItems = taskList.querySelectorAll("li");

      listItems.forEach((li) => {
        const data = {
          text: li.querySelector(".text-span").textContent,
          disabled: li.getAttribute("class") === "disabled" ? "true" : false,
        };
        taskArr.push(data);
      });

      saveToLocalStorage();
      displayTasks();
    },
  });
}

// Toggle between light and dark themes
function toggleTheme() {
  document.body.classList.toggle("dark-mode");

  // Save theme preference to local storage
  const theme = document.body.className === "dark-mode" ? "dark" : "light";
  localStorage.setItem("theme", theme);
}
