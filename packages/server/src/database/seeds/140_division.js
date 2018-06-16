import { returnId } from '../../sql/helpers';

import mlb from '../data/mlb/divisions.json';
import nba from '../data/nba/divisions.json';
import nfl from '../data/nfl/divisions.json';
import nhl from '../data/nhl/divisions.json';

const leagues = [mlb, nba, nfl, nhl];

export async function seed(knex) {
  var conferenceData = await knex('conference')
    .select('id', 'api_id')
    .then(rows => {
      console.log('rows: ' + rows);
      return rows;
    });

  await Promise.all(
    leagues.map(async league => {
      return Promise.all(
        league.divisions.map(async division => {
          await returnId(knex('division')).insert({
            name: division.name,
            api_id: division.id,
            conference_id: conferenceData.find(conference => {
              return conference.api_id == division.conference_id;
            }).id
          });
        })
      );
    })
  );
}
