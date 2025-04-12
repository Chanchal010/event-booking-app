import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import './Pages.css';

const Home = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, duration: 0.5 }
    }
  };
  
  const featureVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const features = [
    {
      icon: <FaCalendarAlt />,
      title: 'Easy Scheduling',
      description: 'Browse available dates and book your events with just a few clicks.'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Venue Selection',
      description: 'Choose from a variety of venues that suit your event needs.'
    },
    {
      icon: <FaUsers />,
      title: 'Attendee Management',
      description: 'Manage your guest list, send invitations, and track RSVPs.'
    }
  ];
  
  const upcomingEvents = [
    {
      id: 1,
      title: 'Tech Conference',
      date: 'Dec 15, 2023',
      location: 'Convention Center'
    },
    {
      id: 2,
      title: 'Product Launch',
      date: 'Dec 20, 2023',
      location: 'Downtown Theater'
    },
    {
      id: 3,
      title: 'Team Building Event',
      date: 'Dec 28, 2023',
      location: 'City Park'
    }
  ];

  const benefits = [
    'Intuitive booking system',
    'Real-time availability updates',
    'Customizable event options',
    'Integrated payment processing'
  ];
  
  return (
    <div className="page">
      {/* Decorative Background Elements */}
      <div className="booking-shapes">
        <div className="booking-shape booking-shape-1"></div>
        <div className="booking-shape booking-shape-2"></div>
        <div className="booking-shape booking-shape-3"></div>
        <div className="booking-shape booking-shape-4"></div>
      </div>
      <div className="dots-pattern"></div>
      
      {/* Additional wavy shapes */}
      <div className="wavy-shapes">
        <div className="wavy-shape wavy-shape-1"></div>
        <div className="wavy-shape wavy-shape-2"></div>
      </div>
    
      {/* Hero Section */}
      <section className="hero gradient-flow">
        <div className="container hero-container">
          <motion.div 
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 className="hero-title" variants={itemVariants}>
              Book Your Next <span className="highlight color-pulse">Event</span> With Ease
            </motion.h1>
            <motion.p className="hero-description" variants={itemVariants}>
              A seamless platform for scheduling, managing, and hosting successful events. 
              From conferences to workshops, we've got you covered.
            </motion.p>
            <motion.div className="hero-buttons" variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/booking" className="btn-primary shimmer">
                  Book Now <FaArrowRight className="icon-right" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/events" className="btn-secondary">
                  Browse Events
                </Link>
              </motion.div>
            </motion.div>

            <motion.ul
              className="benefits-list"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {benefits.map((benefit, index) => (
                <motion.li 
                  key={index}
                  variants={fadeInUp}
                  className="benefit-item"
                >
                  <FaCheckCircle className="benefit-icon" /> {benefit}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          <motion.div 
            className="hero-image float"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="calendar-illustration">
              <div className="cal-header">
                <span>December 2023</span>
              </div>
              <div className="cal-body">
                <div className="cal-row">
                  <div className="cal-day">Mo</div>
                  <div className="cal-day">Tu</div>
                  <div className="cal-day">We</div>
                  <div className="cal-day">Th</div>
                  <div className="cal-day">Fr</div>
                  <div className="cal-day">Sa</div>
                  <div className="cal-day">Su</div>
                </div>
                {[...Array(5)].map((_, rowIndex) => (
                  <div className="cal-row" key={rowIndex}>
                    {[...Array(7)].map((_, colIndex) => {
                      const day = rowIndex * 7 + colIndex - 4;
                      const isHighlighted = [15, 20, 28].includes(day);
                      return (
                        <motion.div 
                          key={colIndex} 
                          className={`cal-date ${day <= 0 || day > 31 ? 'empty' : ''} ${isHighlighted ? 'highlighted' : ''}`}
                          whileHover={day > 0 && day <= 31 ? { scale: 1.2, backgroundColor: 'var(--primary-light)' } : {}}
                        >
                          {day > 0 && day <= 31 ? day : ''}
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="hero-shapes">
          <motion.div 
            className="shape shape-1"
            animate={{ 
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 0.9, 1]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          ></motion.div>
          <motion.div 
            className="shape shape-2"
            animate={{ 
              x: [0, 20, -20, 0],
              y: [0, -20, 20, 0]
            }}
            transition={{ 
              duration: 14, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          ></motion.div>
          <motion.div 
            className="shape shape-3"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 0.8, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear" 
            }}
          ></motion.div>
          <motion.div 
            className="shape shape-4"
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          ></motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose <span className="color-pulse">EventBook</span>?
          </motion.h2>
          
          <motion.div 
            className="features-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div 
                className="feature-card"
                key={index}
                variants={featureVariants}
                custom={index}
                whileHover={{ 
                  y: -10, 
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                  background: 'var(--gradient-background)'
                }}
              >
                <motion.div 
                  className="feature-icon"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.2,
                    color: 'var(--primary-color)'
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Upcoming Events Section */}
      <section className="events-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">Upcoming <span className="color-pulse">Events</span></h2>
            <Link to="/events" className="section-link">
              View All <FaArrowRight />
            </Link>
          </motion.div>
          
          <motion.div 
            className="events-preview"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {upcomingEvents.map((event, index) => (
              <motion.div 
                className="event-preview-card"
                key={event.id}
                variants={itemVariants}
                custom={index}
                whileHover={{ 
                  y: -10, 
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
                  background: 'var(--gradient-background)'
                }}
              >
                <motion.div 
                  className="event-preview-date"
                  whileHover={{ scale: 1.05 }}
                >
                  {event.date}
                </motion.div>
                <h3 className="event-preview-title">{event.title}</h3>
                <div className="event-preview-location">
                  <FaMapMarkerAlt className="icon" />
                  {event.location}
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/booking" className="event-preview-button shimmer">
                    Book Now <FaArrowRight />
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section gradient-flow">
        <motion.div 
          className="container cta-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="cta-title">Ready to Plan Your Next Event?</h2>
          <p className="cta-description">
            Get started today and experience the easiest way to book and manage your events.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/booking" className="btn-primary cta-button shimmer">
              Get Started <FaArrowRight className="icon-right" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home; 