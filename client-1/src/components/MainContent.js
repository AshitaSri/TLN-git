// MainContent.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


  function MainContent() {
    const [task1Completion, setTask1Completion] = useState(0);
    const [task2Completion, setTask2Completion] = useState(0);
    const [task3Completion, setTask3Completion] = useState(0);
    const [user1, setuser1] = useState("user");
  
    useEffect(() => {
      // Fetch task completion percentages from the server
      const fetchTaskCompletion = async () => {
        try {
          const response = await fetch('http://localhost:5000/dashboard', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
  
          const data = await response.json();
          let fetchedUser = data.user;
          setuser1(fetchedUser);
          let t1 = data.task1;
          t1 = t1 / 10;
          if(t1>100) t1=t1-100;
          let t2 = data.task2;
          t1 = t2 / 10;
          if(t2>100) t2=t2-100;
          let t3 = data.task3;
          t3 = t3 / 10;
          if(t3>100) t3=t3-100;
          setTask1Completion(t1);
          setTask2Completion(t2);
          setTask3Completion(t3);
        } catch (error) {
          console.error('Error fetching task completion:', error);
        }
      };
  
      fetchTaskCompletion();
    }, []);

  return (
    <main>
      <header>
        <button className="menu-btn" id="menu-open">
          <i className='bx bx-menu'></i>
        </button>
        
      </header>

      <div className="separator">
        <div className="info">
          <h3>Hello ! {user1}</h3>
          
        </div>
        
      </div>

      <div className="analytics">
        <div className="item">
          <Link to="/task1">
            <div className="progress">
              <div className="info">
                <h5>Task1</h5>
                <p>{task1Completion.toFixed(2)}% Complete</p>
              </div>
              <div
                // className="progress-bar"
                // role="progressbar"
                aria-valuenow={task1Completion}
                aria-valuemin={task1Completion}
                aria-valuemax={task1Completion}
              ></div>
            </div>
            
          </Link>
        </div>
        <div className="item">
          <Link to="/task2">
            <div className="progress">
              <div className="info">
                <h5>Task2</h5>
                <p>{task2Completion.toFixed(2)}% Complete</p>
              </div>
              <div
                // className="progress-bar"
                // role="progressbar"
                aria-valuenow={task2Completion}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <i className='bx bx-user-voice'></i>
          </Link>
        </div>
        <div className="item">
          <Link to="/task3">
            <div className="progress">
              <div className="info">
                <h5>Task3</h5>
                <p>{task3Completion.toFixed(2)}% Complete</p>
              </div>
              <div
                // className="progress-bar"
                // role="progressbar"
                aria-valuenow={task3Completion}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <i className='bx bxs-plane-land'></i>
          </Link>
        </div>
        <div className="item">
          <div className="progress">
            <div className="info">
              <h5>Total Courses</h5>
              <h1>3</h1>
            </div>
            {/* <div className="progress-bar" role="progressbar" aria-valuenow={task1Completion} aria-valuemin="0" aria-valuemax="100"></div> */}
          </div>
          <i className='bx bxs-castle'></i>
        </div>
      </div>

      <div className="separator">
        <div className="info">
          <h3>Reading Material</h3>
          <p><Link to="/reading-material/smallest-number">Read More</Link></p>
          
        </div>
        
      </div>

      <div className="planning">
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className='bx bx-book-alt'></i>
            </div>
            <div className="details">
              <h5>SmallestNumber</h5>
              <p> <Link to="/https://www.firstcry.com/intelli/articles/teaching-your-kids-the-greatest-and-smallest-numbers-in-math-with-examples/r">Read More</Link></p>
            </div>
          </div>
          <i className='bx bx-dots-vertical-rounded'></i>
        </div>
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className='bx bx-edit-alt'></i>
            </div>
            <div className="details">
              <h5>Fruit Color</h5>
              <p><Link to="/https://www.youtube.com/watch?v=KRqg3RJFWPo">Read More</Link></p>
            </div>
          </div>
          <i className='bx bx-dots-vertical-rounded'></i>
        </div>
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className='bx bx-headphone'></i>
            </div>
            <div className="details">
              <h5>Addition</h5>
              <p><Link to="/https://home.oxfordowl.co.uk/maths/primary-addition-subtraction/addition-subtraction-year-1-age-5-6/">Read More</Link></p>
            </div>
          </div>
          <i className='bx bx-dots-vertical-rounded'></i>
        </div>
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className='bx bx-volume-low'></i>
            </div>
            <div className="details">
              <h5>Subtraction</h5>
              <p><Link to="/https://home.oxfordowl.co.uk/maths/primary-addition-subtraction/addition-subtraction-year-1-age-5-6/">Read More</Link></p>
            </div>
          </div>
          <i className='bx bx-dots-vertical-rounded'></i>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
