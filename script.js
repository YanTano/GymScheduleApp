import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGjuBH1RPOJpYVYnCHOHE9fviee6jsXBM",
  authDomain: "gym-schedule-plan.firebaseapp.com",
  projectId: "gym-schedule-plan",
  storageBucket: "gym-schedule-plan.firebasestorage.app",
  messagingSenderId: "159265115144",
  appId: "1:159265115144:web:0a0dbd063dc2235b8215bd",
  measurementId: "G-TQ53SX12VY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
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
workoutForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    // Get input values
    const workoutName = workoutNameInput.value;
    const workoutDate = workoutDateInput.value;
    const workoutDuration = workoutDurationInput.value;

    if (workoutName && workoutDate && workoutDuration) {
        // Save workout to Firestore
        try {
            await addDoc(collection(db, 'workouts'), {
                name: workoutName,
                date: workoutDate,
                duration: workoutDuration
            });

            // After successful addition, load the workouts
            loadWorkouts();

            // Clear the form inputs
            workoutNameInput.value = '';
            workoutDateInput.value = '';
            workoutDurationInput.value = '';
        } catch (error) {
            console.error("Error adding workout: ", error);
        }
    }
});

// Function to load workouts from Firestore
async function loadWorkouts() {
    // Clear the table first
    scheduleTableBody.innerHTML = '';

    try {
        const snapshot = await getDocs(collection(db, 'workouts'));
        snapshot.forEach((doc) => {
            const workout = doc.data();
            addWorkoutToSchedule(workout.name, workout.date, workout.duration);
        });
    } catch (error) {
        console.error("Error loading workouts: ", error);
    }
}

// Load workouts when the page loads
loadWorkouts();

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
