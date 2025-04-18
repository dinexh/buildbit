import Link from 'next/link';
import React from 'react';
import './Nav.css';
const Nav = () => {
  return (
    <nav className="nav-component">
    <div className="nav-component-in">
      <div className="nav-component-in-logo">
        <h1>BuildBit</h1>
      </div>
      <div className="nav-component-in-links">
        <Link href="#features">Features</Link>
        <Link href="#about">About</Link>
        <Link className='nav-component-in-links-button' href="/auth/login">Get Started</Link>
      </div>
    </div>
  </nav>
  );
};

export default Nav; 