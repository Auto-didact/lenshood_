import React from 'react'; // , { useEffect }
// import Helmet from 'react-helmet';
// import { TranslateFunction } from '@gqlapp/i18n-client-react';
// import settings from '../../../../settings';
import FeaturedUserCardComponent from './FeaturedUserCardComponent';

// interface FeaturedUsersViewProps {
//   t: TranslateFunction;
// }

// const renderMetaData = (t: TranslateFunction) => (
//   <Helmet
//     title={`${settings.app.name} - ${t('title')}`}
//     meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
//   />
// );

export default class FeaturedUsersView extends React.Component
// <FeaturedUsersViewProps>
{
  state = {
    users: {
      id: 1,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      userName: 'admin',
      firstName: 'admin',
      lastName: 'lenshood',
      isVerified: false,
      isAvailable: false,
      designation: 'CEO',
      website: 'www.google.com',
      about: 'i am a super admin',
      flag: 'admin'
    }
  };

  render() {
    return (
      <>
        {/* {console.log('usr', this.state.users)} */}
        <h1>Featured Users</h1>
        <FeaturedUserCardComponent relatedUser={this.state.users} />
      </>
    );
  }
}
