// Get references to DOM elements
const workoutForm = document.getElementById('workout-form');
const workoutNameInput = document.getElementById('workout-name');
const workoutDateInput = document.getElementById('workout-date');
const workoutDurationInput = document.getElementById('workout-duration');
const scheduleTableBody = document.querySelector('#schedule-table tbody');

// Function to create a new row in the schedule table
function addWorkoutToSchedule(name, date, duration) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${name}</td>
        <td>${date}</td>
        <td>${duration} min</td>
    `;

    scheduleTableBody.appendChild(row);
}

// Handle form submission
workoutForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const workoutName = workoutNameInput.value;
    const workoutDate = workoutDateInput.value;
    const workoutDuration = workoutDurationInput.value;

    if (workoutName && workoutDate && workoutDuration) {
        addWorkoutToSchedule(workoutName, workoutDate, workoutDuration);

        // Clear the form inputs
        workoutNameInput.value = '';
        workoutDateInput.value = '';
        workoutDurationInput.value = '';
    }
});
