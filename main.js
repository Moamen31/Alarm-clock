let currentTime = document.querySelector(".time");
let setAlarmBtn = document.querySelector("button");
let selectMenu = document.querySelectorAll("select");
let alarmSettings = document.querySelector(".alarm-settings");



//global variable
let alarmTime = "";
let isAlarmTime = false;

//get the alarm audio
let alarmRingTone = new Audio("./alarm-ring-tone.mp3")

//set the options doe hours and mintes and AM or PM
for (let i = 12; i > 0; i--) {
    h = i < 10 ? `0${i}` : `${i}`;
    let hOption = `<option value="${h}">${h}</option>`;
    //insertAdjacentHTML takes a text and put it in the position we chose
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", hOption);
}
for (let i = 59; i >= 0; i--) {
    m = i < 10 ? `0${i}` : `${i}`;
    let mOption = `<option value="${m}">${m}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", mOption);
}
for (let i = 2; i > 0; i--) {
    let ampm = i === 1 ? "AM" : "PM";
    let ampmOption = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", ampmOption);
}


//set the clock
let getTime = setInterval(() => {
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    let second = new Date().getSeconds();
    let ampm = "AM";

    if (hour >= 12) {
        hour = hour - 12;
        ampm = "PM";
    }

    hour === 0 ? (hour = 12) : hour;

    hour = hour < 10 ? `0${hour}` : `${hour}`;
    minute = minute < 10 ? `0${minute}` : `${minute}`;
    second = second < 10 ? `0${second}` : `${second}`;

    currentTime.innerHTML = `${hour}:${minute}:${second} ${ampm}`;

    if (alarmTime == `${hour}:${minute} ${ampm}`) {
        //play the ringtone and loop it
        alarmRingTone.play();
        alarmRingTone.loop = true
    }
}, 1000);

function setAlarm() {

    if (isAlarmTime) { //true
        alarmTime = "";
        alarmSettings.classList.remove("disable");
        alarmRingTone.pause();
        setAlarmBtn.textContent = "Set Alarm";
        return isAlarmTime = false;
    }

    let wantedTime = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (
        wantedTime.includes("Hour") ||
        wantedTime.includes("Minute") ||
        wantedTime.includes("AM/PM")
    ) {
        return alert("Please Set The Time For Alarm");
    }

    isAlarmTime = true;
    alarmTime = wantedTime;

    alarmSettings.classList.add("disable");
    setAlarmBtn.textContent = "Clear Alarm";

    // console.log(wantedTime)
}

//btn function
setAlarmBtn.addEventListener("click", setAlarm)