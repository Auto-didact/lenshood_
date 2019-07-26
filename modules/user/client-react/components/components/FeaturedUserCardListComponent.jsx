import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
// import '../resources/listingCatalogue.css';
import FeaturedUserCardComponent from './FeaturedUserCardComponent';

export default class FeaturedUserCardListComponent extends React.Component {
  render() {
    return (
      <List
        grid={{
          gutter: 24,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 4
        }}
        dataSource={this.props.relatedUser}
        renderItem={item => (
          <List.Item key={item.id}>
            <FeaturedUserCardComponent key={item.id} relatedUsers={item} />
          </List.Item>
        )}
      />
    );
  }
}

FeaturedUserCardListComponent.propTypes = {
  relatedUser: PropTypes.array.isRequired
};
