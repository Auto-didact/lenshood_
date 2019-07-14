import React from "react";
import ReferralView from "../components/ReferralView";
import { graphql, compose } from "react-apollo";
import REFERRAL_QUERY from "../graphql/ReferralUserQuery.graphql";
import SEND_REF_EMAIL from "../graphql/RefEmail.graphql";
import ADD_REFERRAL from "../graphql/AddReferred.graphql";
import UPDATE_REFERRAL from "../graphql/UpdateReferred.graphql";
import { message } from "antd";
import { FormError } from "@gqlapp/forms-client-react";

const Referral = props => {
  const { sendRefEmail, loading, addReferred, updateReferred } = props;
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

  const refSubmit = async values => {
    const flag = values.flag;
    delete values["flag"];
    console.log("After flag", values);
    try {
      if (flag) await addReferred(values);
      else await updateReferred(values);
    } catch (e) {
      message.error("Referral Update failed");
      throw new FormError("Referral Update failed", e);
    }
    message.info("Changes saved!");
  };

  return (
    <ReferralView
      state={state}
      referralUser={props.referralUser}
      onSubmit={onSubmit}
      refSubmit={refSubmit}
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
  }),
  graphql(ADD_REFERRAL, {
    props: ({ mutate }) => ({
      addReferred: async input => {
        const { data: addReferred } = await mutate({
          variables: { input }
        });
        return addReferred;
      }
    })
  }),
  graphql(UPDATE_REFERRAL, {
    props: ({ mutate }) => ({
      updateReferred: async input => {
        const { data: updateReferred } = await mutate({
          variables: { input }
        });
        return updateReferred;
      }
    })
  })
)(Referral);
