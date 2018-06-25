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
  const groupData = await knex('group')
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
            group_id: groupData.find(group => {
              return group.api_id == team.division_id;
            }).id,
            league_id: leagueData.find(league => {
              return league.api_id == team.league_id;
            }).id
          });

          await Promise.all(
            team.images.map(async (image, index) => {
              await returnId(knex('team_image')).insert({
                value: image,
                primary: index == 0 ? 1 : 0,
                team_id: teamId[0]
              });
            })
          );
          await Promise.all(
            team.colors.map(async (color, index) => {
              await returnId(knex('team_color')).insert({
                value: color,
                primary: index == 0 ? 1 : 0,
                team_id: teamId[0]
              });
            })
          );
          await Promise.all(
            team.hashtags.map(async (hashtag, index) => {
              await returnId(knex('team_hashtag')).insert({
                value: hashtag,
                primary: index == 0 ? 1 : 0,
                team_id: teamId[0]
              });
            })
          );
        })
      );
    })
  );
}
