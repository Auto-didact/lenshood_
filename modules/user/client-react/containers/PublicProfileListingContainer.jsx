import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { compose, graphql } from "react-apollo";

import USER_LISTING_QUERY from "../graphql/UserListingQuery.graphql";

const PublicProfileListingContainer = props => {
  console.log(props.listing);
  return <h2>{"shi hai"}</h2>;
};

PublicProfileListingContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  listing: PropTypes.object,
  id: PropTypes.number
};

export default compose(
  graphql(USER_LISTING_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.id) {
        id = props.id;
      }

      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, error, listing } }) {
      if (error) throw new Error(error);
      return { loading, listing };
    }
  })
)(PublicProfileListingContainer);
