import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaGoogle, 
  FaFacebookF, 
  FaTwitter,
  FaSignInAlt
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Pages.css';
import Button from '../components/ui/Button';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
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

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle remember me
  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // For demo purposes, use hardcoded credentials
        if (formData.email === 'demo@example.com' && formData.password === 'password123') {
          // Success
          toast.success('Login successful! Welcome back!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          // Store in local storage if remember me is checked
          if (rememberMe) {
            localStorage.setItem('user_email', formData.email);
          } else {
            localStorage.removeItem('user_email');
          }

          // Navigate to dashboard/home
          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else {
          // Failure
          toast.error('Invalid email or password', {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
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

  const loginWithSocial = (provider) => {
    toast.info(`Login with ${provider} coming soon!`, {
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
            <h1 className="auth-title">Welcome Back!</h1>
            <p className="auth-subtitle">Log in to access your EventBook account</p>

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
                <div className="label-group">
                  <label htmlFor="password">Password</label>
                  <Link to="/forgot-password" className="forgot-password">
                    Forgot Password?
                  </Link>
                </div>
                <div className={`input-group ${formErrors.password ? 'error' : ''}`}>
                  <span className="input-icon">
                    <FaLock />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
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
              </motion.div>

              <motion.div 
                className="remember-me"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={toggleRememberMe}
                  />
                  <span className="checkmark"></span>
                  Remember me
                </label>
              </motion.div>

              <motion.div 
                className="form-group"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isLoading}
                  icon={FaSignInAlt}
                >
                  {isLoading ? 'Logging in...' : 'Log In'}
                </Button>
              </motion.div>
            </form>

            <motion.div 
              className="social-login"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <div className="or-divider">
                <span>Or continue with</span>
              </div>

              <div className="social-buttons">
                <motion.button 
                  className="social-btn google"
                  whileHover={{ y: -5, boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => loginWithSocial('Google')}
                >
                  <FaGoogle />
                </motion.button>
                <motion.button 
                  className="social-btn facebook"
                  whileHover={{ y: -5, boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => loginWithSocial('Facebook')}
                >
                  <FaFacebookF />
                </motion.button>
                <motion.button 
                  className="social-btn twitter"
                  whileHover={{ y: -5, boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => loginWithSocial('Twitter')}
                >
                  <FaTwitter />
                </motion.button>
              </div>
            </motion.div>

            <motion.div 
              className="auth-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="auth-image-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="auth-image login-image">
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
                <h2>Plan Your Next Big Event with Us</h2>
                <p>Access your bookings, manage events, and discover new venues all in one place.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login; 