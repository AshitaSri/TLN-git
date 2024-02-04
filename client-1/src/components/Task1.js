import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Task1.css';

const SmallestNumberGame = () => {
  const [numbers, setNumbers] = useState([]);
  const [result, setResult] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate(); // Get the navigate function here

  useEffect(() => {
    if (gameStarted) {
      startNewSet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionIndex, gameStarted]);

  const startNewSet = () => {
    if (questionIndex === 5) {
      setEndTime(new Date());
      calculateScore();
    } else {
      const newNumbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100) + 1);
      setNumbers(newNumbers);
      setResult('');
      setShowResult(false);
      setStartTime(new Date());
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds % 60).toFixed(2);
    return `${minutes} min ${remainingSeconds} seconds`;
  };

  const checkSmallestNumber = (selectedNumber, selectedIndex) => {
    const isSmallest = numbers.every(
      (number, index) => index === selectedIndex || selectedNumber <= number
    );

    if (isSmallest) {
      setResult('YES! You are right!');
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
    } else {
      setResult('OOPS! You are wrong.');
    }

    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setQuestionIndex((prevIndex) => prevIndex + 1);
    }, 1000);
  };

  const calculateScore = () => {
    if (endTime) {
      const accuracy = (correctAnswers / 5) * 100;
      setResult(`Game Over! Your score: ${correctAnswers}/5\nAccuracy: ${accuracy.toFixed(0)}%`);
    }
  };

  const restartGame = async () => {
    // Increment task1 by 5 in the database
    try {
      const token = localStorage.getItem('token');
  
      // Send a request to the server to update task1
      const response = await fetch('http://localhost:5000/updateTask1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the JWT token in the headers
        },
      });
  
      if (response.ok) {
        console.log('Task1 updated successfully');
      } else {
        console.error('Failed to update Task1');
      }
  
      // Use navigate to go back to the dashboard or any other route
      
    } catch (error) {
      console.error('Error updating Task1:', error);
    }

    setQuestionIndex(0);
    setResult('');
    setCorrectAnswers(0);
    setStartTime(new Date());
    setEndTime(null);
    setGameStarted(true);
    setShowResult((prev) => !prev);
  };

  const goBack = async () => {
    try {
      const token = localStorage.getItem('token');
  
      // Send a request to the server to update task1
      const response = await fetch('http://localhost:5000/updateTask1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the JWT token in the headers
        },
      });
  
      if (response.ok) {
        console.log('Task1 updated successfully');
      } else {
        console.error('Failed to update Task1');
      }
  
      // Use navigate to go back to the dashboard or any other route
      
    } catch (error) {
      console.error('Error updating Task1:', error);
    }
    navigate('/dashboard');
  };



  return (
    <div className="game-container">
      {!gameStarted && (
        <div className="game-description">
          <h1>Select the Smallest Number</h1>
          <p>
            Test your skills by identifying the smallest number in each set of numbers. Click on
            the number you believe is the smallest. Can you get them all right?
          </p>
        </div>
      )}

      {gameStarted && questionIndex <= 4 && (
        <div>
          <p>Select the smallest number !</p>
          <div className="number-buttons">
            {numbers.map((number, index) => (
              <button key={index} onClick={() => checkSmallestNumber(number, index)}>
                {number}
              </button>
            ))}
          </div>
          <p>{showResult && result}</p>
        </div>
      )}

      {questionIndex === 5 && (
        <div>
          <p>Game Over!</p>
          {endTime && (
            <div>
              <p>Total time: {formatTime((endTime - startTime) / 1000)}</p>
              <p>Your score: {correctAnswers}/5</p>
              <p>Accuracy: {(correctAnswers / 5) * 100}%</p>
            </div>
          )}
          <button onClick={restartGame}>Restart Game</button>
          <button onClick={goBack}>Go Back</button>
        </div>
      )}

      {!gameStarted && (
        <div className="start-button-container">
          <button className="start-button" onClick={restartGame}>
            Start Game
          </button>
          
        </div>
      )}
    </div>
  );
};

export default SmallestNumberGame;