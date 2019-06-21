import React, { Component } from "react";
import { Avatar } from "antd";

export default class UserAvatarView extends Component {
  render() {
    const img = this.props.currentUser.profile.avatar;
    return <Avatar src={img} />;
  }
}
