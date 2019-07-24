import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import { message } from 'antd';
import CommentCard from './CommentCard';
import ADD_LISTING_REVIEW from '../../graphql/AddReviews.graphql';

import ModelPopup from './ModelPopup';

class ReviewsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      result: null,
      visible: false,
      reviews: props.reviews,
      is_reply: false,
      reply_id: null
    };
  }

  showModal = e => {
    this.setState({
      visible: true,
      is_reply: Boolean(e.target.getAttribute('isReply')) || false,
      reply_id: e.target.getAttribute('reply_id') || null
    });
  };

  handleAddReviews = async r => {
    if (this.state.is_reply) {
      return await this.setState({
        result: 'triggered',
        loading: false,
        visible: false
      });
    } else {
      return await this.setState(prevState => ({
        result: 'triggered',
        loading: false,
        visible: false,
        reply_id: null,
        reviews: [r, ...prevState.reviews]
      }));
    }
  };

  addReviews = async (rating, comment) => {
    let input = {};
    input['listingId'] = parseInt(this.props.listing.id);
    input['rating'] = rating + '';
    input['comment'] = comment;
    input['reviewerId'] = this.props.listing.user.id;
    input['isReply'] = this.state.is_reply;
    if (this.state.reply_id) input['id'] = parseInt(this.state.reply_id);
    await this.setState({ loading: true });
    try {
      let results = await this.props.client.mutate({
        mutation: ADD_LISTING_REVIEW,
        variables: { input }
      });
      results.data.addListingReview['reviewer'] = [this.props.listing.user.profile];
      await this.handleAddReviews(Object.assign(results.data.addListingReview, {}));
    } catch (error) {
      console.warn(error.message);
      await this.setState({ error: true, loading: false, visible: false, reply_id: null });
    }
  };

  cancel() {
    message.error('Click on No');
  }

  render() {
    return (
      <div id="listing_user_reviews">
        <span className="font16 blockDisplay fontBold" style={{ margin: 0, display: 'inline-block' }}>
          User Reviews
        </span>
        <span
          style={{ margin: 0, display: 'inline-block', float: 'right', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={this.showModal}
        >
          add
        </span>
        <ModelPopup
          title="ADD REVIEW"
          visible={this.state.visible}
          action={this.addReviews.bind(this)}
          rcard={this}
          isReply={this.state.reply_id ? true : false}
        />
        {this.state.reviews.map(reviewe => {
          return (
            <CommentCard
              listing={this.props.listing}
              reviews={reviewe}
              rcard={this}
              isReply={this.state.reply_id ? true : false}
            />
          );
        })}
      </div>
    );
  }
}

ReviewsCard.propTypes = {
  listing: PropTypes.object,
  reviews: PropTypes.object,
  client: PropTypes.object
};

export default withApollo(ReviewsCard);
