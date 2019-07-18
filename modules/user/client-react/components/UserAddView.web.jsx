import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { translate } from "@gqlapp/i18n-client-react";
import { PageLayout } from "@gqlapp/look-client-react";

import UserFormComponent from "./UserFormComponent";
import settings from "../../../../settings";

const UserAddView = ({ t, onSubmit, currentUser }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t("userEdit.title")}`}
      meta={[
        {
          name: "description",
          content: `${settings.app.name} - ${t("userEdit.meta")}`
        }
      ]}
    />
  );

  return (
    <PageLayout>
      {renderMetaData()}
      <Link id="back-button" to="/users">
        Back
      </Link>
      <h2>
        {t("userEdit.form.titleCreate")} {t("userEdit.form.title")}
      </h2>
      <div className="con">
        <UserFormComponent
          LYGflag={false}
          onSubmit={onSubmit}
          initialValues={{}}
          shouldDisplayRole={true}
          shouldDisplayActive={true}
          userRole={currentUser.role}
        />
      </div>
    </PageLayout>
  );
};

UserAddView.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func
};

export default translate("user")(UserAddView);
