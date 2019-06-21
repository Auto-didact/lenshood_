import React from "react";
import PropTypes from "prop-types";

// Abstract Out Select & Form To Do
import { Form, DatePicker } from "antd";

const FormItem = Form.Item;
const dateFormat = "DD-MM-YY";
const { RangePicker } = DatePicker;

const RenderDateRangePicker = ({
  input,
  label,
  disabledDate,
  meta: { touched, error }
}) => {
  let validateStatus = "";
  if (error) {
    validateStatus = "error";
  }
  return (
    <FormItem label={label} validateStatus={validateStatus} help={error}>
      <RangePicker
        {...input}
        size="small"
        disabledDate={disabledDate}
        format={dateFormat}
      />
    </FormItem>
  );
};

RenderDateRangePicker.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  children: PropTypes.node
};

export default RenderDateRangePicker;
