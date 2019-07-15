import React, { Component } from 'react';
import { Modal, InputNumber, Input } from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;

class ModelPopup extends Component {
  constructor(props) {
    super(props);
    let comment = '';
    if (props.comment) comment = props.comment;
    let rating = 0;
    if (props.rating) rating = parseInt(props.rating);
    this.state = { visible: false, comment: comment, rating: rating };
  }

  handleComment = e => {
    e.preventDefault();
    this.setState({
      comment: e.target.value
    });
  };

  handleRatings = value => {
    this.setState({
      rating: value
    });
  };

  handleCancel = e => {
    e.preventDefault();
    this.props.rcard.setState({
      visible: false
    });
  };

  render() {
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={() => {
          this.props.action(this.state.rating, this.state.comment);
        }}
        onCancel={this.handleCancel}
        destroyOnClose={true}
        forceRender={true}
      >
        Rating :{' '}
        <InputNumber min={0} max={5} defaultValue={3} value={this.state.rating} onChange={this.handleRatings} />
        <br />
        Comment:{' '}
        <TextArea
          placeholder="comment"
          value={this.state.comment}
          onChange={this.handleComment}
          autosize={{ minRows: 2, maxRows: 6 }}
        />
      </Modal>
    );
  }
}

ModelPopup.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  action: PropTypes.func.bind,
  rcard: PropTypes.object,
  rating: PropTypes.number,
  comment: PropTypes.string
};

export default ModelPopup;
