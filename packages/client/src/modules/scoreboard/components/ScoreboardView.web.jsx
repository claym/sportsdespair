import React from 'react';
import { Query, withApollo, ApolloProvider } from 'react-apollo';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import rp from 'request-promise';
import { PageLayout } from '../../common/components/web';

import LOCATION_QUERY from '../graphql/ScoreboardQuery.graphql';

const logoStyle = {
  height: '128px',
  width: '128px'
};
const teamDisplay = {
  fontSize: 18,
  fontWeight: 'bold'
};

class ScoreboardView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: null
    };
  }

  componentDidMount() {
    if (!this.props.currentUser && !this.state.userLocation) {
      var options = {
        uri: 'http://localhost:3000/iplocation',
        json: true
      };
      rp(options).then(data => {
        this.setState({
          userLocation: {
            longitude: data.longitude,
            latitude: data.latitude,
            ipaddress: data.ip
          }
        });
      });
    }
  }

  renderMetaData() {
    return (
      <Helmet
        title="Scoreboard"
        meta={[
          {
            name: 'description',
            content: 'Scoreboard page'
          }
        ]}
      />
    );
  }

  render() {
    if (this.state.userLocation) {
      return (
        <PageLayout>
          {this.renderMetaData()}
          <ApolloProvider client={this.props.client}>
            <LocationQuery latitude={this.state.userLocation.latitude} longitude={this.state.userLocation.longitude} />
          </ApolloProvider>
        </PageLayout>
      );
    }
    return (
      <PageLayout>
        {this.renderMetaData()}
        <div className="text-center">No teams found!</div>
      </PageLayout>
    );
  }
}

const LocationQuery = location => {
  return (
    <Query
      query={LOCATION_QUERY}
      variables={{ latitude: location.latitude, longitude: location.longitude }}
      notifyOnNetworkStatusChange
      // pollInterval={500}
    >
      {({ loading, error, data, networkStatus }) => {
        if (networkStatus === 4) return 'Refetching!';
        if (loading) return null;
        if (error) return `Error!: ${error}`;

        return (
          <div className="text-center mt-4 mb-4">
            {data.getTeamsByLocation.map(team => <TeamDisplay key={team.id} team={team} />)}
          </div>
        );
      }}
    </Query>
  );
};

const TeamDisplay = ({ team }) => {
  let imgSrc = 'https://res.cloudinary.com/dzgwovnp8/image/upload/sports/' + team.images[0].value;
  let color0 = '#' + team.colors[0].value;
  let color1 = '#' + team.colors[1].value;
  return (
    <div style={teamDisplay}>
      <img src={imgSrc} style={logoStyle} />
      <span style={{ color: color0 }}>{team.name}</span>
      &nbsp;
      <span style={{ color: color1, fontSize: 27 }}>{team.nickname}</span>
    </div>
  );
};

/**
const renderMetaData = () => (
  <Helmet
    title="Scoreboard"
    meta={[
      {
        name: 'description',
        content: 'Scoreboard page'
      }
    ]}
  />
);



const ScoreboardView = ({ currentUser, loading, teamList }) => {
  console.log('Current User: ' + currentUser);
  if (loading) {
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="text-center">Loading</div>
      </PageLayout>
    );
  }
  if (teamList) {
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="text-center mt-4 mb-4">
          {teamList.map(team => {
            <TeamDisplay key={team.id.toString()} team={team} />;
          })}
        </div>
      </PageLayout>
    );
  }
  return (
    <PageLayout>
      {renderMetaData()}
      <div className="text-center">No teams found!</div>
    </PageLayout>
  );
};
*/
ScoreboardView.propTypes = {
  currentUser: PropTypes.object,
  client: PropTypes.object.isRequired
};

TeamDisplay.propTypes = {
  team: PropTypes.object
};
export default withApollo(ScoreboardView);
