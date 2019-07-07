import React from "react";
import AutoCompleteNavbarComponent from "../components/AutoCompleteNavbarComponent";
import { graphql, compose } from "react-apollo";
import LIST_QUERY from "../graphql/AutoSearchListingsQuery.graphql";

class AutoCompleteNavbar extends React.Component {
  render() {
    return (
      <AutoCompleteNavbarComponent
        listings={this.props.listingsList}
        history={this.props.history}
      />
    );
  }
}

export default compose(
  graphql(LIST_QUERY, {
    props({ data: { loading, error, listingsList } }) {
      if (error) throw new Error(error);
      return { loading, listingsList };
    }
  })
)(AutoCompleteNavbar);
