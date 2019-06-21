import React, { Component } from 'react';

// import './resources/listingCatalogue.css';
import { graphql, compose } from 'react-apollo';

import MyListingsView from '../components/MyListingsView';
import MY_LISTINGS_QUERY from '../graphql/MyListingsQuery.graphql';

import { ALL, ONSHELF, ONRENT } from '../constants/ListingStates';

const MyListings = props => {
  return <MyListingsView {...props} />;
};

export default compose(
  graphql(MY_LISTINGS_QUERY, {
    props({ data: { loading, error, userListings } }) {
      if (error) throw new Error(error);
      return { loading, userListings };
    }
  })
)(MyListings);
