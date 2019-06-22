import React from "react";
import Helmet from "react-helmet";
import { translate } from "@gqlapp/i18n-client-react";
import { PageLayout } from "@gqlapp/look-client-react";
import settings from "../../../../settings";
import InviteDetailsCard from "./InviteDetailsCard";
import ReferDetailsCard from "./ReferDetailsCard";
import { Row, Col } from "antd";

const ReferralView = ({ t, state }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t("title")}`}
      meta={[
        { name: "description", content: `${settings.app.name} - ${t("meta")}` }
      ]}
    />
  );
  return (
    <PageLayout>
      {renderMetaData()}
      <div className="checkoutDiv">
        <Row>
          <Col
            lg={{ span: 22, offset: 1 }}
            md={{ span: 22, offset: 1 }}
            xs={{ span: 24, offset: 0 }}
          >
            <Col
              lg={{ span: 14, offset: 0 }}
              xs={{ span: 24, offset: 0 }}
              className="margin20"
            >
              <InviteDetailsCard username={state.username} />
            </Col>
            <Col
              lg={{ span: 8, offset: 2 }}
              xs={{ span: 24, offset: 0 }}
              className="marginT20"
            >
              <ReferDetailsCard state={state} />
            </Col>
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
};

export default translate("referral")(ReferralView);
