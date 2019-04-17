import React, { Component } from 'react';
import { Row, Col, Calendar, Card, Icon, Avatar } from 'antd';
import moment from 'moment';

class ProductCalender extends Component {
  render() {
    return (
      <Row>
        <h3>Product Calender</h3>
        <br />
        <Col sm={13} className="CalendarBox">
          <Calendar validRange={[moment('2019-04-20'), moment('2019-04-25')]} fullscreen={false} />
        </Col>
        <Col sm={11} className="PadL15">
          <h3 className="Bookings">Bookings</h3>
          <Card className="BookingsCard">
            {this.props.bookings.map(item => (
              <div>
                <Row>
                  <Col md={5} sm={7}>
                    <Avatar />
                  </Col>
                  <Col md={19} sm={17}>
                    {item.name}
                    <div className="BookDate">
                      {item.start} - {item.end}
                    </div>
                  </Col>
                </Row>
                <Col
                  span={24}
                  className="RateBook"
                >
                  <h5>
                    <span
                      className="RateBookIcon"
                    >
                      {item.rating} <Icon type="star" theme="filled" />
                    </span>
                    <span className="CancelBook">Cancel Booking</span>
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
