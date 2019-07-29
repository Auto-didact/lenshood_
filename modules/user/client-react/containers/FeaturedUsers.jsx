import React from 'react';
import { graphql, compose } from 'react-apollo';
import {translate} from '@gqlapp/i18n-client-react';
import { withFeaturedUsers } from './UserOperations';
import FeaturedUsersComponent from '../components/components/FeaturedUsersComponent';

// interface PagesProps {
//   t: TranslateFunction;
// }

class FeaturedUsers extends React.Component
// <PagesProps>
{
  // public
  render() {
    const props = this.props;
    return (
      <>
        <FeaturedUsersComponent {...props} />
      </>
    );
  }
}

export default compose(withFeaturedUsers)(FeaturedUsers);
