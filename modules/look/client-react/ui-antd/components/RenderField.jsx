import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const RenderField = ({ input, label, type, meta: { touched, error }, placeholder }) => {
  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }
  return (
    <FormItem label={label} validateStatus={validateStatus} help={touched && error}>
      <div>
        {type != 'textarea' ? <Input {...input} placeholder={label || placeholder} type={type} /> : null}

        {type == 'textarea' ? <TextArea {...input} placeholder={label || placeholder} /> : null}
      </div>
    </FormItem>
  );
};

RenderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object
};

export default RenderField;
