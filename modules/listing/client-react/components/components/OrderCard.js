import React from 'react';
import '../resources/listingCatalogue.css';
import { Row, Col, Button, Card } from 'antd';

export default class OrderCard extends React.Component {
  render() {
    return (
      <Card>
        <h3 style={{ textShadow: '0.5px 0 0', fontSize: '17px' }}>Order Status</h3>
        <Row>
          <Col span={9}>
            <img src={this.props.product.image} alt="" className="orderImage" />
          </Col>
          <Col span={13}>
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
        <h3 style={{ fontSize: '17px', textShadow: '0.3px 0 0' }}>Cart Summary</h3>
        {this.props.paid === true ? (
          <h5 className="lightText">
            Total rent amount{' '}
            <strong style={{ float: 'right' }}>
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
        <h5
          style={{
            fontSize: '11px',
            color: '#4a4a4a',
            letterSpacing: '0.5px'
          }}
        >
          Refundable deposit{' '}
          <strong style={{ float: 'right', letterSpacing: '1px' }}>&#8377; {this.props.product.refund}</strong>
        </h5>
        {this.props.paid === true ? (
          <h5 className="lightText">
            You paid <strong className="colorFloat">&#8377; {this.props.product.youPaid.amount}</strong>
            <h6 style={{ color: '#676767' }}>{this.props.product.youPaid.method}</h6>
          </h5>
        ) : null}
        <br />
        <Button className="themeColor" block>
          {this.props.buttonText}
        </Button>
      </Card>
    );
  }
}
