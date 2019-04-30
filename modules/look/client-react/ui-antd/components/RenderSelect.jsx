import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';

const FormItem = Form.Item;

const RenderSelect = ({ input, label, children, meta: { touched, error } }) => {
  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }

  return (
    <FormItem label={label} validateStatus={validateStatus} help={touched && error}>
      <div>
        <Select {...input}>{children}</Select>
      </div>
    </FormItem>
  );
};

RenderSelect.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  children: PropTypes.node
};

export default RenderSelect;
