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

    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

    // Calculate the number of days from the previous month to display
    const daysFromPrevMonth = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); // Number of days to display from the previous month
    const prevMonth = month === 1 ? 12 : month - 1; // Previous month
    const prevYear = month === 1 ? year - 1 : year; // Year of the previous month
    const daysInPrevMonth = daysInMonth(prevMonth, prevYear); // Total days in the previous month

    // Generate dates from the previous month
    for (let i = daysInPrevMonth - daysFromPrevMonth + 1; i <= daysInPrevMonth; i++) {
        const date = new Date(year, month - 2, i);
        const dayIndex = date.getDay();
        html += `<div class="date prev-month"><div>
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
        if (dayIndex === 1 && i !== 1) {
            html += `</div><div class="week">`; // Start a new row for Monday
        }
        html += `<div class="date">
        <div>
        <span class="date_text">
        ${i}</span>
        <br>
        <span class="day_text">${dayNames[dayIndex]}</span></div>
        </div>`; // Include day of the week
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
        html += `<div class="date prev-month"><div>
        <span class="date_text">
        ${i}</span>
        <br>
        <span class="day_text">${dayNames[dayIndex]}</span></div>
        </div>`;
    }

    // Append HTML to calendar
    calendarDiv.innerHTML = `<div class="week">${html}</div>`;
    addEventListeners()
}

// Weekday names array
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Generate dates for May 2024
// Function to add event listeners to date elements
// Function to add event listeners to date elements and handle localStorage
function addEventListeners() {
    const dateElements = document.querySelectorAll('.date');

    dateElements.forEach(dateElement => {
        dateElement.addEventListener('click', () => {
            dateElement.classList.toggle('selected');
            const dateText = dateElement.querySelector('.date_text');
            const date = dateText ? dateText.textContent : null;
            if (date) {
          
                const monthElement = document.querySelector('.moncon');
                const yearElement = document.querySelector('.yearcon');
                const yearmonth = yearElement ? yearElement.textContent : '';
                const monthYear = monthElement ? monthElement.textContent : '';
                const key = `${yearmonth}_${monthYear}_${date}`; // Unique key for each date
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
            
            const monthElement = document.querySelector('.moncon');
            const yearElement = document.querySelector('.yearcon');
            const yearmonth = yearElement ? yearElement.textContent : '';
            const monthYear = monthElement ? monthElement.textContent : '';
            const key = `${yearmonth}_${monthYear}_${date}`; // Unique key for each date
            if (localStorage.getItem(key) === 'selected') {
                dateElement.classList.add('selected');
            
                dateElement.innerHTML += '<span class="x-sign">X</span>';
                // Add your additional class lists here as needed
            }
        }
    });
}

function initializeDateControl() {
    
    const control = document.getElementById('control');
    if (control) { // Check if control element is found
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();

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
                } else if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
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
