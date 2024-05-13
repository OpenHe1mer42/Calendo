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
}

// Weekday names array
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Generate dates for May 2024
generateDates(5, 2024);

Start();


function Start() {
    

}
