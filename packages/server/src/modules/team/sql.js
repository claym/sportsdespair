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
