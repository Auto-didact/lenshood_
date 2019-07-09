import React from 'react';
import { Modal, Badge, Card } from 'antd';
import { Link } from 'react-router-dom';

export default class ReferModalComponent extends React.Component {
  render() {
    return (
      <Modal
        style={{ top: 20 }}
        footer={null}
        bodyStyle={{ padding: 0 }}
        visible={this.props.modal1Visible}
        onCancel={() => this.props.setModal1Visible(false)}
      >
        <Card>
          <h1>
            <strong>Referral Details</strong>
          </h1>
          <p className="justifyAlign">
            When your friends register with LensHood they will appear here so you can track your earnings
          </p>
          <p className="marginB20">
            {this.props.referrals
              ? this.props.referrals.map(item => (
                  <div key={item.id}>
                    <Badge
                      status={item.isVerified ? 'success' : 'error'}
                      text={
                        <span>
                          <strong>{`${item.referredUser.username}`}</strong>{' '}
                          {item.referredUser.profile &&
                          item.referredUser.profile.firstName &&
                          item.referredUser.profile.lastName
                            ? `(${item.referredUser.profile.firstName} ${item.referredUser.profile.lastName})`
                            : '(Name not provided yet)'}
                          <span className="rightfloat">
                            {item.isVerified ? (
                              'verified'
                            ) : (
                              <Link to={`/invites/verify/${item.referredUser.id}`}>verify</Link>
                            )}
                          </span>
                        </span>
                      }
                      className="width100"
                    />
                  </div>
                ))
              : null}
          </p>
          <hr className="marginB20" />
          <h3 className="rightfloat marginB20">
            Cash earned:{' '}
            <strong>
              &#8377;
              {this.props.cashEarned}
            </strong>
          </h3>
        </Card>
      </Modal>
    );
  }
}
