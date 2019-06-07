import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import ListingEditView from '../components/ListingEditView';
import ListingDetailView from '../components/ListingDetailView';

import LISTING_QUERY from '../graphql/ListingQuery.graphql';

const ListingDetail = props => {
  return <ListingDetailView {...props} />;
};

ListingDetail.propTypes = {
  loading: PropTypes.bool.isRequired,
  listing: PropTypes.object,
  history: PropTypes.object,
  navigation: PropTypes.object
};

export default graphql(LISTING_QUERY, {
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
  props({ data: { loading, error, listing } }) {
    if (error) throw new Error(error);
    return { loading, listing };
  }
})(ListingDetail);
