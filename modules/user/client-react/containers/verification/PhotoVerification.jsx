import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import { message } from "antd";
import VerificationModalComponent from "../../components/verification/VerificationModalComponent";
import PhotoVerificationFormComponent from "../../components/verification/PhotoVerificationFormComponent";

import ADD_PHOTO from "../../graphql/AddPhotoId.graphql";

class PhotoIdAdd extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
    this.state = {
      loading: false,
      vStatus: props.photoId && props.photoId.isVerified
    };
  }

  onSubmit = async values => {
    try {
      message.info("Please wait...");
      this.setState({ loading: true });
      await this.props.addUserPhotoId({ image: values });
    } catch (e) {
      message.error("Action failed");
      this.setState({ loading: false });
      throw e;
    }
    this.setState({ loading: false });
    message.success("Sit back and relax while we verify your document.");
    window.location.reload();
  };

  render() {
    return (
      <VerificationModalComponent
        button="Photo with ID"
        title="PhotoID Verification"
        vStatus={this.state.vStatus}
      >
        <PhotoVerificationFormComponent
          photoId={this.props.photoId}
          onSubmit={this.onSubmit}
          loading={this.state.loading}
        />
      </VerificationModalComponent>
    );
  }
}

PhotoIdAdd.propTypes = {
  photoId: PropTypes.object,
  addUserPhotoId: PropTypes.func.isRequired
};

export default graphql(ADD_PHOTO, {
  props: ({ mutate }) => ({
    addUserPhotoId: async input => {
      let { data: addUserPhotoId } = await mutate({
        variables: { input }
      });

      return addUserPhotoId;
    }
  })
})(PhotoIdAdd);
