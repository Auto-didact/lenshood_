import React from "react";
import PropTypes from "prop-types";
import { translate } from "@gqlapp/i18n-client-react";
import { Loader } from "@gqlapp/look-client-react";
import UserFormComponent from "./UserFormComponent";

const UserEditView = ({ loading, t, currentUser, onSubmit, valueCheck }) => {
  return (
    <div>
      {loading && !currentUser && <Loader text={t("userEdit.loadMsg")} />}
      {!loading && !currentUser && (
        <h1 className="text-center"> Please refresh the page!!!! </h1>
      )}
      {currentUser && (
        <div className="userDetails">
          <UserFormComponent
            valueCheck={valueCheck}
            LYGflag={true}
            onSubmit={onSubmit}
            shouldDisplayRole={false}
            shouldDisplayActive={false}
            initialValues={currentUser}
            userRole={currentUser && currentUser.role ? currentUser.role : null}
          />
        </div>
      )}
    </div>
  );
};

UserEditView.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  t: PropTypes.func,
  onSubmit: PropTypes.func
};

export default translate("user")(UserEditView);
