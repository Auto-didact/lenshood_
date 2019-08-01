import React from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";

import ListingDetailView from "../components/ListingDetailView";

import LISTING_QUERY from "../graphql/ListingQuery.graphql";
import SEND_REF_EMAIL from "../graphql/sendListEmail.graphql";
import { FormError } from "@gqlapp/forms-client-react";
import { message } from "antd";

const ListingDetail = props => {
  const onShare = async values => {
    try {
      await props.sendListEmail(values);
    } catch (e) {
      message.error("Message sending failed");
      throw new FormError("Message sending failed", e);
    }
    message.info("Email sent!");
  };

  return <ListingDetailView onShare={onShare} {...props} />;
};

ListingDetail.propTypes = {
  loading: PropTypes.bool.isRequired,
  listing: PropTypes.object,
  reviews: PropTypes.object,
  history: PropTypes.object,
  navigation: PropTypes.object
};

export default compose(
  graphql(LISTING_QUERY, {
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
    props({ data: { loading, error, listing, reviews } }) {
      if (error) throw new Error(error);
      return { loading, listing, reviews };
    }
  }),
  graphql(SEND_REF_EMAIL, {
    props: ({ mutate }) => ({
      sendListEmail: async input => {
        const { data: sendListEmail } = await mutate({
          variables: { input }
        });
        return sendListEmail;
      }
    })
  })
)(ListingDetail);
