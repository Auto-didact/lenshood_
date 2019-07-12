import React, { Component } from "react";
import { Avatar } from "antd";

export default class UserAvatarView extends Component {
  render() {
    if (this.props.currentUser.profile && this.props.currentUser.profile.avatar)
      return <Avatar src={this.props.currentUser.profile.avatar} />;
    else return <Avatar icon="user" />;
  }
}
