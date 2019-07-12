import update from 'immutability-helper';

// import COMMENT_QUERY_CLIENT from '../graphql/CommentQuery.client.graphql';
import LISTS_STATE_QUERY from '../graphql/ListsStateQuery.client.graphql';

// const TYPE_NAME = 'CommentState';
// const TYPE_NAME_COMMENT = 'Comment';
const TYPE_LISTS_STATE = 'ListsState';
const TYPE_LISTS_STATE_FILTER = 'FilterListInput';
const TYPE_LISTS_STATE_ORDER_BY = 'OrderByListInput';

const defaults = {
  //   comment: {
  //     id: null,
  //     content: '',
  //     __typename: TYPE_NAME_COMMENT
  //   },
  //   __typename: TYPE_NAME
  // };
  listsState: {
    orderBy: {
      column: '',
      order: '',
      __typename: TYPE_LISTS_STATE_ORDER_BY
    },
    filter: {
      searchText: '',
      gearCategory: '',
      gearSubcategory: '',
      __typename: TYPE_LISTS_STATE_FILTER
    },
    __typename: TYPE_LISTS_STATE
  }
};

const resolvers = {
  //   Query: {
  //     commentState: (_, args, { cache }) => {
  //       const {
  //         comment: { comment }
  //       } = cache.readQuery({ query: COMMENT_QUERY_CLIENT });
  //       return {
  //         comment: {
  //           ...comment,
  //           __typename: TYPE_NAME_COMMENT
  //         },
  //         __typename: TYPE_NAME
  //       };
  //     }
  //   },
  Mutation: {
    //     onCommentSelect: async (_, { comment }, { cache }) => {
    //       await cache.writeData({
    //         data: {
    //           comment: {
    //             ...comment,
    //             __typename: TYPE_NAME_COMMENT
    //           },
    //           __typename: TYPE_NAME
    //         }
    //       });

    //       return null;
    //     },
    updateOrderBy: (_, { orderBy }, { cache }) => {
      const { listsState } = cache.readQuery({ query: LISTS_STATE_QUERY });

      const newListsState = update(listsState, {
        orderBy: { $merge: orderBy }
      });

      cache.writeData({
        data: {
          listsState: newListsState,
          __type: TYPE_USERS_STATE
        }
      });

      return null;
    },
    updateFilter: (_, { filter }, { cache }) => {
      const { listsState } = cache.readQuery({ query: LISTS_STATE_QUERY });

      const newListsState = update(listsState, {
        filter: { $merge: filter }
      });

      cache.writeData({
        data: {
          listsState: newListsState,
          __type: TYPE_USERS_STATE
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
