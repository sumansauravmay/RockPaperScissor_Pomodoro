import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { Button, Stack, Center, Image, Heading, Box, Text } from '@chakra-ui/react';

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
    const toast = useToast()
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
      toast({
        title: 'Congratulation!',
        description: "You won!",
        status: 'success',
        duration: 2000,
        isClosable: true,
         position:'top'
      })
    } else if (gameResult === 'Lose') {
      setScore({ ...score, losses: score.losses + 1 });
      toast({
        title: 'You lose!',
        description: "Better luck next time!",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position:'top'
      })
    } else {
      setScore({ ...score, draws: score.draws + 1 });
      toast({
        title: 'Game Draw!',
        description: "Better luck next time!",
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position:'top'
      })
    }
  };

  const resetGame = () => {
    setPlayerChoice('');
    setComputerChoice('');
    setResult('');
    setScore({ wins: 0, losses: 0, draws: 0 });
    toast({
        title: 'Reset done!',
        description: "Start the game again!",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position:'top'
      })
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
    <Box bgGradient='linear(to-r, gray.300, yellow.400, pink.200)' mb={'20px'}>
      <Heading as='h1' size='4xl' mb={10}>Welcome to Rock, Paper, Scissors Game!</Heading>
      <Center>
      <Image width={'50%'} src='https://cdn.pixabay.com/photo/2013/07/12/15/02/fingers-149296_1280.png' alt='Dan Abramov' />
      </Center>
      
      <Center>
      <Stack pacing={8} direction='row' mt={20}>
        {choices.map((choice) => (
          <Button colorScheme='blue' key={choice} onClick={() => handlePlayerChoice(choice)}>
            {choice}
          </Button>
        ))}
      </Stack>
      </Center>
      {playerChoice && (
        <div>
          <Heading size='md' mt={'20px'}>Your choice: {playerChoice}</Heading>
          <Heading size='md' mt={'10px'}>Computer's choice: {computerChoice}</Heading>
          <Heading size='xl' mt={'20px'} color={'blue.500'}>Result: {result}</Heading>
        </div>
      )}
      <Box>
        <Heading size='lg' mt={'20px'}>Scoreboard</Heading>
        <Text mt={'10px'}>Wins: {score.wins}</Text>
        <Text mt={'10px'}>Losses: {score.losses}</Text>
        <Text mt={'10px'}>Draws: {score.draws}</Text>
      </Box>
      <Button mt={'20px'} mb={'2px'} colorScheme='teal' variant='solid' onClick={resetGame}>Restart</Button>
    </Box>
  );
};

export default Game;




