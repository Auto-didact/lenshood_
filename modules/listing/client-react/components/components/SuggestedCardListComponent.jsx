import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
// import '../resources/listingCatalogue.css';
import RelatedCardComponent from './RelatedCardComponent';

class SuggestedCardListComponent extends Component {
  render() {
    return (
      <List
        grid={{
          gutter: 24,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4
        }}
        dataSource={this.props.relatedList}
        renderItem={item => (
          <List.Item key={item.id}>
            <RelatedCardComponent key={item.id} relatedListing={item} />
          </List.Item>
        )}
      />
    );
  }
}

SuggestedCardListComponent.propTypes = {
  relatedList: PropTypes.object.isRequired
};

export default SuggestedCardListComponent;
