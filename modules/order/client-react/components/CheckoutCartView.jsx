import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout } from '@gqlapp/look-client-react';
// import { TranslateFunction } from "@gqlapp/i18n-client-react";
import settings from '../../../../settings';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card, Icon, Modal } from 'antd';
import CheckoutStepsComponent from './CheckoutStepsComponent';
import CartItemComponent from './CartItemComponent';
import DateRangeCardComponent from './DateRangeCardComponent';
import { TotalAmount, TotalRent, Refund } from '../helper/index';
import moment from 'moment';

const renderMetaData = () => (
  <Helmet
    title={`${settings.app.name} - Cart`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${'meta'}` }]}
  />
);

export default class CheckoutCartView extends React.Component {
  state = {
    cartItem: null,
    books: []
  };
  cartItemSelect(id) {
    var i;
    let item = this.props.state.products;
    item.some(item => {
      if (item.id === id) {
        this.setState({
          cartItem: item
        });
      }
    });
    this.props.setModal1Visible();
  }

  dateArray() {
    var i;
    this.state.books = [];
    if (this.state.cartItem != null)
      this.state.cartItem.bookings.map(book => {
        for (
          i = book.start;
          moment(i, 'DD-MM-YY') <= moment(book.end, 'DD-MM-YY');
          i = moment(i, 'DD-MM-YY')
            .add(1, 'd')
            .format('DD-MM-YY')
        ) {
          this.state.books.push(i);
        }
      });
  }

  disabledDate(current) {
    if (
      (current && current.valueOf() < Date.now()) ||
      this.state.books.some(row => row === moment(current._d).format('DD-MM-YY'))
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    let state = this.props.state;
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="checkoutDiv">
          <Row>
            <Col lg={{ span: 22, offset: 2 }} xs={{ span: 24, offset: 0 }}>
              <CheckoutStepsComponent step={0} />
            </Col>
            <Col lg={{ span: 23, offset: 1 }} xs={{ span: 24, offset: 0 }}>
              <Col span={24} className="font14">
                <div>
                  <strong>My cart - </strong>
                  {state.products.length} items
                </div>
                <div>
                  Total rent: <strong>&#8377; {TotalRent(state.products)} </strong>
                </div>
              </Col>
              <br />
              <br />
              <Row>
                <Col lg={{ span: 14, offset: 0 }} xs={{ span: 24, offset: 0 }} className="margin20">
                  {state.products.map(cartItem => (
                    <CartItemComponent
                      key={cartItem.id}
                      products={cartItem}
                      deleteProduct={this.props.deleteProduct}
                      cartItemSelect={this.cartItemSelect.bind(this)}
                    />
                  ))}
                </Col>

                <Modal
                  title="Edit Product"
                  centered
                  visible={state.modal1Visible}
                  footer={null}
                  onCancel={() => this.props.setModal1Visible()}
                >
                  {this.dateArray()}
                  {this.state.cartItem != null ? (
                    <DateRangeCardComponent
                      disabledDate={this.disabledDate.bind(this)}
                      products={this.state.cartItem}
                      editProduct={this.props.editProduct}
                      books={this.state.books}
                    />
                  ) : null}
                </Modal>
                <Col lg={{ span: 7, offset: 1 }} sm={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }}>
                  <Card className="margin20 boxShadowTheme borderRadius9">
                    <Button type="primary" ghost onClick={() => this.props.Addproducts()} block>
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
                            Rent per day <div className="rightfloat">&#8377; {item.rent}</div>
                            <br />
                            &#8377; {item.rent}/- <Icon type="close" /> {item.days} days
                            <div className="rightfloat">&#8377; {item.rent * item.days}</div>
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
                        Delivery fee (Drop and Pick Up) <div className="rightfloat">&#8377; {state.deliveryfee}</div>
                      </p>
                      <hr />
                      <p>
                        GST ({state.gst}%)
                        <div className="rightfloat">
                          &#8377; {(state.gst * TotalAmount(state.products, 0, 0)) / 100}
                        </div>
                      </p>
                      <h3>
                        Total rent amount{' '}
                        <strong className="colorFloat">
                          &#8377;
                          {TotalAmount(state.products, state.gst, state.deliveryfee)}
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
