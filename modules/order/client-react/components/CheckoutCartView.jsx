import React from "react";
import Helmet from "react-helmet";
import { PageLayout } from "@gqlapp/look-client-react";
// import { TranslateFunction } from "@gqlapp/i18n-client-react";
import settings from "../../../../settings";
import { Link } from "react-router-dom";
import { Row, Col, Button, Card, Icon } from "antd";
import CheckoutSteps from "./CheckoutSteps";
// import camera from "../resources/camera.jpeg";
import camera from "../resources/naruto2.jpg";

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
    ]
  };
  count = 1;
  totalRent(cartArray) {
    return cartArray.reduce((acum, item) => {
      acum += item.days * item.rent;
      return acum;
    }, 0);
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

          <p>
            25% Multi day discount{" "}
            <div className="colorFloat">
              -&#8377;
              {0.25 * this.totalRent(this.state.products)}
            </div>
          </p>

          <p>
            Service fee <div className="rightfloat">&#8377; 100</div>
          </p>
          <hr />
          <h3>
            Total rent amount{" "}
            <strong className="colorFloat">
              &#8377;
              {this.totalAmount(this.state.products)}
            </strong>
          </h3>
          <p>
            Refundable deposit{" "}
            <div className="rightfloat">
              &#8377; {this.Refund(this.state.products)}
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
  Refund(cartArray) {
    return cartArray.reduce((acum, item) => {
      acum += item.refund;
      return acum;
    }, 0);
  }
  totalAmount(cart) {
    let total = this.totalRent(cart);
    total -= 0.25 * total;
    total += 100;
    return total;
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
        alert(this.state.products[i].id);
        index = i;
        break;
      }
    }
    this.setState({
      products: [...this.state.products.slice(0, index), ...this.state.products.slice(index + 1)]
    });
  }

  editProduct = event => {
    // CODE FOR EDITTING THE POST WILL GO HERE
    console.log("Edit Product Details!!");
  };
  render() {
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="checkoutDiv">
          <Row>
            <CheckoutSteps step={0} />
            <Col span={12} className="font14">
              <div>
                <strong>My cart - </strong>
                {this.state.products.length} items
              </div>
              <div>
                Total rent:{" "}
                <strong>&#8377; {this.totalRent(this.state.products)} </strong>
              </div>
            </Col>
            <Col span={12}>
              <p onClick={() => this.Addproducts()} className="AddMoreproducts">
                Add more products
              </p>
            </Col>
            <Col md={13} sm={{ span: 22, offset: 1 }} className="margin20">
              {this.renderCart()}
              {/* <CartItem products={this.state.products} /> */}
            </Col>
            <Col
              lg={7}
              md={8}
              sm={{ span: 18, offset: 3 }}
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
        <Col span={8}>
          <img alt="" src={this.props.products.image} />
        </Col>
        <Col span={16} className="ColPad">
          <Row className="font12">
            <Col span={16}>
              <h3 className="productname">{this.props.products.name}</h3>
            </Col>
            <Col lg={10} sm={12} xs={13} className="font11h">
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
            <Col lg={10} sm={12} xs={11} className="font11h">
              Rent <br />
              <strong>&#8377; {this.props.products.rent}</strong>
              <br />
              <br />
              Days: <br />
              <strong>{this.props.products.days}</strong>
            </Col>
          </Row>
        </Col>
        <div className="listcloseicons">
          <Button
            onClick={() => this.props.editProduct()}
            className="borderzero"
          >
            <Icon type="edit" />
          </Button>
          <Button
            className="borderzero"
            onClick={() => this.props.deleteProduct()}
          >
            <Icon type="close" />
          </Button>
        </div>
      </Row>
    );
  }
}
