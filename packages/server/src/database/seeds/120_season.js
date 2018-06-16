import { returnId } from '../../sql/helpers';

import mlb from '../data/mlb/seasons.json';
import nba from '../data/nba/seasons.json';
import nfl from '../data/nfl/seasons.json';
import nhl from '../data/nhl/seasons.json';

const leagues = [mlb, nba, nfl, nhl];

export async function seed(knex) {
  console.log('Loading Seasons');
  var leagueData = await knex('league')
    .select('id', 'api_id')
    .then(rows => {
      console.log('rows: ' + rows);
      return rows;
    });
  await Promise.all(
    await leagues.map(async league => {
      return Promise.all(
        await league.seasons.map(async season => {
          await returnId(knex('season')).insert({
            name: season.name,
            api_id: season.id,
            starts_on: season.starts_on,
            ends_on: season.ends_on,
            slug: season.slug,
            league_id: leagueData.find(league => {
              return league.api_id == season.league_id;
            }).id
          });
        })
      );
    })
  );
}
