import { returnId } from '../../sql/helpers';

export async function seed(knex) {
  console.log('Loading Leagues');
  var data = require('../data/leagues.json');
  var sports = await knex('sport')
    .select('id', 'slug')
    .then(rows => {
      console.log('rows: ' + JSON.stringify(rows));
      return rows;
    });
  await Promise.all(
    data.leagues.map(async league => {
      console.log('sport: ' + league.sport);
      await returnId(knex('league')).insert({
        name: league.name,
        abbr: league.abbreviation,
        image: league.image,
        slug: league.slug,
        api_id: league.id,
        sport_id: sports.find(sport => {
          return sport.slug == league.sport;
        }).id
      });
    })
  );
}
