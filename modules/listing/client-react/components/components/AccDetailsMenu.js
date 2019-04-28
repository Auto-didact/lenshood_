import React, { Component } from 'react';
// import '../resources/listingCatalogue.css';
import { Layout, Menu, Icon } from 'antd';
import '../resources/listingCatalogue.css';

const { Item } = Menu;
const { Sider } = Layout;

class AccDetailsMenu extends Component {
  render() {
    return (
      <div className="SliderDiv">
        <Sider width={550} className="SliderStart">
          <h4 className="Pad20">
            <strong>Account Details</strong>
          </h4>
          <Menu
            mode="inline"
            defaultSelectedKeys={[`${this.props.select}`]}
            defaultOpenKeys={['sub1']}
            className="AccountDetails"
          >
            <Item className="AccDetItem" key="1">
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
            </Item>
          </Menu>
        </Sider>
      </div>
    );
  }
}

export default AccDetailsMenu;
