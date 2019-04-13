import React from 'react';
import PropTypes from 'prop-types';
import { Alert as ADAlert } from 'antd';

const Alert = ({ children, color, ...props }) => {
  // return <ADAlert message={children} type={color} {...props} />;
  return <div>Hi this is RenderDragger!</div>;
};

Alert.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string
};

export default Alert;
