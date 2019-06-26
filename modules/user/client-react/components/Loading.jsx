import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import { LayoutCenter,Loader } from '@gqlapp/look-client-react';

const Loading = ({ t }) => (
  <LayoutCenter>
  <Loader text={t('loading')} />
  </LayoutCenter>
);

Loading.propTypes = {
  t: PropTypes.func
};

export default translate('user')(Loading);
