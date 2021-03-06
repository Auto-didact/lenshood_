import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Alert } from 'antd';
import VerificationModal from '../../components/verification/VerificationModal';
import EmailVerificationForm from '../../components/verification/EmailVerificationForm';

import ADD_Email from '../../graphql/AddEmail.graphql';

const Email = data => {
  return <Alert message={`An Email has been sent to ${data.email}`} type="info" />;
};

class EmailAdd extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
    this.state = {
      loading: false,
      form: true,
      vStatus: props.vStatus,
      sent: false
    };

    this.setEmail = this.setEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  setEmail(email) {
    this.setState({ email: email, form: false, sent: true });
  }

  onSubmit(addEmail) {
    return async values => {
      console.log(values);
      // To Do change email values in set email, uncomment below line
      // const emailData = await addEmail(values.email, values.otp);
      this.setEmail(values.email);
    };
  }

  onChange(values) {
    this.setState({ loading: true });
    this.onSubmit(this.props.addEmail)(values);
    this.setState({ loading: false });
  }

  // async onSubmit(values, addEmail) {
  //   console.log(addEmail);
  //   // addEmail(values.emailId, values.dob);
  // }

  render() {
    return (
      <VerificationModal button="Email" title="Email Verification" vStatus={this.state.vStatus}>
        {this.state.loading ? 'Loading...' : ''}
        {this.state.form ? <EmailVerificationForm otp={this.state.otp} onSubmit={this.onChange} /> : ''}
        {this.state.sent ? <Email email={this.state.email} /> : ''}
      </VerificationModal>
    );
  }
}

EmailAdd.propTypes = {
  vStatus: PropTypes.bool,
  addEmail: PropTypes.func.isRequired
};

export default graphql(ADD_Email, {
  props: ({ ownProps: { history, navigation }, mutate }) => ({
    addEmail: async (email, otp) => {
      let EmailData = await mutate({
        variables: { input: { email: email, otp: otp } }
      });

      return EmailData.data.addUserEmail;
    }
  })
})(EmailAdd);
