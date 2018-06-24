/*eslint-disable no-unused-vars*/
import { camelizeKeys } from 'humps';
import { returnId, orderedFor } from '../../sql/helpers';
import knex from '../../sql/connector';

export default class Team {
  async team(id) {
    return camelizeKeys(
      await knex
        .select('t.id', 't.name', 't.nickname', 't.latitude', 't.longitude')
        .from('team as t')
        .where('t.id', '=', id)
        .first()
    );
  }
  async teams(ids) {
    return camelizeKeys(
      await knex
        .select('t.id', 't.name', 't.nickname', 't.latitude', 't.longitude')
        .from('team as t')
        .whereIn('t.id', ids)
    );
  }
  async teamsByCoordinates(latitude, longitude) {
    return camelizeKeys(
      await knex
        .raw(
          `with location as (
        select
          t.id,
          t.name,
          t.nickname,
          t.latitude,
          t.longitude,
          st_distance(t.location, ST_POINT(:longitude, :latitude)) as distance,
          row_number()
          over (
            PARTITION BY t.league_id
            order by st_distance(t.location, ST_POINT(:longitude, :latitude)) ) as rank
        from team t)
        select l.id, l.name, l.nickname, l.latitude, l.longitude
        from location l
        where l.rank = 1
        order by distance`,
          { longitude: longitude, latitude: latitude }
        )
        .then(data => {
          return data.rows;
        })
    );
  }
  async teamsByUser(userId) {
    return camelizeKeys(
      await knex
        .select('t.id', 't.name', 't.nickname', 't.latitude', 't.longitude', 'ut.weight')
        .from('team as t')
        .innerJoin('user_team as ut', 't.id', 'ut.team_id')
        .where({ user_id: userId })
        .orderBy('ut.weight', 'desc')
        .orderBy('t.nickname', 'asc')
        .then(rows => {
          return rows;
        })
    );
  }
  async getTeamImages(teamIds) {
    return this.getTeamValueChildren(teamIds, 'team_image');
  }
  async getTeamColors(teamIds) {
    return this.getTeamValueChildren(teamIds, 'team_color');
  }
  async getTeamHashTags(teamIds) {
    return this.getTeamValueChildren(teamIds, 'team_hashtag');
  }
  async getTeamValueChildren(teamIds, table) {
    const res = await knex
      .select('id', 'value', 'primary', 'team_id AS teamId')
      .from(table)
      .whereIn('team_id', teamIds);
    return orderedFor(res, teamIds, 'teamId', false);
  }
}
