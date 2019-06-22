import React from "react";
import ReferralView from "../components/ReferralView";

class Referral extends React.Component {
  state = {
    username: "theZalophus",
    cashEarned: 50,
    totalCredit: 27,
    referredUserList: [
      { id: 5, firstname: "Natsu", lastname: "Dragneel", username: "natsu" },
      { id: 1, firstname: "Naruto", lastname: "Uzumaki", username: "naruto" },
      { id: 4, firstname: "Monkey", lastname: "D. Luffy", username: "luffy" },
      { id: 8, firstname: "Asta", lastname: "BlackBull", username: "asta" },
      { id: 13, firstname: "Edward", lastname: "Erlic", username: "edward" }
    ]
  };
  render() {
    return <ReferralView state={this.state} />;
  }
}

export default Referral;
