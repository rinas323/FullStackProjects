import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage({ onGuest }) {
  const navigate = useNavigate();

  const handleGuest = () => {
    onGuest();       // set user as guest
    navigate('/dashboard');
  };

  return (
    <div className="container text-center my-5">
      <h1 className="mb-4">📝 Welcome to Todo App</h1>
      <p className="mb-4">Login or Signup to save your todos, or continue as Guest!</p>
      <div>
        <button className="btn btn-primary me-2" onClick={() => navigate('/login')}>
          Login
        </button>
        <button className="btn btn-success me-2" onClick={() => navigate('/signup')}>
          Signup
        </button>
        <button className="btn btn-secondary" onClick={handleGuest}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
