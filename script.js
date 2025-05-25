let steps = 0;
let distance = 0; // in meters
let calories = 0; // in kcal

const stepCountEl = document.getElementById("stepCount");
const distanceEl = document.getElementById("distance");
const caloriesEl = document.getElementById("calories");

const chartCtx = document.getElementById('chart').getContext('2d');
const stepChart = new Chart(chartCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Steps Over Time',
      data: [],
      backgroundColor: 'rgba(40, 167, 69, 0.2)',
      borderColor: '#28a745',
      borderWidth: 2,
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Time' } },
      y: { beginAtZero: true }
    }
  }
});

function updateUI() {
  stepCountEl.textContent = steps;
  distance = (steps * 0.8).toFixed(2); // assuming 0.8m per step
  calories = (steps * 0.04).toFixed(2); // approx 0.04 kcal per step

  distanceEl.textContent = distance;
  caloriesEl.textContent = calories;

  const time = new Date().toLocaleTimeString();
  stepChart.data.labels.push(time);
  stepChart.data.datasets[0].data.push(steps);
  stepChart.update();
}

function simulateStep() {
  steps += 1;
  updateUI();
}

// Optionally listen to device motion (experimental & not accurate for step count)
if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', function (event) {
    const acc = event.accelerationIncludingGravity;
    const totalAcc = Math.abs(acc.x) + Math.abs(acc.y) + Math.abs(acc.z);
    if (totalAcc > 20) {
      steps++;
      updateUI();
    }
  });
}
