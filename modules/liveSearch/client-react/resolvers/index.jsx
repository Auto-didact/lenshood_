import update from 'immutability-helper';

import LIVESEARCH_STATE_QUERY from '../graphql/LiveSearchStateQuery.client.graphql';

const TYPE_SEARCH_STATE = 'LiveSearchState';
const TYPE_SEARCH_STATE_FILTER = 'FilterSearchInput';
const TYPE_SEARCH_STATE_ORDER_BY = 'OrderBySearchInput';

const defaults = {
  liveSearchState: {
    orderBy: {
      column: '',
      order: '',
      __typename: TYPE_SEARCH_STATE_ORDER_BY
    },
    filter: {
      searchText: '',
      gearCategory: '',
      __typename: TYPE_SEARCH_STATE_FILTER
    },
    __typename: TYPE_SEARCH_STATE
  }
};

const resolvers = {
  Mutation: {
    updateOrderBy: (_, { orderBy }, { cache }) => {
      const { liveSearchState } = cache.readQuery({
        query: LIVESEARCH_STATE_QUERY
      });

      const newLiveSearchState = update(liveSearchState, {
        orderBy: { $merge: orderBy }
      });

      cache.writeData({
        data: {
          liveSearchState: newLiveSearchState,
          __type: TYPE_SEARCH_STATE
        }
      });

      return null;
    },
    updateFilter: (_, { filter }, { cache }) => {
      const { liveSearchState } = cache.readQuery({
        query: LIVESEARCH_STATE_QUERY
      });

      const newLiveSearchState = update(liveSearchState, {
        filter: { $merge: filter }
      });

      cache.writeData({
        data: {
          liveSearchState: newLiveSearchState,
          __type: TYPE_SEARCH_STATE
        }
      });

      return null;
    }
  }
};

export default {
  defaults,
  resolvers
};
