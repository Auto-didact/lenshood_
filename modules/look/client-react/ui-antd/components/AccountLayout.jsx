import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Layout, Row, Col, Menu } from "antd";

import NavBar, { ref } from "./NavBar";
import Footer from "./Footer";

const { Header, Content, Sider } = Layout;

// const ref = { modules: modules };

class AccountLayout extends React.Component {
  render() {
    const { children, navBar } = this.props;
    return (
      <Layout className="layoutList">
        {navBar !== false && (
          <Header className="header">
            <NavBar />
          </Header>
        )}
        <Row className="layoutRow" gutter={16}>
          <Col lg={6} md={24} className="SliderStart">
            <h3 className="Pad20">
              <strong>Account Details</strong>
            </h3>
            <Menu
              mode="inline"
              defaultSelectedKeys={[`${this.props.select}`]}
              defaultOpenKeys={["sub1"]}
              className="AccountDetails"
            >
              {/* <Item className="AccDetItem" key="/profile">
                <Icon type="user" /> Profile
              </Item>
              <Item className="AccDetItem" key="2">
                <Icon type="shopping-cart" /> My Orders
              </Item>
              <Item className="AccDetItem" key="3">
                {' '}
                <Icon type="solution" /> My Listings
              </Item>
              <Item className="AccDetItem" key="4">
                <Icon type="heart" /> Watchist
              </Item> */}

              {ref.modules.navItemsAccount}
            </Menu>
          </Col>
          <Col lg={15} md={24}>
            <Content id="content">{children}</Content>
          </Col>
        </Row>
        <Footer />
      </Layout>
    );
  }
}

AccountLayout.propTypes = {
  children: PropTypes.node,
  navBar: PropTypes.bool
};

export default withRouter(AccountLayout);
