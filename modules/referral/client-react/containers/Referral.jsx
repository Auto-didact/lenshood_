import React from "react";
import ReferralView from "../components/ReferralView";
import { graphql, compose } from "react-apollo";
import REFERRAL_QUERY from "../graphql/ReferralUserQuery.graphql";
import SEND_REF_EMAIL from "../graphql/RefEmail.graphql";
import { message } from "antd";
import { FormError } from "@gqlapp/forms-client-react";

const Referral = props => {
  const { sendRefEmail, loading } = props;
  let state = {
    cashEarned: 50,
    totalCredit: 27
  };

  const onSubmit = async values => {
    try {
      await sendRefEmail(values);
    } catch (e) {
      message.error("Invition sending failed");
      throw new FormError("Invition sending failed", e);
    }
    message.info("Invitation sent!");
  };

  return (
    <ReferralView
      state={state}
      referralUser={props.referralUser}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};

export default compose(
  graphql(REFERRAL_QUERY, {
    props({ data: { loading, error, referralUser } }) {
      if (error) throw new Error(error);
      return { loading, referralUser };
    }
  }),
  graphql(SEND_REF_EMAIL, {
    props: ({ mutate }) => ({
      sendRefEmail: async input => {
        const { data: sendRefEmail } = await mutate({
          variables: { input }
        });
        return sendRefEmail;
      }
    })
  })
)(Referral);
