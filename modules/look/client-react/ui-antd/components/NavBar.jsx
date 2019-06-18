import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Row, Col, Icon } from 'antd';

import { IfLoggedIn } from '@gqlapp/user-client-react/containers/Auth.web';
import { slide as Burger } from 'react-burger-menu';

import MenuItem from './MenuItem';
import DropDown from './Dropdown';
import Avatar from './Avatar';

//import settings from '../../../../../settings';

export const ref = { modules: null };

export const onAppCreate = modules => (ref.modules = modules);
class NavBar extends React.Component {
  state = {
    current: '/',
    width: 0,
    height: 0,
    show: false
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
    this.setState({ width: window.innerWidth, height: window.innerHeight });
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

  //Styling For Burger Menu
  styling = {
    bmBurgerButton: {
      position: 'absolute',
      width: '30px',
      height: '24px',
      right: '20px',
      top: '20px'
    },
    bmBurgerBars: {
      background: '#ffffff'
    },
    bmCrossButton: {
      position: 'fixed',
      height: '30px',
      width: '30px',
      right: '20px'
    },
    bmCross: {
      background: '#ffffff'
    },
    bmMenu: {
      background: '#23b195',
      padding: '0 0 0 0',
      fontSize: '1.35em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#91d8ca',
      padding: '4px'
    },
    bmItem: {
      display: 'inline-block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0)'
    }
  };

  menuList = (
    <Menu style={{ border: 'none' }}>
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
          {/*ref.modules.navItemsRight*/}
          <IfLoggedIn>
            <MenuItem>
              <DropDown content={<Avatar />} noicon>
                {ref.modules.navItemsUser}
              </DropDown>
            </MenuItem>
          </IfLoggedIn>
        </Menu>

        <Burger right width={250} styles={this.styling}>
          <div
            style={{
              width: '246px',
              backgroundColor: '#23b195',
              marginTop: '60px',
              marginBottom: '-25px',
              borderTop: '2px solid #91d8ca',
              borderBottom: '2px solid #91d8ca',
              outline: 'none'
            }}
          >
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.props.location.pathname]}
              mode="horizontal"
              style={{ lineHeight: '60px', float: 'left', width: '246px', fontWeight: 'bold' }}
            >
              {ref.modules.navItemsRight}
            </Menu>
          </div>
          <div
            style={{
              width: '246px',
              backgroundColor: '#23b195',
              marginTop: '2px',
              fontWeight: 'bold',
              borderBottom: '2px solid #91d8ca'
            }}
          >
            <a className="nav-link" style={{ color: '#ffffff', height: '30px' }} onClick={() => this.toggle()}>
              <div style={{ width: '236px', marginLeft: '10px', paddingLeft: '6px' }}>
                About{' '}
                {this.state.show ? <Icon type="caret-up" theme="filled" /> : <Icon type="caret-down" theme="filled" />}
              </div>
            </a>
          </div>

          {this.state.show ? this.menuList : null}
          {this.state.show ? (
            <div style={{ borderBottom: '2px solid #91d8ca', display: 'block', marginTop: '-15px' }} />
          ) : null}

          {ref.modules.navItemsTest.map(item => {
            return (
              <div
                style={{
                  width: '246px',
                  backgroundColor: '#23b195',
                  marginTop: '2px',
                  fontWeight: 'bold',
                  borderBottom: '2px solid #91d8ca'
                }}
              >
                <NavLink to={item.key} className="nav-link" style={{ color: '#ffffff', height: '30px' }}>
                  <div style={{ width: '236px', marginLeft: '10px', paddingLeft: '6px' }}>
                    {' '}
                    {item.key.charAt(1).toUpperCase() + item.key.substring(2)}
                  </div>
                </NavLink>
              </div>
            );
          })}
          <div
            style={{
              width: '246px',
              backgroundColor: '#23b195',
              marginTop: '2px',
              fontWeight: 'bold',
              borderBottom: '2px solid #91d8ca'
            }}
          >
            <a href="/graphiql" className="nav-link" style={{ color: '#ffffff', height: '30px' }}>
              <div style={{ width: '236px', marginLeft: '10px', paddingLeft: '6px' }}>GraphiQL</div>
            </a>
          </div>

          {ref.modules.navItemsAdmin.map(item => {
            let k = item ? (item.key.charAt(0) == '/' ? item.key : item.props.children.key) : null;
            return (
              <div
                style={{
                  width: '246px',
                  backgroundColor: '#23b195',
                  marginTop: '2px',
                  fontWeight: 'bold',
                  borderBottom: '2px solid #91d8ca'
                }}
              >
                <NavLink to={k} className="nav-link" style={{ color: '#ffffff', height: '30px' }}>
                  <div style={{ width: '236px', marginLeft: '10px', paddingLeft: '6px' }}>
                    {k.charAt(1).toUpperCase() + k.substring(2)}
                  </div>
                </NavLink>
              </div>
            );
          })}
        </Burger>
      </div>
    );
  }
}

NavBar.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(NavBar);
