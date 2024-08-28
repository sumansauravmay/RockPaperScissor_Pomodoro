import React, { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import {
  Button,
  Center,
  Image,
  Heading,
  Box,
  Flex,
  Input,
} from "@chakra-ui/react";

const PomodoroApp = () => {
  const toast = useToast();
  const [time, setTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(300);
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
      toast({
        title: "Break time start!",
        description: "it's break time!",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } else if (time === 0 && isBreak) {
      setIsBreak(false);
      setTime(1500);
      toast({
        title: "Work time start!",
        description: "it's time to Work",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }

    return () => clearInterval(timer);
  }, [isRunning, time, isBreak, breakTime]);

  const toggleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTime(1500);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Box bgGradient="linear(to-r, gray.300, yellow.400, pink.200)" mb={"20px"}>
      <Heading as="h1" size="4xl" mb={10}>
        Pomodoro Timer!
      </Heading>
      <Center>
        <Image
          height={"350px"}
          src="https://i.postimg.cc/qRYvhCn7/pomodoro.jpg"
          alt="Dan Abramov"
        />
      </Center>
      <div style={{ fontSize: "48px" }}>{formatTime(time)}</div>
      <Center>
        <Flex gap={10} mt={"20px"}>
          <Button colorScheme="blue" onClick={toggleStartStop}>
            {isRunning ? "Stop" : "Start"}
          </Button>
          <Button colorScheme="green" onClick={resetTimer}>
            Reset
          </Button>
        </Flex>
      </Center>

      <Center>
        <Heading size={"sm"} mt={"20px"}>
          Work Time (in minutes):
        </Heading>
        <Input
          width={"20%"}
          borderColor={"green.500"}
          mt={"10px"}
          type="number"
          value={time / 60}
          onChange={(e) => setTime(e.target.value * 60)}
        />
      </Center>

      <br />
      <Center>
        <Heading size={"sm"}>Break Time (in minutes):</Heading>
        <Input
          width={"20%"}
          borderColor={"green.500"}
          mt={"10px"}
          type="number"
          value={breakTime / 60}
          onChange={(e) => setBreakTime(e.target.value * 60)}
        />
      </Center>
     {/* progress indicator or icon */}
      <div style={{ marginTop: "20px" }}>
        <progress value={1500 - time} max={1500}></progress>
      </div>
    </Box>
  );
};

export default PomodoroApp;
