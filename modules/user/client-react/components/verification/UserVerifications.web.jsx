import React from 'react';

import Helmet from 'react-helmet';
import { translate } from '@gqlapp/i18n-client-react';
import { Card, CardGroup, CardText } from '@gqlapp/look-client-react';
// To Do Abstract Out
import { Icon, Row, Col } from 'antd';
import DLVerification from '../../containers/verification/DLVerification';
import MobileVerification from '../../containers/verification/MobileVerification';
import EmailVerification from '../../containers/verification/EmailVerification';

import settings from '../../../../../settings';

const renderMetaData = t => {
  return (
    <Helmet
      title={`${settings.app.name} - ${t('profile.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('profile.meta')}`
        }
      ]}
    />
  );
};

const renderVarificationIcon = varStatus => {
  if (varStatus == false) {
    return <Icon type="close-circle" theme="twoTone" twoToneColor="#ff0000" />;
  } else {
    return <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />;
  }
};

const VerificationView = ({ data, t }) => {
  return (
    <Card>
      {renderMetaData(t)}
      <h3>{t('profile.card.group.verification.title')}</h3>
      <CardText>
        {t('profile.card.group.verification.address')}
        {renderVarificationIcon(data.isAddressVerified)}
      </CardText>

      <EmailVerification vStatus={data.isEmailVerified} />
      <DLVerification vStatus={data.isIdVerified} />
      <MobileVerification vStatus={data.isMobileVerified} />

      <CardText>
        {t('profile.card.group.verification.isReferred')}
        {renderVarificationIcon(data.isReferred)}
      </CardText>
    </Card>
  );
};

export default translate('user')(VerificationView);
