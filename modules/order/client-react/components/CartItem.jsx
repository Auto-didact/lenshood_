import React, { useState } from "react";
import { Row, Col, Button, Icon, DatePicker, Modal } from "antd";
import PropTypes from "prop-types";
import moment from "moment";
import {
  RenderDateRangePicker,
  Button as FormButton,
  Form
} from "@gqlapp/look-client-react";
import { FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { withFormik } from "formik";
import { required, validate } from "@gqlapp/validation-common-react";
// const { RangePicker } = DatePicker;

const DateChangeSchema = {
  dateRange: [required]
};

const CartItem = props => {
  const { handleSubmit, submitting, errors } = props;
  let product = props.products;
  const [dates, setDateRange] = useState([
    moment(product.date.start, "DD-MM-YY"),
    moment(product.date.end, "DD-MM-YY")
  ]);
  return (
    <Row className="cartitem borderRadius9">
      <div className="listcloseicons">
        <Button
          onClick={() => props.setModal1Visible()}
          className="borderzero listclose"
        >
          <Icon type="edit" />
        </Button>

        <Modal
          title="Edit Product"
          centered
          visible={props.modal1Visible}
          footer={null}
          // onOk={() => props.editProduct(product.id, dateRange[0], dateRange[1])}
          onCancel={() => props.setModal1Visible()}
        >
          <Form name="CartItem" onSubmit={handleSubmit}>
            <h3>
              <strong>{product.name}</strong>
            </h3>
            <h4>Change Dates:</h4>
            <Field
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
        </Modal>

        <Button
          className="borderzero listclose"
          onClick={() => props.deleteProduct(product.id)}
        >
          <Icon type="close" />
        </Button>
      </div>
      <Col sm={8} xs={24}>
        <img alt="" src={product.image} />
      </Col>
      <Col sm={16} xs={24} className="ColPad">
        <Row className="font12">
          <Col md={16} sm={24}>
            <h3 className="productname">{product.name}</h3>
          </Col>
          <br />
          {/* <Col lg={12} sm={12} xs={14} className="font11h"> */}
          {/* Refundundable deposit
              <br />
              <strong className="colorCursor">&#8377; {product.refund}</strong>
              <br />
              <br /> */}
          {/* Rental period <br />
              <strong>
                {product.date.start} - {product.date.end}
              </strong>
            </Col> */}
          <Col lg={16} sm={24}>
            <Col span={12} className="font11h">
              Rent <br />
              <strong>&#8377; {product.rent}</strong>
            </Col>
            <Col span={12} className="font11h">
              {/* <br />
              <br /> */}
              Days: <br />
              <strong>{product.days}</strong>
            </Col>
          </Col>
          <Col md={16} sm={24} className="marginT20">
            <p className="font11h">
              Rental period <br />
              <strong>
                {product.date.start} - {product.date.end}
              </strong>
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

CartItem.propTypes = {
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
    console.log(props.products.id);
    props.editProduct(
      props.products.id,
      moment(dateRange[0], "DD-MM-YY"),
      moment(dateRange[1], "DD-MM-YY")
    );
  },
  enableReinitialize: true,
  displayName: "DatesChangeForm" // helps with React DevTools
});

export default CartItemWithFormik(CartItem);
