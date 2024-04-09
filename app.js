const crrTime = document.querySelector(".currentTime");
const hoursDropDown = document.querySelector("#hours");
const minutesDropDown = document.querySelector("#minutes");
const secondsDropDown = document.querySelector("#seconds");
const amPmDropDown = document.querySelector("#am_pm");
const alarmButton = document.querySelector(".setAlarm");
const alarmSection = document.querySelector(".alarms");

// values to be initialized in the start
dropDownMenu(0, 12, hoursDropDown);
dropDownMenu(0, 59, minutesDropDown);
dropDownMenu(0, 59, secondsDropDown);
setInterval(currentTimeChanger, 1000);

// current time display
function currentTimeChanger() {
  let currTime = new Date();
  let hours = currTime.getHours();
  let minutes = String(currTime.getMinutes()).padStart(2, "0");
  let seconds = String(currTime.getSeconds()).padStart(2, "0");
  let AmPm = "AM";
  if (hours >= 12) {
    AmPm = "PM";
    if (hours > 12) {
      hours = hours - 12;
    }
  }
  hours = String(hours).padStart(2, "0");
  crrTime.textContent = `${hours}:${minutes}:${seconds} ${AmPm}`;
  return crrTime.textContent;
}

// select dropdown
function dropDownMenu(start, end, element) {
  for (let i = start; i <= end; i++) {
    const dropDownList = document.createElement("option");
    dropDownList.value = i < 10 ? "0" + i : i;
    dropDownList.innerHTML = i < 10 ? "0" + i : i;
    element.appendChild(dropDownList);
  }
}

alarmButton.addEventListener("click", getInput);

// Converting time to 24 hour format
function convertTime(hour, minute, second, AmPm) {
  return `${hour}:${minute}:${second} ${AmPm}`;
}

// getInput on set alarm button click function

function getInput(e) {
  e.preventDefault();
  const hourValue = hoursDropDown.value;
  const minuteValue = minutesDropDown.value;
  const secondValue = secondsDropDown.value;
  const amPmValue = amPmDropDown.value;
  const alarmTime = convertTime(hourValue, minuteValue, secondValue, amPmValue);

  let alarmDiv = document.createElement("div");
  alarmDiv.classList.add("alarm");
  alarmDiv.innerHTML = `
              <span>
                ${alarmTime}
              </span>
              <button class="delete">
                Delete
              </button>
          `;

  const alarm = setInterval(() => {
    if (alarmTime == currentTimeChanger()) {
      alert("Hello, its time to wake up!");
      alarmDiv.remove();
      clearInterval(alarm);
    }
    // console.log("tick tock");
  }, 1000);

  alarmDiv.querySelector(".delete").addEventListener("click", () => {
    alarmDiv.remove();
    clearInterval(alarm);
  });
  alarmSection.appendChild(alarmDiv);
}
