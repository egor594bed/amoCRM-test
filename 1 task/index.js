const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

const createTimerAnimator = () => {
  return (seconds) => {
    class Time {
      constructor(timeStr) {
        this.seconds = Math.floor(Number(timeStr) % 60);
        this.minutes = Math.floor((Number(timeStr) / 60) % 60);
        this.hours = Math.floor((Number(timeStr) / (60 * 60)) % 24);
        if (this.seconds < 10) this.seconds = "0" + this.seconds;
        if (this.minutes < 10) this.minutes = "0" + this.minutes;
        if (this.hours < 10) this.hours = "0" + this.hours;
      }

      timerTick() {
        if (this.minutes == 0 && this.seconds == 0 && this.hours > 0) {
          this.seconds = 59;
          this.minutes = 59;
          this.hours--;
          if (this.hours < 10) this.hours = "0" + this.hours;
          return;
        }

        if (this.seconds == 0) {
          this.seconds = 59;
          this.minutes--;
          if (this.minutes < 10) this.minutes = "0" + this.minutes;
          return;
        }

        this.seconds--;
        if (this.seconds < 10) this.seconds = "0" + this.seconds;
      }
    }

    const timer = new Time(seconds);
    timerEl.innerHTML = `${timer.hours}:${timer.minutes}:${timer.seconds}`;

    const interval = setInterval(() => {
      if (timer.minutes == 0 && timer.seconds == 0 && timer.hours == 0) {
        clearInterval(interval);
        return;
      }
      timer.timerTick();
      timerEl.innerHTML = `${timer.hours}:${timer.minutes}:${timer.seconds}`;
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", (e) => {
  let checkedValue = "";

  for (let i = 0; i < e.target.value.length; i++) {
    if (/^[0-9]+$/.test(e.target.value[i])) {
      checkedValue = checkedValue + e.target.value[i];
    }
  }

  inputEl.value = checkedValue;
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});
