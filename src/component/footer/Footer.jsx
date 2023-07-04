import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';
const Footer = () => {
  return (
    <>
      <footer>
        <h2 className="text-light">Welcome to Fleksa</h2>
        <div className="row">
          <NavLink to="/restaurants" className="btn btn-primary text-dark m-1">
            Get Best Dishs
          </NavLink>
          <a
            href="https://fleksa-partner.vercel.app/"
            target="_blank"
            className="btn btn-primary text-dark m-1"
          >
            Add Restaurant
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
