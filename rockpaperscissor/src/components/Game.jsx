import React, { useState, useEffect } from 'react';

const choices = ['Rock', 'Paper', 'Scissors'];

const getRandomChoice = () => {
  return choices[Math.floor(Math.random() * choices.length)];
};

const determineWinner = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) return 'Draw';
  if (
    (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
    (playerChoice === 'Paper' && computerChoice === 'Rock') ||
    (playerChoice === 'Scissors' && computerChoice === 'Paper')
  ) {
    return 'Win';
  }
  return 'Lose';
};

const Game = () => {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });

  const handlePlayerChoice = (choice) => {
    const compChoice = getRandomChoice();
    const gameResult = determineWinner(choice, compChoice);
    
    setPlayerChoice(choice);
    setComputerChoice(compChoice);
    setResult(gameResult);

    if (gameResult === 'Win') {
      setScore({ ...score, wins: score.wins + 1 });
    } else if (gameResult === 'Lose') {
      setScore({ ...score, losses: score.losses + 1 });
    } else {
      setScore({ ...score, draws: score.draws + 1 });
    }
  };

  const resetGame = () => {
    setPlayerChoice('');
    setComputerChoice('');
    setResult('');
    setScore({ wins: 0, losses: 0, draws: 0 });
  };

  useEffect(() => {
    const savedScore = JSON.parse(localStorage.getItem('score'));
    if (savedScore) {
      setScore(savedScore);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('score', JSON.stringify(score));
  }, [score]);

  return (
    <div>
      <h1>Rock, Paper, Scissors</h1>
      <div>
        {choices.map((choice) => (
          <button key={choice} onClick={() => handlePlayerChoice(choice)}>
            {choice}
          </button>
        ))}
      </div>
      {playerChoice && (
        <div>
          <h2>Your choice: {playerChoice}</h2>
          <h2>Computer's choice: {computerChoice}</h2>
          <h2>Result: {result}</h2>
        </div>
      )}
      <div>
        <h3>Scoreboard</h3>
        <p>Wins: {score.wins}</p>
        <p>Losses: {score.losses}</p>
        <p>Draws: {score.draws}</p>
      </div>
      <button onClick={resetGame}>Restart</button>
    </div>
  );
};

export default Game;
