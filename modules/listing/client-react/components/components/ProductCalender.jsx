import React, { Component } from "react";
import { Row, Col, Calendar, Card, Icon, Avatar } from "antd";
import moment from "moment";

class ProductCalender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.dateArray = this.dateArray.bind(this);
    this.disabledDate = this.disabledDate.bind(this);
    // this.dateCellRender = this.dateCellRender.bind(this);
  }

  dateArray() {
    var i;
    this.props.bookings.map(book => {
      for (
        i = book.start;
        moment(i) <= moment(book.end);
        i = moment(i)
          .add(1, "d")
          .format("YYYY-MM-DD")
      ) {
        this.state.items.push(i);
      }
    });
  }

  componentDidMount() {
    this.dateArray();
  }

  disabledDate(current) {
    if (
      current &&
      this.state.items.some(
        row =>
          moment(row).format("YYYY-MM-DD") ===
            moment(current._d).format("YYYY-MM-DD") ||
          current.valueOf() < Date.now()
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  // dateCellRender(current) {
  //   if (
  //     current &&
  //     this.state.items.some(
  //       row =>
  //         moment(row).format("YYYY-MM-DD") ===
  //         moment(current._d).format("YYYY-MM-DD")
  //     )
  //   ) {
  //     return (
  //       <div
  //         style={{
  //           background: " #a0f5e4 !important",
  //           color: "#fff !important", width:"20px !important", height:"20px !important"
  //         }}
  //       />
  //     );
  //   }
  // }
  render() {
    return (
      <Row>
        <h3>Product Calender</h3>
        <br />
        <Col sm={13} className="CalendarBox">
          <Calendar
            // dateCellRender={this.dateCellRender}
            disabledDate={this.disabledDate}
            fullscreen={false}
          />
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
