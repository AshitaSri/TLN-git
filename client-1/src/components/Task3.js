import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Task3.css';

const FillInBlanksGame = () => {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [questionIndex, setQuestionIndex] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const generateRandomNumbers = () => {
      setNumber1(Math.floor(Math.random() * 10) + 1);
      setNumber2(Math.floor(Math.random() * 10) + 1);
      setUserAnswer('');
      setResultMessage('');
    };

    if (questionIndex <= 5 && gameStarted && !gameOver) {
      generateRandomNumbers();
    } else if (gameStarted && !gameOver) {
      // Set the game over state when the game is started, but questions are finished
      handleEndGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionIndex, gameOver, gameStarted]);

  const handleEndGame = () => {
    setGameOver(true);
    setResultMessage(`Game Over! Your Final Score: ${correctAnswers}/${questionIndex - 1}`);
  };

  const handleInputChange = (event) => {
    const enteredValue = event.target.value.replace(/[^0-9]/g, '');
    setUserAnswer(enteredValue);
  };

  const handleCheckAnswer = () => {
    const answer = parseInt(userAnswer, 10);
    const correctAnswer = number1 + number2;

    if (!isNaN(answer)) {
      if (answer === correctAnswer) {
        setResultMessage(`Correct! ${number1} + ${number2} = ${correctAnswer}`);
        setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
      } else {
        setResultMessage('Oops! Try again.');
      }
    } else {
      setResultMessage('Please enter a valid number.');
    }
  };

  const handleNextQuestion = () => {
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (resultMessage === '') {
        handleCheckAnswer();
      } else {
        handleNextQuestion();
      }
    }
  };

  const handleReplay = async() => {
    try {
      const token = localStorage.getItem('token');
  
      // Send a request to the server to update task3
      const response = await fetch('http://localhost:5000/updateTask3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the JWT token in the headers
        },
      });
  
      if (response.ok) {
        console.log('Task3 updated successfully');
      } else {
        console.error('Failed to update Task1');
      }
  
      // Use navigate to go back to the dashboard or any other route
      
    } catch (error) {
      console.error('Error updating Task3:', error);
    }
    setGameOver(false);
    setQuestionIndex(1);
    setCorrectAnswers(0);
  };


  const handleBack = async () => {
    try {
      const token = localStorage.getItem('token');
  
      // Send a request to the server to update task3
      const response = await fetch('http://localhost:5000/updateTask3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the JWT token in the headers
        },
      });
  
      if (response.ok) {
        console.log('Task3 updated successfully');
      } else {
        console.error('Failed to update Task1');
      }
  
      // Use navigate to go back to the dashboard or any other route
      
    } catch (error) {
      console.error('Error updating Task3:', error);
    }
    navigate('/dashboard');
  };


  return (
    <div className="fill-in-blanks-container">
      <div className="game-description">
        {!gameStarted && !gameOver && (
          <div>
            <h1>Fill in the Blanks Game</h1>
            <p>
              Test your addition skills by completing the equations. Enter the correct sum and
              proceed to the next question. Can you get them all right?
            </p>
            <button onClick={() => setGameStarted(true)}>Start Game</button>
          </div>
        )}
      </div>

      <div className="question-container">
        {gameStarted && !gameOver && (
          <div>
            <p>Question {questionIndex}:</p>
            <p>
              {number1} + {number2} = ?
            </p>
            <input
              type="text"
              value={userAnswer}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Your answer"
            />
            <button onClick={handleCheckAnswer}>Check Answer</button>
            <div className="result-message">{resultMessage}</div>
            {resultMessage && questionIndex <= 5 && (
              <button className="next-question" onClick={handleNextQuestion}>
                Next Question
              </button>
            )}
          </div>
        )}

        {gameOver && (
          <div>
            <p>{resultMessage}</p>
            <button onClick={handleReplay}>Replay</button>
            <button onClick={handleBack}>Back to Dashboard</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FillInBlanksGame;