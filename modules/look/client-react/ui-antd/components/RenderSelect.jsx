import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';

const FormItem = Form.Item;

const RenderField = ({ input, label, children, meta: { touched, error } }) => {
  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }

  return (
    <FormItem label={label} validateStatus={validateStatus} help={error}>
      <div>
        <Select {...input}>{children}</Select>
      </div>
    </FormItem>
  );
};

RenderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  children: PropTypes.node
};

export default RenderField;
