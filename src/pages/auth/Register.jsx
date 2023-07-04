import React, { useState } from 'react';
import './Auth.css';
import { NavLink, useHistory } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { apilink } from '../../data/fdata';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const his = useHistory();
  const onRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      name,
      email,
      password,
    };

    const res = await axios.post(`${apilink}/api/v1/user/register`, data);
    if (res.data.success) {
      setMsg(res.data.msg);
      setStatus(true);
      setTimeout(() => {
        setStatus(false);
        his.push('/login');
      }, 3000);
    } else {
      setMsg(res.data.msg);
      setStatus(true);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="register">
        <div className="register_box">
          {/* <input type="checkbox" id="flip" /> */}
          <div className="cover">
            <div className="front">
              <img
                src="https://res.cloudinary.com/du9emrtpi/image/upload/v1688267578/high-angle-woman-ordering-takeaway-food-smartphone_ghufqz.jpg"
                alt=""
              />
              <div className="text">
                <span className="text-1">
                  <span className="text-dark">Fleksa</span>
                </span>
                <span className="text-2">Find your favourite Food</span>
              </div>
            </div>
          </div>
          <div className="forms">
            <div className="form-content">
              <div className="signup-form">
                {status && (
                  <div className="alert alert-info alert-dismissible fn_14">
                    <button
                      type="button"
                      className="close fn_14"
                      data-dismiss="alert"
                    >
                      &times;
                    </button>
                    {msg}
                  </div>
                )}
                <div className="title">Signup</div>
                <form onSubmit={onRegister}>
                  <div className="input-boxes">
                    <div className="input-box">
                      <i className="fa fa-user"></i>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-box">
                      <i className="fa fa-envelope"></i>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-box">
                      <i className="fa fa-lock"></i>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="button input-box">
                      <input
                        type="submit"
                        value="Submit"
                        className={loading && 'dis'}
                        disabled={loading}
                      />
                    </div>
                    {loading && (
                      <div className="text-center p-2">
                        <CircularProgress size={35} />
                      </div>
                    )}
                    <div className="text sign-up-text">
                      Already have an account?{' '}
                      <label>
                        <NavLink to="/login">Login Now</NavLink>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
