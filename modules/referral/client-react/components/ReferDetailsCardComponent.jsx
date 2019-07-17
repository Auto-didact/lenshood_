import React from 'react';
import { Row, Col, Button, Card } from 'antd';
import ReferModalComponent from './ReferModalComponent';
import ReferralInputComponent from './ReferralInputComponent';

export default class ReferDetailsCardComponent extends React.Component {
  state = {
    ...this.props.state,
    modal1Visible: false,
    modal2Visible: false
  };

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  render() {
    const { referralUser } = this.props;
    return (
      <div>
        <Card className="boxShadowTheme borderRadius9 marginB20">
          <h1>
            <strong>Your Referrals</strong>
          </h1>
          <h3 className="marginB20">
            Cash earned{' '}
            <strong className="colorFloat">
              &#8377;
              {this.state.cashEarned}
            </strong>
          </h3>
          <Button onClick={() => this.setModal1Visible(true)} type="primary" ghost block>
            View referral details
          </Button>
          <ReferModalComponent
            modal1Visible={this.state.modal1Visible}
            setModal1Visible={this.setModal1Visible.bind(this)}
            cashEarned={this.state.cashEarned}
            referrals={referralUser.referrals}
          />
        </Card>
        <Card className="boxShadowTheme borderRadius9 marginB20">
          {' '}
          <h3>
            Credit Available{' '}
            <strong className="colorFloat">
              &#8377;
              {this.state.totalCredit}
            </strong>
          </h3>
        </Card>
        <Card className="boxShadowTheme borderRadius9">
          <h2>
            <strong>Your Referral Verification Details</strong>
          </h2>
          {referralUser.profile.isVerified ? (
            <div>
              <h3>
                Your account has been verified by{' '}
                <span className="mainColor">{referralUser.profile.referredBy.username}</span>
              </h3>
            </div>
          ) : (
            <div>
              {referralUser.profile.referredBy ? (
                <div>
                  <h3>
                    <span className="mainColor">{referralUser.profile.referredBy.username}</span> has not yet verified
                    your account.
                  </h3>
                  <Button onClick={() => this.setModal2Visible(true)}>Change referral</Button>
                </div>
              ) : (
                <div>
                  <h3>Your Acoount has not been verified.</h3>
                  <Button onClick={() => this.setModal2Visible(true)}>Add referral</Button>
                </div>
              )}
              <ReferralInputComponent
                modal2Visible={this.state.modal2Visible}
                prevReferral={referralUser.profile.referredBy ? referralUser.profile.referredBy.username : null}
                refUsername={referralUser.username}
                referredId={referralUser.id}
                setModal2Visible={this.setModal2Visible.bind(this)}
                refSubmit={this.props.refSubmit}
              />
            </div>
          )}
        </Card>
      </div>
    );
  }
}
