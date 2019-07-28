import React, { Component } from 'react';
import {
  Row,
  Col,
  Icon,
  DatePicker,
  // Checkbox,
  Button,
  Card,
  Divider,
  Tooltip
} from 'antd';
import { CardTitle } from '@gqlapp/look-client-react';
import moment from 'moment';
import PropTypes from 'prop-types';

const { RangePicker } = DatePicker;
class AddToCart extends Component {
  state = {
    dateInit: {
      dateFormat: 'YYYY/MM/DD',
      startDate: null,
      endDate: null,
      changed: false
    }
  };
  onChange = (dates, dateStrings) => {
    this.setState({ startDate: dateStrings[0], endDate: dateStrings[1] });
  };

  disabledDate = current => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  };
  render() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    const listing = this.props.listing;

    const date = this.state.dateInit;

    function datediff(start, end) {
      // Take the difference between the dates and divide by milliseconds per day.
      // Round to nearest whole number to deal with DST.
      var startDate = new Date(start);
      var endDate = new Date(end);

      var timeDiff = endDate.getTime() - startDate.getTime();
      var DaysDiff = timeDiff / (1000 * 3600 * 24);
      return DaysDiff;
    }
    const dayDifference =
      this.state.startDate && this.state.endDate ? datediff(this.state.startDate, this.state.endDate) : 1;
    return (
      <Card style={{ backgroundColor: '#FAFAFA', width: '100%' }}>
        <CardTitle style={{ textAlign: 'center' }}>Select your rental period</CardTitle>
        {/*<h5>
          Price per day <h4>&#8377; {listing.listingRental.perDay}</h4>
        </h5>
         <h5>
            -25% discount<h5>{this.props.noOfDays} days</h5>
          </h5>
        <Slider
          min={1}
          max={30}
          onChange={this.props.onChange}
          value={
            typeof this.props.noOfDays === "number" ? this.props.noOfDays : 0
          }
        />
        <div>
          <h5 className="leftfloat">1 day</h5>
          <h5 className="rightfloat">30 days</h5>
        </div>*/}

        <Row>
          <Col span={24} align="center">
            &#8377; {listing.listingRental.perDay} <h5>per day</h5>
          </Col>
          {/*<Col span={12}>
            &#8377; {listing.listingRental.perWeek} <h5>per week</h5>
          </Col>*/}
        </Row>
        {/* <hr /> */}
        {/* <p>
            Owner Delivery <Icon type="car" />
            <Checkbox.Group className="rightfloat">
              <Checkbox value="Owner Delivery" />
            </Checkbox.Group>
            <h5>Benefits you gain the most out of your service</h5>
          </p> */}

        <Divider />
        <div align="center">
          <strong style={{ textAlign: 'center' }}>Dates</strong>
        </div>
        <div align="center">
          <RangePicker
            onChange={this.onChange}
            defaultValue={[
              moment(`${yyyy}/${mm}/${dd + 1}`, date.dateFormat),
              moment(`${yyyy}/${mm}/${dd + 2}`, date.dateFormat)
            ]}
            disabledDate={this.disabledDate}
            dateRender={current => {
              const style = {};
              if (current.date() === 1) {
                style.border = '1px solid #23b195';
                style.borderRadius = '50%';
              }
              return (
                <div className="ant-calendar-date" style={style}>
                  {current.date()}
                </div>
              );
            }}
          />
        </div>
        {/* <h5>Pick up and return days are free</h5> */}
        <br />
        <Row>
          <Col span={12}>Rent per day </Col>
          <Col span={12}>
            <div className="rightfloat">&#8377; {listing.listingRental.perDay}</div>
          </Col>
          <br />
          <br />
          {/*<p>
            Service fee{" "}
            <div className="rightfloat">
              &#8377; {this.props.product.serviceFee}
            </div>
          </p>*/}
          <Col span={12}>
            &#8377; {listing.listingRental.perDay}/- <Icon type="close" /> {dayDifference} days{' '}
          </Col>
          <Col span={12}>
            <div className="rightfloat">&#8377; {listing.listingRental.perDay * dayDifference}</div>
          </Col>
          {/* <p>
              25% Multi day discount{" "}
              <div className="colorFloat">
                -&#8377;{" "}
                {listing.listingRental.perDay * this.props.noOfDays * 0.25}
              </div>
            </p> */}
        </Row>
        <Divider />
        {/*<h3>
          Total rent amount{" "}
          <strong className="colorFloat">
            &#8377;{" "}
            {listing.listingRental.perDay * this.props.noOfDays +
              this.props.product.serviceFee}
          </strong>
        </h3>
        <CardText>
          Refundable deposit{" "}
          <div className="rightfloat">
            &#8377; {this.props.product.refundableDeposit}
          </div>
        </CardText>*/}

        <Tooltip title="We are not accepting orders yet">
          <div style={{ margin: '5px 0px 5px 0px' }}>
            <Button size="large" block onClick={this.props.onSubmit}>
              BOOK NOW
            </Button>
          </div>

          <div style={{ margin: '5px 0px 5px 0px' }}>
            <Button type="primary" size="large" block disabled>
              ADD TO BAG <Icon type="shopping" />
            </Button>
          </div>
      </Tooltip>
      </Card>
    );
  }
}

AddToCart.propTypes = {
  listing: PropTypes.object
};

export default AddToCart;
