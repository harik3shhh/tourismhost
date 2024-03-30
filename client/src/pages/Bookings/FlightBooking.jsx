import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';

const FlightBooking = ({sidebar}) => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');
  const [randomBoardingTime, setRandomBoardingTime] = useState('');
  const [randomTerminal, setRandomTerminal] = useState('');

  function getRandomTime() {
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.floor(Math.random() * 60);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  }

  function handleBooking() {
    // Perform booking logic
    setRandomBoardingTime(getRandomTime());
    setRandomTerminal(Math.floor(Math.random() * 10) + 1);
    setBookingStatus('Booking successful!');
  }

  const styles = {
    container2: {
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '35px',
      marginBottom: '20px',
      backgroundColor: "#8BBBDA"
      
    },
    label: {
      marginBottom: '10px',
      display: 'block',
    },
    input: {
      padding: '10px',
      width: 'calc(100% - 20px)',
      marginBottom: '20px',
      borderRadius: '10px',
      border: '1px solid #ccc',
      outline: "none"
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
    },
    summaryBox: {
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      marginBottom: '20px',
      backgroundColor: '#f8f9fa',
    },
  };

  return (
    <>
    <Sidebar sidebar={sidebar}/>
      <div className='container'>
        <h2 style={{marginBottom:"10px", textAlign: "center"}}>Flight Booking System</h2>
        <div style={styles.container2}>
          <label style={styles.label}>Source:</label>
          <input
            style={styles.input}
            type="text"
            value={source}
            required
            onChange={(e) => setSource(e.target.value)}
          />
          <label style={styles.label}>Destination:</label>
          <input
            style={styles.input}
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <label style={styles.label}>Date:</label>
          <input
            style={styles.input}
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button style={styles.button} onClick={handleBooking}>Book Flight</button>
        </div>
        {bookingStatus && (
          <div style={styles.summaryBox}>
            <h3>Summary of Journey</h3>
            <p>Source: {source}</p>
            <p>Destination: {destination}</p>
            <p>Date: {date}</p>
            <p>Random Boarding Time: {randomBoardingTime}</p>
            <p>Random Terminal: {randomTerminal}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FlightBooking;
