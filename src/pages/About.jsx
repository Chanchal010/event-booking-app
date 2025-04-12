import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaUserFriends, 
  FaLightbulb, 
  FaStar, 
  FaUsers,
  FaCheck,
  FaQuoteLeft,
  FaQuoteRight
} from 'react-icons/fa';
import './Pages.css';

const About = () => {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    }
  };

  // Team members data
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
      description: 'With over 15 years in event management, Sarah brings expertise and vision to EventBook.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
      description: 'Michael leads our development team with innovative solutions for seamless event experiences.'
    },
    {
      name: 'Priya Patel',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
      description: 'Priya ensures smooth operation for all events, maintaining our high standards of service.'
    }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      text: "EventBook transformed how we organize our annual conference. The platform is intuitive and the team is incredibly responsive.",
      author: "David Williams",
      company: "Tech Innovations Ltd"
    },
    {
      text: "We've been using EventBook for our monthly workshops and have seen attendance increase by 40%. Highly recommended!",
      author: "Emma Rodriguez",
      company: "Creative Solutions"
    },
    {
      text: "The analytics and reporting features are game-changers for our event planning. EventBook has streamlined our entire process.",
      author: "James Thompson",
      company: "Global Enterprises"
    }
  ];
  
  return (
    <div className="page about-page">
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
    
      <div className="container">
        {/* Hero Section */}
        <motion.section 
          className="about-hero"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="section-title">About EventBook</h1>
          <div className="about-hero-content">
            <div className="about-hero-text">
              <motion.p 
                className="about-hero-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Your trusted partner in event management since 2015
              </motion.p>
              <motion.p 
                className="about-description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                EventBook was founded with a simple mission: to make event planning and booking as seamless and stress-free as possible. We've grown from a small startup to an industry-leading platform, serving thousands of events and millions of attendees worldwide.
              </motion.p>
              <motion.div 
                className="about-stats"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div className="stat-item" variants={itemVariants}>
                  <motion.span 
                    className="stat-number"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    10K+
                  </motion.span>
                  <span className="stat-label">Events</span>
                </motion.div>
                <motion.div className="stat-item" variants={itemVariants}>
                  <motion.span 
                    className="stat-number"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    2M+
                  </motion.span>
                  <span className="stat-label">Attendees</span>
                </motion.div>
                <motion.div className="stat-item" variants={itemVariants}>
                  <motion.span 
                    className="stat-number"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    98%
                  </motion.span>
                  <span className="stat-label">Satisfaction</span>
                </motion.div>
              </motion.div>
            </div>
            <motion.div 
              className="about-hero-image"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="EventBook Team" 
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          className="mission-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="section-title"
            variants={itemVariants}
          >
            Our Mission
          </motion.h2>
          <motion.div 
            className="mission-content"
            variants={itemVariants}
            whileHover={{ boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)" }}
          >
            <motion.div 
              className="mission-icon"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.7 }}
            >
              <FaLightbulb />
            </motion.div>
            <p className="mission-text">
              To empower event organizers with innovative tools and solutions that transform how events are planned, managed, and experienced. We're committed to creating memorable experiences through technology that connects people.
            </p>
          </motion.div>
          <motion.div 
            className="values-grid"
            variants={containerVariants}
          >
            {[
              { icon: <FaStar />, title: "Excellence", desc: "We strive for excellence in everything we do, from our platform to our customer service." },
              { icon: <FaUserFriends />, title: "Collaboration", desc: "We believe great events come from great collaboration between organizers, attendees, and vendors." },
              { icon: <FaCalendarAlt />, title: "Innovation", desc: "We continuously innovate to provide cutting-edge tools for modern event management." }
            ].map((value, index) => (
              <motion.div 
                className="value-card" 
                key={index}
                variants={itemVariants}
                whileHover={cardHoverVariants.hover}
              >
                <motion.div 
                  className="value-icon"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {value.icon}
                </motion.div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          className="team-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="section-title"
            variants={itemVariants}
          >
            Meet Our Team
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            variants={itemVariants}
          >
            Passionate professionals dedicated to transforming your event experience
          </motion.p>
          <motion.div 
            className="team-grid"
            variants={containerVariants}
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                className="team-member"
                key={index}
                variants={itemVariants}
                whileHover={cardHoverVariants.hover}
              >
                <motion.div 
                  className="member-image"
                  whileHover={{ scale: 1.05 }}
                >
                  <img src={member.image} alt={member.name} />
                </motion.div>
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-description">{member.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section 
          className="testimonials-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="section-title"
            variants={itemVariants}
          >
            What Our Clients Say
          </motion.h2>
          <motion.div 
            className="testimonials-grid"
            variants={containerVariants}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                className="testimonial-card"
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)" }}
              >
                <motion.div 
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                >
                  <FaQuoteLeft className="quote-icon quote-left" />
                </motion.div>
                <p className="testimonial-text">{testimonial.text}</p>
                <motion.div 
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                >
                  <FaQuoteRight className="quote-icon quote-right" />
                </motion.div>
                <div className="testimonial-author">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section 
          className="benefits-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="section-title"
            variants={itemVariants}
          >
            Why Choose EventBook
          </motion.h2>
          <div className="benefits-content">
            <motion.div 
              className="benefits-list"
              variants={containerVariants}
            >
              {[
                "Intuitive platform designed for ease of use",
                "Comprehensive event management tools",
                "Real-time analytics and reporting",
                "Dedicated customer support",
                "Secure payment processing",
                "Mobile-friendly experience"
              ].map((benefit, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
                >
                  <motion.div 
                    className="check-icon"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaCheck />
                  </motion.div>
                  {benefit}
                </motion.li>
              ))}
            </motion.div>
            <motion.div 
              className="benefits-image"
              variants={itemVariants}
            >
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="EventBook Benefits" 
              />
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About; 