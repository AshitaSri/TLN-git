import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Task2.css';

const MatchingGame = () => {
  const navigate = useNavigate();
  const allPairs = [
    { fruit: 'Apple', color: 'Red' },
    { fruit: 'Banana', color: 'Yellow' },
    { fruit: 'Cherry', color: 'Red' },
    { fruit: 'Grapes', color: 'Green' },
    { fruit: 'Oranges', color: 'Orange' },
    { fruit: 'Kiwi', color: 'Brown' },
    { fruit: 'Strawberry', color: 'Red' },
    { fruit: 'Watermelon', color: 'Green' },
    { fruit: 'Pineapple', color: 'Yellow' },
    { fruit: 'Mango', color: 'Yellow-Orange' },
  ];

  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const getRandomSet = () => {
    const shuffledPairs = shuffleArray(allPairs);
    const selectedPairs = shuffledPairs.slice(0, 4);
    const shuffledFruits = shuffleArray(selectedPairs.map((pair) => pair.fruit));
    const shuffledColors = shuffleArray(selectedPairs.map((pair) => pair.color));

    return {
      pairs: selectedPairs,
      fruits: shuffledFruits,
      colors: shuffledColors,
    };
  };

  const [feedback, setFeedback] = useState('');
  const [matches, setMatches] = useState([]);
  const [colorOrder, setColorOrder] = useState([]);
  const [gameSet, setGameSet] = useState(getRandomSet());

  const handleDragStart = (event, fruit) => {
    event.dataTransfer.setData('fruit', fruit);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, color) => {
    event.preventDefault();

    const droppedFruit = event.dataTransfer.getData('fruit');
    const isCorrectMatch = gameSet.pairs.some((pair) => pair.fruit === droppedFruit && pair.color === color);

    if (isCorrectMatch) {
      setFeedback('Correct Match!');
      setMatches([...matches, droppedFruit]);
    } else {
      setFeedback('Wrong Match. Try Again!');
    }
  };

  const resetGame = async() => {
    try {
      const token = localStorage.getItem('token');
  
      // Send a request to the server to update task2
      const response = await fetch(`${window.location.origin}/updateTask2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the JWT token in the headers
        },
      });
  
      if (response.ok) {
        console.log('Task2 updated successfully');
      } else {
        console.error('Failed to update Task2');
      }
  
      // Use navigate to go back to the dashboard or any other route
      
    } catch (error) {
      console.error('Error updating Task2:', error);
    }
    setFeedback('');
    setMatches([]);
    setGameSet(getRandomSet());
    setColorOrder(shuffleArray(gameSet.colors));
  };

  const goBackToDashboard = async() => {
    try {
      const token = localStorage.getItem('token');
  
      // Send a request to the server to update task2
      const response = await fetch('http://localhost:5000/updateTask2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the JWT token in the headers
        },
      });
  
      if (response.ok) {
        console.log('Task2 updated successfully');
      } else {
        console.error('Failed to update Task2');
      }
  
      // Use navigate to go back to the dashboard or any other route
      
    } catch (error) {
      console.error('Error updating Task2:', error);
    }
    navigate('/dashboard');
  };

  useEffect(() => {
    if (matches.length === gameSet.fruits.length) {
      setFeedback('You did it!');
    }
  }, [matches, gameSet.fruits.length]);

  useEffect(() => {
    setColorOrder(shuffleArray(gameSet.colors));
  }, [gameSet]);

  return (
    <div className="matching-game-container">
      <h1 className="matching-game-heading">Matching Game</h1>
      <p className="matching-game-description">Match the fruit with its color</p>
      <div className="matching-game">
        <div className="column">
          {gameSet.fruits.map((fruit, index) => (
            <div
              key={index}
              className={`fruit ${matches.includes(fruit) ? 'matched' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, fruit)}
            >
              {fruit}
            </div>
          ))}
        </div>
        <div className="column">
          {colorOrder.map((color, index) => (
            <div
              key={index}
              className={`color-box ${matches.includes(color) ? 'matched' : ''}`}
              onDragOver={handleDragOver}
              onDrop={(e) => {
                handleDrop(e, color);
              }}
            >
              {color}
            </div>
          ))}
        </div>
        <p className="feedback">{feedback}</p>
      </div>
      {feedback === 'You did it!' && (
        <>
        <button className="button next-question" onClick={resetGame}>
          Restart Game
        </button>
        <button className="button next-question" onClick={goBackToDashboard}>
            Go Back to Dashboard
          </button>
        </>
      )}
    </div>
  );
};

export default MatchingGame;
