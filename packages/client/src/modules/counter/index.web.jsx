import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '../../modules/common/components/web';

import Counter from './containers/Counter';
import resolvers from './resolvers';
import reducers from './reducers';
import resources from './locales';

import Feature from '../connector';

export default new Feature({
  route: <Route exact path="/counter" component={Counter} />,
  resolver: resolvers,
  reducer: { counter: reducers },
  localization: { ns: 'counter', resources },
  navItem: (
    <MenuItem key="counter">
      <NavLink to="/counter" className="nav-link" activeClassName="active">
        Counter
      </NavLink>
    </MenuItem>
  )
});
