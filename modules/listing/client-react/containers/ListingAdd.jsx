import React from 'react';
import { graphql, compose } from 'react-apollo';
import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import USERS_QUERY from '@gqlapp/user-client-react/graphql/ListingUserQuery.graphql';

import { message } from 'antd';

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

export default compose(
  graphql(ADD_LISTING, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      addListing: async values => {
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
          message.success('Listing added.');
          return history.push('/listing-detail/' + listingData.data.addListing.id, {
            listing: listingData.data.addListing
          });
        } else if (navigation) {
          message.success('Listing added.');
          return navigation.navigate('ListingEdit', {
            id: listingData.data.addListing.id
          });
        }
      }
    })
  }),
  graphql(USERS_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        fetchPolicy: 'network-only',
        variables: { orderBy, filter }
      };
    },
    props({ data: { loading, users, refetch, error, updateQuery, subscribeToMore } }) {
      return {
        loading,
        users,
        refetch,
        subscribeToMore,
        updateQuery,
        errors: error ? error.graphQLErrors : null
      };
    }
  }),
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { loading, currentUser };
    }
  })
)(ListingAdd);
