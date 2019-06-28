import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import ListingFormComponent from "./ListingFormComponent";

import settings from "../../../../settings";
import { translate } from "@gqlapp/i18n-client-react";
import { PageLayout } from "@gqlapp/look-client-react";

const onSubmit = addListing => values => {
  addListing(values);
};


const ListingAddView = ({ addListing, t, currentUser, users }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t("listing.title")}`}
      meta={[
        {
          name: "description",
          content: t("listing.meta")
        }
      ]}
    />
  );
  return (
    <PageLayout>
      {renderMetaData()}
      {/* <Link id="back-button" to="/listings">
        {t('listing.btn.back')}
      </Link> */}
      <ListingFormComponent onSubmit={onSubmit(addListing)} currentUser={currentUser} users={users}/>
      <br />
    </PageLayout>
  );
};

ListingAddView.propTypes = {
  addListing: PropTypes.func.isRequired,
  t: PropTypes.func,
  currentUser: PropTypes.object
};

export default translate("listing")(ListingAddView);
