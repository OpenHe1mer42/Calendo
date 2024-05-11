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
    for (let i = 1; i <= days; i++) {
        const date = new Date(year, month - 1, i);
        const dayIndex = date.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        html += `<div class="date">
                    <div>
                    <span class="date_text">${i}</span>
                    <span class="day_text">${daysOfWeek[dayIndex]}</span>
                    </div>
                    <div></div>
                 </div>`;
    }

    // Append HTML to calendar
    calendarDiv.innerHTML = html;
}

// Generate dates for May 2024
generateDates(5, 2024);