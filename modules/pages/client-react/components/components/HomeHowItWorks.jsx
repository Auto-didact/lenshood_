import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Tabs } from "antd";
import Borrowing from "./Borrowing";
import Lending from "./Lending";

const { TabPane } = Tabs;

const HomeHowItWorks = ({ t }) => {
  return (
    <div className="home-how-it-works-container layout-counter-margin layout-padding">
      <Row gutter={10}>
        <Col span={12}>Img</Col>
        <Col span={12}>
          <h1 align="center">How Lenshood Works</h1>
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
              <Borrowing t={t} />
            </TabPane>

            <TabPane tab="For Lenders" key="2">
              <Lending t={t} />
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
