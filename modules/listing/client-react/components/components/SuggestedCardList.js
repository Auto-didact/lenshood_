import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
// import '../resources/listingCatalogue.css';
import RelatedCard from './RelatedCard';

class SuggestedCardList extends Component {
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
            <RelatedCard key={item.id} relatedListing={item} />
          </List.Item>
        )}
      />
    );
  }
}

SuggestedCardList.propTypes = {
  relatedList: PropTypes.object.isRequired
};

export default SuggestedCardList;
