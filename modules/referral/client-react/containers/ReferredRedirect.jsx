import React from 'react';
import Register from '@gqlapp/user-client-react/containers/Register';

const ReferredRedirect = props => {
  let code = false;
  if (props.match) {
    code = props.match.params.id;
  } else if (props.navigation) {
    code = props.navigation.state.params.id;
  }
  return <Register referredUsername={code} />;
};

export default ReferredRedirect;
