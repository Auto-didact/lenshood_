import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import {Spin} from 'antd';
import VerificationModal from "../../components/verification/VerificationModal";
import DLVerificationForm from "../../components/verification/DLVerificationForm";
import DrivingLicense from "../../components/verification/DrivingLicense";
import ADD_DL from "../../graphql/AddDrivingLicense.graphql";

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
      <VerificationModal
        button="Identification"
        title="Driving License Verification"
        vStatus={this.state.vStatus}
      >
        {this.state.loading ? <div className="text-center" style={{marginTop:'50%',textAlign:'center'}}><Spin size="large"/><br/>Loading...</div> : ""}
        {this.state.form ? <DLVerificationForm onSubmit={this.onChange} /> : ""}
        {this.state.verified ? <DrivingLicense dl={this.state.dl} /> : ""}
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
