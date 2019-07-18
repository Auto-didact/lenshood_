import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

const HomeSteps = ({ t }) => {
  return (
    <div className="home-steps-container" align="center">
      <h1 className="home-steps-head">Three Simple Steps To Get Started</h1>
      <div align="center">
        <div style={{ height: '2px', width: '342px', background: '#23b195' }} />
      </div>
      <br />
      <Row gutter={10} align="middle" type="flex" justify="space-around">
        <Col span={12}>
          <h1 className="home-steps-sub-head">
            <b>SignUp</b>
          </h1>
          <h1>Some Text About SignUp</h1>
        </Col>
        <Col span={12}>
          <div className="home-steps-picture" />
        </Col>
      </Row>
      <Row gutter={10} align="middle" type="flex" justify="space-around">
        <Col span={12}>
          <div className="home-steps-picture" />
        </Col>
        <Col span={12}>
          <h1 className="home-steps-sub-head">
            <b>Lenshood KYC</b>
          </h1>
          <h1>Some Text About KYC</h1>
        </Col>
      </Row>
      <Row gutter={10} align="middle" type="flex" justify="space-around">
        <Col span={12}>
          <h1 className="home-steps-sub-head">
            <b>Add Listing</b>
          </h1>
          <h1>Some Text About Add Listing</h1>
        </Col>
        <Col span={12}>
          <div className="home-steps-picture" />
        </Col>
      </Row>
    </div>
  );
};
HomeSteps.propTypes = {
  t: PropTypes.func
};

export default HomeSteps;
