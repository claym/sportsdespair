/*eslint-disable no-unused-vars*/
import { createBatchResolver } from 'graphql-resolve-batch';

export default pubsub => ({
  Query: {
    async getTeam(obj, { id }, context) {
      return context.Team.team(id);
    },
    async getTeams(obj, { ids }, context) {
      return context.Team.teams(ids);
    }
  },
  Team: {
    images: createBatchResolver((sources, args, context) => {
      return context.Team.getTeamImages(sources.map(({ id }) => id));
    }),
    colors: createBatchResolver((sources, args, context) => {
      return context.Team.getTeamColors(sources.map(({ id }) => id));
    }),
    hashtags: createBatchResolver((sources, args, context) => {
      return context.Team.getTeamHashtags(sources.map(({ id }) => id));
    })
  },
  Mutation: {},
  Subscription: {}
});
