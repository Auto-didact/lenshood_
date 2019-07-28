import React from "react";
import { graphql, compose } from "react-apollo";
import { translate } from "@gqlapp/i18n-client-react";
import FeaturedListingComponent from "../components/FeaturedListingComponent";

import LIST_QUERY from "../graphql/FeaturedListings.graphql";

class FeaturedListings extends React.Component {
  render() {
    this.props.loading || console.log(this.props);
    return <><FeaturedListingComponent {...this.props}/></>;
  }
}

export default translate("home")(
  compose(
    graphql(LIST_QUERY, {
      props({ data: { loading, error, featuredListings } }) {
        if (error) throw new Error(error);
        return { loading, featuredListings };
      }
    })
  )(FeaturedListings)
);