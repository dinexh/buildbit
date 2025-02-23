'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import kanban from './assets/demo.webp';

export default function Home() {
  return (
    <div className="home-component">
      <div className="hero-container">
       <Nav />
        <div className="home-component-hero">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-title"
          >
            Unleash the power of<br />
            <span className="gradient-text">intuitive planning</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-description"
          >
            Say goodbye to outdated project management tools. Every team member,
            regardless of their role, can now manage projects like a pro. Simple,
            intuitive, and never boring.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-buttons"
          >
            <button className="hero-button primary-button">
              Join the waitlist
            </button>
            <button className="hero-button secondary-button">
              Learn more
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="currentColor"/>
              </svg>
            </button>
          </motion.div>

          <div className="home-component-demo">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="app-preview"
          >
            <div className="preview-container">
              <Image
                src={kanban}
                alt="BuildBit Dashboard"
                width={1200}
                height={800}
                className="preview-image"
              />
              <div className="preview-overlay" />
            </div>
            </motion.div>
        </div>

        {/* Background Elements */}
        <div className="background-grid" />
        <div className="background-gradient-left" />
        <div className="background-gradient-right" />
        </div>
      <Footer />
      </div>
    </div>
  );
}