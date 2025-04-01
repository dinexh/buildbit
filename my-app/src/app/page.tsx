'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import kanban from './assets/home.png';

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
              {/* Join the waitlist */}
              <Link href="/auth/login">Get Started</Link>
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
      </div>

      {/* About Section */}
      <section className="about-section">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="about-content"
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="about-text"
          >
            <h2 className="about-heading">Revolutionizing Project Management</h2>
            <p className="about-description">
              We&apos;re transforming how teams plan and execute projects. Our AI-powered platform 
              combines intuitive design with powerful automation to make project management 
              accessible to everyone, from startups to enterprises.
            </p>
            
            <div className="about-features">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="about-feature"
              >
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 11.5V14.5L13.5 18L7 14.5V11.5L13.5 15L20 11.5Z" fill="currentColor"/>
                    <path d="M20 8.5V11.5L13.5 15L7 11.5V8.5L13.5 12L20 8.5Z" fill="currentColor"/>
                    <path d="M13.5 3L20 6.5L13.5 10L7 6.5L13.5 3Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="feature-text">
                  <h4>AI-Powered Planning</h4>
                  <p>Smart project templates and automated task generation</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="about-feature"
              >
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="feature-text">
                  <h4>Real-time Updates</h4>
                  <p>Instant sync across all team members and devices</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="about-feature"
              >
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="feature-text">
                  <h4>Team Collaboration</h4>
                  <p>Seamless communication and task delegation</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="about-feature"
              >
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.27002 6.96L12 12.01L20.73 6.96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="feature-text">
                  <h4>Smart Integration</h4>
                  <p>Works with your favorite tools and platforms</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="about-stats"
            >
              <div className="stat-item">
                <div className="stat-number">99%</div>
                <div className="stat-label">Project Success Rate</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">2x</div>
                <div className="stat-label">Faster Delivery</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">AI Assistance</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="about-image"
          >
            <Image
              src={kanban}
              alt="BuildBit Platform Interface"
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-container"
        >
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-title"
          >
            How It Works
          </motion.h2>
          <div className="steps-container">
            {[
              {
                number: "01",
                title: "Enter your idea",
                description: "Share your vision in simple terms"
              },
              {
                number: "02",
                title: "AI Generates Plan",
                description: "Get a detailed, actionable project plan"
              },
              {
                number: "03",
                title: "Execute & Track",
                description: "Monitor progress in real-time"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="step"
              >
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-container"
        >
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Common Questions
          </motion.h2>
          <div className="faq-container">
            {[
              {
                question: "How does the AI planning work?",
                answer: "Our AI analyzes your project description and creates a structured plan with clear milestones and tasks, optimized for efficiency and success."
              },
              {
                question: "Can I customize the generated plans?",
                answer: "Yes, you have full control to modify any aspect of the AI-generated plan to match your team&apos;s specific needs and preferences."
              },
              {
                question: "Is it suitable for all team sizes?",
                answer: "Whether you&apos;re a solo entrepreneur or managing a large team, our platform scales seamlessly to meet your needs."
              },
              {
                question: "What integrations are available?",
                answer: "We integrate with essential tools like GitHub, Slack, and Google Calendar to streamline your workflow."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="faq-item"
                onClick={(e) => {
                  const target = e.currentTarget;
                  target.classList.toggle('active');
                }}
              >
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  <div className="faq-toggle" />
                </div>
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}