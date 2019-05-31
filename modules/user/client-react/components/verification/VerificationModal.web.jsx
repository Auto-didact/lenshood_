import React from "react";
import PropTypes from "prop-types";
import { translate } from "@gqlapp/i18n-client-react";
// To Do Abstract Out
import { Modal, Button } from "antd";
import VerificationIcon from "./VerificationIcon";

class VerificationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <Button
          block
          type="dashed"
          onClick={this.showModal}
          disabled={this.props.vStatus}
        >
          {this.props.button}
          <VerificationIcon vStatus={this.props.vStatus} />
        </Button>
        <Modal
          title={this.props.title}
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

VerificationModal.propTypes = {
  children: PropTypes.object.isRequired,
  button: PropTypes.string,
  title: PropTypes.string,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  DL: PropTypes.object,
  vStatus: PropTypes.bool,
  t: PropTypes.func
};

export default translate("user")(VerificationModal);
