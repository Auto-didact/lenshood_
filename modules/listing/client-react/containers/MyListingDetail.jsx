import React from "react";

import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import MyListingDetailView from "../components/MyListingDetailView";

import LIST_QUERY from "../graphql/ListQuery.graphql";
import SEND_REF_EMAIL from "../graphql/sendListEmail.graphql";
import { FormError } from "@gqlapp/forms-client-react";

const MyListingDetail = props => {
  // constructor(props) {
  //   super(props);
  //   this.subscription = null;
  // }

  const onSubmit = async values => {
    message.info('Please wait...');
    try {
      await props.sendListEmail(values);
    } catch (e) {
      message.error("Message sending failed");
      throw new FormError("Message sending failed", e);
    }
    message.success("Email sent!");
  };
  return <MyListingDetailView onSubmit={onSubmit} {...props} />;
};

MyListingDetail.propTypes = {
  loading: PropTypes.bool.isRequired,
  listing: PropTypes.object,
  history: PropTypes.object,
  navigation: PropTypes.object
};

export default compose(
  graphql(LIST_QUERY, {
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
)(MyListingDetail);
