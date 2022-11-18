import { TIMER_MAX_LIMIT } from "./constants.js";

const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  // Функция, переводящая секунды в строку формата ЧЧ:ММ:СС
  const formatTime = (seconds) => {
    // Конвертируем секунды в часы, минуты и секунды
    const hoursLeft = Math.floor(seconds / 3600);
    const minutesLeft = Math.floor((seconds - hoursLeft * 3600) / 60);
    const secondsLeft = seconds - hoursLeft * 3600 - minutesLeft * 60;
    // Вспомогательная функция, добавляющая впереди 0, если число имеет всего 1 разряд
    const addZeroSymbol = (number) => number.toString().padStart(2, "0");
    // Возвращаем строку формата ЧЧ:ММ:СС
    return `${addZeroSymbol(hoursLeft)}:${addZeroSymbol(minutesLeft)}:${addZeroSymbol(secondsLeft)}`;
  };
  // Переменная для проверки, запущен ли таймер, чтобы не запустить 2 таймера одновременно
  let isTimerRunning = false;
  // Объявим переменную для таймера, чтобы можно было его остановить по завершении
  let timerInterval = null;
  // Функция остановки таймера
  const stopTimer = () => {
    clearInterval(timerInterval);
    isTimerRunning = false;
  };
  // Функция запуска таймера
  const startTimer = (seconds) => {
    // Если таймер работает, остановить старый таймер
    isTimerRunning && stopTimer();
    let timePassed = 0;
    let timeLeft = seconds;
    isTimerRunning = true;
    timerInterval = setInterval(() => {
      // Увеличиваем счетчик прошедшего времени на 1 секунду
      timePassed += 1;
      // Вычисляем оставшееся время
      timeLeft = seconds - timePassed;
      // Отрисовываем остаток времени на странице
      timerEl.textContent = formatTime(timeLeft);
      // Останавливаем таймер по истечении времени
      timeLeft === 0 && stopTimer();
    }, 1000);
  };
  // Возвращаем функцию таймера
  return (seconds) => {
    startTimer(seconds);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  // Очистите input так, чтобы в значении
  // оставались только числа

  // Можно было бы просто задать инпуту type="number"
  if (/\D/.test(inputEl.value)) {
    inputEl.value = inputEl.value.replace(/\D/g, "");
  }
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  // Защитим таймер от переполнения, зададим максимально возможное для ввода время 99:59:59
  seconds < TIMER_MAX_LIMIT
    ? animateTimer(seconds)
    : animateTimer(TIMER_MAX_LIMIT);

  inputEl.value = "";
});
