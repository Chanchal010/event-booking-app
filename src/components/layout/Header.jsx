import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaSun, FaMoon, FaDesktop, FaBars, FaSignInAlt } from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme, getThemeText } = useContext(ThemeContext);
  const location = useLocation();
  const menuRef = useRef(null);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);
  
  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.menu-toggle')) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);
  
  // Handle body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);
  
  // Get theme icon
  const getThemeIcon = () => {
    if (theme === 'light') return <FaSun />;
    if (theme === 'dark') return <FaMoon />;
    return <FaDesktop />;
  };
  
  // Animation variants
  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: theme === 'dark' 
        ? "0px 5px 15px rgba(0, 0, 0, 0.4)" 
        : "0px 5px 15px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (custom) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.1 * custom,
        duration: 0.5
      }
    })
  };
  
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>}
      
      <div className="container header-content">
        <motion.div 
          className="logo"
          initial="hidden"
          animate="visible"
          variants={logoVariants}
        >
          <Link to="/">
            <FaCalendarAlt size={24} />
            <span>EventBook</span>
          </Link>
        </motion.div>
        
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className="main-nav" ref={menuRef}>
          <ul>
            {['Home', 'Events', 'Book Now', 'About', 'Contact'].map((item, index) => (
              <motion.li
                key={item}
                custom={index + 1}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <NavLink 
                  to={item === 'Home' 
                    ? '/' 
                    : item === 'Book Now' 
                      ? '/booking' 
                      : `/${item.toLowerCase()}`
                  }
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </nav>
        
        <div className="user-actions">
          <motion.button 
            className="theme-toggle" 
            onClick={toggleTheme}
            title={`${getThemeText()} Mode`}
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.4 }}
          >
            {getThemeIcon()}
          </motion.button>
          
          <motion.div
            className="sign-in-button-container"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            <Link to="/auth/login" className="sign-in-button">
              <FaSignInAlt size={16} />
              <motion.span 
                initial={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                Sign In
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header; 