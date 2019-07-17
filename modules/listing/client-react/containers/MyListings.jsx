import React, { useEffect } from 'react';

import { graphql, compose } from 'react-apollo';
import update from 'immutability-helper';

import MyListingsView from '../components/MyListingsView';
import MY_LISTINGS_QUERY from '../graphql/MyListingsQuery.graphql';
import TOGGLE_LISTING_STATUS from '../graphql/ToggleListingStatus.graphql';
// import { ALL, ONSHELF, ONRENT } from "../constants/ListingStates";
import DELETE_LISTING from '../graphql/DeleteListing.graphql';
import LISTINGS_SUBSCRIPTION from '../graphql/ListingsSubscription.graphql';
import { message } from 'antd';

const MyListings = props => {
  useEffect(() => {
    const subscribe = subscribeToListingList(props.subscribeToMore);
    return () => subscribe();
  });
  const DeleteListing = async id => {
    try {
      await await props.deleteListing(id);
    } catch (e) {
      message.error("Couldn't perform the action");
      throw e;
    }
    message.warning('Listing deleted.');
  };

  const ToggleListingStatus = async id => {
    try {
      await await props.toggleListingStatus(id);
    } catch (e) {
      message.error("Couldn't perform the action");
      throw e;
    }
    message.info('Success!');
  };

  return <MyListingsView DeleteListing={DeleteListing} toggle={ToggleListingStatus} {...props} />;
  // }
};

const onAddListing = (prev, node) => {
  // ignore if duplicate
  if (prev.userListings.some(listing => node.id === listing.id)) {
    return prev;
  }
  return update(prev, {
    userListings: {
      $set: [...prev.userListings, node]
    }
  });
};

const onDeleteListing = (prev, id) => {
  const index = prev.userListings.findIndex(list => list.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    userListings: {
      $splice: [[index, 1]]
    }
  });
};

const subscribeToListingList = subscribeToMore =>
  subscribeToMore({
    document: LISTINGS_SUBSCRIPTION,
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
      } else if (mutation === 'UPDATED') {
        newResult = onDeleteListing(prev, node.id);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteListing(prev, node.id);
      }

      return newResult;
    }
  });

export default compose(
  graphql(MY_LISTINGS_QUERY, {
    props({ data: { loading, error, userListings, subscribeToMore, updateQuery, refetch } }) {
      if (error) throw new Error(error);
      return { loading, userListings, subscribeToMore, updateQuery, refetch };
    }
  }),
  graphql(TOGGLE_LISTING_STATUS, {
    props: ({ mutate }) => ({
      toggleListingStatus: async id => {
        try {
          const {
            data: { toggleListingStatus }
          } = await mutate({
            variables: { id }
          });

          if (toggleListingStatus.errors) {
            return { errors: toggleListingStatus.errors };
          }
        } catch (e) {
          log.error(e);
        }
      }
    })
  }),
  graphql(DELETE_LISTING, {
    props: ({ mutate }) => ({
      deleteListing: async id => {
        try {
          const {
            data: { deleteListing }
          } = await mutate({
            variables: { id }
          });

          if (deleteListing.errors) {
            return { errors: deleteListing.errors };
          }
        } catch (e) {
          log.error(e);
        }
      }
    })
  })
)(MyListings);
