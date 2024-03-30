import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className='container'>
      <h1>USER DASHBOARD</h1>

      <div>
        <button style={{ 
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '10px 20px',
          fontSize: '1rem',
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'inline-block',
          margin: '10px 0',
          transition: 'background-color 0.3s',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}>
          <NavLink to={"/wishlist"} style={{ color: 'white', textDecoration: 'none' }}>
            Wishlist
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
