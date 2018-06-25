import { returnId } from '../../sql/helpers';

import mlb from '../data/mlb/conferences.json';
import nba from '../data/nba/conferences.json';
import nfl from '../data/nfl/conferences.json';
import nhl from '../data/nhl/conferences.json';

const leagues = [mlb, nba, nfl, nhl];

export async function seed(knex) {
  var leagueData = await knex('league')
    .select('id', 'api_id')
    .then(rows => {
      return rows;
    });
  await Promise.all(
    await leagues.map(async league => {
      return Promise.all(
        await league.conferences.map(async conference => {
          await returnId(knex('group')).insert({
            name: conference.name,
            api_id: conference.id,
            league_id: leagueData.find(league => {
              return league.api_id == conference.league_id;
            }).id
          });
        })
      );
    })
  );
}
