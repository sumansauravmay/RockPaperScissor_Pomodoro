import React, { useState, useEffect } from 'react';

const PomodoroApp = () => {
  const [time, setTime] = useState(60); // 25 minutes in seconds
  const [breakTime, setBreakTime] = useState(300); // 5 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(timer);
    }

    if (time === 0 && !isBreak) {
      setIsBreak(true);
      setTime(breakTime);
    } else if (time === 0 && isBreak) {
      setIsBreak(false);
      setTime(60); // Reset to work session
    }

    return () => clearInterval(timer);
  }, [isRunning, time, isBreak, breakTime]);

  const toggleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTime(60); // Reset to 25 minutes
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <div style={{ fontSize: '48px' }}>{formatTime(time)}</div>
      <div>
        <button onClick={toggleStartStop}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div>
        <label>Work Time (minutes):</label>
        <input
          type="number"
          value={time / 60}
          onChange={(e) => setTime(e.target.value * 60)}
        />
      </div>
      <div>
        <label>Break Time (minutes):</label>
        <input
          type="number"
          value={breakTime / 60}
          onChange={(e) => setBreakTime(e.target.value * 60)}
        />
      </div>
      {/* Progress Indicator */}
      <div>
        <progress value={60 - time} max={60}></progress>
      </div>
    </div>
  );
};

export default PomodoroApp;
