import { returnId } from '../../sql/helpers';

import mlb from '../data/mlb/divisions.json';
import nba from '../data/nba/divisions.json';
import nfl from '../data/nfl/divisions.json';
import nhl from '../data/nhl/divisions.json';

const leagues = [mlb, nba, nfl, nhl];

export async function seed(knex) {
  for (let league of leagues) {
    for (let division of league.divisions) {
      await returnId(knex('division')).insert({
        name: division.name,
        api_id: division.id,
        conference_id: await knex('conference')
          .where('api_id', division.conference_id)
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
