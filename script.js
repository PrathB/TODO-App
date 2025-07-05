// 🔄 Retrieve task array from local storage or initialize with empty array
let taskArr = JSON.parse(localStorage.getItem("taskArr")) || [];

// 📌 Accessing necessary DOM elements
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");

const taskCount = document.querySelector("#taskCount");
const completedtaskCount = document.querySelector("#completedTaskCount");
const pendingTaskCount = document.querySelector("#pendingTaskCount");

const addButton = document.querySelector("#addTaskBtn");
const deleteAllButton = document.querySelector("#deleteAllBtn");

// 🚀 Set up event listeners after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Allow pressing Enter key to add a task
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  });

  // Attach click listeners to buttons
  addButton.addEventListener("click", addTask);
  deleteAllButton.addEventListener("click", deleteAllTasks);

  // Display initial task list and counts
  displayTasks();
  initializeSortable();
  updateCount();
});

// ➕ Function to add a task to taskArr
function addTask() {
  const newTask = taskInput.value.trim();

  if (newTask !== "") {
    taskArr.push({
      text: newTask,
      disabled: false, // Task is not completed by default
    });
  }

  // Save and refresh UI
  saveToLocalStorage();
  taskInput.value = "";
  displayTasks();
}

// ❌ Delete all tasks
function deleteAllTasks() {
  taskArr.length = 0; // Clear array
  saveToLocalStorage();
  displayTasks();
}

// 🖼️ Display all tasks in the list
function displayTasks() {
  taskList.innerHTML = ""; // Clear current list

  taskArr.forEach((task, index) => {
    // Task list item structure:
    // <li id='${index}' class="disabled (if completed)">
    //    <div class="task-content">
    //      <label class="custom-checkbox">
    //        <input type="checkbox"/>
    //        <span class="checkmark"></span>
    //      </label>
    //      <span class="text-span">Task Text</span>
    //      <div class="drag-div">drag icon</div>
    //    </div>
    // </li>

    const li = document.createElement("li");
    li.id = `${index}`;
    li.className = task.disabled ? "disabled" : "";

    const taskContent = document.createElement("div");
    taskContent.className = "task-content";

    // Custom checkbox label
    const label = document.createElement("label");
    label.className = "custom-checkbox";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.disabled;
    checkbox.addEventListener("change", () => toggleTask(index));

    const checkmark = document.createElement("span");
    checkmark.className = "checkmark"; // Styled in CSS

    // Task text span
    const text = document.createElement("span");
    text.textContent = task.text;
    text.className = "text-span";
    text.addEventListener("click", () => editTask(index)); // Enable editing on click

    const drag = document.createElement("div");
    drag.textContent = "≡";
    drag.className = "drag-div";

    // Assemble DOM elements
    label.append(checkbox, checkmark);
    taskContent.append(label, text, drag);
    li.appendChild(taskContent);
    taskList.appendChild(li);
  });

  updateCount(); // Refresh counts
}

// ✅ Toggle task completed/incomplete
function toggleTask(taskIndex) {
  taskArr[taskIndex].disabled = !taskArr[taskIndex].disabled;
  saveToLocalStorage();
  displayTasks();
}

// 💾 Save current taskArr to local storage
function saveToLocalStorage() {
  localStorage.setItem("taskArr", JSON.stringify(taskArr));
}

// 🔢 Update task counts: total, completed, and pending
function updateCount() {
  taskCount.textContent = taskArr.length;

  const completedCount = taskArr.filter((task) => task.disabled).length;
  completedtaskCount.textContent = completedCount;

  pendingTaskCount.textContent = taskArr.length - completedCount;
}

// ✏️ Replace task text with input field for editing
function editTask(index) {
  const li = document.getElementById(index);
  const textSpan = li.querySelector(".task-content .text-span");

  // Create an input to replace the text
  const input = document.createElement("input");
  input.value = textSpan.textContent;
  input.className = "editTaskInput";

  // Save on blur or Enter key
  input.addEventListener("blur", () => saveEdit(index, input));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      input.blur(); // Triggers blur event
    }
  });

  // Replace span with input field
  textSpan.replaceWith(input);
  input.focus();
}

// 💾 Save edited task text
function saveEdit(index, inputElement) {
  const newText = inputElement.value.trim();

  if (newText !== "") {
    taskArr[index].text = newText;
    saveToLocalStorage();
  }

  displayTasks(); // Refresh the UI
}

function initializeSortable() {
  Sortable.create(taskList, {
    animation: 150,
    handle: ".drag-div",
    onEnd: (e) => {
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
