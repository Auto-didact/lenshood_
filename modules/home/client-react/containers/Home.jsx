import React from "react";
import { graphql, compose } from "react-apollo";
import { translate } from "@gqlapp/i18n-client-react";
import HomeView from "../components/HomeView";

import LIST_QUERY from "@gqlapp/listing-client-react/graphql/FeaturedListings.graphql";
import USER_QUERY from "@gqlapp/user-client-react/graphql/FeaturedUsers.graphql";

class Home extends React.Component {
  render() {
    console.log(this.props);
    return <HomeView {...this.props} />;
  }
}

export default translate("home")(
  compose(
    graphql(LIST_QUERY, {
      props({ data: { loading, error, featuredListings } }) {
        if (error) throw new Error(error);
        return { loading, featuredListings };
      }
    }),
    graphql(USER_QUERY, {
      props({ data: { loading, error, featuredUsers } }) {
        if (error) throw new Error(error);
        return { loading, featuredUsers };
      }
    })
  )(Home)
);
