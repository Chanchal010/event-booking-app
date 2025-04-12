import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaPhone, FaInfoCircle, FaUsers, FaCalendarAlt, FaArrowRight, FaArrowLeft, FaClipboardList } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './EventForm.css';

const EventForm = ({ onSubmit, selectedDate }) => {
  const [formStep, setFormStep] = useState(0);
  const { register, handleSubmit, formState: { errors, isValid }, watch, trigger } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      eventType: 'meeting',
      attendees: 1,
      description: ''
    }
  });
  
  const watchAllFields = watch();
  
  const eventTypes = [
    { id: 'meeting', label: 'Meeting' },
    { id: 'conference', label: 'Conference' },
    { id: 'workshop', label: 'Workshop' },
    { id: 'party', label: 'Party' },
    { id: 'other', label: 'Other' }
  ];
  
  const validateStep = async () => {
    let fieldsToValidate = [];
    
    if (formStep === 0) {
      fieldsToValidate = ['name', 'email', 'phone'];
    } else if (formStep === 1) {
      fieldsToValidate = ['eventType', 'attendees', 'description'];
    }
    
    const result = await trigger(fieldsToValidate);
    if (result) setFormStep(current => current + 1);
  };

  const handleFormSubmit = (data) => {
    const eventData = {
      title: `${data.eventType.charAt(0).toUpperCase() + data.eventType.slice(1)} by ${data.name}`,
      location: 'To be determined',
      description: data.description,
      attendees: parseInt(data.attendees),
      contact: {
        name: data.name,
        email: data.email,
        phone: data.phone
      }
    };
    
    onSubmit(eventData);
  };
  
  return (
    <div className="event-form-container">
      {!selectedDate ? (
        <div className="date-required-message">
          <FaCalendarAlt className="icon" />
          <p>Please select a date from the calendar to proceed with booking</p>
        </div>
      ) : (
        <>
          <div className="form-progress">
            <div className={`progress-step ${formStep >= 0 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Personal Info</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${formStep >= 1 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Event Details</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${formStep >= 2 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Review</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            {formStep === 0 && (
              <div className="form-step">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <FaUser className="input-icon" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    {...register('name', { 
                      required: 'Name is required',
                      minLength: {
                        value: 3,
                        message: 'Name must be at least 3 characters'
                      }
                    })}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <div className="error-message">{errors.name.message}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <FaEnvelope className="input-icon" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <div className="error-message">{errors.email.message}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    <FaPhone className="input-icon" />
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9+\-\s()]{10,15}$/,
                        message: 'Invalid phone number format'
                      }
                    })}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <div className="error-message">{errors.phone.message}</div>}
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="form-button shimmer"
                    onClick={validateStep}
                  >
                    Next <FaArrowRight className="icon-right" />
                  </button>
                </div>
              </div>
            )}
            
            {formStep === 1 && (
              <div className="form-step">
                <div className="form-group">
                  <label htmlFor="eventType" className="form-label">Event Type</label>
                  <select
                    id="eventType"
                    className={`form-select ${errors.eventType ? 'is-invalid' : ''}`}
                    {...register('eventType', { required: 'Event type is required' })}
                  >
                    {eventTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                  {errors.eventType && <div className="error-message">{errors.eventType.message}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="attendees" className="form-label">
                    <FaUsers className="input-icon" />
                    Number of Attendees
                  </label>
                  <input
                    type="number"
                    id="attendees"
                    min="1"
                    max="500"
                    className={`form-control ${errors.attendees ? 'is-invalid' : ''}`}
                    {...register('attendees', { 
                      required: 'Number of attendees is required',
                      min: {
                        value: 1,
                        message: 'Minimum 1 attendee required'
                      },
                      max: {
                        value: 500,
                        message: 'Maximum 500 attendees allowed'
                      }
                    })}
                    placeholder="Enter number of attendees"
                  />
                  {errors.attendees && <div className="error-message">{errors.attendees.message}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    <FaInfoCircle className="input-icon" />
                    Event Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    {...register('description', { 
                      required: 'Description is required',
                      minLength: {
                        value: 10,
                        message: 'Description must be at least 10 characters'
                      },
                      maxLength: {
                        value: 500,
                        message: 'Description cannot exceed 500 characters'
                      }
                    })}
                    placeholder="Describe your event"
                  ></textarea>
                  {errors.description && <div className="error-message">{errors.description.message}</div>}
                </div>
                
                <div className="form-actions form-actions-double">
                  <button 
                    type="button" 
                    className="btn-back"
                    onClick={() => setFormStep(0)}
                  >
                    <FaArrowLeft className="icon-left" /> Back
                  </button>
                  <button 
                    type="button" 
                    className="form-button shimmer"
                    onClick={validateStep}
                  >
                    Next <FaArrowRight className="icon-right" />
                  </button>
                </div>
              </div>
            )}
            
            {formStep === 2 && (
              <motion.div 
                className="form-step review-step"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h3 
                  className="review-title"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  Review Your Booking
                </motion.h3>
                
                <motion.div 
                  className="review-section"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h4>Personal Information</h4>
                  <AnimatePresence>
                    {[
                      { label: 'Name', value: watchAllFields.name },
                      { label: 'Email', value: watchAllFields.email },
                      { label: 'Phone', value: watchAllFields.phone }
                    ].map((item, index) => (
                      <motion.div 
                        key={item.label}
                        className="review-item"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                        whileHover={{ backgroundColor: 'rgba(var(--primary-rgb), 0.08)' }}
                      >
                        <span className="review-label">{item.label}:</span>
                        <span className="review-value">{item.value}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
                
                <motion.div 
                  className="review-section"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h4>Event Details</h4>
                  <AnimatePresence>
                    <motion.div 
                      className="review-item"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      whileHover={{ backgroundColor: 'rgba(var(--primary-rgb), 0.08)' }}
                    >
                      <span className="review-label">Date:</span>
                      <span className="review-value">{selectedDate?.toLocaleDateString()}</span>
                    </motion.div>
                    
                    <motion.div 
                      className="review-item"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                      whileHover={{ backgroundColor: 'rgba(var(--primary-rgb), 0.08)' }}
                    >
                      <span className="review-label">Event Type:</span>
                      <span className="review-value">
                        {eventTypes.find(type => type.id === watchAllFields.eventType)?.label}
                      </span>
                    </motion.div>
                    
                    <motion.div 
                      className="review-item"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.4 }}
                      whileHover={{ backgroundColor: 'rgba(var(--primary-rgb), 0.08)' }}
                    >
                      <span className="review-label">Attendees:</span>
                      <span className="review-value">{watchAllFields.attendees}</span>
                    </motion.div>
                    
                    <motion.div 
                      className="review-item"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                    >
                      <span className="review-label">Description:</span>
                      <motion.span 
                        className="review-value description"
                        whileHover={{ 
                          boxShadow: '0 4px 15px rgba(var(--primary-rgb), 0.1)',
                          backgroundColor: 'rgba(var(--primary-rgb), 0.06)'
                        }}
                      >
                        {watchAllFields.description}
                      </motion.span>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
                
                <motion.div 
                  className="form-actions form-actions-double"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <motion.button 
                    type="button" 
                    className="btn-back"
                    onClick={() => setFormStep(1)}
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaArrowLeft className="icon-left" /> Back
                  </motion.button>
                  <motion.button 
                    type="submit" 
                    className="form-button shimmer"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Confirm Booking <FaCalendarAlt className="icon-right" />
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default EventForm; 