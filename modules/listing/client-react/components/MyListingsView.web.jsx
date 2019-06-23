import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Empty, Button } from 'antd';
import PropTypes from 'prop-types';
import { AccountLayout } from '@gqlapp/look-client-react';
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
        {this.props.loading && (!this.props.userListings && <div>Loading...</div>)}
        {this.props.userListings &&
          (this.props.userListings.length !== 0 ? (
            <MyList {...this.props} />
          ) : (
            <Empty style={{ margin: '4vh 0px 0px 0px' }} description={<span>No Listings To Show</span>}>
              <Button type="primary" href={`/listing/new`}>
                Create One Now
              </Button>
            </Empty>
          ))}
      </AccountLayout>
    );
  }
}

MyListingsView.propTypes = {
  userListing: PropTypes.object,
  loading: PropTypes.object
};

export default MyListingsView;
