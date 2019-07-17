import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

const HomeSteps = ({ t }) => {
  return (
    <div className="home-steps-container">
      <h1 className="home-steps-head" align="center">
        Three Simple Steps To Get Started
      </h1>
      <Row gutter={10}>
        <Col span={12} className="home-steps-step">
          <h1 className="home-steps-sub-head">
            <b>SignUp</b>
          </h1>
          <h1>Some Text About SignUp</h1>
        </Col>
        <Col span={12} className="home-steps-step">
          <h1>Img</h1>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col span={12} className="home-steps-step">
          <h1>Img</h1>
        </Col>
        <Col span={12} className="home-steps-step">
          <h1 className="home-steps-sub-head">
            <b>Lenshood KYC</b>
          </h1>
          <h1>Some Text About KYC</h1>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col span={12} className="home-steps-step">
          <h1 className="home-steps-sub-head">
            <b>Add Listing</b>
          </h1>
          <h1>Some Text About Add Listing</h1>
        </Col>
        <Col span={12} className="home-steps-step">
          <h1>Img</h1>
        </Col>
      </Row>
    </div>
  );
};
HomeSteps.propTypes = {
  t: PropTypes.func
};

export default HomeSteps;
