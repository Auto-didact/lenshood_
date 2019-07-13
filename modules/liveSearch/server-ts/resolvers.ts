import { PubSub, withFilter } from 'graphql-subscriptions';

const SEARCH_SUBSCRIPTION = 'search_subscription';

export default (pubsub: PubSub) => ({
  Query: {
    liveSearches(obj: any, { orderBy, filter }: any, context: any) {
      return context.LiveSearch.liveSearches(orderBy, filter);
    }
  },
  Mutation: {
    async addSearchItem(obj: any, { input }: any, context: any) {
      if (!input.userId) {
        input.userId = context.identity.id;
      }
      const id = await context.LiveSearch.addSearchItem(input.userId, input.gearCategory, input.queryItem);
      const item = await context.LiveSearch.liveSearchItem(id);
      pubsub.publish(SEARCH_SUBSCRIPTION, {
        liveSearchUpdated: {
          mutation: 'CREATED',
          node: item
        }
      });
      return item;
    },
    async increSearchItem(obj: any, { input }: any, context: any) {
      if (!input.userId) {
        input.userId = context.identity.id;
      }

      await context.LiveSearch.increSearchItem(input.userId, input.id);

      const item = await context.LiveSearch.liveSearchItem(input.id);
      pubsub.publish(SEARCH_SUBSCRIPTION, {
        liveSearchUpdated: {
          mutation: 'UPDATED',
          node: item
        }
      });
      return item;
    },
    async decreSearchItem(obj: any, { input }: any, context: any) {
      if (!input.userId) {
        input.userId = context.identity.id;
      }
      const searchitem = await context.LiveSearch.liveSearchItem(input.id);
      const isDeleted = await context.LiveSearch.decreSearchItem(input.userId, input.id);
      if (isDeleted) {
        const item = await context.LiveSearch.liveSearchItem(input.id);
        if (item) {
          pubsub.publish(SEARCH_SUBSCRIPTION, {
            liveSearchUpdated: {
              mutation: 'UPDATED',
              node: item
            }
          });
          return item;
        } else {
          pubsub.publish(SEARCH_SUBSCRIPTION, {
            liveSearchUpdated: {
              mutation: 'DELETED',
              node: searchitem
            }
          });
          return { searchitem };
        }
      } else {
        throw new Error("Couldn't perform the task");
      }
    }
  },
  Subscription: {
    liveSearchUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(SEARCH_SUBSCRIPTION),
        (payload, variables) => {
          const { mutation, node } = payload.liveSearchUpdated;
          const {
            filter: { gearCategory, searchText }
          } = variables;

          const checkByFilter =
            (!gearCategory || gearCategory === node.gearCategory) &&
            (!searchText || node.queryItem.toUpperCase().includes(searchText.toUpperCase()));

          switch (mutation) {
            case 'DELETED':
              return true;
            case 'CREATED':
              return checkByFilter;
            case 'UPDATED':
              return !checkByFilter;
            default:
              return false;
          }
        }
      )
    }
  }
});
