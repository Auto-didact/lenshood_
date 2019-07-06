import React from "react";
import Helmet from "react-helmet";
import { PageLayout } from "@gqlapp/look-client-react";
import settings from "../../../../settings";
import LiveSearchComponent from "./LiveSearchComponent";

const LiveSearchView = ({ t, state }) => {
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
      <h1>Live searches</h1>
      <h2>See if someone needs something you have…</h2>
      <LiveSearchComponent state={state} />
    </PageLayout>
  );
};

export default LiveSearchView;
