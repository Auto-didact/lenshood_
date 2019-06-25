import React from "react";
import PropTypes from "prop-types";
import { translate } from "@gqlapp/i18n-client-react";
import {Spin} from 'antd';
import UserForm from "./UserForm";

const UserEditView = ({
  loading,
  user,
  t,
  currentUser,
  onSubmit,
  valueCheck
}) => {
  const isNotSelf = !user || (user && user.id !== currentUser.id);
  return (
    <div>
      {loading && !user ? (
        <div className="text-center" style={{marginTop:'50%',textAlign:'center'}}><Spin size="large"/><br/>{t('userEdit.loadMsg')}</div>
      ) : (
        <UserForm
          valueCheck={valueCheck}
          LYGflag={true}
          onSubmit={onSubmit}
          shouldDisplayRole={isNotSelf}
          shouldDisplayActive={isNotSelf}
          initialValues={user}
          userRole={currentUser && currentUser.role ? currentUser.role : null}
        />
      )}
    </div>
  );
};

UserEditView.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  currentUser: PropTypes.object,
  t: PropTypes.func,
  onSubmit: PropTypes.func
};

export default translate("user")(UserEditView);
