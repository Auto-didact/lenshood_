import React from "react";
import { CardGroup } from "@gqlapp/look-client-react";
import { Avatar, Icon, Row, Col, Divider } from "antd";
import { ImgUser } from "../constants/DefaultImages";

const PublicProfileHead = ({
  profile,
  description,
  role,
  username,
  email,
  city,
  portfolios
}) => {
  return (
    <div style={{ marginBottom: "10px", maxWidth: "1000px" }}>
      <Row>
        <Col span={7}>
          <div style={{ height: "160px", width: "160px" }}>
            <Avatar
              size={150}
              src={profile && profile.avatar ? profile.avatar : ImgUser}
            />
            <h4>{username}</h4>
          </div>
        </Col>

        <Col span={17} align="left">
          <div>
            <h1 style={{ display: "inline" }}>
              {profile && profile.firstName && profile.lastName
                ? profile.firstName + " " + profile.lastName
                : "Not Provided"}
            </h1>

            <p style={{ display: "inline" }}>
              ({role ? role : "Not Provided"})
            </p>
          </div>
          <div>
            <h3 style={{ display: "inline" }}>
              <span className="StarRate">
                {profile && profile.rating ? profile.rating : "Not Rated"}
                <Icon type="star" theme="filled" />
              </span>
            </h3>
            <h4 style={{ display: "inline" }}> {city}</h4>
          </div>
          <div>
            <h4>{profile && profile.about ? profile.about : "Not Provided"}</h4>
          </div>
          <div>
            <h4 style={{ display: "inline" }}>
              {description.acceptanceRate}:
              {profile && profile.acceptanceRate
                ? profile.acceptanceRate
                : "Not Available   "}
              ,{"  "}
              {description.responseTime}:
              {profile.responseTime ? profile.responseTime : "Not Available"}
            </h4>
          </div>
          <div>
            {profile && profile.website ? profile.website : ""}, {email}
          </div>
          <div>
            {portfolios && portfolios.length !== 0
              ? portfolios.map((portfolio, key) => (
                  <div key={key}>
                    {portfolio.platform} : {portfolio.portfolioUrl}
                  </div>
                ))
              : ""}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PublicProfileHead;
