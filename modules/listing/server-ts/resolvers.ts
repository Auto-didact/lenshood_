import { PubSub, withFilter } from 'graphql-subscriptions';
// import { createBatchResolver } from 'graphql-resolve-batch';
// interfaces

import { Listing, ListingReview, Identifier } from './sql';
// import withAuth from 'graphql-auth';
// import { ONSHELF, ONRENT } from "../common/constants/ListingStates";
const ONSHELF = 'On Shelf';
const IDLE = 'Idle';
// const ONRENT = 'On Rent';

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
    },
    userListings(obj: any, { userId }: any, context: any) {
      return context.Listing.userListings(userId || context.identity.id);
    },
    watchlist(obj: any, { userId }: any, context: any) {
      return context.Listing.watchlist(userId || context.identity.id);
    },
    watchStatus(obj: any, input: any, context: any) {
      return context.Listing.watchStatus(input.listingId, input.userId || context.identity.id);
    },
    featuredListings(obj: any, input: any, context: any) {
      return context.Listing.featuredListings();
    },
    reviews(obj: any, input: any, context: any) {
      return context.Listing.reviews(input);
    },
    childReviews(obj: any, input: number, context: any) {
      return context.Listing.childReviews(input);
    }
  },
  // Listing: {
  //   listingReviews: createBatchResolver((sources, args, context) => {
  //     return context.Listing.getListingReviewsForListingIds(sources.map(({ id }) => id));
  //   })
  // },
  Mutation: {
    async addListing(obj: any, { input }: ListingInput, context: any) {
      input.userId = context.identity.id;
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
            id, // import { ONSHELF, ONRENT } from "../common/constants/ListingStates";
            node: listing
          }
        });
        return { id: listing.id };
      } else {
        return { id: null };
      }
    },

    async toggleListingStatus(obj: any, { id }: Identifier, context: any) {
      const listing = await context.Listing.listing(id);
      let stat = null;

      if (listing.status === ONSHELF) {
        stat = IDLE;
      } else if (listing.status === 'idle' || listing.status === IDLE) {
        stat = ONSHELF;
      }
      const isToggled = await context.Listing.patchListing(id, {
        status: stat
      });

      if (isToggled) {
        // s;
        // publish for listing list
        // pubsub.publish(LISTINGS_SUBSCRIPTION, {
        //   listingsUpdated: {
        //     mutation: "DELETED",
        //     id,
        //     node: listing
        //   }
        // });
        // // publish for edit listing page
        // pubsub.publish(LISTING_SUBSCRIPTION, {
        //   listingUpdated: {
        //     mutation: "DELETED",
        //     id,
        //     node: listing
        //   }
        // });
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
      const [id] = await context.Listing.addListingReviewDAO(input);
      const listingReview = await context.Listing.getListingReviewDAO(id);
      // publish for edit listing page
      listingReview.listingId = listingReview.listing_id;
      listingReview.reviewerId = listingReview.reviewer_id;
      listingReview.createdAt = listingReview.reviewer_id;
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
    async deleteListingReview(obj: any, { input: { id } }: ListingReviewInputWithId, context: any) {
      const listingReview = await context.Listing.deleteListingReviewDAO(id);
      // publish for edit listing page
      let listingId = null;
      if (listingReview) {
        listingReview.listingId = listingReview.listing_id;
        listingReview.reviewerId = listingReview.reviewer_id;
        listingId = listingReview.listingId;
      }
      pubsub.publish(LISTINGREVIEW_SUBSCRIPTION, {
        listingReviewUpdated: {
          mutation: 'DELETED',
          id,
          listingId,
          node: null
        }
      });
      return listingReview;
    },
    async editListingReview(obj: any, { input }: ListingReviewInputWithId, context: any) {
      const listingReview = await context.Listing.editListingReviewDAO(input);
      // publish for edit listing page
      if (listingReview) {
        listingReview.listingId = listingReview.listing_id;
        listingReview.reviewerId = listingReview.reviewer_id;
      }
      pubsub.publish(LISTINGREVIEW_SUBSCRIPTION, {
        listingReviewUpdated: {
          mutation: 'UPDATED',
          id: input.id,
          listingId: input.listingId,
          node: listingReview
        }
      });
      return listingReview;
    },
    async toggleListingIsFeatured(obj: any, input: { id: number; isFeatured: boolean }, context: any) {
      return context.Listing.toggleIsFeatured(input.id, input.isFeatured);
    },
    async addOrRemoveWatchList(
      obj: any,
      input: { user_id: number; listing_id: number; should_notify: boolean },
      context: any
    ) {
      return context.Listing.addOrRemoveWatchList(input);
    },
    async addLikesDisLikes(obj: any, input: { ld: string; review_id: number; reviewer_id: number }, context: any) {
      return context.Listing.updateLiskesDisLikes(input);
    },
    async countLikesDisLikes(obj: any, input: { review_id: number }, context: any) {
      return context.Listing.getLikesDisLikesCount(input);
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
