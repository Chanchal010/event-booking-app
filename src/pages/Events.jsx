import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaInfoCircle, FaArrowRight } from 'react-icons/fa';
import './Pages.css';

const Events = ({ events }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState(events);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
  
  // Filter events when search term, category, or date filters change
  useEffect(() => {
    const filtered = events.filter(event => {
      // Search term filter
      const matchesSearch = 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      
      // Date filter (simplified for demo)
      const matchesDate = selectedDate === 'all' || 
        (selectedDate === 'upcoming' && new Date(event.date) > new Date()) ||
        (selectedDate === 'past' && new Date(event.date) < new Date());
      
      return matchesSearch && matchesCategory && matchesDate;
    });
    
    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategory, selectedDate, events]);
  
  // Format date for display
  const formatDate = (dateObj) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateObj).toLocaleDateString(undefined, options);
  };
  
  // Get day and month for event cards
  const getDay = (dateObj) => {
    return new Date(dateObj).getDate();
  };
  
  const getMonth = (dateObj) => {
    const options = { month: 'short' };
    return new Date(dateObj).toLocaleDateString(undefined, options);
  };
  
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
        
      <div className="container">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="section-title">Explore Events</h1>
        </motion.div>
        
        <div className="events-filter">
          <div className="filter-group">
            <div className="filter-item">
              <span className="filter-label">Category:</span>
              <select 
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="conference">Conference</option>
                <option value="workshop">Workshop</option>
                <option value="networking">Networking</option>
                <option value="product-launch">Product Launch</option>
              </select>
            </div>
            
            <div className="filter-item">
              <span className="filter-label">Date:</span>
              <select 
                className="filter-select"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value="all">All Dates</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
          </div>
          
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search events..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {filteredEvents.length === 0 ? (
          <motion.div 
            className="no-events"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaInfoCircle className="no-events-icon" />
            <h3>No events found</h3>
            <p>Try adjusting your filters or search term</p>
          </motion.div>
        ) : (
          <motion.div 
            className="events-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                className="event-card"
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: '0 15px 35px rgba(var(--primary-rgb), 0.15)' }}
              >
                <div className="event-card-inner">
                  <div className="event-date-badge">
                    <span className="event-day">{getDay(event.date)}</span>
                    <span className="event-month">{getMonth(event.date)}</span>
                  </div>
                  
                  <div className="card-body">
                    <h3 className="event-card-title">{event.title}</h3>
                    
                    <div className="event-card-details">
                      <div className="event-card-detail">
                        <FaCalendarAlt className="event-card-icon" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      
                      <div className="event-card-detail">
                        <FaMapMarkerAlt className="event-card-icon" />
                        <span>{event.location}</span>
                      </div>
                      
                      <div className="event-card-detail">
                        <FaUsers className="event-card-icon" />
                        <span>{event.attendees} Attendees</span>
                      </div>
                    </div>
                    
                    <p className="event-card-description">{event.description}</p>
                  </div>
                  
                  <div className="card-footer">
                    <div className="event-card-actions">
                      <Link to="#" className="btn-secondary">
                        More Details
                      </Link>
                      
                      <Link to="/booking" className="btn-primary">
                        Book Now <FaArrowRight className="icon-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Events; 