// React
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
// Apollo
import { graphql, compose } from 'react-apollo';

// Components
import { FormError } from '@gqlapp/forms-client-react';
import RegisterView from '../components/RegisterView';

import REGISTER from '../graphql/Register.graphql';

import { message } from 'antd';

const Register = props => {
  message.info('Please wait...');
  const { t, register, history, navigation } = props;
  const onSubmit = async values => {
    try {
      await register(values);
    } catch (e) {
      throw new FormError(t('reg.errorMsg'), e);
    }

    message.success(t('reg.confirmMsg'));
    if (history) {
      history.push('/profile');
    } else if (navigation) {
      navigation.goBack();
    }
  };

  return <RegisterView {...props} onSubmit={onSubmit} />;
};

Register.propTypes = {
  register: PropTypes.func,
  history: PropTypes.object,
  t: PropTypes.func,
  navigation: PropTypes.object
};

const RegisterWithApollo = compose(
  translate('user'),

  graphql(REGISTER, {
    props: ({ mutate }) => ({
      register: async ({ username, email, password, referredBy }) => {
        const {
          data: { register }
        } = await mutate({
          variables: { input: { username, email, password, referredBy } }
        });
        return register;
      }
    })
  })
)(Register);
export default RegisterWithApollo;
