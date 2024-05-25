document.addEventListener('DOMContentLoaded', () => {
    const plane = document.querySelector('.plane');
    const shadow = document.createElement('div');
    shadow.classList.add('shadow');
    plane.parentElement.appendChild(shadow);

    const updateShadow = (deltaX, deltaY, rect) => {
        // Update shadow size
        const shadowSizeX = rect.width * 1.1; // Slightly larger than the plane
        const shadowSizeY = rect.height * 1; // Slightly larger than the plane
        shadow.style.width = `${shadowSizeX}px`;
        shadow.style.height = `${shadowSizeY}px`;

        // Update shadow position
        const shadowX = -deltaX / 20; // Adjust as needed
        const shadowY = -deltaY / 20; // Adjust as needed
        shadow.style.transform = `translate(calc(-50% + ${shadowX}px), calc(-50% + ${shadowY}px))`;

        // Create a dynamic shadow effect with opacity gradient
        const gradientX = (deltaX / rect.width) * 50;
        const gradientY = (deltaY / rect.height) * 50;
        shadow.style.background = `radial-gradient(circle at ${50 - gradientX}% ${50 - gradientY}%, rgba(0, 0, 0, 0.6), transparent)`;
    };

    plane.addEventListener('mousemove', (e) => {
        const rect = plane.getBoundingClientRect();
        const x = e.clientX - rect.left; // X coordinate within the element
        const y = e.clientY - rect.top;  // Y coordinate within the element

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = x - centerX;
        const deltaY = y - centerY;

        const maxRotation = 20; // Max rotation in degrees

        const rotateX = (deltaY / centerY) * maxRotation;
        const rotateY = -(deltaX / centerX) * maxRotation;

        plane.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        updateShadow(deltaX, deltaY, rect);
    });

    plane.addEventListener('mouseleave', () => {
        plane.style.transform = 'rotateX(0) rotateY(0)';
        updateShadow(0, 0, plane.getBoundingClientRect());
    });
});

document.getElementById('create').addEventListener('click', function() {
    var startDiv = document.getElementById('start');
    var gridDiv = document.getElementById('grid');
    
     gridDiv.style.display = "grid";
            startDiv.style.display = "none";
            gridDiv.classList.remove("slideOut");
            gridDiv.classList.add("slideIn");
            startDiv.classList.remove("scaleIn");
            startDiv.classList.add("scaleOut");
    const addBtn = document.getElementById("add");
    addBtn.click();
});
// Function to get the number of days in a month
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

