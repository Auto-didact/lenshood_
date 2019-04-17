import React, { Component } from "react";
// import '../resources/listingCatalogue.css';
import {
  Row,
  Col,
  Icon,
  DatePicker,
  Checkbox,
  Slider,
  Button,
  Card
} from "antd";

const { RangePicker } = DatePicker;
export default class AddToCartCard extends Component {
  render() {
    const listing = this.props.listing;

    return (
      <div className="marginL20">
        <Card className="centerAlign">
          <h3>Select your rental period</h3>
          <h5>
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
          </div>
        </Card>
        <Card>
          <Row className="centerAlign">
            <Col span={12}>
              &#8377; {listing.listingRental.perDay} <h5>per day</h5>
            </Col>
            <Col span={12}>
              &#8377; {listing.listingRental.perWeek} <h5>per week</h5>
            </Col>
          </Row>
          <hr />
          <p>
            Owner Delivery <Icon type="car" />
            <Checkbox.Group className="rightfloat">
              <Checkbox value="Owner Delivery" />
            </Checkbox.Group>
            <h5>Benefits you gain the most out of your service</h5>
          </p>

          <hr className="ATChr" />
          <strong>Dates</strong>
          <div>
            <RangePicker
              dateRender={current => {
                const style = {};
                if (current.date() === 1) {
                  style.border = "1px solid #23b195";
                  style.borderRadius = "50%";
                }
                return (
                  <div className="ant-calendar-date" style={style}>
                    {current.date()}
                  </div>
                );
              }}
            />
          </div>
          <h5>Pick up and return days are free</h5>
          <br />
          <div>
            <p>
              Rent per day{" "}
              <div className="rightfloat">
                &#8377; {listing.listingRental.perDay}
              </div>
            </p>
            <p>
              Service fee{" "}
              <div className="rightfloat">
                &#8377; {this.props.product.serviceFee}
              </div>
            </p>
            <p>
              &#8377; {listing.listingRental.perDay}/- <Icon type="close" />{" "}
              {this.props.noOfDays} days{" "}
              <div className="rightfloat">
                &#8377; {listing.listingRental.perDay * this.props.noOfDays}
              </div>
            </p>
            <p>
              25% Multi day discount{" "}
              <div className="colorFloat">
                -&#8377;{" "}
                {listing.listingRental.perDay * this.props.noOfDays * 0.25}
              </div>
            </p>
          </div>
          <hr />
          <h3>
            Total rent amount{" "}
            <strong className="colorFloat">
              &#8377;{" "}
              {listing.listingRental.perDay * this.props.noOfDays -
                listing.listingRental.perDay * this.props.noOfDays * 0.25 +
                this.props.product.serviceFee}
            </strong>
          </h3>
          <p>
            Refundable deposit{" "}
            <div className="rightfloat">
              &#8377; {this.props.product.refundableDeposit}
            </div>
          </p>
          <Button className="themeColor marginB10" block>
            BOOK NOW
          </Button>
          <Button className="themeColorInverted" block>
            ADD TO BAG <Icon type="shopping" />
          </Button>
        </Card>
      </div>
    );
  }
}
