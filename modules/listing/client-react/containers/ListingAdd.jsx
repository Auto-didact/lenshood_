import React from 'react';
import { graphql } from 'react-apollo';

import ListingAddView from '../components/ListingAddView';

import ADD_LISTING from '../graphql/AddListing.graphql';

class ListingAdd extends React.Component {
  constructor(props) {
    super(props);
    this.subscription = null;
  }

  render() {
    return <ListingAddView {...this.props} />;
  }
}

export default graphql(ADD_LISTING, {
  props: ({ ownProps: { history, navigation }, mutate }) => ({
    addListing: async values => {
      console.log(values);
      let listingData = await mutate({
        variables: {
          input: values
        },
        optimisticResponse: {
          __typename: 'Mutation',
          addListing: {
            __typename: 'Listing',
            id: null,
            ...values
          }
        }
      });

      if (history) {
        return history.push('/listing/' + listingData.data.addListing.id, {
          listing: listingData.data.addListing
        });
      } else if (navigation) {
        return navigation.navigate('ListingEdit', { id: listingData.data.addListing.id });
      }
    }
  })
})(ListingAdd);
