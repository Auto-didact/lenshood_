import React from 'react';
import PropTypes from 'prop-types';
import { Select as SelectADO } from 'antd';

const Select = ({ children, ...props }) => {
  return <SelectADO {...props}>{children}</SelectADO>;
};

Select.propTypes = {
  children: PropTypes.node
};

export default Select;
