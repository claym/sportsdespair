/*eslint-disable no-unused-vars*/
import React from 'react';
import { graphql, compose } from 'react-apollo';

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
  options: () => {
    return {
      variables: { latitude: 50, longitude: -100 },
      fetchPolicy: 'cache-and-network'
    };
  },
  props: ({ data: { loading, getTeamsByLocation, error } }) => {
    return { loading, teamList: getTeamsByLocation };
  }
};

const ScoreboardWithApollo = compose(graphql(LOCATION_QUERY, teamQueryHandler))(Scoreboard);

export default ScoreboardWithApollo;
