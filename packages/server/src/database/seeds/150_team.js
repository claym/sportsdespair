import { returnId } from '../../sql/helpers';

import mlb from '../data/mlb/teams.json';
import nba from '../data/nba/teams.json';
import nfl from '../data/nfl/teams.json';
import nhl from '../data/nhl/teams.json';

let leagues = [mlb, nba, nfl, nhl];

export async function seed(knex) {
  const leagueData = await knex('league')
    .select('id', 'api_id')
    .then(rows => {
      return rows;
    });
  const divisionData = await knex('division')
    .select('id', 'api_id')
    .then(rows => {
      return rows;
    });

  await Promise.all(
    leagues.map(async league => {
      await Promise.all(
        league.teams.map(async team => {
          var teamId = await returnId(knex('team')).insert({
            name: team.name,
            nickname: team.nickname,
            api_id: team.id,
            slug: team.slug,
            longitude: team.longitude,
            latitude: team.latitude,
            location: knex.raw('ST_POINT(' + team.longitude + ', ' + team.latitude + ')'),
            division_id: divisionData.find(division => {
              return division.api_id == team.division_id;
            }).id,
            league_id: leagueData.find(league => {
              return league.api_id == team.league_id;
            }).id
          });

          await Promise.all(
            team.images.map(async image => {
              await returnId(knex('team_image')).insert({
                value: image.image,
                primary: image.primary ? 1 : 0,
                team_id: teamId[0]
              });
            })
          );
          await Promise.all(
            team.images.map(async image => {
              await returnId(knex('team_image')).insert({
                value: image.image,
                primary: image.primary ? 1 : 0,
                team_id: teamId[0]
              });
            })
          );
          await Promise.all(
            team.images.map(async image => {
              await returnId(knex('team_image')).insert({
                value: image.image,
                primary: image.primary ? 1 : 0,
                team_id: teamId[0]
              });
            })
          );
        })
      );
    })
  );
}
