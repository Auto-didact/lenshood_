import React from 'react';
import { Row, Col, Button, Card } from 'antd';

export default class OrderCardComponent extends React.Component {
  render() {
    return (
      <Card className="boxShadowTheme borderRadius9">
        <h3 className="OrderHead">Order Status</h3>
        <Row>
          <Col lg={9} sm={7} xs={9}>
            <img src={this.props.product.image} alt="" className="orderVerticalImage" />
          </Col>
          <Col lg={15} sm={17} xs={15}>
            <h4 className="itemName">{this.props.product.name}</h4>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={20}>
            <h5 className="lightText">
              Rental Period <br />
              <strong>
                {this.props.product.date.start}-{this.props.product.date.end}
              </strong>
            </h5>
          </Col>
          <Col span={4}>
            <h5 className="noOfDays">
              <strong>
                Days <br />
                {this.props.product.days}
              </strong>
            </h5>
          </Col>
        </Row>
        <br />
        <h3 className="OrderHead">Cart Summary</h3>
        {this.props.paid === true ? (
          <h5 className="lightText">
            Total rent amount{' '}
            <strong className="rightfloat">
              &#8377;
              {this.props.product.totalRent}
            </strong>
          </h5>
        ) : (
          <h4 className="rentAmount">
            Total rent amount{' '}
            <strong className="colorFloat">
              &#8377;
              {this.props.product.totalRent}
            </strong>
          </h4>
        )}
        <h5 className="RefundOrder">
          Refundable deposit <strong className="ProductRef">&#8377; {this.props.product.refund}</strong>
        </h5>
        {this.props.paid === true ? (
          <h5 className="lightText">
            You paid <strong className="colorFloat">&#8377; {this.props.product.youPaid.amount}</strong>
            <h6 className="PaidMethodColor">{this.props.product.youPaid.method}</h6>
          </h5>
        ) : null}
        <br />
        <Button type="primary" block onClick={this.props.onSubmit}>
          {this.props.buttonText}
        </Button>
      </Card>
    );
  }
}
