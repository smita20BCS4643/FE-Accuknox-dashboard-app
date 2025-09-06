import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Dashboard App</h1>
      <Link to="/dashboard">
        <button style={{ fontSize: '16px', padding: '10px 20px' }}>
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
}

export default Home;