// Function to generate dates for a month
function generateDates(month, year) {
  const days = daysInMonth(month, year);
  const calendarDiv = document.querySelector(".calendar");

  // Clear existing dates
  calendarDiv.innerHTML = "";

  // Generate date elements
  let html = "";
  let weekCount = 0;

  // Get the first day of the month
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

  // Calculate the number of days from the previous month to display
  const daysFromPrevMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  const daysInPrevMonth = daysInMonth(prevMonth, prevYear);

  // Generate dates from the previous month
  for (
    let i = daysInPrevMonth - daysFromPrevMonth + 1;
    i <= daysInPrevMonth;
    i++
  ) {
    const date = new Date(year, month - 2, i);
    const dayIndex = date.getDay();
    let key;
    currentMonth === 0
      ? (key = `${currentYear - 1}_12_${i}`)
      : (key = `${currentYear}_${currentMonth}_${i}`);
    html += `<div id="prev-month" class="date prev-month" data-date="${key}"><div>
        <span class="date_text">${i}</span>
        <br>
        <span class="day_text">${dayNames[dayIndex]}</span></div>
        </div>`;
  }

  // Generate dates for the current month
  for (let i = 1; i <= days; i++) {
    const date = new Date(year, month - 1, i);
    const dayIndex = date.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const isToday =
      date.getDate() === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear();
    if (dayIndex === 1 && i !== 1) {
      html += `</div><div class="week">`; // Start a new row for Monday
      weekCount++;
    }
    let key;
    key = `${currentYear}_${currentMonth + 1}_${i}`;
    let dateHtml = `<div class="date${
      isToday ? " today-date" : ""
    }" data-date="${key}">
        <div>
        <span class="date_text">${i}</span>
        <br>
        <span class="day_text">${dayNames[dayIndex]}</span></div>
        </div>`; // Include day of the week
    html += dateHtml;
  }

  // Get the last day of the month
  const lastDayOfMonth = new Date(year, month - 1, days).getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

  // Calculate the number of days from the next month to display
  const daysFromNextMonth = lastDayOfMonth === 0 ? 0 : 7 - lastDayOfMonth; // Number of days to display from the next month
  const nextMonth = month === 12 ? 1 : month + 1; // Next month
  const nextYear = month === 12 ? year + 1 : year; // Year of the next month

  // Generate dates from the next month
  for (let i = 1; i <= daysFromNextMonth; i++) {
    const date = new Date(year, month, i);
    const dayIndex = date.getDay();
    let key;
    currentMonth === 11
      ? (key = `${currentYear + 1}_1_${i}`)
      : (key = `${currentYear}_${currentMonth + 2}_${i}`);
    html += `<div id="next-month" class="date prev-month" data-date="${key}"><div>
        <span class="date_text">${i}</span>
        <br>
        <span class="day_text">${dayNames[dayIndex]}</span></div>
        </div>`;
  }

  // Append HTML to calendar
  calendarDiv.innerHTML = `<div class="week">${html}</div>`;

  if (weekCount >= 5) {
    const weeks = calendarDiv.querySelectorAll(".week");
    if (weeks.length > 5) {
      weeks[weeks.length - 1].remove();
    }
  }

  addEventListeners();
}

// Weekday names array
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Function to add event listeners to date elements and handle localStorage
function addEventListeners() {
  const dateElements = document.querySelectorAll(".date");

  dateElements.forEach((dateElement) => {
    dateElement.addEventListener("click", () => {
      dateElement.classList.toggle("selected");

      // Add or remove the <span class="x-sign">X</span>
      if (dateElement.classList.contains("selected")) {
        dateElement.innerHTML += '<span class="x-sign">X</span>';
      } else {
        const xSign = dateElement.querySelector(".x-sign");
        if (xSign) {
          xSign.remove();
        }
      }

      const dateText = dateElement.querySelector(".date_text");
      const date = dateText ? dateText.textContent : null;
      if (date) {
        const selectedTask = document.querySelector(".task.selectedtask");
        if (selectedTask) {
          const taskId = selectedTask.getAttribute("data-task-id");
          let taskDates = JSON.parse(localStorage.getItem(taskId)) || [];
          const clickedDate = dateElement.getAttribute("data-date");
          if (dateElement.classList.contains("selected")) {
            taskDates.push(clickedDate);
          } else {
            taskDates = taskDates.filter((d) => d !== clickedDate);
          }
          localStorage.setItem(taskId, JSON.stringify(taskDates));
        }
      }
    });

    const selectedTask = document.querySelector(".task.selectedtask");
    if (selectedTask) {
      const taskId = selectedTask.getAttribute("data-task-id");
      const taskDates = JSON.parse(localStorage.getItem(taskId)) || [];
      dateElements.forEach((dateElement) => {
        const date = dateElement.getAttribute("data-date");
        if (taskDates.includes(date)) {
          dateElement.classList.add("selected");

          // Add the <span class="x-sign">X</span> if not already added
          if (!dateElement.querySelector(".x-sign")) {
            dateElement.innerHTML += '<span class="x-sign">X</span>';
          }
        }
      });
    }
  });
}

