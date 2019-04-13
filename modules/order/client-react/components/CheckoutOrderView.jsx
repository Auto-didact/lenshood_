import React from "react";
import Helmet from "react-helmet";
import { PageLayout } from "@gqlapp/look-client-react";
// import { TranslateFunction } from "@gqlapp/i18n-client-react";
import settings from "../../../../settings";
import { Row, Col } from "antd";
import CheckoutSteps from "./CheckoutSteps";
import OrderCard from "./OrderCard";
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
    }
  };

  render() {
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="checkoutDiv">
          <Row>
            <CheckoutSteps step={3} />
            <Col
              lg={{ span: 8, offset: 14 }}
              md={{ span: 14, offset: 10 }}
              sm={{ span: 18, offset: 3 }}
              xs={{ span: 22, offset: 1 }}
            >
              <OrderCard
                product={this.state.product}
                paid={true}
                buttonText={"Cancel order"}
              />
            </Col>
          </Row>
        </div>
      </PageLayout>
    );
  }
}
