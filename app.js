// Check for service worker support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js') // Ensure this path is correct
            .then(function(registration) {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(function(error) {
                console.log('Service Worker registration failed:', error);
            });
    });
}

const moodForm = document.getElementById('moodForm');
const moodList = document.getElementById('moodList');
let moods = [];

// Load last 10 readings from local storage
function loadMoods() {
    const storedMoods = JSON.parse(localStorage.getItem('moods')) || [];
    moods = storedMoods.slice(-10); // Keep only the last 10 readings
    renderMoods();
}

// Render moods to the list
function renderMoods() {
    moodList.innerHTML = '';
    moods.forEach(mood => {
        const li = document.createElement('li');
        li.textContent = mood;
        moodList.appendChild(li);
    });
}

// Handle form submission
moodForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const moodInput = document.getElementById('moodInput');
    const moodValue = moodInput.value;
    moods.push(moodValue);
    localStorage.setItem('moods', JSON.stringify(moods));
    renderMoods();
    moodInput.value = ''; // Clear the input field
});

// Load moods when the app starts
loadMoods();
