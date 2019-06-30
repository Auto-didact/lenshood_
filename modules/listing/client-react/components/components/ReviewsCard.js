import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import { Row, Col, Rate, Button, Card, Avatar, Popconfirm, Icon, message, Modal, Input, InputNumber } from 'antd';
import { ImgUser } from '../../constants/DefaultImages';
import DELETE_LISTING_REVIEW from '../../graphql/DeleteListingReview.graphql';
import EDITI_LISTING_REVIEW from '../../graphql/EditListingReview.graphql';
import ADD_LISTING_REVIEW from '../../graphql/AddReviews.graphql';

const { Meta } = Card;
const { TextArea } = Input;

class ReviewsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      result: null,
      visible: false,
      editvisible: false,
      addvisible: false,
      editcomment: '',
      addcomment: '',
      editrating: 0,
      addrating: 0
    };
  }

  editshowModal = () => {
    this.setState({
      editvisible: true
    });
  };

  addshowModal = () => {
    this.setState({
      addvisible: true
    });
  };

  edithandleCancel = e => {
    e.preventDefault();
    this.setState({
      editvisible: false
    });
  };
  addhandleCancel = e => {
    e.preventDefault();
    this.setState({
      addvisible: false
    });
  };

  addhandleComment = e => {
    e.preventDefault();
    this.setState({
      addcomment: e.target.value
    });
  };

  edithandleComment = e => {
    e.preventDefault();
    this.setState({
      editcomment: e.target.value
    });
  };

  edithandleRatings = value => {
    this.setState({
      editrating: value
    });
  };

  addhandleRatings = value => {
    this.setState({
      addrating: value
    });
  };

  deleteReviews = async (input, userId) => {
    await this.setState({ loading: true });
    if (this.props.listing.user.id == userId) {
      try {
        await this.props.client.mutate({
          mutation: DELETE_LISTING_REVIEW,
          variables: { input }
        });
        await this.setState({ visible: false, result: 'triggered', loading: false });
      } catch (error) {
        console.warn(error.message);
        await this.setState({ error: true, loading: false, visible: false });
      }
      Modal.destroyAll();
    }
  };

  editReviews = async (id, listing_id, userId) => {
    let input = {};
    input['id'] = id;
    input['listingId'] = parseInt(listing_id);
    input['rating'] = this.state.editrating + '';
    input['comment'] = this.state.editcomment;
    if (this.props.listing.user.id == userId) {
      await this.setState({ loading: true });
      try {
        await this.props.client.mutate({
          mutation: EDITI_LISTING_REVIEW,
          variables: { input }
        });
        await this.setState({ result: 'triggered', loading: false, editvisible: false });
      } catch (error) {
        console.warn(error.message);
        await this.setState({ error: true, loading: false, editvisible: false });
      }
    }
  };

  addReviews = async () => {
    let input = {};
    input['listingId'] = parseInt(this.props.listing.id);
    input['rating'] = this.state.addrating + '';
    input['comment'] = this.state.addcomment;
    input['reviewerId'] = this.props.listing.user.id;
    await this.setState({ loading: true });
    try {
      await this.props.client.mutate({
        mutation: ADD_LISTING_REVIEW,
        variables: { input }
      });
      await this.setState({ result: 'triggered', loading: false, addvisible: false });
    } catch (error) {
      console.warn(error.message);
      await this.setState({ error: true, loading: false, addvisible: false });
    }
  };

  editModal = (reviewId, listingId, userId) => {
    return (
      <Modal
        title={'Edit Review'}
        visible={this.state.editvisible}
        onOk={() => {
          this.editReviews(reviewId, listingId, userId);
        }}
        onCancel={this.edithandleCancel}
        destroyOnClose={true}
        forceRender={true}
      >
        Rating :{' '}
        <InputNumber min={0} max={5} defaultValue={3} value={this.state.editrating} onChange={this.edithandleRatings} />
        <br />
        Comment:{' '}
        <TextArea
          placeholder="comment"
          value={this.state.editcomment}
          onChange={this.edithandleComment}
          autosize={{ minRows: 2, maxRows: 6 }}
        />
      </Modal>
    );
  };

  addModal = () => {
    Modal.destroyAll();
    return (
      <Modal
        title={'Add Review'}
        visible={this.state.addvisible}
        onOk={() => {
          this.addReviews();
        }}
        onCancel={this.addhandleCancel}
        destroyOnClose={true}
        forceRender={true}
      >
        Rating :{' '}
        <InputNumber min={0} max={5} defaultValue={3} value={this.state.addrating} onChange={this.addhandleRatings} />
        <br />
        Comment:{' '}
        <TextArea
          placeholder="comment"
          value={this.state.addcomment}
          onChange={this.addhandleComment}
          autosize={{ minRows: 2, maxRows: 6 }}
        />
      </Modal>
    );
  };

  cancel() {
    message.error('Click on No');
  }

  getCard = reviewe => {
    return (
      <Card>
        <Row>
          <Meta
            avatar={<Avatar size={40} src={reviewe.reviewer[0].avatar ? reviewe.reviewer[0].avatar : ImgUser} />}
            title={
              <div>
                <h4 className="UserCardUserName">
                  {reviewe.reviewer[0].firstName + '  ' + reviewe.reviewer[0].lastName}
                </h4>
                <div>
                  {reviewe.rating ? (
                    <Rate disabled defaultValue={reviewe.rating} className="font10 mainColor" />
                  ) : (
                    <p>Not Rated</p>
                  )}
                </div>
              </div>
            }
            description={
              <p style={{ margin: 0, padding: 0 }}>
                <p
                  style={{
                    fontSize: '9px',
                    color: '#23b195',
                    display: 'inline'
                  }}
                />{' '}
                <strong style={{ display: 'inline', fontSize: '11px' }}>{reviewe.comment}</strong>
              </p>
            }
          />
        </Row>
        <Col span={12} align="right" style={{ paddingRight: '20px' }}>
          <Popconfirm
            title="Are you sure to delete this reiview?"
            onConfirm={() => this.deleteReviews({ id: reviewe.id }, reviewe.reviewer[0].id)}
            onCancel={this.cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" shape="circle" size="large">
              <Icon type="delete" />
            </Button>
          </Popconfirm>
        </Col>
        <Col span={12} align="right" style={{ paddingRight: '20px' }}>
          <Button type="danger" shape="circle" size="large" onClick={this.editshowModal}>
            <Icon type="edit" />
          </Button>
          {this.editModal(reviewe.id, reviewe.listingId, reviewe.reviewer[0].id)}
        </Col>
      </Card>
    );
  };

  render() {
    let reviews = this.props.reviews;
    return (
      <div>
        <h3 className="font16 blockDisplay fontBold">User Reviews</h3>
        <Button
          type="danger"
          onClick={this.addshowModal}
          shape="circle"
          size="small"
          style={{ paddingRight: '20px', marginTop: '-30px', float: 'right' }}
        >
          <Icon type="edit" />
        </Button>
        {this.addModal()}
        {reviews.map(reviewe => {
          return this.getCard(reviewe);
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
