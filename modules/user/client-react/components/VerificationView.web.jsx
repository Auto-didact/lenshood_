import React from 'react';

import Helmet from 'react-helmet';
import { translate } from '@gqlapp/i18n-client-react';
import { Card, CardGroup, CardText } from '@gqlapp/look-client-react';
// To Do Abstract Out
import { Icon, Row, Col } from 'antd';

import settings from '../../../../settings';

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
      <CardGroup>
        <h3>{t('profile.card.group.verification.title')}</h3>
        <Row gutter={16}>
          <Col span={18}>
            <CardText>{t('profile.card.group.verification.address')}</CardText>
          </Col>
          {renderVarificationIcon(data.isAddressVerified)}
        </Row>

        <Row gutter={16}>
          <Col span={18}>
            <CardText>{t('profile.card.group.verification.email')}</CardText>
          </Col>
          {renderVarificationIcon(data.isEmailVerified)}
        </Row>

        <Row gutter={16}>
          <Col span={18}>
            <CardText>{t('profile.card.group.verification.id')}</CardText>
          </Col>
          {renderVarificationIcon(data.isIdVerified)}
        </Row>

        <Row gutter={16}>
          <Col span={18}>
            <CardText>{t('profile.card.group.verification.mobile')}</CardText>
          </Col>
          {renderVarificationIcon(data.isMobileVerified)}
        </Row>

        <Row gutter={16}>
          <Col span={18}>
            <CardText>{t('profile.card.group.verification.isReferred')}</CardText>
          </Col>
          {renderVarificationIcon(data.isReferred)}
        </Row>
      </CardGroup>
    </Card>
  );
};

export default translate('user')(VerificationView);
