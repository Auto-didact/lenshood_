import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { FormError } from '@gqlapp/forms-client-react';

import { Button } from 'antd';
import VerificationModal from '../../components/verification/VerificationModal';
import DLVerificationForm from '../../components/verification/DLVerificationForm';

import ADD_DL from '../../graphql/AddDrivingLicense.graphql';

const DrivingLicense = dl => {
  return <div>{JSON.stringify(dl)}</div>;
};

class DLAdd extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
    this.state = {
      loading: false,
      form: true,
      verified: false
    };

    this.setDrivingLicense = this.setDrivingLicense.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  setDrivingLicense(dl) {
    this.setState({ dl: dl });
  }

  onSubmit(addDL) {
    return async values => {
      const dl = await addDL(values.dlId, values.dob);
      this.setDrivingLicense(dl);
    };
  }

  onChange(values) {
    this.setState({ loading: true, form: false });
    this.onSubmit(this.props.addDL)(values);
    this.setState({ loading: false, verified: true });
  }

  // async onSubmit(values, addDL) {
  //   console.log(addDL);
  //   // addDL(values.dlId, values.dob);
  // }

  render() {
    return (
      <VerificationModal button="Identification" title="Driving License Verification" vStatus={this.props.vStatus}>
        {this.state.loading ? 'Loading...' : ''}
        {this.state.form ? <DLVerificationForm onSubmit={this.onChange} /> : ''}
        {this.state.verified ? <DrivingLicense dl={this.state.dl} /> : ''}
      </VerificationModal>
    );
  }
}

DLAdd.propTypes = {
  vStatus: PropTypes.bool,
  addDL: PropTypes.func.isRequired
};

export default graphql(ADD_DL, {
  props: ({ ownProps: { history, navigation }, mutate }) => ({
    addDL: async (dlId, dob) => {
      let DLData = await mutate({
        variables: { input: { dlId: dlId.trim(), dob: dob.trim() } }
      });

      return DLData.data.addUserDrivingLicense;
    }
  })
})(DLAdd);
