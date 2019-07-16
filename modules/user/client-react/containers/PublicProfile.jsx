// React
import React from 'react';

// Apollo
import { graphql, compose } from 'react-apollo';
import CURRENT_USER_ID from '@gqlapp/user-client-react/graphql/CurrentUserId.graphql';

// Components
import ProfileView from '../components/ProfileView';
import PublicProfileView from '../components/PublicProfileView';
import USER_QUERY from '../graphql/DisplayUserQuery.graphql';

const PublicProfile = props => {
  let userBool = false;
  let id = 0;
  if (props.match) {
    id = props.match.params.id;
  } else if (props.navigation) {
    id = props.navigation.state.params.id;
  }

  if (Number(id) === props.currentUser.id) {
    userBool = true;
  }

  if (userBool) {
    return <ProfileView {...props} />;
  } else {
    return <PublicProfileView {...props} />;
  }
};

export default compose(
  graphql(USER_QUERY, {
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
    props({ data: { loading, error, displayUser } }) {
      if (error) throw new Error(error);
      return { loading, user: displayUser };
    }
  }),
  graphql(CURRENT_USER_ID, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { loading, currentUser };
    }
  })
)(PublicProfile);
