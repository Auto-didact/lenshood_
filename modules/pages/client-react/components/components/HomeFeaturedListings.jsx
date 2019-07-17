import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Tabs } from "antd";

const { TabPane } = Tabs;

const HomeFeaturedListings = ({ t }) => {
  return (
    <div className="home-featured-listings-container layout-counter-margin layout-padding">
      <Row gutter={10}>
        <Col span={8}>Featured</Col>
        <Col span={8}>Featured</Col>
        <Col span={8}>Featured</Col>
      </Row>
    </div>
  );
};
HomeFeaturedListings.propTypes = {
  t: PropTypes.func
};

export default HomeFeaturedListings;
