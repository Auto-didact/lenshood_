import React, { useState } from "react";
import { Row, Col, Button, Icon, DatePicker, Modal } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const CartItem = props => {
  let product = props.products;
  const [dateRange, setDateRange] = useState([
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
          onOk={() => props.editProduct(product.id, dateRange[0], dateRange[1])}
          onCancel={() => props.setModal1Visible()}
        >
          <h3>
            <strong>{product.name}</strong>
          </h3>
          <h4>Change Dates:</h4>
          <RangePicker
            value={dateRange}
            format="DD-MM-YY"
            size="small"
            onChange={v => setDateRange(v)}
          />
          <br />
          <br />
          <h4>No of days : {dateRange[1].diff(dateRange[0], "days") + 1}</h4>
        </Modal>
        <Button
          className="borderzero listclose"
          onClick={() => props.deleteProduct()}
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

export default CartItem;
