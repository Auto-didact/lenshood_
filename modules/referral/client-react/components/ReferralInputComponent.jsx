import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { Modal, Card, message } from "antd";
import {
  Button,
  Form,
  RenderAutoComplete,
  Alert
} from "@gqlapp/look-client-react";
import PropTypes from "prop-types";
import { withFormik } from "formik";
import { FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { required, validate } from "@gqlapp/validation-common-react";
import USERS_QUERY from "@gqlapp/user-client-react/graphql/ListingUserQuery.graphql";

const ReferralInputComponentSchema = {
  referral: [required]
};

class ReferralInputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.searchResult = this.searchResult.bind(this);
  }

  handleSearch = value => {
    this.setState({
      dataSource: value ? this.searchResult(value) : []
    });
  };

  searchResult(query) {
    var items = this.props.users.filter(
      item =>
        item.username.toUpperCase().includes(query.toUpperCase()) ||
        (item.profile &&
          ((item.profile.firstName &&
            item.profile.firstName
              .toUpperCase()
              .includes(query.toUpperCase())) ||
            (item.profile.lastName &&
              item.profile.lastName
                .toUpperCase()
                .includes(query.toUpperCase()))))
    );
    return items;
  }
  render() {
    const {
      prevReferral,
      modal2Visible,
      setModal2Visible,
      values,
      handleSubmit,
      submitting,
      errors,
      users
    } = this.props;
    return (
      <Modal
        title={
          <strong>{prevReferral ? "Change Referral" : "Add Referral"}</strong>
        }
        centered
        footer={null}
        bodyStyle={{ padding: 0 }}
        visible={modal2Visible}
        onCancel={() => setModal2Visible(false)}
      >
        <Card>
          {prevReferral ? (
            <h3>
              Previously used referral:
              <span className="mainColor">{` ${prevReferral}`}</span>
            </h3>
          ) : null}
          <Form name="invite" onSubmit={handleSubmit}>
            <Field
              name="referral"
              dataSource={this.state.dataSource.map(item => item.username)}
              component={RenderAutoComplete}
              placeholder="Enter referral"
              value={values.referral}
              onSearch={this.handleSearch}
            />
            <Button type="submit" disabled={submitting} color="primary" ghost>
              Submit
            </Button>
            <div className="text-center">
              {errors && errors.errorMsg && (
                <Alert color="error">{errors.errorMsg}</Alert>
              )}
            </div>
          </Form>
        </Card>
      </Modal>
    );
  }
}

ReferralInputComponent.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  errors: PropTypes.object,
  users: PropTypes.array,
  values: PropTypes.object,
  prevReferral: PropTypes.string,
  refUsername: PropTypes.string,
  referredId: PropTypes.number
};

const ReferralInputComponentWithFormik = withFormik({
  mapPropsToValues: () => ({
    referral: ""
  }),
  validate: values => validate(values, ReferralInputComponentSchema),
  async handleSubmit(
    values,
    {
      props: {
        referredId,
        refUsername,
        refSubmit,
        prevReferral,
        users,
        setModal2Visible
      }
    }
  ) {
    if (refUsername === values.referral) {
      message.error("You cannot use your username as referral.");
    } else if (prevReferral === values.referral) {
      message.error("The referral is similar to the previous one.");
    } else if (users.some(item => item.username === values.referral)) {
      values.referredId = referredId;
      values.flag = prevReferral ? false : true;
      refSubmit(values);
    } else {
      message.error("There's no user with such username.");
    }

    setModal2Visible(false);
  },
  enableReinitialize: true,
  displayName: "inviteForm" // helps with React DevTools
});

export default compose(
  graphql(USERS_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        fetchPolicy: "network-only",
        variables: { orderBy, filter }
      };
    },
    props({
      data: { loading, users, refetch, error, updateQuery, subscribeToMore }
    }) {
      return {
        loading,
        users,
        refetch,
        subscribeToMore,
        updateQuery,
        errors: error ? error.graphQLErrors : null
      };
    }
  })
)(ReferralInputComponentWithFormik(ReferralInputComponent));
