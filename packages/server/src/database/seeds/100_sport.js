import { returnId, truncateTables } from '../../sql/helpers';

export async function seed(knex, Promise) {
  await truncateTables(knex, Promise, ['sport', 'league', 'conference', 'division', 'team', 'team_hashtag']);

  await returnId(knex('sport')).insert({
    name: 'Baseball',
    slug: 'baseball',
    image: 'sports/baseball.svg'
  });

  await returnId(knex('sport')).insert({
    name: 'Basketball',
    slug: 'basketball',
    image: 'sports/basketball.svg'
  });

  await returnId(knex('sport')).insert({
    name: 'Football',
    slug: 'football',
    image: 'sports/football.svg'
  });

  await returnId(knex('sport')).insert({
    name: 'Hockey',
    slug: 'hockey',
    image: 'sports/hockey.svg'
  });

  await returnId(knex('sport')).insert({
    name: 'Soccer',
    slug: 'soccer',
    image: 'sports/soccer.svg'
  });
}
