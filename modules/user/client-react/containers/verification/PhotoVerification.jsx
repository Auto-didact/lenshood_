import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import { message } from "antd";
import { Loader } from "@gqlapp/look-client-react";
import VerificationModalComponent from "../../components/verification/VerificationModalComponent";
import PhotoVerificationFormComponent from "../../components/verification/PhotoVerificationFormComponent";

import ADD_Email from "../../graphql/AddEmail.graphql";

class EmailAdd extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
    this.state = {
      loading: false,
      vStatus: props.email && props.email.isVerified,
      photoId: {
        image: "gfhjg",
        isVerified: false
      },
      status: false
    };

    this.setphotoId = this.setphotoId.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  setphotoId(val) {
    let data = {
      image: val,
      isVerified: true
    };

    console.log("--------START-----------");
    console.log(this.state.photoId);
    this.setState({ photoId: data, status: true });
    console.log(this.state.photoId);
    console.log("---------END------------");
  }

  onSubmit(values) {
    this.setphotoId(values);
    message.info("Sit back and relax while we verify your document.");
  }

  onChange(values) {
    this.setState({ loading: true });
    this.onSubmit(values);
    this.setState({ loading: false });
  }

  render() {
    return (
      <VerificationModalComponent
        button="PhotoID verification"
        title="PhotoID Verification"
        vStatus={false}
      >
        {this.state.loading ? <Loader text="Loading..." /> : ""}
        {this.state.vStatus ? (
          <PhotoVerificationFormComponent
            photoId={this.state.photoId}
            email={this.state.email}
            onSubmit={this.onChange}
          />
        ) : (
          ""
        )}
      </VerificationModalComponent>
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
