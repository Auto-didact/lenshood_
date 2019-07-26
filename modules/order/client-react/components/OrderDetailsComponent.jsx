import React, { Component } from 'react';
import { Icon, Button, Row, Col, Card, Rate, Avatar } from 'antd';
import { ImgCamera } from '@gqlapp/listing-client-react';
import { BORROWED } from '../constants/OrderStates';

class OrderDetailsComponent extends Component {
  render() {
    const item = this.props.item;

    return (
      <Card
        className="orderCard"
        hoverable
        bodyStyle={{
          padding: '0px'
        }}
      >
        <Row type="flex" justify="space-around" align="middle">
          <Col xs={{ span: 24 }} md={{ span: 9 }} xxl={{ span: 6 }} className="orderCardCol" align="center">
            <img
              className="orderHorizontalImage"
              alt=""
              src={item.image.length !== 0 ? item.image : ImgCamera[0].imageUrl}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 15 }} xxl={{ span: 18 }} className="orderCardCol">
            <div style={{ padding: '10px', align: 'center' }}>
              <Button
                className="trackTag font12 borderRadius9"
                style={{
                  width: '15%',
                  minWidth: '65px',
                  position: 'relative',
                  left: '5px',
                  bottom: '5px'
                }}
                type="primary"
                ghost
                size="small"
                block
                onClick={() => this.props.setTrackList(item.id)}
              >
                <Icon type="environment" theme="filled" /> Track
              </Button>
              <h2 className="itemName">
                {item.name ? (
                  <span>
                    <b>{item.name}</b>
                  </span>
                ) : (
                  'Info Not Provided'
                )}
              </h2>
              <h3 className="itemDetails">
                {item.details}{' '}
                <span className="colorcursor">
                  <Icon type="car" theme="filled" />
                </span>
              </h3>
              <p className="orderstartend">
                {item.date.start} - {item.date.end}
              </p>
              <Avatar style={{ position: 'relative', left: '20px' }} src={item.userimg} />
              <h3 className="font12">
                {item.seller}
                <p className="font10 mainColor">
                  <Rate disabled defaultValue={item.stars} className="font10 mainColor" />
                </p>
              </h3>
              <Col span={24} className="orderTotalDate">
                <h4>
                  <Col sm={17} xs={24} className="orderGrey">
                    <span>{item.status === BORROWED ? 'Ordered' : 'Lended'} on</span> {item.orderDate}{' '}
                  </Col>
                  <Col sm={7} xs={24}>
                    <span className="orderGrey">
                      <strong>
                        <span>{item.status === BORROWED ? 'Order' : 'Lend'} Total</span> &#8377; {item.orderTotal}
                      </strong>
                    </span>
                  </Col>
                </h4>
              </Col>
              <Row gutter={13} align="middle">
                <Col span={12}>
                  <Button type="primary" block>
                    Cancel booking
                  </Button>
                </Col>
                <Col span={12}>
                  <Button type="primary" block>
                    Request Extension
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default OrderDetailsComponent;
