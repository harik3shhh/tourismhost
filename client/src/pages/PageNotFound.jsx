import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '10px', color: '#333' }}>404</h1>
      <h2 style={{ fontSize: '2rem', color: '#666', marginBottom: '20px' }}>Oops! Page Not Found.</h2>
      <Link to="/" style={{ textDecoration: 'none', color: '#007bff', fontSize: '1.2rem', padding: '10px 20px', border: '2px solid #007bff', borderRadius: '5px', transition: 'all 0.3s' }}>
        Go back to home
      </Link>
    </div>
  );
};

export default PageNotFound;
