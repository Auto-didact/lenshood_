import React, { useState } from "react";
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
  const { handleSubmit, submitting, errors } = props;
  let product = props.products;
  const [dates, setDateRange] = useState([
    moment(product.date.start, "DD-MM-YY"),
    moment(product.date.end, "DD-MM-YY")
  ]);
  return (
    <Form name="CartItem" onSubmit={handleSubmit}>
      <h4>Change Dates:</h4>
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
      <h4>No of days : {dates[1].diff(dates[0], "days") + 1}</h4>
      <FormButton color="primary" type="submit" disabled={submitting}>
        Submit
      </FormButton>
    </Form>
  );
};

DateRangeCard.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  errors: PropTypes.object
};

const CartItemWithFormik = withFormik({
  mapPropsToValues: props => ({
    dateRange: [
      moment(props.products.date.start, "DD-MM-YY"),
      moment(props.products.date.end, "DD-MM-YY")
    ]
  }),
  validate: values => validate(values, DateChangeSchema),
  handleSubmit({ dateRange }, { props }) {
    var i,
      valid = true;
    for (
      i = dateRange[0];
      moment(i, "DD-MM-YY") <= moment(dateRange[1], "DD-MM-YY");
      i = moment(i, "DD-MM-YY")
        .add(1, "d")
        .format("DD-MM-YY")
    ) {
      if (props.books.some(item => item === i)) {
        valid = false;
        break;
      }
    }
    if (valid === true) {
      props.editProduct(
        props.products.id,
        moment(dateRange[0], "DD-MM-YY"),
        moment(dateRange[1], "DD-MM-YY")
      );
    } else alert("The dates should not include the disabled ones!");
  },
  enableReinitialize: true,
  displayName: "DatesChangeForm" // helps with React DevTools
});

export default CartItemWithFormik(DateRangeCard);
