/*eslint-disable no-unused-vars*/
import { createBatchResolver } from 'graphql-resolve-batch';

export default pubsub => ({
  Query: {
    async getTeam(obj, { id }, context) {
      return context.Team.team(id);
    },
    async getTeams(obj, { ids }, context) {
      return context.Team.teams(ids);
    },
    async getTeamsByCoordinates(obj, { latitude, longitude }, context) {
      return context.Team.teamsByCoordinates(latitude, longitude);
    },
    async getTeamsByUser(obj, { userId }, context) {
      var val = context.Team.teamsByUser(userId);
      console.log(val);
      return val;
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
