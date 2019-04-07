// import { PubSub, withFilter } from 'graphql-subscriptions';
// import { createBatchResolver } from 'graphql-resolve-batch';
// interfaces
import { Listing, Identifier } from './sql';

interface Edges {
  cursor: number;
  node: Listing & Identifier;
}

interface ListingsParams {
  limit: number;
  after: number;
}

export default (pubsub: any) => ({
  Query: {
    async listings(obj: any, { limit, after }: ListingsParams, context: any) {
      const edgesArray: Edges[] = [];
      const listings = await context.Listing.listingsPagination(limit, after);
      const total = (await context.Listing.getTotal()).count;
      const hasNextPage = total > after + limit;

      listings.map((listing: Listing & Identifier, index: number) => {
        edgesArray.push({
          cursor: after + index,
          node: listing
        });
      });
      const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;

      return {
        totalCount: total,
        edges: edgesArray,
        pageInfo: {
          endCursor,
          hasNextPage
        }
      };
    }
  },
  Mutation: {},
  Subscription: {}
});
