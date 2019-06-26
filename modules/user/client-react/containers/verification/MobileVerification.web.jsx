import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Alert, Button } from 'antd';
import { Loader } from '@gqlapp/look-client-react';
import VerificationModal from '../../components/verification/VerificationModal';
import MobileVerificationForm from '../../components/verification/MobileVerificationForm';
import Mobile from '../../components/verification/Mobile';

import ADD_Mobile from '../../graphql/AddMobile.graphql';

class MobileAdd extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
    this.state = {
      loading: false,
      form: props.mobile && props.mobile.isVerified ? false : true,
      otp: false,
      vStatus: props.mobile && props.mobile.isVerified,
      mobile: props.mobile || null
    };

    this.setMobile = this.setMobile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  setMobile(mobile) {
    this.setState({ mobile: mobile });
  }

  toggleLoading() {
    this.setState({ loading: !this.state.loading });
  }

  onSubmit(addMobile) {
    return async values => {
      // To Do call mobile Data check if verified or not
      const mobileData = await addMobile(values.mobile, values.otp);
      if (mobileData.otpSent && typeof values.otp === 'undefined') {
        this.setState({ otp: true, mobileNo: values.mobile });
      } else if (!mobileData.otpSent) {
        console.log('unable to send otp!');
      } else {
        // set error or verified
        if (mobileData.error && !mobileData.isVerified) {
          this.setState({ error: mobileData.error });
        } else {
          this.setState({
            vStatus: true,
            error: null,
            otp: false,
            form: false
          });
          this.setMobile(mobileData);
        }
      }
    };
  }

  async onChange(values) {
    console.log('submit clicked!');
    // fix this
    this.setState({ loading: true });
    await this.onSubmit(this.props.addMobile)(values);
    this.setState({ loading: false });
  }

  // async onSubmit(values, addMobile) {
  //   console.log(addMobile);
  //   // addMobile(values.mobileId, values.dob);
  // }

  render() {
    return (
      <VerificationModal button="Mobile" title="Mobile Verification" vStatus={this.state.vStatus}>
        {this.state.loading ? <Loader text="Loading..." /> : ''}
        {this.state.otp ? <Alert message={`An OTP has been sent to ${this.state.mobileNo}`} /> : ''}
        {this.state.error ? <Alert type="error" message={`Error Occurred: `} description={this.state.error} /> : ''}
        {this.state.form ? <MobileVerificationForm otp={this.state.otp} onSubmit={this.onChange} /> : ''}

        {this.state.vStatus ? <Mobile mobile={this.state.mobile} /> : ''}
      </VerificationModal>
    );
  }
}
MobileAdd.propTypes = {
  vStatus: PropTypes.bool,
  addMobile: PropTypes.func.isRequired,
  mobile: PropTypes.object
};

export default graphql(ADD_Mobile, {
  props: ({ ownProps: { history, navigation }, mutate }) => ({
    addMobile: async (mobile, otp) => {
      let MobileData = await mutate({
        variables: { input: { mobile: mobile, otp: otp } }
      });

      return MobileData.data.addUserMobile;
    }
  })
})(MobileAdd);
