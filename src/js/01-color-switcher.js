
let intervalId;

function startColorChange() {
  const startButton = document.getElementById("startButton");
  const stopButton = document.getElementById("stopButton");
  startButton.disabled = true;
  stopButton.disabled = false;

  intervalId = setInterval(() => {
    const body = document.body;
    const randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
  }, 1000);
}

function stopColorChange() {
  const startButton = document.getElementById("startButton");
  const stopButton = document.getElementById("stopButton");
  startButton.disabled = false;
  stopButton.disabled = true;

  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

document.getElementById("startButton").addEventListener("click", startColorChange);
document.getElementById("stopButton").addEventListener("click", stopColorChange);
