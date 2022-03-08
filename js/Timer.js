export default function Timer() {
  const deadline = "2022-03-18";

  function getTimeRemaining(timeOff) {
    const totalTime = Date.parse(timeOff) - Date.parse(new Date()),
      days = Math.floor(totalTime / (1000 * 60 * 60 * 24)),
      hours = Math.floor((totalTime / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((totalTime / (1000 * 60)) % 60),
      seconds = Math.floor((totalTime / 1000) % 60);

    return {
      total: totalTime,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function setZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setTimer(selector, timeOff) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateTimer, 1000);

    updateTimer();

    function updateTimer() {
      const remainingTime = getTimeRemaining(timeOff);

      days.innerHTML = setZero(remainingTime.days);
      hours.innerHTML = setZero(remainingTime.hours);
      minutes.innerHTML = setZero(remainingTime.minutes);
      seconds.innerHTML = setZero(remainingTime.seconds);

      if (remainingTime.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setTimer(".timer", deadline);
}
