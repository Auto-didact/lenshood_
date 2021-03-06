import { PubSub, withFilter } from 'graphql-subscriptions';
// import { createBatchResolver } from 'graphql-resolve-batch';
// interfaces
import { Listing, ListingReview, Identifier } from './sql';

interface Edges {
  cursor: number;
  node: Listing & Identifier;
}

interface ListingsParams {
  limit: number;
  after: number;
}

interface ListingInput {
  input: Listing;
}

interface ListingInputWithId {
  input: Listing & Identifier;
}

interface ListingReviewInput {
  input: ListingReview;
}

interface ListingReviewInputWithId {
  input: ListingReview & Identifier;
}

const LISTING_SUBSCRIPTION = 'listing_subscription';
const LISTINGS_SUBSCRIPTION = 'listings_subscription';
const LISTINGREVIEW_SUBSCRIPTION = 'listing_review_subscription';

export default (pubsub: PubSub) => ({
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
    },
    listing(obj: any, { id }: Identifier, context: any) {
      return context.Listing.listing(id);
    }
  },
  // Listing: {
  //   listingReviews: createBatchResolver((sources, args, context) => {
  //     return context.Listing.getListingReviewsForListingIds(sources.map(({ id }) => id));
  //   })
  // },
  Mutation: {
    async addListing(obj: any, { input }: ListingInput, context: any) {
      const id = await context.Listing.addListing(input);
      const listing = await context.Listing.listing(id);
      // publish for listing list
      pubsub.publish(LISTINGS_SUBSCRIPTION, {
        listingsUpdated: {
          mutation: 'CREATED',
          id,
          node: listing
        }
      });
      return listing;
    },
    async deleteListing(obj: any, { id }: Identifier, context: any) {
      const listing = await context.Listing.listing(id);
      const isDeleted = await context.Listing.deleteListing(id);
      if (isDeleted) {
        // publish for listing list
        pubsub.publish(LISTINGS_SUBSCRIPTION, {
          listingsUpdated: {
            mutation: 'DELETED',
            id,
            node: listing
          }
        });
        // publish for edit listing page
        pubsub.publish(LISTING_SUBSCRIPTION, {
          listingUpdated: {
            mutation: 'DELETED',
            id,
            node: listing
          }
        });
        return { id: listing.id };
      } else {
        return { id: null };
      }
    },
    async editListing(obj: any, { input }: ListingInputWithId, context: any) {
      await context.Listing.editListing(input);
      const listing = await context.Listing.listing(input.id);
      // publish for listing list
      pubsub.publish(LISTINGS_SUBSCRIPTION, {
        listingsUpdated: {
          mutation: 'UPDATED',
          id: listing.id,
          node: listing
        }
      });
      // publish for edit listing page
      pubsub.publish(LISTING_SUBSCRIPTION, {
        listingUpdated: {
          mutation: 'UPDATED',
          id: listing.id,
          node: listing
        }
      });
      return listing;
    },
    async addListingReview(obj: any, { input }: ListingReviewInput, context: any) {
      const [id] = await context.Listing.addListingReview(input);
      const listingReview = await context.Listing.getListingReview(id);
      // publish for edit listing page
      pubsub.publish(LISTINGREVIEW_SUBSCRIPTION, {
        listingReviewUpdated: {
          mutation: 'CREATED',
          id: listingReview.id,
          listingId: input.listingId,
          node: listingReview
        }
      });
      return listingReview;
    },
    async deleteListingReview(obj: any, { input: { id, listingId } }: ListingReviewInputWithId, context: any) {
      await context.Listing.deleteListingReview(id);
      // publish for edit listing page
      pubsub.publish(LISTINGREVIEW_SUBSCRIPTION, {
        listingReviewUpdated: {
          mutation: 'DELETED',
          id,
          listingId,
          node: null
        }
      });
      return { id };
    },
    async editListingReview(obj: any, { input }: ListingReviewInputWithId, context: any) {
      await context.Listing.editListingReview(input);
      const listingReview = await context.Listing.getListingReview(input.id);
      // publish for edit listing page
      pubsub.publish(LISTINGREVIEW_SUBSCRIPTION, {
        listingReviewUpdated: {
          mutation: 'UPDATED',
          id: input.id,
          listingId: input.listingId,
          node: listingReview
        }
      });
      return listingReview;
    }
  },
  Subscription: {
    listingUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(LISTING_SUBSCRIPTION),
        (payload, variables) => {
          return payload.listingUpdated.id === variables.id;
        }
      )
    },
    listingsUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(LISTINGS_SUBSCRIPTION),
        (payload, variables) => {
          return variables.endCursor <= payload.listingsUpdated.id;
        }
      )
    },
    listingReviewUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(LISTINGREVIEW_SUBSCRIPTION),
        (payload, variables) => {
          return payload.listingReviewUpdated.listingId === variables.listingId;
        }
      )
    }
  }
});
