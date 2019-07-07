import { PubSub, withFilter } from "graphql-subscriptions";

const SEARCH_SUBSCRIPTION = "search_subscription";

export default (pubsub: PubSub) => ({
  Query: {
    liveSearches(obj: any, { orderBy, filter }: any, context: any) {
      return context.LiveSearch.liveSearches(orderBy, filter);
    }
  },
  Mutation: {
    async addSearchItem(obj: any, { input }: any, context: any) {
      if (!input.userId) input.userId = context.identity.id;
      const id = await context.LiveSearch.addSearchItem(
        input.userId,
        input.gearCategory,
        input.queryItem
      );
      const item = await context.LiveSearch.liveSearchItem(id);
      pubsub.publish(SEARCH_SUBSCRIPTION, {
        searchUpdated: {
          mutation: "CREATED",
          node: item
        }
      });
      return item;
    },
    async increSearchItem(obj: any, { input }: any, context: any) {
      if (!input.userId) input.userId = context.identity.id;

      await context.LiveSearch.increSearchItem(input.userId, input.searchId);

      const item = await context.LiveSearch.liveSearchItem(input.searchId);
      pubsub.publish(SEARCH_SUBSCRIPTION, {
        searchUpdated: {
          mutation: "UPDATED",
          node: item
        }
      });
      return item;
    },
    async decreSearchItem(obj: any, { input }: any, context: any) {
      if (!input.userId) input.userId = context.identity.id;
      const isDeleted = await context.LiveSearch.decreSearchItem(
        input.userId,
        input.searchId
      );
      if (isDeleted) {
        const item = await context.LiveSearch.liveSearchItem(input.searchId);
        if (item) {
          pubsub.publish(SEARCH_SUBSCRIPTION, {
            searchUpdated: {
              mutation: "UPDATED",
              node: item
            }
          });
        } else {
          pubsub.publish(SEARCH_SUBSCRIPTION, {
            searchUpdated: {
              mutation: "DELETED",
              node: item
            }
          });
        }
        return true;
      } else throw new Error("Couldn't perform the task");
    }
  },
  Subscription: {
    searchUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(SEARCH_SUBSCRIPTION),
        (payload, variables) => {
          const { mutation, node } = payload.searchUpdated;
          const {
            filter: { gearCategory, searchText }
          } = variables;

          const checkByFilter =
            (!gearCategory || gearCategory === node.gearCategory) &&
            (!searchText ||
              node.queryItem.toUpperCase().includes(searchText.toUpperCase()));

          switch (mutation) {
            case "DELETED":
              return true;
            case "CREATED":
              return checkByFilter;
            case "UPDATED":
              return !checkByFilter;
          }
        }
      )
    }
  }
});
