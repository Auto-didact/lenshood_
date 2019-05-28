import React from "react";
import { CardGroup } from "@gqlapp/look-client-react";
import { Avatar, Rate, Icon, Row, Col, Divider } from "antd";

const ProfileHead = ({ profile, description }) => {
  return (
    <div align="center" style={{ marginBottom: "10px" }}>
      <Avatar
        size={100}
        src={
          profile && profile.image
            ? profile.image
            : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        }
      />
      <br />

      {profile && profile.firstName && profile.lastName && (
        <CardGroup>
          <h2 style={{ textAlign: "center" }}>
            {profile.firstName} {profile.lastName}
          </h2>
        </CardGroup>
      )}
      <h4 style={{ textAlign: "center" }}>({profile.designation})</h4>
      <Divider />
      <Row>
        <Col
          span={8}
          style={{
            align: "center"
          }}
        >
          <h2>{profile.acceptanceRate}</h2>

          <h4>{description.acceptanceRate}</h4>
        </Col>

        <Col
          span={8}
          style={{
            align: "center"
          }}
        >
          <div>
            <h2>
              <span className="StarRate">
                {profile.rating} <Icon type="star" theme="filled" />
              </span>
            </h2>

            <h4>{description.rating}</h4>
          </div>
        </Col>

        <Col
          span={8}
          style={{
            align: "center"
          }}
        >
          <h2>{profile.responseTime}</h2>
          <h4>{description.responseTime}</h4>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileHead;
