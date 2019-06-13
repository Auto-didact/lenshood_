import React, { useState } from "react";
import { Modal } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import {
  RenderDateRangePicker,
  Button as FormButton,
  Form
} from "@gqlapp/look-client-react";
import { FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { withFormik } from "formik";
import { required, validate } from "@gqlapp/validation-common-react";

const DateChangeSchema = {
  dateRange: [required]
};

const DateRangeCard = props => {
  const currentBooking = props.currentBooking;
  const { handleSubmit, submitting, errors } = props;
  const [dates, setDateRange] = useState([
    moment(currentBooking.start),
    moment(currentBooking.end)
  ]);
  return (
    <Modal
      title="Edit Product"
      centered
      visible={props.modal1Visible}
      footer={null}
      onCancel={() => props.setModal1Visible()}
    >
      <Form name="DateRangeCard" onSubmit={handleSubmit}>
        <h4>Book Dates:</h4>
        <Field
          disabledDate={props.disabledDate}
          name="dateRange"
          component={RenderDateRangePicker}
          value={dates}
          onChange={v => setDateRange(v)}
        />
        <div className="text-center">
          {errors && errors.errorMsg && (
            <Alert color="error">{errors.errorMsg}</Alert>
          )}
        </div>
        <FormButton color="primary" type="submit" disabled={submitting}>
          Submit
        </FormButton>
      </Form>
    </Modal>
  );
};

DateRangeCard.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  errors: PropTypes.object
};

const DateRangeCardWithFormik = withFormik({
  mapPropsToValues: props => ({
    dateRange: [
      moment(props.currentBooking.start, "DD-MM-YY"),
      moment(props.currentBooking.end, "DD-MM-YY")
    ]
  }),
  validate: values => validate(values, DateChangeSchema),
  handleSubmit({ dateRange }, { props }) {
    props.currentBooking.range = [];
    var i;
    [props.currentBooking.start, props.currentBooking.end] = [
      dateRange[0],
      dateRange[1]
    ];
    for (
      i = dateRange[0];
      moment(i, "DD-MM-YY") <= moment(dateRange[1], "DD-MM-YY");
      i = moment(i, "DD-MM-YY")
        .add(1, "d")
        .format("DD-MM-YY")
    ) {
      if (
        !props.items.some(
          row =>
            moment(row).format("DD-MM-YY") ===
            moment(i, "DD-MM-YY").format("DD-MM-YY")
        ) &&
        !props.myBooks.some(
          row =>
            moment(row).format("DD-MM-YY") ===
            moment(i, "DD-MM-YY").format("DD-MM-YY")
        )
      )
        props.currentBooking.range.push(i);
    }
    console.log(props.currentBooking.range)
    props.setModal1Visible();
  },
  enableReinitialize: true,
  displayName: "DatesChangeForm" // helps with React DevTools
});

export default DateRangeCardWithFormik(DateRangeCard);
