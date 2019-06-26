import React from "react";
import ReferralView from "../components/ReferralView";
import { graphql, compose } from "react-apollo";
import REFERRAL_QUERY from "../graphql/ReferralUserQuery.graphql";

class Referral extends React.Component {
  state = {
    cashEarned: 50,
    totalCredit: 27
  };
  render() {
    return (
      <ReferralView state={this.state} referralUser={this.props.referralUser} />
    );
  }
}

export default compose(
  graphql(REFERRAL_QUERY, {
    props({ data: { loading, error, referralUser } }) {
      if (error) throw new Error(error);
      return { loading, referralUser };
    }
  })
)(Referral);
