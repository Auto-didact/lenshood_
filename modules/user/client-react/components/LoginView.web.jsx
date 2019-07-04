import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { LayoutCenter, PageLayout, Card, CardGroup, CardTitle, CardText } from '@gqlapp/look-client-react';

import LoginForm from './LoginForm';
import settings from '../../../../settings';

const LoginView = ({ onSubmit, t }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('login.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('login.meta')}`
        }
      ]}
    />
  );

  return (
    <PageLayout>
      {renderMetaData()}
      <div align="center">
        <LoginForm onSubmit={onSubmit} />
        {/* <hr />
        <Card>
          <CardGroup>
            <CardTitle>{t('login.cardTitle')}:</CardTitle>
            <CardText>admin@example.com:admin123</CardText>
            <CardText>user@example.com:user1234</CardText>
          </CardGroup>
        </Card> */}
      </div>
    </PageLayout>
  );
};

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default LoginView;
