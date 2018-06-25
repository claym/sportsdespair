import { returnId } from '../../sql/helpers';

import mlb from '../data/mlb/divisions.json';
import nba from '../data/nba/divisions.json';
import nfl from '../data/nfl/divisions.json';
import nhl from '../data/nhl/divisions.json';

const leagues = [mlb, nba, nfl, nhl];

export async function seed(knex) {
  var groupData = await knex('group')
    .select('id', 'api_id', 'league_id')
    .then(rows => {
      return rows;
    });

  await Promise.all(
    leagues.map(async league => {
      return Promise.all(
        league.divisions.map(async division => {
          await returnId(knex('group')).insert({
            name: division.name,
            api_id: division.id,
            parent_id: groupData.find(group => {
              return group.api_id == division.conference_id;
            }).id,
            league_id: groupData.find(group => {
              return group.api_id == division.conference_id;
            }).league_id
          });
        })
      );
    })
  );
}
