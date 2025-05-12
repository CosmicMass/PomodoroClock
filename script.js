document.addEventListener('DOMContentLoaded', () => {
  let workMinutes = 25;
  let breakMinutes = 5;
  let isBreak = false;
  let timer;
  let timeLeft = workMinutes * 60;

  const timerDisplay = document.getElementById('timer');
  const statusDisplay = document.getElementById('status');
  const startBtn = document.getElementById('start');
  const pauseBtn = document.getElementById('pause');
  const resetBtn = document.getElementById('reset');
  const themeBtn = document.getElementById('theme-toggle');
  const applySettingsBtn = document.getElementById('apply-settings');
  const workInput = document.getElementById('work-minutes');
  const breakInput = document.getElementById('break-minutes');
  const finishSound = new Audio('ding.mp3'); 

  function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function startTimer() {
    if (!timer) {
      timer = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          updateDisplay();
        } else {
          clearInterval(timer);
          timer = null;
          isBreak = !isBreak;
          timeLeft = (isBreak ? breakMinutes : workMinutes) * 60;
          statusDisplay.textContent = isBreak ? 'Session: Break' : 'Session: Work';
          updateDisplay();
          finishSound.play(); 
          startTimer(); 
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timer);
    timer = null;
  }

  function resetTimer() {
    pauseTimer();
    isBreak = false;
    timeLeft = workMinutes * 60;
    statusDisplay.textContent = 'Session: Work';
    updateDisplay();
  }

  // Theme toggle
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeBtn.textContent = '☀️ Light Mode';
  } else {
    themeBtn.textContent = '🌙 Dark Mode';
  }

  // Apply custom work/break times
  applySettingsBtn.addEventListener('click', () => {
    const work = parseInt(workInput.value);
    const brk = parseInt(breakInput.value);
    if (work > 0 && brk > 0) {
      workMinutes = work;
      breakMinutes = brk;
      resetTimer();
    }
  });

  // Button event listeners
  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  resetBtn.addEventListener('click', resetTimer);

  updateDisplay(); // Initial display
});
