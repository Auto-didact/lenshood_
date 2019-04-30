import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col, Menu } from 'antd';

import NavBar, { ref } from './NavBar';
import Footer from './Footer';

const { Header, Content } = Layout;

// const ref = { modules: modules };

class AccountLayout extends React.Component {
  render() {
    const { children, navBar } = this.props;
    return (
      <Layout>
        {navBar !== false && (
          <Header className="header">
            <NavBar />
          </Header>
        )}

        <Row style={{ padding: '2% 5%', background: '#fff' }}>
          <Col lg={4} md={24}>
            <h4 style={{ padding: '0 20px 13px' }}>
              <strong>Account Details</strong>
            </h4>
            <Menu
              mode="inline"
              theme="light"
              defaultSelectedKeys={[`${this.props.select}`]}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
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
          <Col lg={18} md={50}>
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
