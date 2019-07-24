import React, { Component } from 'react';
import { Modal, InputNumber, Input, Row, Col } from 'antd';
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
        <Row type="flex" gutter={20} style={this.props.isReply ? { display: 'none' } : { display: 'block' }}>
          <Col order={1}>{' Rating : '}</Col>
          <Col order={2}>
            <InputNumber min={0} max={5} defaultValue={3} value={this.state.rating} onChange={this.handleRatings} />
          </Col>
        </Row>
        <br />
        <Row type="flex" gutter={20}>
          <Col order={1}>{'Comment : '}</Col>
          <Col order={2}>
            <TextArea
              placeholder="comment"
              value={this.state.comment}
              onChange={this.handleComment}
              autosize={{ minRows: 2, maxRows: 6 }}
            />
          </Col>
        </Row>
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
  comment: PropTypes.string,
  isReply: PropTypes.bool
};

export default ModelPopup;
