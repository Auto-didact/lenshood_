import React from "react";

import PropTypes from "prop-types";

import settings from "../../../../../settings";
import { Button, Divider, Card, Row, Col } from "antd";

const HomeHead = ({ t, image }) => {
  return (
    <div className="home-head-container layout-counter-margin">
      <div style={{ paddingTop: "70px" }}>
        <Row style={{ height: "100%" }}>
          <Col span={10}>
            <div className="home-image-contentText">Earn Money By Lending.</div>
            <div className="home-image-divider-1 home-content-divider-margin">
              <Divider />
            </div>
            <div className="home-image-contentText2">
              The safest way to lend and rent your cameras within a trusted
              community of like minded people.
            </div>
            <div className="home-image-divider-2 home-content-divider-margin">
              <Divider />
            </div>
            <Button
              type="primary"
              className="home-image-content-button "
              size="large"
            >
              SignUp
            </Button>
          </Col>
          <Col span={14}>
            <img src={require("../../images/home/banner.png")} />
          </Col>
        </Row>
        {/*<div className="home-head">
        <img className="home-head-image" src={image} alt="" />
        <div className="home-image-content">

        </div>
      </div>*/}
        <img
          className="waves wave1"
          src={require("../../images/home/waves.png")}
        />
        <img
          className="waves wave2"
          src={require("../../images/home/waves.png")}
        />
        <img
          className="waves wave3"
          src={require("../../images/home/waves.png")}
        />
      </div>
    </div>
  );
};
HomeHead.propTypes = {
  t: PropTypes.func,
  image: PropTypes.string
};

export default HomeHead;
