// React
import React from "react";

// Apollo
import { graphql, compose } from "react-apollo";

// Components
import UserAvatarView from "../components/UserAvatarView";

import AVATAR_QUERY from "../graphql/AvatarQuery.graphql";

const UserAvatar = props => <UserAvatarView {...props} />;

export default compose(
  graphql(AVATAR_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { loading, currentUser };
    }
  })
)(UserAvatar);