let currentMonth;
let currentYear;
function initializeDateControl() {
  const control = document.getElementById("control");
  if (control) {
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]; // Define monthNames here

    document.getElementById("month").textContent = monthNames[currentMonth];
    document.getElementById("next_month").textContent =
      monthNames[(currentMonth + 1) % 12];
    document.getElementById("prev_month").textContent =
      monthNames[(currentMonth - 1 + 12) % 12];
    document.getElementById("year").textContent = currentYear;
    document.getElementById("next_year").textContent = currentYear + 1;
    document.getElementById("prev_year").textContent = currentYear - 1;
    generateDates(currentMonth + 1, currentYear);

    control.addEventListener("wheel", function (event) {
      event.preventDefault();
      const delta = Math.sign(event.deltaY); // Get scroll direction

      if (event.target.classList.contains("moncon")) {
        currentMonth -= delta;
        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
          document.getElementById("year").textContent = currentYear;
          document.getElementById("next_year").textContent = currentYear + 1;
          document.getElementById("prev_year").textContent = currentYear - 1;
        } else if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
          document.getElementById("year").textContent = currentYear;
          document.getElementById("next_year").textContent = currentYear + 1;
          document.getElementById("prev_year").textContent = currentYear - 1;
        }
        document.getElementById("month").textContent = monthNames[currentMonth];
        document.getElementById("next_month").textContent =
          monthNames[(currentMonth + 1) % 12];
        document.getElementById("prev_month").textContent =
          monthNames[(currentMonth - 1 + 12) % 12];
        generateDates(currentMonth + 1, currentYear);
      } else if (event.target.classList.contains("yearcon")) {
        currentYear -= delta;
        document.getElementById("year").textContent = currentYear;
        document.getElementById("next_year").textContent = currentYear + 1;
        document.getElementById("prev_year").textContent = currentYear - 1;
        generateDates(currentMonth + 1, currentYear);
      }
    });
  } else {
    console.error("Element with ID 'control' not found.");
  }

  const todaySpan = document.getElementById("today");
  if (todaySpan) {
    // Define monthNames here as well
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    todaySpan.addEventListener("click", () => {
      const today = new Date();
      const todayMonth = today.getMonth(); //this has +1?
      const todayYear = today.getFullYear();
      const calendarDiv = document.querySelector(".calendar");

      // Update current month and year directly
      currentMonth = todayMonth;
      currentYear = todayYear;

      // Update the display month and year
      document.getElementById("month").textContent = monthNames[currentMonth];
      document.getElementById("next_month").textContent =
        monthNames[(currentMonth + 1) % 12];
      document.getElementById("prev_month").textContent =
        monthNames[(currentMonth - 1 + 12) % 12];
      document.getElementById("year").textContent = currentYear;
      document.getElementById("next_year").textContent = currentYear + 1;
      document.getElementById("prev_year").textContent = currentYear - 1;

      // Smooth transition effect
      calendarDiv.classList.add("transition");

      // Introduce a minimal delay before generating dates
      setTimeout(() => {
        generateDates(currentMonth + 1, currentYear);

        // Remove transition class after the transition is done
        setTimeout(() => {
          calendarDiv.classList.remove("transition");
        });
      }); // Adjust the delay as needed
    });
  }
}

