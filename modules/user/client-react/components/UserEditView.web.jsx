import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout, Loader } from '@gqlapp/look-client-react';
import './styling.css';
import UserFormComponent from './UserFormComponent';
import settings from '../../../../settings';

const UserEditView = ({ loading, user, t, currentUser, onSubmit, userBool }) => {
  const isNotSelf = !user || (user && user.id !== currentUser.id);

  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('userEdit.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('userEdit.meta')}`
        }
      ]}
    />
  );

  return (
    <PageLayout>
      {renderMetaData()}
      {loading && !user && <Loader text={t('userEdit.loadMsg')} />}
      {!loading && !user && !userBool && <h1 className="text-center"> Please refresh the page!!!! </h1>}
      {(userBool || user) && (
        <div style={{}}>
          <Link
            id="back-button"
            to={currentUser && currentUser.role === 'admin' ? '/users' : '/profile'}
            style={{
              fontSize: '20px',
              margin: '10px',
              textDecoration: 'underline'
            }}
          >
            <Icon type="arrow-left" /> Back
          </Link>
          <h2 style={{ textAlign: 'center' }}>
            {t('userEdit.form.titleEdit')} {t('userEdit.form.title')}
          </h2>

          <div className="con">
            {' '}
            <UserFormComponent
              LYGflag={false}
              onSubmit={onSubmit}
              shouldDisplayRole={isNotSelf}
              shouldDisplayActive={isNotSelf}
              initialValues={userBool ? currentUser : user}
              userRole={currentUser && currentUser.role ? currentUser.role : null}
            />
          </div>
        </div>
      )}
    </PageLayout>
  );
};

UserEditView.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  currentUser: PropTypes.object,
  userBool: PropTypes.bool,
  t: PropTypes.func,
  onSubmit: PropTypes.func
};

export default translate('user')(UserEditView);
