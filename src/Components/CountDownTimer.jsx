import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiDomain } from '../utils/utils';
import './style.css';

function CountDownTimer() {
  const [election, setElection] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    fetchElection();
  }, []);

  const fetchElection = async () => {
    try {
      const response = await axios.get(`${apiDomain}/api/countdown`);
      if (response.status === 200) {
        setElection(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch election details', error);
    }
  };

  const calculateRemainingTime = () => {
    if (!election) return;

    const targetDate = new Date(election.EndDate).getTime();
    const currentTime = new Date().getTime();
    const timeRemaining = targetDate - currentTime;

    if (timeRemaining <= 0) {
      setRemainingTime(0);
    } else {
      setRemainingTime(timeRemaining);
    }
  };

  useEffect(() => {
    const countdownInterval = setInterval(calculateRemainingTime, 1000);
    return () => clearInterval(countdownInterval);
  });

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  return (
    <div className="countdown-container">
      <div className='countdown-box'>
        <h2 className="state">Time Remaining</h2>
        {election && (
          <div className="content">
            <div className="count-down">
              <div className="count-down-box">
                <h3>{formatTime(days)}</h3>
                <span>DAYS</span>
              </div>
              <div className="count-down-box">
                <h3>{formatTime(hours)}</h3>
                <span>HOURS</span>
              </div>
              <div className="count-down-box">
                <h3>{formatTime(minutes)}</h3>
                <span>MINUTES</span>
              </div>
              <div className="count-down-box">
                <h3>{formatTime(seconds)}</h3>
                <span>SECONDS</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CountDownTimer;
