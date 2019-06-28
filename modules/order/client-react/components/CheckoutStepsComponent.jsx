import React, { Component } from 'react';
import { Steps, Col } from 'antd';

const Step = Steps.Step;

class CheckoutStepsComponent extends Component {
  render() {
    return (
      <Col lg={20} md={24}>
        <div className="CheckoutStepsComponent">Checkout</div>
        <Steps current={this.props.step} size="small">
          <Step title={<span className="font13">Cart</span>} />
          <Step title={<span className="font13">Billing Address</span>} />
          <Step title={<span className="font13">Payment options</span>} />
          <Step title={<span className="font13">Order Status</span>} />
        </Steps>
        <br/>
        <br/>
      </Col>
    );
  }
}

export default CheckoutStepsComponent;
