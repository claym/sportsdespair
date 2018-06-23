import React from 'react';
//import { Route, NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';
//import { MenuItem } from '../../modules/common/components/web';
import Scoreboard from './containers/Scoreboard';
import reducers from './reducers';

import Feature from '../connector';

import { withLoadedUser } from '../user';

export default new Feature({
  route: <Route exact path="/" component={withLoadedUser(Scoreboard)} />,
  /**
  navItem: (
    <MenuItem key="scoreboard">
      <NavLink to="/scoreboard" className="nav-link" activeClassName="active">
        Scoreboard
      </NavLink>
    </MenuItem>
  ),
  */
  reducer: { scoreboard: reducers }
});
