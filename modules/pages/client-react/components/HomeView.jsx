import React, { Component } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

import { PageLayout } from "@gqlapp/look-client-react";

import { translate } from "@gqlapp/i18n-client-react";
import settings from "../../../../settings";
import HomeHead from "./components/HomeHead";
import HomeSteps from "./components/HomeSteps";

import ListingCatalogue from "@gqlapp/listing-client-react/containers/ListingCatalogue";

class HomeView extends Component {
  render() {
    const t = this.props.t;
    const img1 =
      "https://images.unsplash.com/photo-1495374412936-30689e318a1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80";
    return (
      <PageLayout>
        <Helmet
          title={`${settings.app.name} - ${t("Home")}`}
          meta={[
            {
              name: "description",
              content: `${settings.app.name} - ${t("meta")}`
            }
          ]}
        />
        <HomeHead t={t} image={img1} />
        <HomeSteps t={t} />
        <ListingCatalogue />
      </PageLayout>
    );
  }
}

HomeView.propTypes = {
  t: PropTypes.func
};

export default translate("home")(HomeView);
