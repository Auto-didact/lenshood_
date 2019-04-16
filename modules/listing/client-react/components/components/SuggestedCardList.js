import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
// import '../resources/listingCatalogue.css';
import RelatedCard from './RelatedCard';

class SuggestedCardList extends Component {
  render() {
    console.log(this.relatedList);
    return (
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 3
        }}
        dataSource={this.props.relatedList}
        renderItem={item => (
          <List.Item>
            <RelatedCard relatedList={item} />
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