document.addEventListener("DOMContentLoaded", initializeDateControl);
document.addEventListener("DOMContentLoaded", function () {
    const addBtn = document.getElementById("add");
    const tasksDiv = document.getElementById("tasksdiv");
    const deleteBtn = document.getElementById("delete");
    const editBtn = document.getElementById("edit");
    const startDiv = document.getElementById("start");
    const gridDiv = document.getElementById("grid");
  
    // Function to check if there are any tasks on page load
    function checkTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        if (tasks.length === 0) {
            gridDiv.style.display = "none";
            startDiv.style.display = "flex";
            gridDiv.classList.remove("slideIn");
            gridDiv.classList.add("slideOut");
            startDiv.classList.remove("scaleOut");
            startDiv.classList.add("scaleIn");
        } else {
            gridDiv.style.display = "grid";
            startDiv.style.display = "none";
            gridDiv.classList.remove("slideOut");
            gridDiv.classList.add("slideIn");
            startDiv.classList.remove("scaleIn");
            startDiv.classList.add("scaleOut");
        }
    }
  
   
  // Function to load tasks(habit) from localStorage
  // Function to load tasks from localStorage
  function loadTasks() {
    tasksDiv.innerHTML = "";
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      const taskDiv = document.createElement("div");
      const taskId = task.id; // Use the stored task ID
      taskDiv.classList.add("task");
      taskDiv.setAttribute("draggable", true);
      taskDiv.setAttribute("data-task-id", taskId);
      taskDiv.innerHTML = `<span>${task.name}</span>`;
      tasksDiv.appendChild(taskDiv);
      const taskDates = JSON.parse(localStorage.getItem(taskId)) || [];
      taskDates.forEach((date) => {
        const dateElement = document.querySelector(
          `.date[data-date="${date}"]`
        );
        if (dateElement) {
          dateElement.classList.add("selected");
        }
      });
    });
    const selectedTaskIds =
      JSON.parse(localStorage.getItem("selectedTasks")) || [];
    selectedTaskIds.forEach((taskId) => {
      const selectedTask = document.querySelector(
        `.task[data-task-id="${taskId}"]`
      );
      if (selectedTask) {
        selectedTask.classList.add("selectedtask");
        displaySelectedDates(selectedTask);
      }
    });
    checkTasks();
    addDragAndDrop();
  }

  // Function to save tasks to localStorage
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task").forEach((task) => {
      const taskId = task.getAttribute("data-task-id");
      const taskName = task.querySelector("span").textContent;
      tasks.push({ id: taskId, name: taskName });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Add a new task
  addBtn.addEventListener("click", function () {
    const newTask = document.createElement("div");
    let taskId;
    do {
        taskId = `task-${Math.floor(Math.random() * 100)}`;
    } while (document.querySelector(`[data-task-id="${taskId}"]`)); // Check if ID already exists
    newTask.classList.add("task");
    newTask.setAttribute("draggable", true);
    newTask.setAttribute("data-task-id", taskId);
    newTask.innerHTML = "<span>New Habit</span>";
    tasksDiv.appendChild(newTask);

    const allTasks = document.querySelectorAll(".task");
    allTasks.forEach((t) => t.classList.remove("selectedtask"));
    newTask.classList.add("selectedtask");

    //this below send the task to selectedtask
    const selectedTaskId = newTask.getAttribute("data-task-id");
    const selectedTaskIds =
        JSON.parse(localStorage.getItem("selectedTasks")) || [];
    // Clear the array before adding the new selected task
    selectedTaskIds.length = 0;
    selectedTaskIds.push(selectedTaskId);
    localStorage.setItem("selectedTasks", JSON.stringify(selectedTaskIds));
    displaySelectedDates(newTask);
    saveTasks();
    addDragAndDrop();
});
  // Function to display selected dates for a given task
  function displaySelectedDates(selectedTask) {
    if (!selectedTask) return;

    const taskId = selectedTask.getAttribute("data-task-id");
    const taskDates = JSON.parse(localStorage.getItem(taskId)) || [];
    document.querySelectorAll(".date").forEach((dateElement) => {
      const date = dateElement.getAttribute("data-date");

      // Remove existing x-sign spans
      const xSign = dateElement.querySelector(".x-sign");
      if (xSign) {
        xSign.remove();
      }

      if (taskDates.includes(date)) {
        dateElement.classList.add("selected");
        dateElement.innerHTML += '<span class="x-sign">X</span>';
      } else {
        dateElement.classList.remove("selected");
      }
    });
  }

  tasksDiv.addEventListener("click", function (event) {
    const selectedTask = event.target.closest(".task");
    if (selectedTask && !selectedTask.classList.contains("selectedtask")) {
      const allTasks = document.querySelectorAll(".task");
      allTasks.forEach((task) => task.classList.remove("selectedtask"));
      selectedTask.classList.add("selectedtask");
      displaySelectedDates(selectedTask);
    }
    const selectedTaskId = selectedTask.getAttribute("data-task-id");
    const selectedTaskIds =
      JSON.parse(localStorage.getItem("selectedTasks")) || [];
    // Clear the array before adding the new selected task
    selectedTaskIds.length = 0;
    selectedTaskIds.push(selectedTaskId);
    localStorage.setItem("selectedTasks", JSON.stringify(selectedTaskIds));
  });

  // Delete a selected task
  deleteBtn.addEventListener("click", function () {
    const selectedTask = document.querySelector(".task.selectedtask");
    if (selectedTask) {
      const nextTask =
        selectedTask.nextElementSibling || selectedTask.previousElementSibling;
      const taskId = selectedTask.getAttribute("data-task-id");
      const selectedTaskId = localStorage.getItem("selectedTasks");
      selectedTask.remove();
      localStorage.removeItem(taskId);
      localStorage.removeItem(selectedTaskId);
      saveTasks();
      if (nextTask) {
        nextTask.classList.add("selectedtask");
        displaySelectedDates(nextTask); // Display selected dates for the newly selected task

        //this below send the task to selectedtask
        const selectedTaskId2 = nextTask.getAttribute("data-task-id");
        const selectedTaskIds = JSON.parse(localStorage.getItem("selectedTasks")) || [];
        // Clear the array before adding the new selected task
        selectedTaskIds.length = 0;
        selectedTaskIds.push(selectedTaskId2);
        localStorage.setItem("selectedTasks", JSON.stringify(selectedTaskIds));
      }
    }
    checkTasks();
  });

  // Edit a selected task
  editBtn.addEventListener("click", function () {
    const selectedTask = document.querySelector(".task.selectedtask");
    if (selectedTask) {
      selectedTask.setAttribute("draggable", false); // Make task non-draggable because you want to change the name

      const taskText = selectedTask.querySelector("span");
      const input = document.createElement("input");
      input.type = "text";

      // Apply styles to the input field to match the span
      input.style.fontFamily = window.getComputedStyle(taskText).fontFamily;
      input.style.fontSize = window.getComputedStyle(taskText).fontSize;
      input.style.color = "white";
      input.style.background = "none";
      input.style.border = "none";
      input.style.borderBottom = "1px solid white";
      input.style.outline = "none";

      input.value = taskText.textContent;
      selectedTask.replaceChild(input, taskText);

      let isSaving = false; // Flag to prevent multiple save attempts

      // Function to save the edited task name and put it in the initial span
      function saveTaskName() {
        if (isSaving) return;
        isSaving = true;

        if (input.parentElement === selectedTask) {
          // Ensure input is still a child of selectedTask
          if (input.value.trim() === "") {
            taskText.textContent = "Habit";
          } else {
            taskText.textContent = input.value;
          }
          selectedTask.replaceChild(taskText, input);
          saveTasks();
          selectedTask.setAttribute("draggable", true);
        }
        isSaving = false;
      }

      // Debounce function to limit the rate of function execution
      function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
      }

      const debouncedSaveTaskName = debounce(saveTaskName);

      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          debouncedSaveTaskName();
        }
      });

      input.addEventListener("blur", function () {
        debouncedSaveTaskName();
      });

      input.focus();
    }
  });

  // Add drag and drop functionality to tasks
  function addDragAndDrop() {
    const tasks = document.querySelectorAll(".task");

    tasks.forEach((task) => {
      task.addEventListener("dragstart", () => {
        task.classList.add("dragging");
      });

      task.addEventListener("dragend", () => {
        task.classList.remove("dragging");
        saveTasks();
      });
    });

    tasksDiv.addEventListener("dragover", (event) => {
      event.preventDefault();
      const afterElement = getDragAfterElement(tasksDiv, event.clientY);
      const draggingTask = document.querySelector(".dragging");
      if (afterElement == null) {
        tasksDiv.appendChild(draggingTask);
      } else {
        tasksDiv.insertBefore(draggingTask, afterElement);
      }
    });
  }

  function getDragAfterElement(container, y) {
    const draggableElements = [
      ...container.querySelectorAll(".task:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  loadTasks();
});
