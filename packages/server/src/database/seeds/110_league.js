import { returnId } from '../../sql/helpers';

import data from '../data/leagues.json';

export async function seed(knex) {
  for (let league of data.leagues) {
    await returnId(knex('league')).insert({
      name: league.name,
      abbr: league.abbreviation,
      image: league.image,
      slug: league.slug,
      api_id: league.id,
      sport_id: await knex('sport')
        .where('slug', league.sport)
        .select('id')
        .first()
        .then(value => {
          return value.id;
        })
    });
  }
}
