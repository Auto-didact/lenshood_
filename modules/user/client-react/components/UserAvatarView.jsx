import React, { Component } from "react";
import { Avatar } from "antd";
import { ImgUser } from "../constants/DefaultImages";

export default class UserAvatarView extends Component {
  render() {
    return (
      <Avatar
        src={
          this.props.currentUser.profile &&
          this.props.currentUser.profile.avatar
            ? this.props.currentUser.profile.avatar
            : ImgUser
        }
      />
    );
  }
}
