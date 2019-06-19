import React from 'react';
import Helmet from 'react-helmet';

import { AccountLayout } from '@gqlapp/look-client-react';
import MyList from './components/MyList';
import settings from '../../../../settings';

const MyListingsView = ({ loading, userListings }) => {
  return (
    <AccountLayout select="/my-listings">
      {/* Render metadata */}
      <Helmet
        title={`${settings.app.name} - My Listings`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - My Listings)}`
          }
        ]}
      />
      {loading && !userListings && <div>Loading...</div>}
      {userListings && <MyList listings={userListings} />}
    </AccountLayout>
  );
};

export default MyListingsView;
