import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { Comment, Icon, Tooltip, Avatar, Rate, Button, Popconfirm, message, Collapse } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { ImgUser } from '../../constants/DefaultImages';
import DELETE_LISTING_REVIEW from '../../graphql/DeleteListingReview.graphql';
import EDITI_LISTING_REVIEW from '../../graphql/EditListingReview.graphql';
import CHILD_LISTING_REVIEW from '../../graphql/ChildReviews.graphql';
import UPDATE_LIKES_REVIEW from '../../graphql/UpdateLikes.graphql';
import COUNT_LIKES_DISLIKES from '../../graphql/LikesDisLikesCount.graphql';
import ModelPopup from './ModelPopup';

const { Panel } = Collapse;
class CommentCard extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    likes: 0,
    dislikes: 0,
    action: null,
    visible: false,
    parentReview: {},
    childreviews: [],
    showResults: false
  };

  componentDidMount() {
    this.getTotalLikesDisLikes();
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  like = async () => {
    await this.setState({
      action: 'liked'
    });
    await this.updateLikes();
  };

  dislike = async () => {
    await this.setState({
      action: 'disliked'
    });
    await this.updateLikes();
  };

  replyModal = () => {
    this.props.rcard.showModal();
  };

  getTotalLikesDisLikes = async () => {
    await this.setState({ loading: true });
    let input = {};
    input.review_id = this.props.reviews.id;
    try {
      let res = await this.props.client.mutate({
        mutation: COUNT_LIKES_DISLIKES,
        variables: input
      });
      await this.setState({
        visible: false,
        result: 'triggered',
        loading: false,
        likes: res.data.countLikesDisLikes.likes,
        dislikes: res.data.countLikesDisLikes.dislikes
      });
    } catch (error) {
      console.warn(error.message);
      await this.setState({ error: true, loading: false, visible: false });
    }
  };

  updateLikes = async () => {
    await this.setState({ loading: true });
    let input = {};
    input.ld = this.state.action || null;
    input.review_id = parseInt(this.props.reviews.id);
    input.reviewer_id = parseInt(this.props.listing.user.id);
    try {
      await this.props.client.mutate({
        mutation: UPDATE_LIKES_REVIEW,
        variables: input
      });
      this.getTotalLikesDisLikes();
      await this.setState({ visible: false, result: 'triggered', loading: false });
    } catch (error) {
      console.warn(error.message);
      await this.setState({ error: true, loading: false, visible: false });
    }
  };

  deleteReviews = async input => {
    await this.setState({ loading: true });
    if (this.props.listing.user.id == parseInt(this.props.reviews.reviewer[0].userId)) {
      try {
        await this.props.client.mutate({
          mutation: DELETE_LISTING_REVIEW,
          variables: { input }
        });
        await this.props.rcard.setState({
          reviews: this.props.rcard.state.reviews.filter(v => v.id !== input.id)
        });
        await this.setState({
          visible: false,
          result: 'triggered',
          loading: false,
          childreviews: this.state.childreviews.filter(v => v.id !== input.id)
        });
      } catch (error) {
        console.warn(error.message);
        await this.setState({ error: true, loading: false, visible: false });
      }
    } else {
      await this.setState({ error: true, loading: false, visible: false });
    }
  };

  editReviews = async (rating, comment) => {
    let input = {};
    input['id'] = this.props.reviews.id;
    input['listingId'] = parseInt(this.props.reviews.listingId);
    input['rating'] = rating + '';
    input['comment'] = comment;
    await this.setState({ loading: true });
    if (this.props.listing.user.id == parseInt(this.props.reviews.reviewer[0].userId)) {
      try {
        await this.props.client.mutate({
          mutation: EDITI_LISTING_REVIEW,
          variables: { input }
        });
        this.props.reviews.rating = rating + '';
        this.props.reviews.comment = comment;
        await this.setState({
          result: 'triggered',
          loading: false,
          visible: false,
          parentReview: this.props.reviews
        });
      } catch (error) {
        console.warn(error.message);
        await this.setState({ error: true, loading: false, visible: false });
      }
    } else {
      await this.setState({ error: true, loading: false, visible: false });
    }
  };

  getChildReviews = async () => {
    await this.setState({ loading: true });
    let id = this.props.reviews.id;
    try {
      let res = await this.props.client.query({
        query: CHILD_LISTING_REVIEW,
        variables: { id }
      });
      await this.setState({
        result: 'triggered',
        loading: false,
        editvisible: false,
        childreviews: res.data.childReviews || this.state.childreviews,
        showResults: true
      });
    } catch (error) {
      console.warn(error.message);
      await this.setState({ error: true, loading: false, editvisible: false, showResults: false });
    }
  };

  cancel() {
    message.error('Click on No');
  }

  ChildComments = () => {
    return (
      <Collapse accordion>
        {this.state.childreviews.map(child => (
          <Panel header="Replies" key="1">
            <CommentCard
              reviews={child}
              listing={this.props.listing}
              rcard={this.props.rcard}
              client={this.props.client}
            />
          </Panel>
        ))}
      </Collapse>
    );
  };

  render() {
    let reviews = this.props.reviews;
    const name = reviews.reviewer[0].firstName + '  ' + reviews.reviewer[0].lastName;
    let avatar = reviews.reviewer[0].avatar ? reviews.reviewer[0].avatar : ImgUser;
    const { likes, dislikes, action } = this.state;
    const actions = [
      <span>
        <Tooltip title="Like">
          <Icon type="like" theme={action === 'liked' ? 'filled' : 'outlined'} onClick={this.like} />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
      </span>,
      <span>
        <Tooltip title="Dislike">
          <Icon type="dislike" theme={action === 'disliked' ? 'filled' : 'outlined'} onClick={this.dislike} />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
      </span>,
      <span isReply={1} reply_id={this.props.reviews.id} onClick={this.props.rcard.showModal}>
        Reply
      </span>
    ];

    return (
      <Comment
        actions={actions}
        author={<a>{name}</a>}
        avatar={<Avatar src={avatar} alt={name} />}
        content={
          <div>
            <div align="right" style={{ paddingRight: '20px' }}>
              <Popconfirm
                title="Are you sure to delete this reiview?"
                onConfirm={() => this.deleteReviews({ id: reviews.id })}
                onCancel={this.cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger" shape="circle" size="small">
                  <Icon type="delete" />
                </Button>
              </Popconfirm>
              {'       '}
              <Button type="danger" shape="circle" size="small" onClick={this.showModal}>
                <Icon type="edit" />
              </Button>
              <ModelPopup
                title="EDIT REVIEW"
                visible={this.state.visible}
                action={this.editReviews.bind(this)}
                rcard={this}
                rating={parseInt(reviews.rating)}
                comment={reviews.comment}
              />
            </div>
            <p>{reviews.comment}</p>
          </div>
        }
        datetime={
          <div>
            <Rate disabled defaultValue={reviews.rating} className="font10 mainColor" />
            <Tooltip title={moment(reviews.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment(reviews.createdAt).fromNow()}</span>
            </Tooltip>
          </div>
        }
      >
        <div>
          <Button type="links" value="replies" onClick={this.getChildReviews} block>
            {' '}
            &gt;&gt;
          </Button>
          {this.state.showResults ? this.ChildComments() : null}
        </div>
      </Comment>
    );
  }
}

CommentCard.propTypes = {
  reviews: PropTypes.object,
  listing: PropTypes.object,
  rcard: PropTypes.object,
  client: PropTypes.object
};

export default withApollo(CommentCard);
