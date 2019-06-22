import React from "react";
import { Modal, Badge, Card } from "antd";
import ReferModal from "./ReferModal";

export default class OrderCard extends React.Component {
  render() {
    console.log(this.props);
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
          <p>
            When your friends register with Fat Llama they will appear here so
            you can track your earnings
          </p>
          <p className="marginB20">
            {this.props.referredUserList.length > 0
              ? this.props.referredUserList.map(item => (
                  <div>
                    <Badge
                      status="success"
                      text={
                        <span>
                          <strong>{`${item.firstname} ${
                            item.lastname
                          }`}</strong>{" "}
                          {`(${item.username})`}
                        </span>
                      }
                    />
                  </div>
                ))
              : null}
          </p>
          <hr className="marginB20" />
          <h3 className="rightfloat marginB20">
            Cash earned:{" "}
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
