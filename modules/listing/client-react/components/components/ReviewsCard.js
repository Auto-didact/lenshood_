import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Rate, List, Row, Col, Card, Avatar } from "antd";
// import '../resources/listingCatalogue.css';

class ReviewsCard extends Component {
  averageReviews(array) {
    var total = 0,
      len = 0;
    for (var key in array) {
      total = total + array[key];
      len = len + 1;
    }
    return total / 5;
  }
  render() {
    let reviews = this.props.reviews;
    return (
      <Card
        className="RevCard"
      >
        <h4>
          {reviews.reviewers.length} reviews on this item{" "}
          <Rate
            disabled
            defaultValue={this.averageReviews(reviews.properties)}
            className="RevStar"
          />{" "}
          <h5 className="InlineDisplay">
            {this.averageReviews(reviews.properties)}
          </h5>
        </h4>
        <Row>
          {Object.entries(reviews.properties).map(([key, value]) => (
            <Col lg={12} sm={24}>
              {key}
              <div className="rightfloat">
                <h5 className="reviewVal">
                  {value}
                </h5>{" "}
                <Rate
                  disabled
                  defaultValue={value}
                  className="RevStar"
                />{" "}
              </div>
            </Col>
          ))}
        </Row>
        <List
          className="marginT30"
          itemLayout="horizontal"
          dataSource={reviews.reviewers}
          renderItem={item => (
            <List.Item className="marginB20">
              <List.Item.Meta
                avatar={<Avatar />}
                title={
                  <div
                    className="DateandDes"
                  >
                    <Link
                      to=""
                      className="itemLink"
                      href="#"
                    >
                      {item.name}
                    </Link>
                    <h5>{item.Date}</h5>
                  </div>
                }
                description={
                  <h5 className="lineHeight18">{item.word}</h5>
                }
              />
            </List.Item>
          )}
        />
        <Link to="">
          <h3 className="mainColor">Show all reviews</h3>
        </Link>
      </Card>
    );
  }
}

export default ReviewsCard;
