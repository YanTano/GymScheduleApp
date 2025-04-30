// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAS7gU_hxP7wg-o9U-yuOG7DBvSGX-nmho",
  authDomain: "test-bb3a7.firebaseapp.com",
  projectId: "test-bb3a7",
  storageBucket: "test-bb3a7.firebasestorage.app",
  messagingSenderId: "827643014422",
  appId: "1:827643014422:web:88f632db76145f2ce37437",
  measurementId: "G-F0WHHE0754"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

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
        <td>${duration} hours</td>
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
        // Save workout to Firestore
        db.collection('workouts').add({
            name: workoutName,
            date: workoutDate,
            duration: workoutDuration
        }).then(() => {
            // After successful addition, load the workouts
            loadWorkouts();

            // Clear the form inputs
            workoutNameInput.value = '';
            workoutDateInput.value = '';
            workoutDurationInput.value = '';
        }).catch((error) => {
            console.error("Error adding workout: ", error);
        });
    }
});

// Function to load workouts from Firestore
function loadWorkouts() {
    // Clear the table first
    scheduleTableBody.innerHTML = '';

    // Fetch workouts from Firestore
    db.collection('workouts').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const workout = doc.data();
            addWorkoutToSchedule(workout.name, workout.date, workout.duration);
        });
    }).catch((error) => {
        console.error("Error loading workouts: ", error);
    });
}

// Load workouts when the page loads
loadWorkouts();
