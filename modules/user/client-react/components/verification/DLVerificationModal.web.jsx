import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
// To Do Abstract Out
import { Modal, Button } from 'antd';
import VerificationIcon from './VerificationIcon';

class DLVerification extends React.Component {
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
        <Button block type="dashed" onClick={this.showModal}>
          {this.props.t('profile.card.group.verification.id')}
          <VerificationIcon vStatus={this.props.vStatus} />
        </Button>
        <Modal title="Driving License Verification" visible={visible} onCancel={this.handleCancel} footer={null}>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

DLVerification.propTypes = {
  children: PropTypes.object,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  DL: PropTypes.object,
  vStatus: PropTypes.bool,
  t: PropTypes.func
};

export default translate('user')(DLVerification);
