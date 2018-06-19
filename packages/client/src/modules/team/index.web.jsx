import React from 'react';
// import { Route, NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';
//import { MenuItem } from '../../modules/common/components/web';
import Team from './containers/Team';
import reducers from './reducers';

import Feature from '../connector';

export default new Feature({
  //route: <Route exact path="/" component={Team} />,
  route: <Route exact path="/" component={Team} />,
  /** 
  navItem: (
    <MenuItem key="team">
      <NavLink to="/team" className="nav-link" activeClassName="active">
        Team
      </NavLink>
    </MenuItem>
  ),
  */
  reducer: { team: reducers }
});
