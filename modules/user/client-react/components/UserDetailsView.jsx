import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import { Loader } from '@gqlapp/look-client-react';
import UserFormComponent from './UserFormComponent';

const UserEditView = ({ loading, user, t, currentUser, onSubmit, valueCheck }) => {
  const isNotSelf = !user || (user && user.id !== currentUser.id);
  return (
    <div>
      {loading && !user && <Loader text={t('userEdit.loadMsg')} />}
      {!loading && !user && <h1 className="text-center"> Please refresh the page!!!! </h1>}
      {user && (
        <UserFormComponent
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

export default translate('user')(UserEditView);
