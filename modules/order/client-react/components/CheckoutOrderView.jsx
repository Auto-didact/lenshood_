import React from "react";
import Helmet from "react-helmet";
import { PageLayout } from "@gqlapp/look-client-react";
// import { TranslateFunction } from "@gqlapp/i18n-client-react";
import settings from "../../../../settings";
import { Row, Col } from "antd";
import CheckoutSteps from "./CheckoutSteps";
import OrderCard from "./OrderCard";
import OrderTrackCard from "./OrderTrackCard";
import naruto2 from "../resources/naruto2.jpg";

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - Order`}
    meta={[
      { name: "description", content: `${settings.app.name} - ${"meta"}` }
    ]}
  />
);

export default class CheckoutOrderView extends React.Component {
  state = {
    product: {
      name:
        "Canon EOS 70D DSLR Camera Bundle with Canon EF-S 18-55mm f/3.5- 5.6 IS ",
      image: naruto2,
      days: 4,
      date: {
        start: "04 Jan'19",
        end: "07 Jan'19"
      },
      refund: 5000,
      totalRent: 1300,
      youPaid: {
        amount: 6300,
        method: "Debit Card"
      }
    },
    status: {
      owner: "Rajeev Khanna",
      date: {
        confirm: "29 Nov'18",
        pickup: "02 Dec'18",
        delivery: "03 Dec'18",
        start: "03 Dec'18",
        end: "10 Dec'18",
        check: "11 Dec'18",
        return: "12 Dec'18"
      }
    },
    completed: 3
  };

  render() {
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="checkoutDiv">
          <Row>
            <Col lg={{ span: 22, offset: 2 }} xs={{ span: 24, offset: 0 }}>
              <CheckoutSteps step={3} />
            </Col>
            <Col lg={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} xs={{ span: 24, offset: 0 }}>
              <Col
                lg={{ span: 14, offset: 0 }}
                xs={{ span: 24, offset: 0 }}
                className="margin20"
              >
                <OrderTrackCard
                  status={this.state.status}
                  completed={this.state.completed}
                />
              </Col>
              <Col
                lg={{ span: 8, offset: 2 }}
                xs={{ span: 24, offset: 0 }}
                className="marginT20"
              >
                <OrderCard
                  product={this.state.product}
                  paid={true}
                  buttonText={"Cancel order"}
                />
              </Col>
            </Col>
          </Row>
        </div>
      </PageLayout>
    );
  }
}
