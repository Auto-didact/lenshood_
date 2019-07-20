import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Tabs } from "antd";
import Borrowing from "./Borrowing";
import Lending from "./Lending";

const { TabPane } = Tabs;

const HomeHowItWorks = ({ t }) => {
  return (
    <div className="home-how-it-works-container layout-counter-margin layout-padding">
      <h1 align="center">How Lenshood Works</h1>
      <Row gutter={10}>
        <Col xs={24} span={12}>
          <div className="home-steps-picture" />
        </Col>
        <Col xs={24} span={12}>
          <Tabs
            defaultActiveKey={1}
            size="large"
            tabBarStyle={{
              maxWidth: "1000px",
              display: "flex",
              justifyContent: "center",
              color: "#111"
            }}
          >
            <TabPane tab="For Borrowers" key="1">
              For Borrowers
            </TabPane>

            <TabPane tab="For Lenders" key="2">
              For Lenders
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};
HomeHowItWorks.propTypes = {
  t: PropTypes.func
};

export default HomeHowItWorks;
