import React from 'react';
import { Icon } from 'antd';

export default class VerificationIcon extends React.Component {
  render() {
    if (this.props.vStatus == false) {
      return <Icon type="close-circle" theme="twoTone" twoToneColor="#ff0000" />;
    } else {
      return <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />;
    }
  }
}
