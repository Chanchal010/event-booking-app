import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  fullWidth = false,
  isLoading = false,
  icon = null,
  iconPosition = 'left',
  href = null,
  ripple = true,
  ...props
}) => {
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    size !== 'md' ? `btn-${size}` : '',
    fullWidth ? 'btn-block' : '',
    isLoading ? 'btn-loading' : '',
    icon && children ? 'btn-with-icon' : '',
    icon && !children ? 'btn-icon' : '',
    iconPosition === 'right' && children ? 'btn-icon-right' : '',
    ripple ? 'ripple' : '',
    className
  ].filter(Boolean).join(' ');

  // Fix for React icon components
  const renderIcon = () => {
    if (!icon) return null;
    
    // If icon is a React component (function or object with render method)
    if (typeof icon === 'function') {
      return icon();
    } else if (React.isValidElement(icon)) {
      return icon;
    }
    
    return icon;
  };

  const renderContent = () => (
    <>
      {iconPosition === 'left' && icon && renderIcon()}
      {children}
      {iconPosition === 'right' && icon && renderIcon()}
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className={buttonClasses} 
        disabled={disabled} 
        {...props}
      >
        {renderContent()}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text', 'success', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.object]),
  iconPosition: PropTypes.oneOf(['left', 'right']),
  href: PropTypes.string,
  ripple: PropTypes.bool
};

export default Button; 