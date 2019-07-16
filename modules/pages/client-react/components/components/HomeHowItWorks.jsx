import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Tabs } from "antd";

const { TabPane } = Tabs;

const HomeHowItWorks = ({ t }) => {
  return (
    <div className="home-how-it-works-container">
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
              <h2>1.Search</h2>
              <h2>2.Book</h2>
              <h2>3.ID Proof</h2>
              <h2>4.Use And Return</h2>
            </TabPane>

            <TabPane tab="For Lenders" key="2">
              <h2>1.List</h2>
              <h2>2.Verification</h2>
              <h2>3.Notification</h2>
              <h2>4.Earn</h2>
              <h2>5.Return</h2>
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
