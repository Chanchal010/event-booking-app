import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaGoogle, 
  FaFacebookF, 
  FaTwitter,
  FaUserPlus,
  FaCheckCircle
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Pages.css';
import Button from '../components/ui/Button';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: 'Enter password'
  });

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

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeToTerms) {
      errors.terms = 'You must agree to the terms and conditions';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Check password strength when password field changes
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Toggle terms agreement
  const toggleAgreeToTerms = () => {
    setAgreeToTerms(!agreeToTerms);
  };

  // Check password strength
  const checkPasswordStrength = (password) => {
    let score = 0;
    let message = '';

    if (password.length > 0) {
      // Start with a basic score
      score = 1;
      message = 'Weak';

      // Length check
      if (password.length >= 8) score++;
      if (password.length >= 12) score++;

      // Complexity check
      if (/[A-Z]/.test(password)) score++;
      if (/[a-z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;
    } else {
      message = 'Enter password';
    }

    // Determine message based on score
    if (score > 2) message = 'Moderate';
    if (score > 4) message = 'Strong';
    if (score > 6) message = 'Very Strong';

    // Cap the score at 5 for the progress bar (out of 5 segments)
    const normalizedScore = Math.min(score, 5);
    
    setPasswordStrength({ score: normalizedScore, message });
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
        toast.success('Registration successful! Welcome to EventBook!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Navigate to login
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } catch (error) {
        console.error('Registration error:', error);
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

      toast.error('Please correct the errors in the form', {
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

  const registerWithSocial = (provider) => {
    toast.info(`Register with ${provider} coming soon!`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="page auth-page">
      <div className="container">
        <div className="auth-container">
          <motion.div 
            className="auth-form-container"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="auth-title">Create an Account</h1>
            <p className="auth-subtitle">Join EventBook and start planning amazing events</p>

            <form className="auth-form" onSubmit={handleSubmit}>
              {/* Name Field */}
              <motion.div 
                className="form-group"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <label htmlFor="name">Full Name</label>
                <div className={`input-group ${formErrors.name ? 'error' : ''}`}>
                  <span className="input-icon">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className={formErrors.name ? 'form-control is-invalid' : 'form-control'}
                  />
                </div>
                {formErrors.name && <p className="error-message">{formErrors.name}</p>}
              </motion.div>

              {/* Email Field */}
              <motion.div 
                className="form-group"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
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

              {/* Password Field */}
              <motion.div 
                className="form-group"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="password">Create Password</label>
                <div className={`input-group ${formErrors.password ? 'error' : ''}`}>
                  <span className="input-icon">
                    <FaLock />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    className={formErrors.password ? 'form-control is-invalid' : 'form-control'}
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formErrors.password && <p className="error-message">{formErrors.password}</p>}
                
                {/* Password Strength Meter */}
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-meter">
                      {[...Array(5)].map((_, index) => (
                        <div 
                          key={index} 
                          className={`strength-segment ${index < passwordStrength.score ? 'active' : ''}`}
                          style={{
                            backgroundColor: index < passwordStrength.score 
                              ? passwordStrength.score < 3 
                                ? '#ff9800' 
                                : passwordStrength.score < 5 
                                  ? '#2196f3' 
                                  : '#4caf50'
                              : undefined
                          }}
                        />
                      ))}
                    </div>
                    <span 
                      className="strength-text"
                      style={{
                        color: passwordStrength.score < 3 
                          ? '#ff9800' 
                          : passwordStrength.score < 5 
                            ? '#2196f3' 
                            : '#4caf50'
                      }}
                    >
                      {passwordStrength.message}
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div 
                className="form-group"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className={`input-group ${formErrors.confirmPassword ? 'error' : ''}`}>
                  <span className="input-icon">
                    <FaLock />
                  </span>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={formErrors.confirmPassword ? 'form-control is-invalid' : 'form-control'}
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={toggleConfirmPasswordVisibility}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formErrors.confirmPassword && <p className="error-message">{formErrors.confirmPassword}</p>}
                {formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <p className="success-message">
                    <FaCheckCircle /> Passwords match
                  </p>
                )}
              </motion.div>

              {/* Terms and Conditions */}
              <motion.div 
                className="form-group"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
              >
                <div className={`terms-checkbox ${formErrors.terms ? 'error' : ''}`}>
                  <label className="checkbox-container">
                    <input 
                      type="checkbox" 
                      checked={agreeToTerms}
                      onChange={toggleAgreeToTerms}
                    />
                    <span className="checkmark"></span>
                    I agree to the <Link to="/terms" className="terms-link">Terms of Service</Link> and <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                  </label>
                </div>
                {formErrors.terms && <p className="error-message">{formErrors.terms}</p>}
              </motion.div>

              {/* Submit Button */}
              <motion.div 
                className="form-group"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
              >
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isLoading}
                  icon={FaUserPlus}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </motion.div>
            </form>

            <motion.div 
              className="social-login"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
            >
              <div className="or-divider">
                <span>Or sign up with</span>
              </div>

              <div className="social-buttons">
                <motion.button 
                  className="social-btn google"
                  whileHover={{ y: -5, boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => registerWithSocial('Google')}
                >
                  <FaGoogle />
                </motion.button>
                <motion.button 
                  className="social-btn facebook"
                  whileHover={{ y: -5, boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => registerWithSocial('Facebook')}
                >
                  <FaFacebookF />
                </motion.button>
                <motion.button 
                  className="social-btn twitter"
                  whileHover={{ y: -5, boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => registerWithSocial('Twitter')}
                >
                  <FaTwitter />
                </motion.button>
              </div>
            </motion.div>

            <motion.div 
              className="auth-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p>
                Already have an account? <Link to="/login">Log In</Link>
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="auth-image-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="auth-image register-image">
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
              <motion.div 
                className="floating-shape shape3"
                animate={{ 
                  y: [0, 10, 0],
                  x: [0, -10, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              />
              <div className="auth-image-overlay">
                <h2>Join Our Community</h2>
                <p>Create an account to start planning and managing your events with ease.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register; 