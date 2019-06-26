import React from "react";
import Helmet from "react-helmet";
import { translate } from "@gqlapp/i18n-client-react";
import { PageLayout } from "@gqlapp/look-client-react";
import settings from "../../../../settings";
import InviteDetailsCard from "./InviteDetailsCard";
import ReferDetailsCard from "./ReferDetailsCard";
import { Row, Col, Spin } from "antd";

const Loading = () => (
  <div
    className="text-center"
    style={{ marginTop: "50%", textAlign: "center" }}
  >
    <Spin size="large" />
    <br />
    {"Loading..."}
  </div>
);

const ReferralView = ({ t, state, loading, referralUser }) => {
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
      {loading && !referralUser && <Loading />}
      {referralUser ? (
        <Row>
          <Col
            lg={{ span: 14, offset: 0 }}
            xs={{ span: 24, offset: 0 }}
            className="margin20"
          >
            <InviteDetailsCard username={referralUser.username} />
          </Col>
          <Col
            lg={{ span: 8, offset: 1 }}
            xs={{ span: 24, offset: 0 }}
            className="marginT20"
          >
            <ReferDetailsCard
              state={state}
              referrals={referralUser.referrals}
            />
          </Col>
        </Row>
      ) : null}
    </PageLayout>
  );
};

export default translate("referral")(ReferralView);
