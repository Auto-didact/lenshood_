import React, { Component } from 'react';
import { Icon, Button, Row, Col, Card, Rate, Avatar } from 'antd';
import { BORROWED } from '../constants/OrderStates';

class OrderDetailsComponent extends Component {
  render() {
    const item = this.props.item;

    return (
      <Card className="boxShadowTheme borderRadius9 marginT20">
        <Row>
          <Col span={24} className="marginB10 PadA10">
            <Col sm={19} xs={24}>
              <span className="itemName">{item.id}</span>
            </Col>
            <Col sm={5} xs={12}>
              <Button type="primary" ghost size="small" block onClick={e => this.props.setTrackList(item.id)}>
                {' '}
                <Icon type="environment" theme="filled" /> Track
              </Button>
            </Col>
          </Col>
          <br />
          <Col md={7} sm={9} xs={24}>
            <img height={140} src={item.image} alt="" className="width100" />
          </Col>
          <Col md={17} sm={15} xs={24} className="PadA10">
            <h4 className="itemName">{item.name}</h4>
            <Col sm={14} xs={24}>
              <h4 className="itemDetails">
                {item.details}{' '}
                <span className="colorcursor">
                  <Icon type="car" theme="filled" />
                </span>
              </h4>
              <p className="orderstartend">
                {item.date.start} - {item.date.end}
              </p>
              <Col sm={5} xs={6}>
                <Avatar src={item.userimg} />
              </Col>
              <Col sm={19} xs={18}>
                <h4 className="font12">
                  {item.seller}
                  <br />
                  <p className="font10 mainColor">
                    {' '}
                    <Rate disabled defaultValue={item.stars} className="font10 mainColor" />
                  </p>
                </h4>
              </Col>
            </Col>
            <Col sm={10} xs={24}>
              <Button type="primary" size="small" className="CancelRequest font12" block>
                Cancel booking
              </Button>
              <Button type="primary" className="CancelRequest font12" size="small" block>
                Request Extension
              </Button>
            </Col>
          </Col>
          <Col span={24} className="orderTotalDate">
            <h4>
              <Col sm={17} xs={24}>
                <span className="orderGrey">{item.status === BORROWED ? 'Ordered' : 'Lended'} on</span> {item.orderDate}{' '}
              </Col>
              <Col sm={7} xs={24}>
                <span className="orderGrey">
                  <span>{item.status === BORROWED ? 'Order' : 'Lend'} Total</span> &#8377; {item.orderTotal}
                </span>
              </Col>
            </h4>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default OrderDetailsComponent;
