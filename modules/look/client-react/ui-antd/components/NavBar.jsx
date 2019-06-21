import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { Drawer, Menu, Dropdown, Row, Col, Icon } from 'antd';

import { IfLoggedIn } from '@gqlapp/user-client-react/containers/Auth.web';

import MenuItem from './MenuItem';
import DropDown from './Dropdown';
import Avatar from './Avatar';
import './styles.css';

//import settings from '../../../../../settings';

export const ref = { modules: null };

export const onAppCreate = modules => (ref.modules = modules);
class NavBar extends React.Component {
  state = {
    current: '/',
    width: 0,
    height: 0,
    show: false,
    visible: false,
    mounted: false
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  showSettings(event) {
    event.preventDefault();
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight, mounted: true });
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  toggle = function() {
    this.setState(state => {
      return { show: !state.show };
    });
  };
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  menuList = (
    <Menu style={{ border: 'none', fontWeight: 'lighter' }}>
      <Menu.Item>
        <NavLink to="/about-us">About us</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/terms-of-service">Terms of Service</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/privacy-rules">Privacy Rules</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/mission">Mission</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/renting">Renting</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/lending">Lending</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/TrustAndSafety">Trust And Safety</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/faq">FAQ</NavLink>
      </Menu.Item>
    </Menu>
  );
  render() {
    return this.state.width > 800 ? (
      <Row gutter={0}>
        <Col span={14}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.props.location.pathname]}
            mode="horizontal"
            style={{ lineHeight: '60px' }}
          >
            <MenuItem key="/">
              <NavLink to="/" className="nav-link">
                <img src={require('../../logo/Logo2.png')} height="40" width="40" />
              </NavLink>
            </MenuItem>
            {__DEV__ && (
              <MenuItem>
                <DropDown type="deployment-unit">
                  {ref.modules.navItemsTest}
                  <MenuItem>
                    <a href="/graphiql">GraphiQL</a>
                  </MenuItem>
                </DropDown>
              </MenuItem>
            )}

            <IfLoggedIn role="admin">
              <MenuItem>
                <DropDown type="safety-certificate">{ref.modules.navItemsAdmin}</DropDown>
              </MenuItem>
            </IfLoggedIn>
            {ref.modules.navItems}
          </Menu>
        </Col>
        <Col span={10}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.props.location.pathname]}
            mode="horizontal"
            style={{ lineHeight: '60px', float: 'right' }}
          >
            <Menu.Item>
              <Dropdown overlay={this.menuList} placement="bottomCenter">
                <a>
                  About <Icon type="down" />
                </a>
              </Dropdown>
            </Menu.Item>
            {ref.modules.navItemsRight}
            <IfLoggedIn>
              <MenuItem>
                <DropDown content={<Avatar />} noicon>
                  {ref.modules.navItemsUser}
                </DropDown>
              </MenuItem>
            </IfLoggedIn>
          </Menu>
        </Col>
      </Row>
    ) : (
      //Render This if screen width less than 800

      <div id="outer-container">
        <div style={{ float: 'left' }}>
          <NavLink to="/" className="nav-link">
            <img src={require('../../logo/Logo2.png')} height="40" width="40" />
          </NavLink>
        </div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.props.location.pathname]}
          mode="horizontal"
          style={{ lineHeight: '60px', float: 'right' }}
        >
          <Icon
            type="menu"
            onClick={this.showDrawer}
            className="hamburg"
            style={this.state.mounted ? null : { display: 'none !important' }}
          />
          {/*ref.modules.navItemsRight*/}
          <IfLoggedIn>
            <MenuItem>
              <DropDown content={<Avatar />} noicon>
                {ref.modules.navItemsUser}
              </DropDown>
            </MenuItem>
          </IfLoggedIn>
        </Menu>

        <Drawer title="Lenshood" placement="right" closable={true} onClose={this.onClose} visible={this.state.visible}>
          <Menu style={{ border: 'none', background: '#fff', color: '#23b195' }} mode="vertical">
            {ref.modules.navItemsRight}
            <Menu.Item className="about" style={{}}>
              <a className="nav-link" style={{ color: '#23b195', height: '30px' }} onClick={() => this.toggle()}>
                <div>
                  About{' '}
                  {this.state.show ? (
                    <Icon type="caret-up" theme="filled" />
                  ) : (
                    <Icon type="caret-down" theme="filled" />
                  )}
                </div>
              </a>
            </Menu.Item>
            {this.state.show ? this.menuList : null}
            {__DEV__ ? ref.modules.navItemsTest : null}
            {__DEV__ ? (
              <MenuItem>
                <a href="/graphiql">GraphiQL</a>
              </MenuItem>
            ) : null}
            <IfLoggedIn role="admin">
              <Menu style={{ border: 'none', background: '#fff', color: '#23b195' }}>{ref.modules.navItemsAdmin}</Menu>
            </IfLoggedIn>
          </Menu>
        </Drawer>
      </div>
    );
  }
}

NavBar.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(NavBar);
