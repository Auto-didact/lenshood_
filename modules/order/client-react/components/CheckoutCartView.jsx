import React from "react";
import Helmet from "react-helmet";
import { PageLayout } from "@gqlapp/look-client-react";
// import { TranslateFunction } from "@gqlapp/i18n-client-react";
import settings from "../../../../settings";
import { Link } from "react-router-dom";
import { Row, Col, Button, Card, Icon } from "antd";
import CheckoutSteps from "./CheckoutSteps";
import CartItem from "./CartItem";
import camera from "../resources/camera.jpg";
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
  state = {
    cart: {
      name: "Nikon Camera",
      image: camera,
      days: 4,
      date: {
        start: "04-01-19",
        end: "07-01-19"
      },
      refund: 3000,
      rent: 200
    },
    products: [
      {
        name: "Nikon Camera",
        image: camera,
        id: 1,
        days: 4,
        date: {
          start: "04-01-19",
          end: "07-01-19"
        },
        refund: 3000,
        rent: 200
      }
    ],
    deliveryfee: 100,
    modal1Visible: false,
    gst: 18
  };
  count = 1;

  setModal1Visible() {
    this.setState({ modal1Visible: !this.state.modal1Visible });
  }

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

          {/* <p>
            25% Multi day discount{" "}
            <div className="colorFloat">
              -&#8377;
              {0.25 * TotalRent(this.state.products)}
            </div>
          </p> */}

          <p>
            Delivery fee (Drop and Pick Up){" "}
            <div className="rightfloat">&#8377; {this.state.deliveryfee}</div>
          </p>
          <hr />
          <p>GST ({this.state.gst}%)</p>
          <h3>
            Total rent amount{" "}
            <strong className="colorFloat">
              &#8377;
              {TotalAmount(this.state.products, this.state.gst, this.state.deliveryfee)}
            </strong>
          </h3>
          {/* <p>
            Refundable deposit{" "}
            <div className="rightfloat">
              &#8377; {Refund(this.state.products)}
            </div>
          </p> */}
        </div>
        <br />
        <Button className="themeColor" block>
          Checkout
        </Button>
        <br />
        <Button
          type="primary"
          className="margin20"
          ghost
          onClick={() => this.Addproducts()}
          block
        >
          Add more products
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
          modal1Visible={this.state.modal1Visible}
          deleteProduct={this.deleteProduct.bind(this, cartItem.id)}
          editProduct={this.editProduct.bind(this)}
          setModal1Visible={this.setModal1Visible.bind(this)}
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

  editProduct(id, startDate, EndDate) {
    // Edit datat goes here
    var i, index;
    for (i = 0; i < this.state.products.length; i++) {
      if (this.state.products[i].id == id) {
        this.state.products[i].date.start = startDate.format("DD-MM-YY");
        this.state.products[i].date.end = EndDate.format("DD-MM-YY");
        this.state.products[i].days = EndDate.diff(startDate, "days") + 1;
        break;
      }
    }
    this.setModal1Visible();
  }

  render() {
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="checkoutDiv">
          <Row>
            <CheckoutSteps step={0} />
            <Col span={24} className="font14">
              <div>
                <strong>My cart - </strong>
                {this.state.products.length} items
              </div>
              <div>
                Total rent:{" "}
                <strong>&#8377; {TotalRent(this.state.products)} </strong>
              </div>
            </Col>
            <br />
            <br />
            <Col
              xl={11}
              lg={{ span: 13, offset: 1 }}
              xs={{ span: 22, offset: 1 }}
              className="margin20"
            >
              {this.renderCart()}
            </Col>
            <Col
              lg={7}
              sm={{ span: 22, offset: 0 }}
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
