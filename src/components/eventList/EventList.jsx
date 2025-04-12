import React, { useState } from 'react';
import { FaCalendarPlus, FaMapMarkerAlt, FaUsers, FaInfoCircle } from 'react-icons/fa';
import './EventList.css';

const EventList = ({ events }) => {
  const [expandedEvent, setExpandedEvent] = useState(null);
  
  // Sort events by date (ascending)
  const sortedEvents = [...events].sort((a, b) => a.date - b.date);
  
  const toggleEventDetails = (eventId) => {
    if (expandedEvent === eventId) {
      setExpandedEvent(null);
    } else {
      setExpandedEvent(eventId);
    }
  };
  
  // Format date to display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const addToCalendar = (event) => {
    // Format date for calendar
    const formattedDate = event.date.toISOString().replace(/-|:|\.\d+/g, '');
    const endDate = new Date(event.date);
    endDate.setHours(endDate.getHours() + 2); // Assume event lasts 2 hours
    const formattedEndDate = endDate.toISOString().replace(/-|:|\.\d+/g, '');
    
    // Create Google Calendar URL
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formattedDate}/${formattedEndDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    // Open in a new tab
    window.open(googleCalendarUrl, '_blank');
  };
  
  return (
    <div className="event-list">
      {sortedEvents.length === 0 ? (
        <div className="no-events">
          <FaInfoCircle className="no-events-icon" />
          <p>No upcoming events scheduled yet.</p>
        </div>
      ) : (
        <div className="events-grid">
          {sortedEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-date">
                <span className="event-month">{event.date.toLocaleDateString('en-US', { month: 'short' })}</span>
                <span className="event-day">{event.date.getDate()}</span>
              </div>
              
              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                
                <div className="event-info">
                  <div className="event-info-item">
                    <FaMapMarkerAlt className="event-icon" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="event-info-item">
                    <FaUsers className="event-icon" />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>
                
                {expandedEvent === event.id && (
                  <div className="event-details">
                    <p className="event-description">{event.description}</p>
                  </div>
                )}
                
                <div className="event-actions">
                  <button 
                    className="btn-toggle-details"
                    onClick={() => toggleEventDetails(event.id)}
                  >
                    {expandedEvent === event.id ? 'Hide Details' : 'Show Details'}
                  </button>
                  
                  <button 
                    className="btn-add-calendar"
                    onClick={() => addToCalendar(event)}
                  >
                    <FaCalendarPlus className="btn-icon" />
                    Add to Calendar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList; 