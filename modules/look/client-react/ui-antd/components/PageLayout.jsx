import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import NavBar from './NavBar';
import Footer from './Footer';

const { Header, Content } = Layout;

class PageLayout extends React.Component {
  render() {
    const { children, navBar } = this.props;

    return (
      <Layout className="main-layout">
        {navBar !== false && (
          <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <NavBar />
          </Header>
        )}

        <Content id="content" className="page-content">
          {children}
        </Content>

        <Footer />
      </Layout>
    );
  }
}

PageLayout.propTypes = {
  children: PropTypes.node,
  navBar: PropTypes.bool
};

export default PageLayout;
