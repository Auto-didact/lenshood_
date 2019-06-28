import React from "react";
import { Steps, Card, Icon } from "antd";

const { Step } = Steps;

export default class OrderTrackCardComponent extends React.Component {
  dateCheck(val, date, date2) {
    if (val <= this.props.completed) {
      if (date2 == 0) return <strong className="rightfloat">{date}</strong>;
      else
        return (
          <strong className="rightfloat">
            {date} - {date2}
          </strong>
        );
    }
  }
  IconCheck(val) {
    if (val <= this.props.completed)
      return <Icon type="check-circle" theme="filled" />;
    else return <Icon type="clock-circle" style={{color: "#FFCC99"}} />;
  }
  render() {
    console.log("Hey from Order Card", this.props.status.owner)
    return (
      <Card className="boxShadowTheme borderRadius9">
        <h4>
          <strong>Status</strong>
        </h4>
        <br />
        <Steps
          direction="vertical"
          size="small"
          current={this.props.completed}
          className="TrackSteps"
        >
          <Step
            title={
              <p className="font12">
                Order to be Confermed{" "}
                {this.dateCheck(0, this.props.status.date.confirm, 0)}
              </p>
            }
            icon={this.IconCheck(0)}
          />
          <Step
            title={
              <p className="font12">
                Quality check done and prduct picked up from{" "}
                {this.props.status.owner}
                {this.dateCheck(1, this.props.status.date.pickup, 0)}
              </p>
            }
            icon={this.IconCheck(1)}
          />
          <Step
            title={
              <p className="font12">
                Product delivered{" "}
                {this.dateCheck(2, this.props.status.date.delivery, 0)}
              </p>
            }
            icon={this.IconCheck(2)}
          />
          <Step
            title={
              <p className="font12">
                Rental period completed{" "}
                {this.dateCheck(
                  3,
                  this.props.status.date.start,
                  this.props.status.date.check
                )}
              </p>
            }
            icon={this.IconCheck(3)}
          />
          <Step
            title={
              <p className="font12">
                Quality check done and peoduct picked{" "}
                {this.dateCheck(4, this.props.status.date.check, 0)}
              </p>
            }
            icon={this.IconCheck(4)}
          />
          <Step
            title={
              <p className="font12">
                Product being delivered to {this.props.status.owner}
                {this.dateCheck(5, this.props.status.date.return, 0)}
              </p>
            }
            icon={this.IconCheck(5)}
          />
        </Steps>
      </Card>
    );
  }
}
