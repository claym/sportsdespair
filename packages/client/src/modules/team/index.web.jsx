import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '../../modules/common/components/web';
import Team from './containers/Team';
import reducers from './reducers';

import Feature from '../connector';

export default new Feature({
  //route: <Route exact path="/" component={Team} />,
  route: <Route exact path="/teams" component={Team} />,
  navItem: (
    <MenuItem key="teams">
      <NavLink to="/teams" className="nav-link" activeClassName="active">
        Teams
      </NavLink>
    </MenuItem>
  ),
  reducer: { team: reducers }
});
