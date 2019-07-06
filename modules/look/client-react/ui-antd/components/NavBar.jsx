import React from "react";
import PropTypes from "prop-types";
import { withRouter, NavLink } from "react-router-dom";
import { Drawer, Menu, Dropdown, Row, Col, Icon, Form } from "antd";

import { IfLoggedIn } from "@gqlapp/user-client-react/containers/Auth.web";
import UserAvatar from "@gqlapp/user-client-react/containers/UserAvatar";
import AutoCompleteNavbar from "@gqlapp/listing-client-react/containers/AutoCompleteNavbar";
import MenuItem from "./MenuItem";
import DropDown from "./Dropdown";

import "./styles.css";

//import settings from '../../../../../settings';

export const ref = { modules: null };

export const onAppCreate = modules => (ref.modules = modules);
class NavBar extends React.Component {
  state = {
    current: "/",
    width: 0,
    height: 0,
    show1:
      this.props.location.pathname == "/about-us" ||
      this.props.location.pathname == "/terms-of-service" ||
      this.props.location.pathname == "/privacy-rules" ||
      this.props.location.pathname == "/mission" ||
      this.props.location.pathname == "/renting" ||
      this.props.location.pathname == "/lending" ||
      this.props.location.pathname == "/TrustAndSafety" ||
      this.props.location.pathname == "/faq",

    show2:
      this.props.location.pathname == "/counter" ||
      this.props.location.pathname == "/posts" ||
      this.props.location.pathname == "/upload" ||
      this.props.location.pathname == "/contact" ||
      this.props.location.pathname == "/pagination" ||
      this.props.location.pathname == "/report" ||
      this.props.location.pathname == "/graphql",

    show3:
      this.props.location.pathname == "/listings" ||
      this.props.location.pathname == "/users",
    visible: false,
    mounted: false
  };

