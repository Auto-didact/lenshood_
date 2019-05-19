import React from 'react';
import PropTypes from 'prop-types';

// Abstract Out Select & Form To Do
import { Form, DatePicker } from 'antd';

const FormItem = Form.Item;
const dateFormat = 'DD/MM/YYYY';

const RenderDatePicker = ({ input, label, children, meta: { touched, error } }) => {
  let validateStatus = '';
  if (error) {
    validateStatus = 'error';
  }
  return (
    <FormItem label={label} validateStatus={validateStatus} help={error}>
      <DatePicker {...input} format={dateFormat} />
    </FormItem>
  );
};

RenderDatePicker.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  children: PropTypes.node
};

export default RenderDatePicker;
