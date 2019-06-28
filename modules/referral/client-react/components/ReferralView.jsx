import React from "react";
import Helmet from "react-helmet";
import { translate } from "@gqlapp/i18n-client-react";
import { PageLayout, Loader } from "@gqlapp/look-client-react";
import settings from "../../../../settings";
import InviteDetailsCardComponent from "./InviteDetailsCardComponent";
import ReferDetailsCardComponent from "./ReferDetailsCardComponent";
import { Row, Col } from "antd";

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
      {loading && !referralUser && <Loader text={"Loading..."} />}
      {referralUser && (
        <Row>
          <Col
            lg={{ span: 14, offset: 0 }}
            xs={{ span: 24, offset: 0 }}
            className="margin20"
          >
            <InviteDetailsCardComponent username={referralUser.username} />
          </Col>
          <Col
            lg={{ span: 8, offset: 1 }}
            xs={{ span: 24, offset: 0 }}
            className="marginT20"
          >
            <ReferDetailsCardComponent
              state={state}
              referrals={referralUser.referrals}
            />
          </Col>
        </Row>
      )}
    </PageLayout>
  );
};

export default translate("referral")(ReferralView);
