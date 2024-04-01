import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import './Login.css';

const Login = ({ sidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:8000/api/auth/login', input);
      console.log(data);
      if (data?.success) {
        setInput({ email: '', password: '' });
        console.log('Login Successful!');
        toast.success('Login Successful');

        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });

        localStorage.setItem('auth', JSON.stringify(data));
        navigate(location.state || '/');
      } else {
        toast.error(data?.message);
        toast.error('Invalid Email of Password');
      }
    } catch (error) {
      console.log(error);
      toast.error('Invalid email or password');
    }
  };

  // TYPING EFFECT
  const [text] = useTypewriter({
    words: ['Beautiful Destinations.', 'Travelling India.'],
    loop: {},
  });

  return (
    <>
      <Sidebar sidebar={sidebar} />
      <div className="content">
        <form onSubmit={handleSubmit} className="form">
          <h2 style={{ textAlign: 'center' }}>Login</h2>
          <br />
          <hr />
          <div className="text-content">
            <div className="text-content-column">
              <h2>
                <span style={{ color: 'blue' }}>{text}</span>
                <Cursor cursorColor="rgb(233, 225, 238)" />
              </h2>
              <h3>Travel anywhere. Travel anytime.</h3>
              <h5>Ready for the Trip? Enter your email to Login or create an account.</h5>
            </div>
          </div>

          <input
            type="email"
            className=".inp"
            placeholder="Email Address"
            name="email"
            value={input.email}
            onChange={handleInput}
            required
          />

          {showPassword && (
            <input
              className=".inp"
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={handleInput}
              required
            />
          )}

          {!showPassword && (
            <button className="btn1" onClick={() => setShowPassword(true)}>
              Let's Go
            </button>
          )}

          <NavLink to="/forgot-password">
            <p className="forgot">forgot password?</p>
          </NavLink>
          <NavLink to="/register">
            <p className="create">create account</p>
          </NavLink>

          <button className="btn2" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
