import React, { Component } from 'react';
import { Row, Col, Calendar, Card, Icon, Avatar } from 'antd';
import moment from 'moment';

// import '../resources/listingCatalogue.css';

class ProductCalender extends Component {
  render() {
    return (
      <Row>
        <h3>Product Calender</h3>
        <br />
        <Col sm={13} style={{ paddingRight: '15px', borderRight: '1px #eee solid' }}>
          <Calendar validRange={[moment('2019-04-20'), moment('2019-04-25')]} fullscreen={false} />
        </Col>
        <Col sm={11} style={{ paddingLeft: '15px' }}>
          <h3 style={{ fontWeight: 600, paddingBottom: 0 }}>Bookings</h3>
          <Card style={{ border: 0, padding: '2px !important' }}>
            {this.props.bookings.map(item => (
              <div>
                <Row>
                  <Col md={5} sm={7}>
                    <Avatar />
                  </Col>
                  <Col md={19} sm={17}>
                    {item.name}
                    <div style={{ lineHeight: '11px', fontSize: '10px' }}>
                      {item.start} - {item.end}
                    </div>
                  </Col>
                </Row>
                <Col
                  span={24}
                  style={{
                    paddingBottom: '5px',
                    borderBottom: '1px #eee solid',
                    marginBottom: '15px'
                  }}
                >
                  <h5 style={{ margin: '10px 3px' }}>
                    <span
                      style={{
                        background: '#23b195',
                        color: 'white',
                        padding: '0px 6px 1px 7px'
                      }}
                    >
                      {item.rating} <Icon type="star" theme="filled" />
                    </span>
                    <span style={{ color: '#23b195', padding: '0 14px' }}>Cancel Booking</span>
                  </h5>
                </Col>
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    );
  }
}

export default ProductCalender;
