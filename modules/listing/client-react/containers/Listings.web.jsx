import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import update from 'immutability-helper';
import { PLATFORM, removeTypename } from '@gqlapp/core-common';

import ListingListView from '../components/ListingListView';

import LISTS_STATE_QUERY from '../graphql/ListsStateQuery.client.graphql';
import UPDATE_ORDER_BY from '../graphql/UpdateOrderBy.client.graphql';
import UPDATE_FILTER from '../graphql/UpdateFilter.client.graphql';

import LISTINGS_QUERY from '../graphql/ListingsQuery.graphql';
import LISTINGS_SUBSCRIPTION from '../graphql/ListingsSubscription.graphql';
import DELETE_LISTING from '../graphql/DeleteListing.graphql';
import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

export const onAddListing = (prev, node) => {
  // ignore if duplicate
  if (prev.listings.edges.some(listing => node.id === listing.cursor)) {
    return update(prev, {
      listings: {
        totalCount: {
          $set: prev.listings.totalCount - 1
        },
        edges: {
          $set: prev.listings.edges
        }
      }
    });
  }

  const filteredListings = prev.listings.edges.filter(listing => listing.node.id !== null);

  const edge = {
    cursor: node.id,
    node: node,
    __typename: 'ListingEdges'
  };

  return update(prev, {
    listings: {
      totalCount: {
        $set: prev.listings.totalCount + 1
      },
      edges: {
        $set: [edge, ...filteredListings]
      }
    }
  });
};

const onDeleteListing = (prev, id) => {
  const index = prev.listings.edges.findIndex(x => x.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    listings: {
      totalCount: {
        $set: prev.listings.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
};

const subscribeToListingList = (subscribeToMore, endCursor, filter) =>
  subscribeToMore({
    document: LISTINGS_SUBSCRIPTION,
    variables: { endCursor, filter },
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            listingsUpdated: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;

      if (mutation === 'CREATED') {
        newResult = onAddListing(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteListing(prev, node.id);
      }

      return newResult;
    }
  });

const Listing = props => {
  useEffect(() => {
    if (props.listings) {
      const {
        listings,
        listings: {
          pageInfo: { endCursor: propsEndCursor }
        }
      } = props;
      const endCursor = listings ? propsEndCursor : 0;
      const subscribe = subscribeToListingList(props.subscribeToMore, endCursor, props.filter);
      return () => subscribe();
    }
  });

  return <ListingListView {...props} />;
};

Listing.propTypes = {
  loading: PropTypes.bool.isRequired,
  listings: PropTypes.object,
  subscribeToMore: PropTypes.func.isRequired
};

export default compose(
  graphql(LISTS_STATE_QUERY, {
    props({ data: { listsState } }) {
      return removeTypename(listsState);
    }
  }),
  graphql(LISTINGS_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        variables: { limit: limit, after: 0, orderBy, filter },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, listings, fetchMore, subscribeToMore } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.listings.totalCount;
            const newEdges = fetchMoreResult.listings.edges;
            const pageInfo = fetchMoreResult.listings.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.listings.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              listings: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Listings'
              }
            };
          }
        });
      };
      if (error) throw new Error(error);
      return { loading, listings, subscribeToMore, loadData };
    }
  }),
  graphql(DELETE_LISTING, {
    props: ({ mutate }) => ({
      deleteListing: id => {
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteListing: {
              id: id,
              __typename: 'Listing'
            }
          },

          update: (cache, { data: { deleteListing } }) => {
            // Get previous listings from cache
            const prevListings = cache.readQuery({
              query: LISTINGS_QUERY,
              variables: {
                limit,
                after: 0
              }
            });

            const newListListings = onDeleteListing(prevListings, deleteListing.id);

            // Write listings to cache
            cache.writeQuery({
              query: LISTINGS_QUERY,
              variables: {
                limit,
                after: 0
              },
              data: {
                listings: {
                  ...newListListings.listings,
                  __typename: 'Listings'
                }
              }
            });
          }
        });
      }
    })
  }),
  graphql(UPDATE_ORDER_BY, {
    props: ({ mutate }) => ({
      onOrderBy: orderBy => {
        mutate({ variables: { orderBy } });
      }
    })
  }),
  graphql(UPDATE_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText) {
        mutate({ variables: { filter: { searchText } } });
      },
      ongearSubcategoryChange(gearSubcategory) {
        mutate({ variables: { filter: { gearSubcategory } } });
      },
      ongearCategoryChange(gearCategory) {
        mutate({ variables: { filter: { gearCategory } } });
      }
    })
  })
)(Listing);
