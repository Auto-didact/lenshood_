// React
import React from "react";

// Apollo
import { graphql, compose } from "react-apollo";

// Components
import PublicProfileView from "../components/PublicProfileView";
import USER_QUERY from "../graphql/UserQuery.graphql";

const PublicProfile = props => <PublicProfileView {...props} />;

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
    props({ data: { loading, user } }) {
      const userPayload = user ? { user: user } : {};
      return {
        loading,
        ...userPayload
      };
    }
  })
)(PublicProfile);
