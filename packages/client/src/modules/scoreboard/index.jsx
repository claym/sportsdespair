import { Ionicons } from '@expo/vector-icons';
import { createTabBarIconWrapper } from '../common/components/native';
import Scoreboard from './containers/Scoreboard';
import reducers from './reducers';

import Feature from '../connector';

export default new Feature({
  tabItem: {
    Scoreboard: {
      screen: Scoreboard,
      navigationOptions: {
        tabBarIcon: createTabBarIconWrapper(Ionicons, {
          name: 'ios-browsers-outline',
          size: 30
        })
      }
    }
  },
  reducer: { scoreboard: reducers }
});
