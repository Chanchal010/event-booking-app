import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({
  children,
  className = '',
  variant = 'default',
  hover = true,
  shadow = true,
  bordered = false,
  ...props
}) => {
  const cardClasses = [
    'card',
    variant !== 'default' ? `card-${variant}` : '',
    shadow ? 'card-shadow' : '',
    hover ? 'card-hover' : '',
    bordered ? 'card-bordered' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`card-header ${className}`} {...props}>
    {children}
  </div>
);

const CardBody = ({ children, className = '', ...props }) => (
  <div className={`card-body ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`card-footer ${className}`} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'success', 'warning', 'danger']),
  hover: PropTypes.bool,
  shadow: PropTypes.bool,
  bordered: PropTypes.bool
};

CardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

CardBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

CardFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Card; 