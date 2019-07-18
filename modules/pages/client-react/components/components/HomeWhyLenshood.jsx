import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

const HomeWhyLenshood = ({ t }) => {
  return (
    <div className="home-why-lenshood-container" align="center">
      <h1 className="home-steps-head">Why Lenshood</h1>
      <div align="center">
        <div style={{ height: '2px', width: '342px', background: '#23b195' }} />
      </div>
      <br />
      <Row gutter={10} align="middle" type="flex" justify="space-around">
        <Col span={12}>
          <h1 className="home-steps-sub-head">
            <b>1</b>
          </h1>
          <h1>Each Item is held inspected, cleaned and packed by our experts</h1>
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
            <b>2</b>
          </h1>
          <h1>No security Deposit</h1>
        </Col>
      </Row>
      <Row gutter={10} align="middle" type="flex" justify="space-around">
        <Col span={12}>
          <h1 className="home-steps-sub-head">
            <b>3</b>
          </h1>
          <h1>Secure Online payment</h1>
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
            <b>4</b>
          </h1>
          <h1>100% invite based ensures trust</h1>
        </Col>
      </Row>
    </div>
  );
};
HomeWhyLenshood.propTypes = {
  t: PropTypes.func
};

export default HomeWhyLenshood;
