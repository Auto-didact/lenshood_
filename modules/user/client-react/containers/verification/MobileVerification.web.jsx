import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import VerificationModal from '../../components/verification/VerificationModal';
import MobileVerificationForm from '../../components/verification/MobileVerificationForm';

import ADD_Mobile from '../../graphql/AddMobile.graphql';

const Mobile = mobile => {
  return <div>{JSON.stringify(mobile)}</div>;
};

class MobileAdd extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
    this.state = {
      loading: false,
      form: true,
      otp: false,
      verified: false
    };

    this.setMobile = this.setMobile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  setMobile(mobile) {
    this.setState({ mobile: mobile });
  }

  onSubmit(addMobile) {
    return async values => {
      console.log(values);
      var mobileData = {};
      if (typeof values.otp === 'undefined') {
        this.setState({ otp: true });
      } else {
        mobileData.isVerified = true;
        mobileData.mobile = values.mobile;
        mobileData.otp = values.otp;
      }

      // To Do call mobile Data check if verified or not
      // const mobileData = await addMobile(values.mobile, values.otp);

      if (mobileData.isVerified) {
        this.setState({ form: false, verified: true });
      }
      this.setMobile(mobileData);
    };
  }

  onChange(values) {
    this.setState({ loading: true });
    this.onSubmit(this.props.addMobile)(values);
    this.setState({ loading: false });
  }

  // async onSubmit(values, addMobile) {
  //   console.log(addMobile);
  //   // addMobile(values.mobileId, values.dob);
  // }

  render() {
    return (
      <VerificationModal button="Mobile" title="Mobile Verification" vStatus={this.props.vStatus}>
        {this.state.loading ? 'Loading...' : ''}
        {this.state.form ? <MobileVerificationForm otp={this.state.otp} onSubmit={this.onChange} /> : ''}
        {this.state.verified ? <Mobile mobile={this.state.mobile} /> : ''}
      </VerificationModal>
    );
  }
}

MobileAdd.propTypes = {
  vStatus: PropTypes.bool,
  addMobile: PropTypes.func.isRequired
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
