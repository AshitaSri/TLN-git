// RightSidebar.jsx
import React, { useState, useEffect } from 'react';

function RightSidebar() {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [inProgressCourses, setInProgressCourses] = useState(0);

  useEffect(() => {
    // Fetch the user's task completion data from the backend using the token
    const fetchTaskCompletionData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:5000/getTaskCompletionData', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const task1 = data.task1;
          const task2 = data.task2;
          const task3 = data.task3;

          let count =0;
          if(task1>0) count++;
          if(task2>0) count++;
          if(task3>0) count++;

          setCompletedTasks(count);
          setTotalPoints((task1+task2+task3)*10);
          setInProgressCourses(count);
        } else {
          console.error('Failed to fetch task completion data');
        }
      } catch (error) {
        console.error('Error fetching task completion data:', error);
      }
    };

    fetchTaskCompletionData();
  }, []);

  return (
    <aside className="right-section">
      <div className="separator" id="first">
        <h4>Statistics</h4>
      </div>

      <div className="stats">
        <div className="item">
          <div className="top">
            <p>Tasks</p>
            <p>Completed</p>
          </div>
          <div className="bottom">
            <div className="line"></div>
            <h3>{completedTasks}</h3>
          </div>
        </div>
        <div className="item">
          <div className="top">
            <p>Total Points</p>
            <p>Gained</p>
          </div>
          <div className="bottom">
            <div className="line"></div>
            <h3>{totalPoints}</h3>
          </div>
        </div>
        <div className="item">
          <div className="top">
            <p>Courses</p>
            <p>In Progress</p>
          </div>
          <div className="bottom">
            <div className="line"></div>
            <h3>{inProgressCourses}</h3>
          </div>
        </div>
        <div className="item">
          <div className="top">
            <p>Favourite</p>
            <p>Task</p>
          </div>
          <div className="bottom">
            <div className="line"></div>
            <h3>{totalPoints}</h3>
          </div>
        </div>
      </div>

      <div className="separator">
        <h4>Weekly Work</h4>
      </div>

      <div className="weekly">
        <div className="title">
          <div className="line"></div>
          <h5>Week Status</h5>
        </div>
        <div className="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
          <div className="progress">
            <p>3/4</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;
