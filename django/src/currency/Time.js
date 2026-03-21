import React, { useState, useEffect } from 'react';
import './Time.css'; // Import the CSS file for styling

const Time = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
        hours = '00';
    }
    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  };

  const getTimeDifference = (time1, time2) => {
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);
    const date1 = new Date();
    const date2 = new Date();

    date1.setHours(hours1, minutes1, 0, 0);
    date2.setHours(hours2, minutes2, 0, 0);

    let diff = (date2 - date1) / 1000; // difference in seconds
    if (diff < 0) {
        diff += 24 * 60 * 60; // add 24 hours if the difference is negative
    }

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = Math.floor(diff % 60);

    return { hours, minutes, seconds };
  };

  const isSessionOpen = (openTime, closeTime) => {
    const current = currentTime.toTimeString().slice(0, 5);
    const open = formatTime(openTime);
    const close = formatTime(closeTime);

    if (open < close) {
        return current >= open && current < close;
    } else {
        return current >= open || current < close;
    }
  };

  const allMarketsClosed = () => {
    const day = currentTime.getDay();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const current = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`; // Re-add this line

    if (day === 5 && hours >= 1) { // Friday after 01:00 AM
        return true;
    }
    if (day === 6) { // Saturday
        return true;
    }
    if (day === 0 && hours < 1) { // Sunday before 01:00 AM
        return true;
    }
    return false;
  };

  const getNextMarketOpenTime = () => {
    const day = currentTime.getDay();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const current = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

    if (day === 5 && hours >= 1) { // Friday after 01:00 AM
        return getTimeDifference(current, '01:00');
    }
    if (day === 6) { // Saturday
        return getTimeDifference(current, '01:00'); // 25:00 is equivalent to 01:00 on Sunday
    }
    if (day === 0 && hours < 1) { // Sunday before 01:00 AM
        return getTimeDifference(current, '01:00');
    }
    return { hours: 0, minutes: 0, seconds: 0 };
  };

  const currentSession = [
    { name: 'Sydney', openTime: '11:00 PM', closeTime: '08:00 AM' },
    { name: 'Tokyo', openTime: '03:00 AM', closeTime: '04:00 PM' },
    { name: 'London', openTime: '11:00 AM', closeTime: '07:00 PM' },
    { name: 'New York', openTime: '04:00 PM', closeTime: '01:00 AM' }
  ];

  const areAllMarketsClosed = allMarketsClosed();

  return (
    <div className="time-container">
      <h1 className="title">Forex Market Tracker (EAT)</h1>
      <div className="time-box">
        <h2 className="subtitle">Current Time</h2>
        <p className="time">{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</p>
      </div>
      {areAllMarketsClosed ? (
        <div className="market-status-box">
          <h2 className="subtitle">All Markets Closed</h2>
          <p>Opens in: {getNextMarketOpenTime().hours} hours, {getNextMarketOpenTime().minutes} minutes, and {getNextMarketOpenTime().seconds} seconds</p>
        </div>
      ) : (
        currentSession.length > 0 && currentSession.map((session, index) => {
          const open = formatTime(session.openTime);
          const close = formatTime(session.closeTime);
          const current = currentTime.toTimeString().slice(0, 5);
          const isOpen = isSessionOpen(session.openTime, session.closeTime);
          const timeDiff = isOpen ? getTimeDifference(current, close) : getTimeDifference(current, open);

          return (
            <div key={index} className={`session-box ${areAllMarketsClosed ? 'closed' : (isOpen ? 'open' : 'closed')}`}>
              <h2 className="session-title">{session.name}</h2>
              <p>Status: {areAllMarketsClosed ? 'Closed' : (isOpen ? 'Open' : 'Closed')}</p>
              <p>Opens at: {session.openTime}</p>
              <p>Closes at: {session.closeTime}</p>
              <p>
                {isOpen
                  ? `Closes in: ${timeDiff.hours} hours, ${timeDiff.minutes} minutes, and ${timeDiff.seconds} seconds`
                  : `Opens in: ${timeDiff.hours} hours, ${timeDiff.minutes} minutes, and ${timeDiff.seconds} seconds`}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Time;
