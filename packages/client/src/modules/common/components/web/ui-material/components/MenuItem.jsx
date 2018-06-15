import React from 'react';
import PropTypes from 'prop-types';
//import { NavItem } from 'reactstrap';
import Button from '@material-ui/core/Button';

const MenuItem = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

MenuItem.propTypes = {
  children: PropTypes.node
};

export default MenuItem;
