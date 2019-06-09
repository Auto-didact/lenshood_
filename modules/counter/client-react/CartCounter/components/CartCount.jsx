import React from "react";
import { Avatar, Badge, Icon } from "antd";

export default class CartCount extends React.Component {
  render() {
    return (
      <div>
        <Badge count={this.props.count}>
          <Avatar size="large" icon="shopping-cart" className="themeColor" />
        </Badge>
      </div>
    );
  }
}
