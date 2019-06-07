import React from 'react';
// import PropTypes from 'prop-types';
import { Avatar as AvaTar } from 'antd';

class Avatar extends React.Component {
  // static propTypes = {
  //   content
  // };

  render() {
    // const { children, ...props } = this.props;

    return <AvaTar size="large" icon="user" />;
  }
}

export default Avatar;
