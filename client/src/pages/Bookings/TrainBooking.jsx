import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';

const TrainBooking = ({sidebar}) => {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [booked, setBooked] = useState(false);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [journeyDate, setJourneyDate] = useState('');

  const trains = [
    { id: 1, name: 'Express', seats: 50 },
    { id: 2, name: 'Superfast', seats: 100 },
    { id: 3, name: 'Local', seats: 200 },
  ];

  const handleTrainSelect = (train) => {
    setSelectedTrain(train);
    setSelectedSeats([]);
    setBooked(false);
  };

  const handleSeatSelect = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBookTicket = () => {
    // Implement booking logic here
    if (selectedSeats.length > 0 && source && destination && journeyDate) {
      setBooked(true);
    }
  };

  return (
    <>
    <Sidebar  sidebar={sidebar}/>
    <div className="container">
    <div className='container' style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Train Booking</h1>
      <div>
        <h2>Select a Train:</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {trains.map((train) => (
            <li key={train.id}>
              <button
                style={{
                  padding: '5px 10px',
                  margin: '5px',
                  border: '1px solid #ccc',
                  borderRadius: '3px',
                  background: selectedTrain === train ? '#007bff' : '#fff',
                  color: selectedTrain === train ? '#fff' : '#333',
                }}
                onClick={() => handleTrainSelect(train)}
              >
                {train.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedTrain && (
        <div style={{ marginTop: '20px' }}>
          <h2>Select Seats for {selectedTrain.name}</h2>
          <p>Available Seats: {selectedTrain.seats}</p>
          <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexWrap: 'wrap' }}>
            {[...Array(selectedTrain.seats).keys()].map((seat) => (
              <li key={seat} style={{ margin: '5px' }}>
                <button
                  style={{
                    padding: '5px 10px',
                    border: '1px solid #ccc',
                    borderRadius: '3px',
                    background: selectedSeats.includes(seat) ? '#007bff' : '#fff',
                    color: selectedSeats.includes(seat) ? '#fff' : '#333',
                    cursor: 'pointer',
                  }}
                  disabled={selectedSeats.includes(seat) || booked}
                  onClick={() => handleSeatSelect(seat)}
                >
                  Seat {seat + 1}
                </button>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '20px' }}>
            <label>
              Source Station:
              <input type="text" value={source} onChange={(e) => setSource(e.target.value)} />
            </label>
          </div>
          <div style={{ marginTop: '10px' }}>
            <label>
              Destination:
              <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
            </label>
          </div>
          <div style={{ marginTop: '10px' }}>
            <label>
              Journey Date:
              <input type="date" value={journeyDate} onChange={(e) => setJourneyDate(e.target.value)} />
            </label>
          </div>
          {!booked && (
            <button
              style={{
                padding: '10px 20px',
                margin: '20px 0',
                background: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              onClick={handleBookTicket}
            >
              {selectedSeats.length > 0 ? 'Book Ticket' : 'Select Seats'}
            </button>
          )}
          {booked && (
            <div
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginTop: '20px',
                textAlign: 'center',
                backgroundColor: '#fff',
                width: '250px',
                height: '250px',
                margin: 'auto',
                borderRadius: '5px',
              }}
            >
              <h3 style={{color: "green"}}>Ticket booked successfully! Enjoy your journey.</h3>
              <p style={{marginTop: "15px", marginBottom: "5px", fontWeight:"bold"}}>Journey Summary:</p>
              <p>Train: {selectedTrain.name}</p>
              <p>Seats: {selectedSeats.join(', ')}</p>
              <p>Source: {source}</p>
              <p>Destination: {destination}</p>
              <p>Boarding Date: {journeyDate}</p>
            </div>
          )}
        </div>
      )}
    </div>
    </div>
    </>
  );
};

export default TrainBooking;
