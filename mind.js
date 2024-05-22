// Function to get the number of days in a month
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

// Function to generate dates for a month
function generateDates(month, year) {
    const days = daysInMonth(month, year);
    const calendarDiv = document.querySelector('.calendar');


    // Clear existing dates
    calendarDiv.innerHTML = '';

    // Generate date elements
    let html = '';
    let weekCount = 0;

    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

    // Calculate the number of days from the previous month to display
    const daysFromPrevMonth = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); 
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year; 
    const daysInPrevMonth = daysInMonth(prevMonth, prevYear);

    // Generate dates from the previous month
    for (let i = daysInPrevMonth - daysFromPrevMonth + 1; i <= daysInPrevMonth; i++) {
        const date = new Date(year, month - 2, i);
        const dayIndex = date.getDay();
        html += `<div id="prev-month" class="date prev-month"><div>
        <span class="date_text">
        ${i}</span>
        <br>
        <span class="day_text">${dayNames[dayIndex]}</span></div>
        </div>`;
        
    }

    // Generate dates for the current month
    for (let i = 1; i <= days; i++) {
        const date = new Date(year, month - 1, i);
        const dayIndex = date.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
        const isToday = date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
        if (dayIndex === 1 && i !== 1) {
            html += `</div><div class="week">`; // Start a new row for Monday
            weekCount++;
        }
        let dateHtml = `<div class="date${isToday ? ' today-date' : ''}">
        <div>
        <span class="date_text">
        ${i}</span>
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
        const date = new Date(year, month , i);
        const dayIndex = date.getDay();
        html += `<div id="next-month" class="date prev-month"><div>
        <span class="date_text">
        ${i}</span>
        <br>
        <span class="day_text">${dayNames[dayIndex]}</span></div>
        </div>`;
    }

    // Append HTML to calendar
    calendarDiv.innerHTML = `<div class="week">${html}</div>`;
 
    if (weekCount >= 5) {
        const weeks = calendarDiv.querySelectorAll('.week');
        if (weeks.length > 5 ) {
            weeks[weeks.length - 1].remove();
        }
    }
    console.log(weekCount)
    addEventListeners()
}

// Weekday names array
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


// Function to add event listeners to date elements and handle localStorage
function addEventListeners() {
    const dateElements = document.querySelectorAll('.date');

    dateElements.forEach(dateElement => {
        dateElement.addEventListener('click', () => {
            dateElement.classList.toggle('selected');
            const dateText = dateElement.querySelector('.date_text');
            const date = dateText ? dateText.textContent : null;
            if (date) {
                
               
                let key;

                // Determine whether the clicked date is from the previous month or next month
                if (dateElement.id === 'prev-month') {
                    currentMonth === 0 ? (key = `${currentYear - 1}_12_${date}`) : (key = `${currentYear}_${currentMonth}_${date}`);
                } else if (dateElement.id === 'next-month') {
                    currentMonth === 11 ? (key = `${currentYear + 1}_1_${date}`) : (key = `${currentYear}_${currentMonth + 2}_${date}`);// Save as the previous month
                } else {
                    key = `${currentYear}_${currentMonth+1}_${date}`; // Save as the current month
                }
                console.log(currentMonth);
                if (dateElement.classList.contains('selected')) {
                    dateElement.innerHTML += '<span class="x-sign">X</span>';
                    localStorage.setItem(key, 'selected');
                    // Add your additional class lists here as needed
                } else {
                    const xSign = dateElement.querySelector('.x-sign');
                    if (xSign) {
                        xSign.remove();
                    }
                    localStorage.removeItem(key);
                    // Remove any additional class lists here if needed
                }
            }
        });

        // Check localStorage for saved selections on page load
        const dateText = dateElement.querySelector('.date_text');
        const date = dateText ? dateText.textContent : null;
        if (date) {
           
            let key;

            // Determine whether the date is from the previous month or next month
            if (dateElement.id === 'prev-month') {
                currentMonth === 0 ? (key = `${currentYear - 1}_12_${date}`) : (key = `${currentYear}_${currentMonth}_${date}`); //this makes sure so the days remain selected even if years overlap so jan an dec of a 2 dif years
            } else if (dateElement.id === 'next-month') {
                currentMonth === 11 ? (key = `${currentYear + 1}_1_${date}`) : (key = `${currentYear}_${currentMonth + 2}_${date}`); // Check for the previous month
            } else {
                key = `${currentYear}_${currentMonth+1}_${date}`; // Check for the current month
            }

            if (localStorage.getItem(key) === 'selected') {
                dateElement.classList.add('selected');
                dateElement.innerHTML += '<span class="x-sign">X</span>';
                // Add your additional class lists here as needed
            }
        }
    });
}
let currentMonth;
let currentYear;
function initializeDateControl() {
    
    const control = document.getElementById('control');
    if (control) { // Check if control element is found
        currentMonth = new Date().getMonth();
        currentYear = new Date().getFullYear();

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        document.getElementById('month').textContent = monthNames[currentMonth];
        document.getElementById('next_month').textContent = monthNames[currentMonth+1];
        document.getElementById('prev_month').textContent = monthNames[currentMonth-1];
        document.getElementById('year').textContent = currentYear;
        document.getElementById('next_year').textContent = currentYear+1;
        document.getElementById('prev_year').textContent = currentYear-1;
        generateDates(currentMonth + 1, currentYear);
        control.addEventListener('wheel', function(event) {
            event.preventDefault();
            const delta = Math.sign(event.deltaY); // Get scroll direction
           
            if (event.target.classList.contains('moncon')) {
                currentMonth -= delta;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                    document.getElementById('year').textContent = currentYear;
                    document.getElementById('next_year').textContent = currentYear+1;
                    document.getElementById('prev_year').textContent = currentYear-1;
                } else if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                    document.getElementById('year').textContent = currentYear;
                    document.getElementById('next_year').textContent = currentYear+1;
                    document.getElementById('prev_year').textContent = currentYear-1;
                }
                document.getElementById('month').textContent = monthNames[currentMonth];
                document.getElementById('next_month').textContent = monthNames[currentMonth+1];
                document.getElementById('prev_month').textContent = monthNames[currentMonth-1];
                generateDates(currentMonth + 1, currentYear);
                
            } else if (event.target.classList.contains('yearcon')) {
                currentYear -= delta;
                document.getElementById('year').textContent = currentYear;
                document.getElementById('next_year').textContent = currentYear+1;
                document.getElementById('prev_year').textContent = currentYear-1;
                generateDates(currentMonth + 1, currentYear);
               
            }
        });
    } else {
        console.error("Element with ID 'control' not found.");
    }
    
}

document.addEventListener('DOMContentLoaded', initializeDateControl);
document.addEventListener("DOMContentLoaded", function() {
    const addBtn = document.getElementById('add');
    const tasksDiv = document.getElementById('tasksdiv');
    const deleteBtn = document.getElementById('delete');
    const editBtn = document.getElementById('edit');

    addBtn.addEventListener('click', function() {
        const newTask = document.createElement('div');
        newTask.classList.add('task');
        newTask.innerHTML = '<span>New Habit</span>';
        tasksDiv.appendChild(newTask);
        });

        tasksDiv.addEventListener('click', function(event) {
            const selectedTask = event.target.closest('.task');
            if (selectedTask) {
                if (selectedTask.classList.contains('selectedtask')) {
                    
                } else {
                    const allTasks = document.querySelectorAll('.task');
                    allTasks.forEach(task => task.classList.remove('selectedtask'));
                    selectedTask.classList.add('selectedtask');
                }
            }
        });

        deleteBtn.addEventListener('click', function() {
            const selectedTask = document.querySelector('.task.selectedtask');
            if (selectedTask) {
                const nextTask = selectedTask.nextElementSibling || selectedTask.previousElementSibling;
                selectedTask.remove();
                if (nextTask) {
                    nextTask.classList.add('selectedtask');
                }
            }
        });

        editBtn.addEventListener('click', function() {
            const selectedTask = document.querySelector('.task.selectedtask');
            if (selectedTask) {
                const taskText = selectedTask.querySelector('span');
                const input = document.createElement('input');
                input.type = 'text';
                
                // Apply styles to the input field to match the span
                input.style.fontFamily = window.getComputedStyle(taskText).fontFamily;
                input.style.fontSize = window.getComputedStyle(taskText).fontSize;
                input.style.color = 'white';
                input.style.background = 'none';
                input.style.border = 'none';
                input.style.borderBottom = '1px solid white';
                input.style.outline = 'none';
        
                input.value = taskText.textContent;
                selectedTask.replaceChild(input, taskText);
        
                // Function to save the edited task name and put it in the initial span
                function saveTaskName() {
                    if (input.value.trim() === '') {
                        taskText.textContent = 'Habit';
                    } else {
                        taskText.textContent = input.value;
                    }
                    selectedTask.replaceChild(taskText, input);
                }
        
                input.addEventListener('keydown', function(event) {
                    if (event.key === 'Enter') {
                        event.preventDefault(); 
                        saveTaskName();
                    }
                });
        
                input.addEventListener('blur', function() {
                    saveTaskName();
                });
        
                input.focus(); // Focus on the input field when editing starts
            }
        });
    });
    function scrollToCurrentDate() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
    
        generateDates(currentMonth, currentYear);
        addEventListeners(); // Reattach event listeners after generating dates
        addTasksEventListeners(); // Reattach event listeners for tasks
    }
    
    document.addEventListener("DOMContentLoaded", function() {
        const todaySpan = document.getElementById('today');
        todaySpan.addEventListener('click', scrollToCurrentDate);
    });