import React from "react";
import Helmet from "react-helmet";
import { PageLayout } from "@gqlapp/look-client-react";
// import { TranslateFunction } from "@gqlapp/i18n-client-react";
import settings from "../../../../settings";
import { Link } from "react-router-dom";
import { Row, Col, Button, Card, Icon, DatePicker } from "antd";
import CheckoutSteps from "./CheckoutSteps";
import camera from "../resources/camera.jpg";
import { TotalAmount, TotalRent, Refund } from "../helper/index";

const { RangePicker } = DatePicker;

const renderMetaData = () => (
  <Helmet
    title={`${settings.app.name} - Cart`}
    meta={[
      { name: "description", content: `${settings.app.name} - ${"meta"}` }
    ]}
  />
);

export default class CheckoutCartView extends React.Component {
  state = {
    cart: {
      name: "Just a random name to fill the space",
      image: camera,
      days: 4,
      date: {
        start: "04 Jan'19",
        end: "07 Jan'19"
      },
      refund: 3000,
      rent: 200
    },
    products: [
      {
        name: "Just a random name to fill the space",
        image: camera,
        id: 1,
        days: 4,
        date: {
          start: "04 Jan'19",
          end: "07 Jan'19"
        },
        refund: 3000,
        rent: 200
      }
    ],
    servicefee: 100
  };
  count = 1;

  cartTotal() {
    return (
      <Card className="margin20">
        <h2 className="cartSum">Cart Summary</h2>
        <div className="font12">
          {this.state.products.map((item, key) => (
            <div>
              <strong>Item {key + 1}:</strong>
              <p>
                Rent per day{" "}
                <div className="rightfloat">&#8377; {item.rent}</div>
                <br />
                &#8377; {item.rent}/- <Icon type="close" /> {item.days} days
                <div className="rightfloat">
                  &#8377; {item.rent * item.days}
                </div>
              </p>
            </div>
          ))}

          <p>
            25% Multi day discount{" "}
            <div className="colorFloat">
              -&#8377;
              {0.25 * TotalRent(this.state.products)}
            </div>
          </p>

          <p>
            Service fee{" "}
            <div className="rightfloat">&#8377; {this.state.servicefee}</div>
          </p>
          <hr />
          <h3>
            Total rent amount{" "}
            <strong className="colorFloat">
              &#8377;
              {TotalAmount(this.state.products)}
            </strong>
          </h3>
          <p>
            Refundable deposit{" "}
            <div className="rightfloat">
              &#8377; {Refund(this.state.products)}
            </div>
          </p>
        </div>
        <br />
        <Button className="themeColor" block>
          Checkout
        </Button>
      </Card>
    );
  }

  renderCart() {
    return this.state.products.map(cartItem => {
      return (
        <CartItem
          key={cartItem.id}
          products={cartItem}
          deleteProduct={this.deleteProduct.bind(this, cartItem.id)}
          editProduct={this.editProduct.bind(this, cartItem.id)}
        />
      );
    });
  }

  Addproducts() {
    this.count = this.count + 1;
    this.setState({
      products: [
        ...this.state.products,
        {
          id: this.count,
          name: this.state.cart.name,
          image: this.state.cart.image,
          days: this.state.cart.days,
          date: this.state.cart.date,
          refund: this.state.cart.refund,
          rent: this.state.cart.rent
        }
      ]
    });
  }

  deleteProduct(id) {
    // CODE FOR Deleting THE POST WILL GO HERE
    var i, index;
    for (i = 0; i < this.state.products.length; i++) {
      if (this.state.products[i].id == id) {
        index = i;
        break;
      }
    }
    this.setState({
      products: [
        ...this.state.products.slice(0, index),
        ...this.state.products.slice(index + 1)
      ]
    });
  }

  editProduct = id => {
    // CODE FOR EDITTING THE POST WILL GO HERE
    console.log("Edit Product Details!!");
    var i, index;
    for (i = 0; i < this.state.products.length; i++) {
      if (this.state.products[i].id == id) {
        index = i;
        break;
      }
    }
    // this.setState({
    //   products[index].date.start:
    //   ]
    // });
  };

  render() {
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="checkoutDiv">
          <Row>
            <CheckoutSteps step={0} />
            <Col span={24}>
              {" "}
              <Col span={12} className="font14">
                <div>
                  <strong>My cart - </strong>
                  {this.state.products.length} items
                </div>
                <div>
                  Total rent:{" "}
                  <strong>
                    &#8377; {TotalRent( this.state.products)}{" "}
                  </strong>
                </div>
              </Col>
              <Col span={12}>
                <p
                  onClick={() => this.Addproducts()}
                  className="AddMoreproducts"
                >
                  Add more products
                </p>
              </Col>
            </Col>
            <br />
            <br />
            <Col
              xl={11}
              lg={{ span: 13, offset: 1 }}
              sm={{ span: 20, offset: 1 }}
              xs={{ span: 22, offset: 1 }}
              className="margin20"
            >
              {this.renderCart()}
            </Col>
            <Col
              lg={7}
              md={{ span: 20, offset: 0 }}
              sm={{ span: 20, offset: 0 }}
              xs={{ span: 22, offset: 1 }}
            >
              {this.cartTotal()}
            </Col>
          </Row>
        </div>
      </PageLayout>
    );
  }
}

class CartItem extends React.Component {
  render() {
    return (
      <Row className="cartitem borderRadius9">
        <div className="listcloseicons">
          <Button
            onClick={() => this.props.editProduct()}
            className="borderzero listclose"
          >
            <Icon type="edit" />
          </Button>
          <Button
            className="borderzero listclose"
            onClick={() => this.props.deleteProduct()}
          >
            <Icon type="close" />
          </Button>
        </div>
        <Col sm={8} xs={24}>
          <img alt="" src={this.props.products.image} />
        </Col>
        <Col sm={16} xs={24} className="ColPad">
          <Row className="font12">
            <Col md={16} sm={24}>
              <h3 className="productname">{this.props.products.name}</h3>
            </Col>
            <Col lg={12} sm={12} xs={14} className="font11h">
              Refundundable deposit
              <br />
              <strong className="colorCursor">
                &#8377; {this.props.products.refund}
              </strong>
              <br />
              <br />
              Rental period <br />
              <strong>
                {this.props.products.date.start} -{" "}
                {this.props.products.date.end}
              </strong>
            </Col>
            <Col lg={10} sm={12} xs={10} className="font11h">
              Rent <br />
              <strong>&#8377; {this.props.products.rent}</strong>
              <br />
              <br />
              Days: <br />
              <strong>{this.props.products.days}</strong>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
