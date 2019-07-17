import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { translate } from '@gqlapp/i18n-client-react';
import { LayoutCenter, PageLayout } from '@gqlapp/look-client-react';

import RegisterFormComponent from '../components/RegisterFormComponent';

import settings from '../../../../settings';

const RegisterView = ({ t, onSubmit, referredUsername }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('reg.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('reg.meta')}`
        }
      ]}
    />
  );

  return (
    <PageLayout>
      {renderMetaData(t)}
      <div align="center">
        <RegisterFormComponent onSubmit={onSubmit} referredUsername={referredUsername} />
      </div>
    </PageLayout>
  );
};

RegisterView.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func
};

export default translate('user')(RegisterView);
