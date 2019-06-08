import React, { Component } from "react";
import { Row, Col, Rate, Button, Card, Avatar } from "antd";
// import '../resources/listingCatalogue.css';

class UserCard extends Component {
  render() {
    let seller = this.props.seller;
    return (
      <Card className="userCard">
        <Row>
          <Col span={4}>
            <Avatar />
          </Col>
          <Col span={12}>
            <h4 className="sellerName">
              {seller.name}
              <br />
              <p className="font10 mainColor">
                {" "}
                <Rate
                  disabled
                  defaultValue={seller.rating}
                  className="font10 mainColor"
                />
                <br />
                Read Reviews ({seller.reviewsCount})
              </p>
            </h4>
          </Col>
          <Col span={8}>
            <Button className="FollowButtom" type="primary" ghost>
              Follow
            </Button>
          </Col>
        </Row>
        <br />
        <h4 className="font14">About</h4>
        <p className="font12">{seller.About}</p>
        <h4 className="font14">Web references</h4>
        <strong>
          {seller.references.map(item => (
            <strong>
              <a href={item} className="font12 itemLink">
                {item}
                <br />
              </a>
            </strong>
          ))}
        </strong>
        <br />
        <Button className="contactButton" type="primary" ghost>
          Contact
        </Button>
      </Card>
    );
  }
}

export default UserCard;
