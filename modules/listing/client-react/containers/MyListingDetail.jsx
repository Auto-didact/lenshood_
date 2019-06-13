import React from "react";

import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import MyListingDetailView from "../components/MyListingDetailView";

import LIST_QUERY from "../graphql/ListQuery.graphql";

const MyListingDetail = props => {
  // constructor(props) {
  //   super(props);
  //   this.subscription = null;
  // }
  return <MyListingDetailView {...props} />;
};

MyListingDetail.propTypes = {
  loading: PropTypes.bool.isRequired,
  listing: PropTypes.object,
  history: PropTypes.object,
  navigation: PropTypes.object
};

export default graphql(LIST_QUERY, {
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
  props({ data: { loading, error, listing } }) {
    if (error) throw new Error(error);
    return { loading, listing };
  }
})(MyListingDetail);
