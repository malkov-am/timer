const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  // Функция, переводящая секунды в формат ЧЧ:ММ:СС
  const formatTime = (seconds) => {
    const hoursLeft = Math.floor(seconds / 3600);
    const minutesLeft = Math.floor((seconds - hoursLeft * 3600) / 60);
    const secondsLeft = seconds - hoursLeft * 3600 - minutesLeft * 60;
    // Функция, добавляющая впереди 0, если число имеет всего 1 разряд
    const addZeroSymbol = (number) => {
      return number.toString().padStart(2, "0");
    };
    return `${addZeroSymbol(hoursLeft)}:${addZeroSymbol(
      minutesLeft
    )}:${addZeroSymbol(secondsLeft)}`;
  };

  let timerInterval = null;

  const stopTimer = () => {
    clearInterval(timerInterval);
    alert("Время вышло!");
  };

  const startTimer = (seconds) => {
    let timePassed = 0;
    let timeLeft = seconds;
    timerInterval = setInterval(() => {
      // Увеличиваем счетчик прошедшего времени на 1 секунду
      timePassed += 1;
      // Вычисляем оставшееся время
      timeLeft = seconds - timePassed;
      // Отрисовываем остаток времени на странице
      timerEl.textContent = formatTime(timeLeft);
      // Останавливаем таймер по истечению времени
      timeLeft === 0 && stopTimer();
    }, 1000);
  };

  return (seconds) => {
    startTimer(seconds);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});
