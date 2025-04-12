import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaArrowLeft, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Pages.css';
import Button from '../components/ui/Button';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success
        toast.success('Password reset link sent to your email!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setIsSubmitted(true);
      } catch (error) {
        toast.error('An error occurred. Please try again later.', {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Shake animation for form when there are errors
      const authForm = document.querySelector('.auth-form');
      if (authForm) {
        authForm.classList.add('shake');
        setTimeout(() => {
          authForm.classList.remove('shake');
        }, 500);
      }

      toast.error('Please enter a valid email address', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="page auth-page">
      <div className="container">
        <div className="auth-container forgot-password-container">
          <motion.div 
            className="auth-form-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/login" className="back-link">
              <FaArrowLeft /> Back to Login
            </Link>

            {isSubmitted ? (
              <motion.div 
                className="success-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="success-icon">
                  <FaCheckCircle />
                </div>
                <h2>Check Your Email</h2>
                <p>
                  We've sent a password reset link to: <br />
                  <strong>{formData.email}</strong>
                </p>
                <p className="info-text">
                  If you don't see the email in your inbox, please check your spam folder. The link will expire in 24 hours.
                </p>
                <div className="action-buttons">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSubmitted(false)}
                  >
                    Try a different email
                  </Button>
                  <Button 
                    variant="primary"
                    onClick={() => window.location.href = "https://mail.google.com"}
                  >
                    Open Gmail
                  </Button>
                </div>
                <p className="small-text">
                  Didn't receive the email? <button className="text-button" onClick={() => {
                    toast.info('Resending email...', {
                      position: 'top-right',
                      autoClose: 3000
                    });
                  }}>Resend</button>
                </p>
              </motion.div>
            ) : (
              <>
                <h1 className="auth-title">Forgot Password?</h1>
                <p className="auth-subtitle">Enter your email address and we'll send you a link to reset your password</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                  <motion.div 
                    className="form-group"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <label htmlFor="email">Email Address</label>
                    <div className={`input-group ${formErrors.email ? 'error' : ''}`}>
                      <span className="input-icon">
                        <FaEnvelope />
                      </span>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className={formErrors.email ? 'form-control is-invalid' : 'form-control'}
                      />
                    </div>
                    {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                  </motion.div>

                  <motion.div 
                    className="form-group"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 }}
                  >
                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      disabled={isLoading}
                      icon={FaPaperPlane}
                    >
                      {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                  </motion.div>
                </form>
              </>
            )}
            
            <motion.div 
              className="auth-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p>
                Remember your password? <Link to="/login">Log In</Link>
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="auth-image-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="auth-image forgot-password-image">
              <motion.div 
                className="floating-shape shape1"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              />
              <motion.div 
                className="floating-shape shape2"
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -7, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              />
              <div className="auth-image-overlay">
                <h2>Password Recovery</h2>
                <p>We'll help you get back to planning amazing events in no time.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 