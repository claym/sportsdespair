import React from 'react';
import { NavLink } from 'react-router-dom';
//import { Container, Navbar, Nav, NavItem } from 'reactstrap';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import modules from '../../../../../../modules';
import settings from '../../../../../../../../../settings';

const NavBar = () => (
  /**  
    <Navbar color="faded" light>
      <Container>
        <Nav>
          <NavLink to="/" className="navbar-brand">
            {settings.app.name}
          </NavLink>
          {modules.navItems}
        </Nav>
  
        <Nav className="justify-content-end">
          {modules.navItemsRight}
          {__DEV__ && (
            <NavItem>
              <a href="/graphiql" className="nav-link">
                GraphiQL
              </a>
            </NavItem>
          )}
        </Nav>
      </Container>
    </Navbar>
    **/
  <AppBar position="static">
    <Toolbar>
      <IconButton color="inherit" aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <NavLink to="/" className="navbar-brand">
        <Typography variant="title" color="inherit">
          {settings.app.name}
        </Typography>
      </NavLink>
      {modules.navItems}
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
);

export default NavBar;
