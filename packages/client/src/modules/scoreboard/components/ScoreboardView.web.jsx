import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { PageLayout } from '../../common/components/web';

const logoStyle = {
  height: '128px',
  width: '128px'
};
const teamDisplay = {
  fontSize: 18,
  fontWeight: 'bold'
};

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

const TeamDisplay = ({ team }) => {
  let imgSrc = 'https://res.cloudinary.com/dzgwovnp8/image/upload/sports/' + team.images[0].value;
  let color0 = '#' + team.colors[0].value;
  console.log('color 0: ' + color0);
  let color1 = '#' + team.colors[1].value;
  console.log('color 1: ' + color1);
  return (
    <div key={team.id.toString()} style={teamDisplay}>
      <img src={imgSrc} style={logoStyle} />
      <span style={{ color: color0 }}>{team.name}</span>
      &nbsp;
      <span style={{ color: color1, fontSize: 27 }}>{team.nickname}</span>
    </div>
  );
};

const ScoreboardView = ({ loading, teamList }) => {
  if (loading) {
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="text-center">Loading</div>
      </PageLayout>
    );
  }
  return (
    <PageLayout>
      {renderMetaData()}
      <div className="text-center mt-4 mb-4">{teamList.map(team => <TeamDisplay team={team} />)}</div>
    </PageLayout>
  );
};

ScoreboardView.propTypes = {
  teamList: PropTypes.array,
  loading: PropTypes.bool.isRequired
};

TeamDisplay.propTypes = {
  team: PropTypes.object
};
export default ScoreboardView;
