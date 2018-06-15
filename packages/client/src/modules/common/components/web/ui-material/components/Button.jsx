import React from 'react';
import PropTypes from 'prop-types';
import MUButton from '@material-ui/core/Button';

const Button = ({ children, ...props }) => {
  return (
    <MUButton variant="contained" {...props}>
      {children}
    </MUButton>
  );
};

Button.propTypes = {
  children: PropTypes.node
};

export default Button;
