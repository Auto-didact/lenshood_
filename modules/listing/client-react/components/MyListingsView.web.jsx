import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Spin } from 'antd';
import { AccountLayout,Loader } from '@gqlapp/look-client-react';
import MyList from './components/MyList';
import settings from '../../../../settings';

class MyListingsView extends Component {
  render() {
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

        {this.props.loading &&
          (!this.props.userListings && (
            <Loader text="Loading..." />
          ))}

        {this.props.userListings && <MyList {...this.props} />}
      </AccountLayout>
    );
  }
}

export default MyListingsView;
