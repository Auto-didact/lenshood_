// React
import React from "react";

// Apollo
import { graphql, compose } from "react-apollo";

// Components
import PublicProfileView from "../components/PublicProfileView";
import USER_QUERY from "../graphql/DisplayUserQuery.graphql";

const PublicProfile = props => {
  let id = 0;
  if (props.match) {
    id = Number(props.match.params.id);
  } else if (props.navigation) {
    id = Number(props.navigation.state.params.id);
  }
  // console.log(id == props.currentUser.id);

  // if (id === props.currentUser.id) {
  //   props.history.push(`/profile`);
  // } else
  return <PublicProfileView {...props} />;
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
  })
)(PublicProfile);
