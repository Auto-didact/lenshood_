import React from "react";
import ReferralView from "../components/ReferralView";
import { graphql, compose } from "react-apollo";
import REFERRAL_QUERY from "../graphql/ReferralQuery.graphql";

class Referral extends React.Component {
  state = {
    username: "theZalophus",
    cashEarned: 50,
    totalCredit: 27
  };
  render() {
    return <ReferralView state={this.state} referrals={this.props.referrals} />;
  }
}

export default compose(
  graphql(REFERRAL_QUERY, {
    props({ data: { loading, error, referrals } }) {
      if (error) throw new Error(error);
      return { loading, referrals };
    }
  })
)(Referral);
