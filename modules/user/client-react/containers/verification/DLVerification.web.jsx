import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Loader } from '@gqlapp/look-client-react';
import VerificationModalComponent from '../../components/verification/VerificationModalComponent';
import DLVerificationFormComponent from '../../components/verification/DLVerificationFormComponent';
import DrivingLicenseComponent from '../../components/verification/DrivingLicenseComponent';
import ADD_DL from '../../graphql/AddDrivingLicense.graphql';

class DLAdd extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
    this.state = {
      loading: false,
      form: true,
      verified: false,
      vStatus: props.vStatus
    };

    this.setDrivingLicense = this.setDrivingLicense.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  setDrivingLicense(dl) {
    this.setState({ dl: dl, vStatus: true });
  }

  onSubmit(addDL) {
    return async values => {
      const dl = await addDL(values.dlId, values.dob);
      this.setDrivingLicense(dl);
    };
  }

  async onChange(values) {
    this.setState({ loading: true, form: false });
    await this.onSubmit(this.props.addDL)(values);
    this.setState({ loading: false, verified: true });
  }

  // async onSubmit(values, addDL) {
  //   console.log(addDL);
  //   // addDL(values.dlId, values.dob);
  // }

  render() {
    return (
      <VerificationModalComponent button="Identification" title="Driving License Verification" vStatus={this.state.vStatus}>
        {this.state.loading ? <Loader text="Loading..." /> : ''}
        {this.state.form ? <DLVerificationFormComponent onSubmit={this.onChange} /> : ''}
        {this.state.verified ? <DrivingLicenseComponent dl={this.state.dl} /> : ''}
      </VerificationModalComponent>
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
