import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";

const HomeSteps = ({ t }) => {
  return (
    <div className="home-steps-container" align="center">
      <Row>
        <Col span={8}>
          <h1>first</h1>
        </Col>
        <Col span={8}>
          <h1>second</h1>
        </Col>
        <Col span={8}>
          <h1>third</h1>
        </Col>
      </Row>
      <br />
      <img
        src={require("../../images/home/Steps.svg")}
        height="200px"
        width="400px"
      />
    </div>
  );
};
HomeSteps.propTypes = {
  t: PropTypes.func
};

export default HomeSteps;
