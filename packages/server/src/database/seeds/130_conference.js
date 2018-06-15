import { returnId } from '../../sql/helpers';

import mlb from '../data/mlb/conferences.json';
import nba from '../data/nba/conferences.json';
import nfl from '../data/nfl/conferences.json';
import nhl from '../data/nhl/conferences.json';

const leagues = [mlb, nba, nfl, nhl];

export async function seed(knex) {
  for (let league of leagues) {
    for (let conference of league.conferences) {
      await returnId(knex('conference')).insert({
        name: conference.name,
        api_id: conference.id,
        league_id: await knex('league')
          .where('api_id', conference.league_id)
          .select('id')
          .first()
          .then(value => {
            console.log(value);
            return value.id;
          })
      });
    }
  }
}
