import React from "react";
import ReferralView from "../components/ReferralView";
import { graphql, compose } from "react-apollo";
import REFERRAL_QUERY from "../graphql/ReferralQuery.graphql";

class Referral extends React.Component {
  state = {
    username: "theZalophus",
    cashEarned: 50,
    totalCredit: 27
    // referredUserList: [
    //   { id: 5, firstname: "Natsu", lastname: "Dragneel", username: "natsu" },
    //   { id: 1, firstname: "Naruto", lastname: "Uzumaki", username: "naruto" },
    //   { id: 4, firstname: "Monkey", lastname: "D. Luffy", username: "luffy" },
    //   { id: 8, firstname: "Asta", lastname: "BlackBull", username: "asta" },
    //   { id: 13, firstname: "Edward", lastname: "Erlic", username: "edward" }
    // ]
  };
  render() {
    console.log(this.props)
    return <ReferralView state={this.state} {...this.props} />;
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
