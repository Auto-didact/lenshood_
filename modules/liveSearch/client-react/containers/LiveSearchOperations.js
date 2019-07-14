
import { graphql } from "react-apollo";
import update from "immutability-helper";
import { removeTypename, log } from "@gqlapp/core-common";
import { message } from "antd";
import ADD_ITEM from "../graphql/AddQueryItem.graphql";
import LIVESEARCH_STATE_QUERY from "../graphql/LiveSearchStateQuery.client.graphql";
import UPDATE_ORDER_BY from "../graphql/UpdateOrderBy.client.graphql";
import LIVESEARCH_QUERY from "../graphql/LiveSearchQuery.graphql";
import INCRE_SEARCH from "../graphql/IncrementSearch.graphql";
import DECRE_SEARCH from "../graphql/DecrementSearch.graphql";
import UPDATE_FILTER from "../graphql/UpdateFilter.client.graphql";

const withLiveSearchState = Component =>
  graphql(LIVESEARCH_STATE_QUERY, {
    props({ data: { liveSearchState } }) {
      return removeTypename(liveSearchState);
    }
  })(Component);

const withSearchItemAdd = Component =>
  graphql(ADD_ITEM, {
    props: ({ mutate }) => ({
      addSearchItem: async input => {
        const { data: addSearchItem } = await mutate({
          variables: { input }
        });
        message.info("Query item added!");
        return addSearchItem;
      }
    })
  })(Component);

const withLiveSearch = Component =>
  graphql(LIVESEARCH_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        fetchPolicy: 'network-only',
        variables: { orderBy, filter }
      };
    },
    props({ data: { loading, liveSearches, refetch, error, updateQuery, subscribeToMore } }) {
      return {
        loading,
        liveSearches,
        refetch,
        subscribeToMore,
        updateQuery,
        errors: error ? error.graphQLErrors : null
      };
    }
  })(Component);

const withIncreSearchItem = Component =>
  graphql(INCRE_SEARCH, {
    props: ({ mutate }) => ({
      increSearchItem: async input => {
        try {
          const {
            data: { increSearchItem }
          } = await mutate({
            variables: { input }
          });

          if (increSearchItem.errors) {
            return { errors: increSearchItem.errors };
          }
        } catch (e) {
          log.error(e);
        }
      }
    })
  })(Component);

const withdecreSearchItem = Component =>
  graphql(DECRE_SEARCH, {
    props: ({ mutate }) => ({
      decreSearchItem: async input => {
        try {
          const {
            data: { decreSearchItem }
          } = await mutate({
            variables: { input }
          });

          if (decreSearchItem && decreSearchItem.errors) {
            return { errors: decreSearchItem.errors };
          }
        } catch (e) {
          log.error(e);
        }
      }
    })
  })(Component);

const withOrderByUpdating = Component =>
  graphql(UPDATE_ORDER_BY, {
    props: ({ mutate }) => ({
      onOrderBy: orderBy => {
        mutate({ variables: { orderBy } });
      }
    })
  })(Component);

const withFilterUpdating = Component =>
  graphql(UPDATE_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText) {
        mutate({ variables: { filter: { searchText } } });
      },
      onGearCategoryChange(gearCategory) {
        mutate({ variables: { filter: { gearCategory } } });
      }
    })
  })(Component);

const updateLiveSearchState = (liveSearchUpdated, updateQuery) => {
  const { mutation, node } = liveSearchUpdated;
  updateQuery(prev => {
    switch (mutation) {
      case 'CREATED':
        return addLiveSearch(prev, node);
      case 'DELETED':
        return deleteLiveSearch(prev, node.id);
      case 'UPDATED':
        return deleteLiveSearch(prev, node.id);
      default:
        return prev;
    }
  });
};

function addLiveSearch(prev, node) {
  // check if it is duplicate
  if (prev.liveSearches.some(liveSearch => liveSearch.id === node.id)) {
    return prev;
  }

  return update(prev, {
    liveSearches: {
      $set: [node, ...prev.liveSearches]
    }
  });
}

function deleteLiveSearch(prev, id) {
  const index = prev.liveSearches.findIndex(liveSearch => liveSearch.id === id);
  // ignore if not found
  if (index < 0) {
    return prev;
  }
  return update(prev, {
    liveSearches: {
      $splice: [[index, 1]]
    }
  });
}

export {
  withLiveSearchState,
  withSearchItemAdd,
  withLiveSearch,
  withIncreSearchItem,
  withdecreSearchItem,
  withOrderByUpdating,
  withFilterUpdating
};
export { updateLiveSearchState };
