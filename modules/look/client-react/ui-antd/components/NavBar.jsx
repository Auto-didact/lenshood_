import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Row, Col, Input, Icon } from 'antd';
import { IfLoggedIn } from '@gqlapp/user-client-react/containers/Auth.web';

import MenuItem from './MenuItem';
import DropDown from './Dropdown';
import Avatar from './Avatar';

import './styles.css';

const ref = { modules: null };

const Search = Input.Search;

export const onAppCreate = modules => (ref.modules = modules);

class NavBar extends React.Component {
  render() {
    return (
      <Row>
        <Col lg={2} sm={4} className="HeaderLogo">
          <Menu mode="horizontal">
            <MenuItem>
              <NavLink to="/" className="nav-link">
                <Icon className="Fill-4" type="smile" />
              </NavLink>
            </MenuItem>
          </Menu>
        </Col>
        <Col lg={7} sm={16}>
          <div className="HeaderSearch">
            <Search
              className="Rectangle-2"
              placeholder="Search brand, camera, model number,category"
              onSearch={value => console.log(value)}
              size="large"
            />
          </div>
        </Col>
        <Col lg={14} sm={2} className="HeaderRight">
          {__DEV__ && (
            <Menu mode="horizontal">
              <IfLoggedIn role="admin">
                <MenuItem>
                  <DropDown className="Fill-4" type="safety-certificate">
                    {ref.modules.navItemsAdmin}
                  </DropDown>
                </MenuItem>
              </IfLoggedIn>
              <MenuItem>
                {' '}
                <NavLink to="/faq">FAQ</NavLink>
              </MenuItem>
              <MenuItem>
                {' '}
                <NavLink to="/blog">Blog</NavLink>
              </MenuItem>
              <MenuItem>
                {' '}
                <NavLink to="/posts">List your gear</NavLink>
              </MenuItem>
              <MenuItem>
                {' '}
                <NavLink to="/">Messages</NavLink>
              </MenuItem>
              <MenuItem>
                {' '}
                <NavLink to="/">
                  <Icon className="Fill-4" type="shopping-cart" />
                </NavLink>
              </MenuItem>
              <IfLoggedIn>
                <MenuItem>
                  <DropDown content={<Avatar />} noicon>
                    {ref.modules.navItemsUser}
                  </DropDown>
                </MenuItem>
              </IfLoggedIn>
              {ref.modules.navItemsRight}
            </Menu>
          )}
        </Col>
      </Row>
    );
  }
}

NavBar.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(NavBar);
