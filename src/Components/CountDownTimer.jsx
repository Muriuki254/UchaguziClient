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
    <div className="container">
      <div>
        <h2 className="state">Countdown Timer</h2>
        {election && (
          <div className="content">
            <h3 className="state">Time Remaining:</h3>
            <div className="count-down">
              <div className="count-down-box">
                <h3 id="day">{formatTime(days)}</h3>
                <span>days</span>
              </div>
              <div className="count-down-box">
                <h3 id="hour">{formatTime(hours)}</h3>
                <span>hours</span>
              </div>
              <div className="count-down-box">
                <h3 id="minute">{formatTime(minutes)}</h3>
                <span>minutes</span>
              </div>
              <div className="count-down-box">
                <h3 id="second">{formatTime(seconds)}</h3>
                <span>seconds</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CountDownTimer;
