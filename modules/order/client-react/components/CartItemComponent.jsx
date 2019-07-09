import React, { useState } from "react";
import { Row, Col, Button, Icon, Card } from "antd";

const CartItemComponent = props => {
  let product = props.products;
  return (
    <Card
      className="cartitem borderRadius9"
      bodyStyle={{
        padding: "0px"
      }}
    >
      <div className="listcloseicons">
        <Button
          onClick={() => props.cartItemSelect(product.id)}
          className="borderzero listclose"
        >
          <Icon type="edit" />
        </Button>
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
          <Col md={16} sm={24}>
            <p className="font11h">
              Rental period <br />
              <strong>
                {product.date.start} - {product.date.end}
              </strong>
            </p>
          </Col>
        </Row>
      </Col>
    </Card>
  );
};

export default CartItemComponent;
