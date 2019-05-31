import React, { Component } from "react";
// import '../resources/listingCatalogue.css';
import { Icon, Button, Row, Col } from "antd";

class DetailsCard extends Component {
  render() {
    console.log(this.props.item);
    const item = this.props.item;
    const buttonText = this.props.buttonText;
    return (
      <div style={{ boxShadow: "3px 3px 5px  #94ead9" }}>
        <Row
          className="DetailsRow"
          type="flex"
          justify="space-around"
          align="middle"
        >
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <div className="width100">
              <img
                style={{ width: "100%" }}
                alt=""
                src={
                  item.listingImages.length !== 0
                    ? item.listingImages[0].imageUrl
                    : null
                }
              />
            </div>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} className="PadT10">
            <div style={{ padding: "10px 0px 10px 15px" }}>
              {item.status === "On Rent" ? (
                <h6 className="OnRentTag">On Rent</h6>
              ) : (
                <h6 className="OnShelfTag">On Shelf</h6>
              )}
              <h4>{item.description}</h4>
              {/*<h5>
                <span className="StarRate">
                  {item.rating} <Icon type="star" theme="filled" />
                </span>
                <span className="mainColor"> ({item.reviews})</span>
              </h5>*/}
              <h5 className="marginB25">
                <strong>&#8377; {item.listingRental.perDay} per day</strong>
              </h5>

              <Button className="ListingButtons">
                <span>{buttonText} Listing</span>
              </Button>
              <Button className="ListingButtons">
                <Icon type="delete" />
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DetailsCard;