  toggle = function(val) {
    /*Function to Toggle State of Dropdowns in Side Drawer*/
    if (val == 1)
      this.setState(state => {
        return { show1: !state.show1 };
      });
    else if (val == 2)
      this.setState(state => {
        return { show2: !state.show2 };
      });
    else if (val == 3)
      if (val == 3)
        this.setState(state => {
          return { show3: !state.show3 };
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
    <Menu
      className="light_font"
      selectedKeys={[this.props.location.pathname]}
      mode="inline"
    >
      <Menu.Item key="/about-us">
        <NavLink to="/about-us">About us</NavLink>
      </Menu.Item>
      <Menu.Item key="/terms-of-service">
        <NavLink to="/terms-of-service">Terms of Service</NavLink>
      </Menu.Item>
      <Menu.Item key="/privacy-rules">
        <NavLink to="/privacy-rules">Privacy Rules</NavLink>
      </Menu.Item>
      <Menu.Item key="/mission">
        <NavLink to="/mission">Mission</NavLink>
      </Menu.Item>
      <Menu.Item key="/renting">
        <NavLink to="/renting">Renting</NavLink>
      </Menu.Item>
      <Menu.Item key="/lending">
        <NavLink to="/lending">Lending</NavLink>
      </Menu.Item>
      <Menu.Item key="/TrustAndSafety">
        <NavLink to="/TrustAndSafety">Trust And Safety</NavLink>
      </Menu.Item>
      <Menu.Item key="/faq">
        <NavLink to="/faq">FAQ</NavLink>
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <div>
        <Row gutter={0} className="screen_width_more_than_800">
          <Form layout="inline">
            <Col span={14}>
              <Col span={8}>
                <Menu
                  onClick={this.handleClick}
                  selectedKeys={[this.props.location.pathname]}
                  mode="horizontal"
                  className="line_height60"
                >
                  <MenuItem key="/">
                    <NavLink to="/" className="nav-link">
                      <img
                        src={require("../../logo/Logo2.png")}
                        height="40"
                        width="40"
                      />
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
                      <DropDown type="safety-certificate">
                        {ref.modules.navItemsAdmin}
                      </DropDown>
                    </MenuItem>
                  </IfLoggedIn>
                  {ref.modules.navItems}
                </Menu>
              </Col>
              <Col span={16}>
                <Menu mode="horizontal" className="line_height60">
                  {/* <MenuItem> */}
                    <AutoCompleteNavbar history={this.props.history} />
                  {/* </MenuItem> */}
                </Menu>
              </Col>
            </Col>
            <Col span={10}>
              <Menu
                onClick={this.handleClick}
                selectedKeys={[this.props.location.pathname]}
                mode="horizontal"
                className="right line_height60"
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
                    <DropDown content={<UserAvatar />} noicon>
                      {ref.modules.navItemsUser}
                    </DropDown>
                  </MenuItem>
                </IfLoggedIn>
              </Menu>
            </Col>
          </Form>
        </Row>

        {/*Render This if screen width less than 800*/}

        <Row id="outer-container" className="screen_width_less_than_800">
          {/* <Form layout="inline"> */}
          <div className="left">
            <NavLink to="/" className="nav-link">
              <img
                src={require("../../logo/Logo2.png")}
                height="40"
                width="40"
              />
            </NavLink>
          </div>
          <AutoCompleteNavbar history={this.props.history} />
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.props.location.pathname]}
            mode="horizontal"
            className="right line_height60"
          >
            <Icon type="menu" onClick={this.showDrawer} className="hamburg" />
            {/*ref.modules.navItemsRight*/}
          </Menu>
          <Drawer
            title="Lenshood"
            placement="right"
            closable={true}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <Menu mode="inline" selectedKeys={[this.props.location.pathname]}>
              <IfLoggedIn>
                <MenuItem className="forUser">
                  <UserAvatar className="avatar" />

                  <Menu mode="inline" className="userItems">
                    {ref.modules.navItemsUser}
                  </Menu>
                </MenuItem>
              </IfLoggedIn>
              {ref.modules.navItemsRight}
              <Menu.Item className="about" key="about">
                <a className="nav-link-drop" onClick={() => this.toggle(1)}>
                  <div>
                    About{" "}
                    {this.state.show1 ? (
                      <Icon type="caret-up" theme="filled" />
                    ) : (
                      <Icon type="caret-down" theme="filled" />
                    )}
                  </div>
                </a>
              </Menu.Item>
              {this.state.show1 ? this.menuList : null}

              {__DEV__ ? (
                <Menu className="light_font" mode="inline">
                  <Menu.Item className="about bold_font" key="dev">
                    <a className="nav-link-drop" onClick={() => this.toggle(2)}>
                      <div>
                        Dev{" "}
                        {this.state.show2 ? (
                          <Icon type="caret-up" theme="filled" />
                        ) : (
                          <Icon type="caret-down" theme="filled" />
                        )}
                      </div>
                    </a>
                  </Menu.Item>

                  {this.state.show2 ? ref.modules.navItemsTest : null}
                  {this.state.show2 ? (
                    <MenuItem key="garphql">
                      <a href="/graphiql">GraphiQL</a>
                    </MenuItem>
                  ) : null}
                </Menu>
              ) : null}

              <IfLoggedIn role="admin">
                <Menu
                  className="light_font"
                  selectedKeys={[this.props.location.pathname]}
                  mode="inline"
                >
                  <Menu.Item className="about bold_font" key="admin">
                    <a className="nav-link-drop" onClick={() => this.toggle(3)}>
                      <div>
                        Admin{" "}
                        {this.state.show3 ? (
                          <Icon type="caret-up" theme="filled" />
                        ) : (
                          <Icon type="caret-down" theme="filled" />
                        )}
                      </div>
                    </a>
                  </Menu.Item>
                  {this.state.show3 ? ref.modules.navItemsAdmin : null}
                </Menu>
              </IfLoggedIn>
            </Menu>
          </Drawer>
          {/* </Form> */}
        </Row>
      </div>
    );
  }
}

NavBar.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(NavBar);
