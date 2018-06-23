/*eslint-disable no-unused-vars*/
import React from 'react';

import { withLoadedUser } from '../../user';

import ScoreboardView from '../components/ScoreboardView';

import LOCATION_QUERY from '../graphql/ScoreboardQuery.graphql';

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ScoreboardView {...this.props} />;
  }
}

const teamQueryHandler = {
  options: props => {
    //console.log('handler state: ' + this.state);
    console.log('handler props');
    console.log(props);
    return {
      variables: { latitude: 50, longitude: -100 },
      fetchPolicy: 'cache-and-network',
      ssr: false,
      delay: true
    };
  },
  skip: props => {
    console.log(props);
    return !props.userLocation;
  },
  props: ({ data: { loading, getTeamsByLocation, error, refetch } }) => {
    return { loading, teamList: getTeamsByLocation, refetch };
  }
};

//const ScoreboardWithApollo = withLoadedUser(compose(graphql(LOCATION_QUERY, teamQueryHandler))(Scoreboard));
const ScoreboardWithApollo = withLoadedUser(Scoreboard);

export default ScoreboardWithApollo;
