import React from "react";
import AutoCompleteNavbarComponent from "../components/AutoCompleteNavbarComponent";
import { graphql, compose } from "react-apollo";
import LIST_QUERY from "../graphql/AutoSearchListingsQuery.graphql";

const AutoCompleteNavbar = props => {
  return (
    <AutoCompleteNavbarComponent
      listings={props.listingsList}
      history={props.history}
    />
  );
};

export default compose(
  graphql(LIST_QUERY, {
    props({ data: { loading, error, listingsList } }) {
      if (error) throw new Error(error);
      return { loading, listingsList };
    }
  })
)(AutoCompleteNavbar);
