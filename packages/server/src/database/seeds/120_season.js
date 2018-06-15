import { returnId } from '../../sql/helpers';

import mlb from '../data/mlb/seasons.json';
import nba from '../data/nba/seasons.json';
import nfl from '../data/nfl/seasons.json';
import nhl from '../data/nhl/seasons.json';

const leagues = [mlb, nba, nfl, nhl];

export async function seed(knex) {
  for (let league of leagues) {
    for (let season of league.seasons) {
      await returnId(knex('season')).insert({
        name: season.name,
        api_id: season.id,
        starts_on: season.starts_on,
        ends_on: season.ends_on,
        slug: season.slug,
        league_id: await knex('league')
          .where('api_id', season.league_id)
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
