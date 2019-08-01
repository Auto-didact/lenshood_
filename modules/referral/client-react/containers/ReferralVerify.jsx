import React from 'react';
import { translate } from '@gqlapp/i18n-client-react';
import ReferralVerifyView from '../components/ReferralVerifyView';
import { graphql, compose } from 'react-apollo';
import REFERRAL_VERIFY from '../graphql/ReferralVerify.graphql';
import USER_VERIFY_QUERY from '@gqlapp/user-client-react/graphql/ReferralVerifyUserQuery.graphql';
import { FormError } from '@gqlapp/forms-client-react';
import { message } from 'antd';

const ReferralVerify = props => {
  const { verifyReferral, user, currentUser, loading } = props;
  let code = false;
  if (props.match) {
    code = props.match.params.id;
  } else if (props.navigation) {
    code = props.navigation.state.params.id;
  }

  let userBool = false;

  if (Number(code) === currentUser.id) {
    userBool = true;
  }

  const onSubmit = async () => {
    message.info('Please wait...');
    let values = {
      referredId: Number(code)
    };
    try {
      await verifyReferral(values);
    } catch (e) {
      message.error("Couldn't verify the user");
      throw new FormError("Couldn't verify the user", e);
    }
    message.success('User Verified. You may go back now.');
    window.location.reload();
  };
  return (
    <ReferralVerifyView
      onSubmit={onSubmit}
      currentUser={currentUser}
      user={userBool ? currentUser : user}
      loading={loading}
    />
  );
};

export default compose(
  graphql(USER_VERIFY_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }
      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, displayUser } }) {
      const userPayload = displayUser ? { user: displayUser } : {};
      return {
        loading,
        ...userPayload
      };
    }
  }),
  graphql(REFERRAL_VERIFY, {
    props: ({ mutate }) => ({
      verifyReferral: async input => {
        const { data: verifyReferral } = await mutate({
          variables: { input }
        });
        return verifyReferral;
      }
    })
  })
)(translate('referral')(ReferralVerify));