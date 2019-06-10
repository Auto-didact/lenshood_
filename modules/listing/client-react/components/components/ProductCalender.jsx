import React, { Component } from "react";
import { Row, Col, Calendar, Card, Icon, Avatar } from "antd";
import moment from "moment";

class ProductCalender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      myBooks: [],
      bookings: this.props.bookings,
      name: this.props.name
    };
    this.dateArray = this.dateArray.bind(this);
    this.disabledDate = this.disabledDate.bind(this);
  }

  dateArray() {
    var i;
    // var x = moment(Date.now());
    // alert(x.format("YYYY-MM-DD"));
    this.state.bookings.map(book => {
      for (
        i = book.start;
        moment(i) <= moment(book.end);
        i = moment(i)
          .add(1, "d")
          .format("YYYY-MM-DD")
      ) {
        if (book.name === this.state.name) this.state.myBooks.push(i);
        else this.state.items.push(i);
      }
    });
  }

  disabledDate(current) {
    if (
      current &&
      this.state.items.some(
        row =>
          moment(row).format("YYYY-MM-DD") ===
            moment(current._d).format("YYYY-MM-DD") &&
          current.valueOf() < Date.now()
      )
    ) {
      return true;
    } else {
      return false;
    }
  }
  dateFullCellRender = current => {
    const style = {};
    if (current && current.valueOf() < Date.now()) {
      style.background = "#ddd";
      style.borderRadius = "50%";
      style.color = "white";
      style.cursor = "not-allowed";
    } else if (
      current &&
      current.valueOf() > Date.now() &&
      this.state.items.some(
        row =>
          moment(row).format("YYYY-MM-DD") ===
          moment(current._d).format("YYYY-MM-DD")
      )
    ) {
      style.background = "#23b195";
      style.color = "white";
      style.borderRadius = "50%";
    } else if (
      current &&
      current.valueOf() > Date.now() &&
      this.state.myBooks.some(
        row =>
          moment(row).format("YYYY-MM-DD") ===
          moment(current._d).format("YYYY-MM-DD")
      )
    ) {
      style.background = "#a0f5e4";
      style.color = "#888";
      style.borderRadius = "50%";
    }

    return (
      <div className="ant-calendar-date" style={style}>
        {current.date()}
      </div>
    );
  };
  render() {
    this.dateArray();
    return (
      <Row>
        <h3>Product Calender</h3>
        <br />
        <Col sm={13} className="CalendarBox">
          <Calendar
            disabledDate={this.disabledDate}
            dateFullCellRender={this.dateFullCellRender}
            fullscreen={false}
          />
        </Col>
        <Col sm={11} className="PadL15">
          <h3 className="Bookings">Bookings</h3>
          <Card className="BookingsCard">
            {this.state.bookings.map(item => (
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
                <Col span={24} className="RateBook">
                  <h5>
                    <span className="RateBookIcon">
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
