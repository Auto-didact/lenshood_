import React, { Component } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

import { PageLayout } from "@gqlapp/look-client-react";

import { translate } from "@gqlapp/i18n-client-react";

import settings from "../../../../settings";
import HomeHead from "./HomeHead";
import HomeFeaturedUsers from "./HomeFeaturedUsers";
import HomeFeaturedListings from "./HomeFeaturedListings";

import HomeSteps from "./HomeSteps";
import HomeWhyLenshood from "./HomeWhyLenshood";

import HomeHowItWorks from "./HomeHowItWorks";

import { Anchor } from "antd";
import AnchorItem from "./components/AnchorItem";

const { Link } = Anchor;

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
        <Anchor className="home-anchor" offsetTop="00">
          <Link
            className="home-anchor-link"
            href="#featured-listing"
            title="Featured Listing"
          />
          <Link
            className="home-anchor-link"
            href="#featured-users"
            title="Featured Users"
          />
          <Link className="home-anchor-link" href="#steps" title="Steps" />
          <Link
            className="home-anchor-link"
            href="#how-it-works"
            title="How It Works"
          />
          <Link
            className="home-anchor-link"
            href="#why-lenshood"
            title="Why Lenshood"
          />
        </Anchor>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <br />
        <br />
        <section id="featured-listing">
          <HomeFeaturedListings t={t} />
        </section>
        <section id="featured-users">
          <HomeFeaturedUsers t={t} />
        </section>
        <section id="steps">
          <HomeSteps t={t} />
        </section>
        <section id="how-it-works">
          <HomeHowItWorks t={t} />
        </section>
        <section id="why-lenshood">
          <HomeWhyLenshood t={t} />
        </section>
      </PageLayout>
    );
  }
}

HomeView.propTypes = {
  t: PropTypes.func
};

export default translate("home")(HomeView);
