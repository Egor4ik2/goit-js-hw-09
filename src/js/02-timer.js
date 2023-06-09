import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const datePicker = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      window.alert("Please choose a date in the future");
      return;
    }

    const startButton = document.querySelector("[data-start]");
    startButton.removeAttribute("disabled");
  },
});

const startButton = document.querySelector("[data-start]");
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

let countdownInterval;

function startCountdown() {
  const selectedDate = datePicker.selectedDates[0];

  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const difference = selectedDate -  currentTime;

    if (currentTime >= selectedDate) {
      clearInterval(countdownInterval);
      updateTimerDisplay(convertMs(0));
      return;
    }

    const timeRemaining = selectedDate - currentTime;
    updateTimerDisplay(convertMs(timeRemaining));
  }, 1000);
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysElement.textContent = formatTimeUnit(days);
  hoursElement.textContent = formatTimeUnit(hours);
  minutesElement.textContent = formatTimeUnit(minutes);
  secondsElement.textContent = formatTimeUnit(seconds);
}

function formatTimeUnit(timeUnit) {
  return timeUnit.toString().padStart(2, "0");
}

startButton.addEventListener("click", startCountdown);
