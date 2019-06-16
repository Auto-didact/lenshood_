import React, { Component } from "react";
import { Row, Col, Rate, Button, Card, Avatar } from "antd";
import { NavLink } from "react-router-dom";

import { CardText } from "@gqlapp/look-client-react";
import { ImgUser } from "../../constants/DefaultImages";
// import '../resources/listingCatalogue.css';
const { Meta } = Card;

class UserCard extends Component {
  render() {
    let seller = this.props.seller;
    const portfolios = this.props.seller && this.props.seller.portfolios;
    const firstName = seller && seller.profile && seller.profile.firstName;
    const lastName = seller && seller.profile && seller.profile.lastName;

    const sellerName =
      firstName && lastName
        ? `${firstName} ${lastName}`
        : firstName || lastname
        ? firstName
          ? firstName
          : lastName
        : "Name Not Provided";

    return (
      <Card
        style={{ backgroundColor: "#FAFAFA", width: "100%", marginTop: "10px" }}
      >
        <Row type="flex" justify="space-around" align="middle">
          <Col
            lg={{ span: 18 }}
            md={{ span: 24 }}
            xs={{ span: 24 }}
            sm={{ span: 16 }}
            style={{ marginTop: "5px" }}
          >
            <Meta
              avatar={
                <Avatar
                  size={70}
                  src={seller.profile.avatar ? seller.profile.avatar : ImgUser}
                />
              }
              title={
                <div>
                  <h4 className="UserCardUserName">{sellerName}</h4>
                  <div>
                    {seller.profile.rating ? (
                      <Rate
                        disabled
                        defaultValue={seller.profile.rating}
                        className="font10 mainColor"
                      />
                    ) : (
                      <p>Not Rated</p>
                    )}
                  </div>
                  <h6>Read Reviews ({seller.reviewsCount || "0"})</h6>
                </div>
              }
            />
          </Col>
          <Col
            lg={{ span: 6 }}
            md={{ span: 24 }}
            xs={{ span: 24 }}
            sm={{ span: 8 }}
            style={{ marginTop: "5px", maxWidth: "150px" }}
          >
            <div align="center">
              <Button type="primary" block>
                Follow
              </Button>
              <br />
            </div>
          </Col>
        </Row>

        <br />
        <h4 className="font14">About</h4>
        <p className="font12">{seller.profile.about}</p>
        <h4 className="font14">Web references</h4>
        {portfolios ? (
          portfolios.map(item => (
            <strong>
              <a href={item.portfolioUrl} className="font12 itemLink">
                {item.portfolioUrl}
                <br />
              </a>
            </strong>
          ))
        ) : (
          <CardText>Not Available</CardText>
        )}
        <br />
        <br />
        <div align="center">
          <Button href={`/public-profile/${seller.id}`}>View Profile</Button>
        </div>
      </Card>
    );
  }
}

export default UserCard;
