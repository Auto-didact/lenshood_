import React, { Component } from 'react';
import Helmet from 'react-helmet';

import PropTypes from 'prop-types';

import { AccountLayout, Loader } from '@gqlapp/look-client-react';
import MyListComponent from './components/MyListComponent';
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

        {this.props.loading && (!this.props.userListings && <Loader text="Loading..." />)}

        {this.props.userListings && <MyListComponent {...this.props} />}
      </AccountLayout>
    );
  }
}

MyListingsView.propTypes = {
  userListings: PropTypes.array,
  loading: PropTypes.bool
};

export default MyListingsView;
