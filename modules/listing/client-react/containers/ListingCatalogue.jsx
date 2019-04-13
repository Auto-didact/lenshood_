import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { PLATFORM } from '@gqlapp/core-common';

import ListingCatalogueView from '../components/ListingCatalogueView';

import LISTINGSCARD_QUERY from '../graphql/ListingsCardQuery.graphql';
import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

const ListingCatalogue = props => {
  return <ListingCatalogueView {...props} />;
};

ListingCatalogue.propTypes = {
  loading: PropTypes.bool.isRequired,
  listings: PropTypes.object
};

export default graphql(LISTINGSCARD_QUERY, {
  options: () => {
    return {
      variables: { limit: limit, after: 0 },
      fetchPolicy: 'network-only'
    };
  },
  props: ({ data }) => {
    const { loading, error, listings, fetchMore } = data;
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
    return { loading, listings, loadData };
  }
})(ListingCatalogue);
