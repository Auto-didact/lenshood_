import React from "react";
import Helmet from "react-helmet";
import { PageLayout } from "@gqlapp/look-client-react";
// import { TranslateFunction } from "@gqlapp/i18n-client-react";
import settings from "../../../../settings";
import { Link } from "react-router-dom";
import { Row, Col, Button, Card, Icon } from "antd";
import CheckoutSteps from "./CheckoutSteps";
import CartItem from "./CartItem";
import { TotalAmount, TotalRent, Refund } from "../helper/index";

const renderMetaData = () => (
  <Helmet
    title={`${settings.app.name} - Cart`}
    meta={[
      { name: "description", content: `${settings.app.name} - ${"meta"}` }
    ]}
  />
);

export default class CheckoutCartView extends React.Component {
  render() {
    let state = this.props.state;
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="checkoutDiv">
          <Row>
            <Col lg={{ span: 22, offset: 2 }} xs={{ span: 24, offset: 0 }}>
              <CheckoutSteps step={0} />
            </Col>
            <Col lg={{ span: 23, offset: 1 }} xs={{ span: 24, offset: 0 }}>
              <Col span={24} className="font14">
                <div>
                  <strong>My cart - </strong>
                  {state.products.length} items
                </div>
                <div>
                  Total rent:{" "}
                  <strong>&#8377; {TotalRent(state.products)} </strong>
                </div>
              </Col>
              <br />
              <br />
              <Row>
                <Col
                  lg={{ span: 14, offset: 0 }}
                  xs={{ span: 24, offset: 0 }}
                  className="margin20"
                >
                  {state.products.map(cartItem => (
                    <CartItem
                      key={cartItem.id}
                      products={cartItem}
                      modal1Visible={state.modal1Visible}
                      deleteProduct={this.props.deleteProduct}
                      editProduct={this.props.editProduct}
                      setModal1Visible={this.props.setModal1Visible}
                    />
                  ))}
                </Col>
                <Col
                  lg={{ span: 7, offset: 1 }}
                  sm={{ span: 24, offset: 0 }}
                  xs={{ span: 24, offset: 0 }}
                >
                  <Card className="margin20 boxShadowTheme borderRadius9">
                    <Button
                      type="primary"
                      ghost
                      onClick={() => this.props.Addproducts()}
                      block
                    >
                      Add more products
                    </Button>
                    <Button type="primary" className="margin20" block>
                      Checkout
                    </Button>
                    <h2 className="cartSum">Cart Summary</h2>
                    <div className="font12">
                      {state.products.map((item, key) => (
                        <div key={key}>
                          <strong>Item {key + 1}:</strong>
                          <p>
                            Rent per day{" "}
                            <div className="rightfloat">
                              &#8377; {item.rent}
                            </div>
                            <br />
                            &#8377; {item.rent}/- <Icon type="close" />{" "}
                            {item.days} days
                            <div className="rightfloat">
                              &#8377; {item.rent * item.days}
                            </div>
                          </p>
                        </div>
                      ))}

                      {/* <p>
                      25% Multi day discount{" "}
                      <div className="colorFloat">
                        -&#8377;
                        {0.25 * TotalRent(state.products)}
                      </div>
                    </p> */}

                      <p>
                        Delivery fee (Drop and Pick Up){" "}
                        <div className="rightfloat">
                          &#8377; {state.deliveryfee}
                        </div>
                      </p>
                      <hr />
                      <p>
                        GST ({state.gst}%)
                        <div className="rightfloat">
                          &#8377;{" "}
                          {(state.gst * TotalAmount(state.products, 0, 0)) /
                            100}
                        </div>
                      </p>
                      <h3>
                        Total rent amount{" "}
                        <strong className="colorFloat">
                          &#8377;
                          {TotalAmount(
                            state.products,
                            state.gst,
                            state.deliveryfee
                          )}
                        </strong>
                      </h3>
                      {/* <p>
                      Refundable deposit{" "}
                      <div className="rightfloat">
                        &#8377; {Refund(state.products)}
                      </div>
                    </p> */}
                    </div>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </PageLayout>
    );
  }
}
