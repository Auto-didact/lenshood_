import React from "react";
import Helmet from "react-helmet";
import { PageLayout } from "@gqlapp/look-client-react";
// import { TranslateFunction } from "@gqlapp/i18n-client-react";
import settings from "../../../../settings";
import { Link } from "react-router-dom";
import { Row, Col, Button, Card, Icon } from "antd";
import CheckoutSteps from "./CheckoutSteps";
import naruto2 from "../resources/naruto2.jpg";

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
    products: {
      name: "Just a random name to fill the space",
      image: naruto2,
      days: 4,
      date: {
        start: "04 Jan'19",
        end: "07 Jan'19"
      },
      refund: 3000,
      rent: 200
    }
  };

  cartTotal() {
    return (
      <Card className="margin20">
        <h2 className="cartSum">Cart Summary</h2>
        <div className="font12">
          <p>
            Rent per day{" "}
            <div className="rightfloat">&#8377; {this.state.products.rent}</div>
          </p>
          <p>
            Service fee <div className="rightfloat">&#8377; 100</div>
          </p>
          <p>
            &#8377; {this.state.products.rent}/- <Icon type="close" />{" "}
            {this.state.products.days}days{" "}
            <div className="rightfloat">
              &#8377; {this.state.products.rent * this.state.products.days}
            </div>
          </p>
          <p>
            25% Multi day discount{" "}
            <div className="colorFloat">
              -&#8377;
              {0.25 * this.state.products.rent * this.state.products.days}
            </div>
          </p>
          <br />
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
              &#8377; {this.state.products.refund}
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
  totalAmount(cart) {
    let total = cart.rent * cart.days;
    total -= 0.25 * total;
    total += 100;
    return total;
  }
  render() {
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="checkoutDiv">
          <Row>
            <CheckoutSteps step={0} />
            <Col span={12} className="font14">
              <div>
                <strong>My cart - </strong>1 items
              </div>
              <div>
                Total rent: <strong>&#8377; {this.state.products.rent} </strong>
              </div>
            </Col>
            <Col span={12}>
              <Link to="" className="AddMoreproducts">
                Add more products
              </Link>
            </Col>
            <Col md={13} sm={{ span: 22, offset: 1 }} className="margin20">
              <CartItem products={this.state.products} />
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
      <Row className="cartitem">
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
          <Button className="borderzero">
            <Icon type="edit" />
          </Button>
          <Button className="borderzero">
            <Icon type="close" />
          </Button>
        </div>
      </Row>
    );
  }
}
