import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { pick } from 'lodash';
import { translate } from '@gqlapp/i18n-client-react';
import { FormError } from '@gqlapp/forms-client-react';
import UserDetailsView from '../components/UserDetailsView';
import { message } from 'antd';
import EDIT_USER from '../graphql/EditUser.graphql';
import settings from '../../../../settings';
import UserFormatter from '../helpers/UserFormatter';

const UserEdit = props => {
  const { currentUser, editUser, t, history, navigation } = props;
  const onSubmit = async values => {
    let userValues = pick(values, ['username', 'email', 'role', 'isActive', 'profile', 'addresses', 'portfolios']);

    userValues = UserFormatter.trimExtraSpaces(userValues);

    if (settings.auth.certificate.enabled) {
      userValues['auth'] = {
        certificate: pick(values.auth.certificate, 'serial')
      };
    }

    try {
      await editUser({ id: currentUser.id, ...userValues });
    } catch (e) {
      message.error(t('userEdit.errorMsg'));
      throw new FormError(t('userEdit.errorMsg'), e);
    }

    message.success('Changes saved! Click on Next to continue!');
    // if (history) {
    //   return history.goBack();
    // }
    //
    // if (navigation) {
    //   return navigation.goBack();
    // }
  };

  let valueCheck = {
    avatar: currentUser && currentUser.profile.avatar ? true : false,
    firstName: currentUser && currentUser.profile.firstName ? true : false,
    lastName: currentUser && currentUser.profile.lastName ? true : false,
    designation: currentUser && currentUser.profile.designation ? true : false,
    about: currentUser && currentUser.profile.about ? true : false
  };

  return <UserDetailsView onSubmit={onSubmit} {...props} valueCheck={valueCheck} />;
};

UserEdit.propTypes = {
  currentUser: PropTypes.object,
  editUser: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
};

export default compose(
  translate('user'),
  graphql(EDIT_USER, {
    props: ({ mutate }) => ({
      editUser: async input => {
        const {
          data: { editUser }
        } = await mutate({
          variables: { input }
        });

        return editUser;
      }
    })
  })
)(UserEdit);
