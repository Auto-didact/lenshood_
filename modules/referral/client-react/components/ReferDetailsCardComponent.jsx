import React from "react";
import { Row, Col, Button, Card } from "antd";
import ReferModalComponent from "./ReferModalComponent";

export default class ReferDetailsCardComponent extends React.Component {
  state = {
    ...this.props.state,
    modal1Visible: false
  };

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }
  render() {
    return (
      <div>
        <Card className="boxShadowTheme borderRadius9 marginB20">
          <h1>
            <strong>Your Referrals</strong>
          </h1>
          <h3 className="marginB20">
            Cash earned{" "}
            <strong className="colorFloat">
              &#8377;
              {this.state.cashEarned}
            </strong>
          </h3>
          <Button
            onClick={() => this.setModal1Visible(true)}
            type="primary"
            ghost
            block
          >
            View referral details
          </Button>
          <ReferModalComponent
            modal1Visible={this.state.modal1Visible}
            setModal1Visible={this.setModal1Visible.bind(this)}
            cashEarned={this.state.cashEarned}
            referrals={this.props.referrals}
          />
        </Card>
        <Card className="boxShadowTheme borderRadius9">
          {" "}
          <h3>
            Credit Available{" "}
            <strong className="colorFloat">
              &#8377;
              {this.state.totalCredit}
            </strong>
          </h3>
        </Card>
      </div>
    );
  }
}
