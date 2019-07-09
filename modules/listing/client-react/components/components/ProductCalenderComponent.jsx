import React, { Component } from 'react';
import { Row, Col, Calendar, Card, Icon, Avatar, Button } from 'antd';
import moment from 'moment';
import DateRangeCardComponent from './DateRangeCardComponent';

class ProductCalenderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      myBooks: [],
      bookings: this.props.bookings,
      name: this.props.name,
      modal1Visible: false,
      currentBooking: {
        start: Date.now(),
        end: Date.now(),
        range: []
      }
    };
    this.dateArray = this.dateArray.bind(this);
    this.disabledDate = this.disabledDate.bind(this);
    this.setModal1Visible = this.setModal1Visible.bind(this);
  }
  setModal1Visible() {
    this.setState({ modal1Visible: !this.state.modal1Visible });
  }
  dateArray() {
    var i;
    this.state.items = [];
    this.state.myBooks = [];
    // var x = moment(Date.now());
    // alert(x.format("YYYY-MM-DD"));
    this.state.bookings.map(book => {
      for (
        i = book.start;
        moment(i) <= moment(book.end);
        i = moment(i)
          .add(1, 'd')
          .format('YYYY-MM-DD')
      ) {
        if (book.name === this.state.name) this.state.myBooks.push(i);
        else this.state.items.push(i);
      }
    });
  }

  disabledDate(current) {
    if (
      (current && current.valueOf() < Date.now()) ||
      this.state.items.some(row => moment(row).format('YYYY-MM-DD') === moment(current._d).format('YYYY-MM-DD')) ||
      this.state.myBooks.some(row => moment(row).format('YYYY-MM-DD') === moment(current._d).format('YYYY-MM-DD'))
    ) {
      return true;
    } else {
      return false;
    }
  }
  dateFullCellRender = current => {
    const style = {};
    if (current && current.valueOf() < Date.now()) {
      style.background = '#ddd';
      style.borderRadius = '50%';
      style.color = 'white';
      style.cursor = 'not-allowed';
    } else if (
      current &&
      current.valueOf() > Date.now() &&
      this.state.items.some(row => moment(row).format('YYYY-MM-DD') === moment(current._d).format('YYYY-MM-DD'))
    ) {
      style.background = '#23b195';
      style.color = 'white';
      style.borderRadius = '50%';
    } else if (
      current &&
      current.valueOf() > Date.now() &&
      this.state.myBooks.some(row => moment(row).format('YYYY-MM-DD') === moment(current._d).format('YYYY-MM-DD'))
    ) {
      style.background = '#a0f5e4';
      style.color = '#888';
      style.borderRadius = '50%';
    } else if (
      current &&
      current.valueOf() > Date.now() &&
      this.state.currentBooking.range.some(
        row => moment(row, 'DD-MM-YY').format('DD-MM-YY') === moment(current._d).format('DD-MM-YY')
      )
    ) {
      style.background = '#FFFF99';
      style.color = '#000';
      style.borderRadius = '50%';
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
            className="marginB20"
          />
          <Col span={12}>
            <Button type="primary" size="small" onClick={() => this.setModal1Visible()} block>
              Book Dates
            </Button>
          </Col>
          {this.state.currentBooking.range.length ? (
            <Col span={12}>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  this.setState({
                    currentBooking: {
                      start: Date.now(),
                      end: Date.now(),
                      range: []
                    }
                  });
                }}
                block
                ghost
              >
                Reset Dates
              </Button>
            </Col>
          ) : null}
          <DateRangeCardComponent
            disabledDate={this.disabledDate}
            setModal1Visible={this.setModal1Visible}
            modal1Visible={this.state.modal1Visible}
            currentBooking={this.state.currentBooking}
            myBooks={this.state.myBooks}
            items={this.state.items}
          />
        </Col>
        <Col sm={11} className="PadL15">
          <h3 className="Bookings">Bookings</h3>
          <Card className="BookingsCard">
            {this.state.bookings.map((item, id) => (
              <div key={id}>
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
                    {item.name === this.state.name ? <span className="CancelBook">Cancel Booking</span> : null}
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

export default ProductCalenderComponent;
