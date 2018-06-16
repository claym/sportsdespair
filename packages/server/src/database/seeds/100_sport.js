import { returnId, truncateTables } from '../../sql/helpers';

//import data from '../data/sports.json';

export async function seed(knex, Promise) {
  await truncateTables(knex, Promise, ['sport']);

  var data = require('../data/sports.json');
  await Promise.all(
    data.sports.map(async sport => {
      await returnId(knex('sport')).insert({
        name: sport.name,
        slug: sport.slug,
        image: sport.image
      });
    })
  );
}
