import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import ListingEditView from '../components/ListingEditView';

import LISTING_QUERY from '../graphql/ListingQuery.graphql';
import EDIT_LISTING from '../graphql/EditListing.graphql';
import LISTING_SUBSCRIPTION from '../graphql/ListingSubscription.graphql';

const removeTypename = value => {
  if (value === null || value === undefined) {
    return value;
  } else if (Array.isArray(value)) {
    return value.map(v => removeTypename(v));
  } else if (typeof value === 'object') {
    const newObj = {};
    Object.entries(value).forEach(([key, v]) => {
      if (key !== '__typename') {
        newObj[key] = removeTypename(v);
      }
    });
    return newObj;
  }
  return value;
};

const subscribeToListingEdit = (subscribeToMore, listingId, history, navigation) =>
  subscribeToMore({
    document: LISTING_SUBSCRIPTION,
    variables: { id: listingId },
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            listingUpdated: { mutation }
          }
        }
      }
    ) => {
      if (mutation === 'DELETED') {
        if (history) {
          return history.push('/listings');
        } else if (navigation) {
          return navigation.goBack();
        }
      }
      return prev;
    }
  });

const ListingEdit = props => {
  useEffect(() => {
    if (props.listing) {
      const {
        subscribeToMore,
        listing: { id },
        history,
        navigation
      } = props;
      const subscribe = subscribeToListingEdit(subscribeToMore, id, history, navigation);
      return () => subscribe();
    }
  });
  // console.log(props);
  return <ListingEditView {...props} />;
};

ListingEdit.propTypes = {
  loading: PropTypes.bool.isRequired,
  listing: PropTypes.object,
  subscribeToMore: PropTypes.func.isRequired,
  history: PropTypes.object,
  navigation: PropTypes.object
};

export default compose(
  graphql(LISTING_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }

      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, error, listing, subscribeToMore } }) {
      if (error) throw new Error(error);
      return { loading, listing, subscribeToMore };
    }
  }),
  graphql(EDIT_LISTING, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      editListing: async values => {
        await mutate({
          variables: {
            input: removeTypename(values)
          }
        });
        if (history) {
          return history.push('/listings');
        }
        if (navigation) {
          return navigation.navigate('ListingListComponent');
        }
      }
    })
  })
)(ListingEdit);
