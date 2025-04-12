import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import './Calendar.css';

const Calendar = ({ events, selectedDate, onDateSelect }) => {
  const [hoveredDate, setHoveredDate] = useState(null);
  
  // Helper function to check if a date is in events
  const isDateBooked = (date) => {
    if (!date) return false;
    return events.some(event => 
      date.getDate() === event.date.getDate() && 
      date.getMonth() === event.date.getMonth() && 
      date.getFullYear() === event.date.getFullYear()
    );
  };
  
  // Get events for a specific date
  const getEventsForDate = (date) => {
    if (!date) return [];
    return events.filter(event => 
      date.getDate() === event.date.getDate() && 
      date.getMonth() === event.date.getMonth() && 
      date.getFullYear() === event.date.getFullYear()
    );
  };
  
  // Custom day rendering for DatePicker
  const renderDayContents = (day, date) => {
    const isBooked = isDateBooked(date);
    return (
      <div 
        className={`calendar-day ${isBooked ? 'booked-date' : ''}`}
        onMouseEnter={() => setHoveredDate(date)}
        onMouseLeave={() => setHoveredDate(null)}
      >
        {day}
        {isBooked && <span className="event-indicator"></span>}
      </div>
    );
  };
  
  return (
    <div className="calendar-wrapper calendar-booking-component">
      <div className="date-picker-container">
        <DatePicker
          selected={selectedDate}
          onChange={onDateSelect}
          inline
          renderDayContents={renderDayContents}
          minDate={new Date()}
          calendarClassName="custom-calendar"
        />
      </div>
      
      <div className="calendar-info">
        <div className="calendar-legend">
          <div className="legend-item">
            <span className="legend-color available"></span>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <span className="legend-color booked"></span>
            <span>Events Scheduled</span>
          </div>
        </div>
        
        {hoveredDate && isDateBooked(hoveredDate) && (
          <div className="date-events-preview">
            <h4>
              <FaCalendarAlt className="events-icon" />
              Events on {hoveredDate.toLocaleDateString()}
            </h4>
            <ul className="events-list">
              {getEventsForDate(hoveredDate).map(event => (
                <li key={event.id} className="event-item">
                  <span className="event-title">{event.title}</span>
                  <span className="event-location">{event.location}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {selectedDate && (
          <div className="selected-date-info">
            <h4>Selected Date</h4>
            <p>{selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            
            {isDateBooked(selectedDate) ? (
              <div className="date-status booked">
                <FaInfoCircle /> Events are scheduled on this date
              </div>
            ) : (
              <div className="date-status available">
                <FaInfoCircle /> This date is available for booking
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar; 