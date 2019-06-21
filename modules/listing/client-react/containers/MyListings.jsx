import React, { Component } from 'react';

// import './resources/listingCatalogue.css';
import { graphql, compose } from 'react-apollo';

import MyListingsView from '../components/MyListingsView';
import MY_LISTINGS_QUERY from '../graphql/MyListingsQuery.graphql';
import TOGGLE_LISTING_STATUS from '../graphql/ToggleListingStatus.graphql';
import { ALL, ONSHELF, ONRENT } from '../constants/ListingStates';
import DELETE_LISTING from '../graphql/DeleteListing.graphql';

class MyListings extends Component {
  updateComponent() {
    this.forceUpdate();
  }

  render() {
    const DeleteListing = async id => {
      const result = await this.props.deleteListing(id);
      console.log(id);
      this.updateComponent();
    };
    const ToggleListingStatus = async id => {
      const result = await this.props.toggleListingStatus(id);
      console.log(id);
      this.updateComponent();
    };
    return <MyListingsView DeleteListing={DeleteListing} toggle={ToggleListingStatus} {...this.props} />;
  }
}

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

export default compose(
  graphql(MY_LISTINGS_QUERY, {
    props({ data: { loading, error, userListings } }) {
      if (error) throw new Error(error);
      return { loading, userListings };
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
      deleteListing: id => {
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteListing: {
              id: id,
              __typename: 'Listing'
            }
          }
        });
      }
    })
  })
)(MyListings);
