import React, { Component } from "react";
import PropTypes from "prop-types";
import { FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { withFormik } from "formik";
import { RenderAutoComplete, Form, Button } from "@gqlapp/look-client-react";
import { Icon } from "antd";

class UserDemoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // FOR RENDERAUTOCOMPLETE
      dataSource: []
    };
    // FOR RENDERAUTOCOMPLETE
    this.handleSearch = this.handleSearch.bind(this);
    // this.renderOption = this.renderOption.bind(this);
    this.searchResult = this.searchResult.bind(this);
  }

  // FOR RENDERAUTOCOMPLETE
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
          (item.profile.firstName.toUpperCase().includes(query.toUpperCase()) ||
            item.profile.lastName.toUpperCase().includes(query.toUpperCase())))
    );
    return items;
  }

  render() {
    const { values, handleSubmit, submitting } = this.props;
    return (
      <Form name="listing" layout="vertical" onSubmit={handleSubmit}>
        {/* // FOR RENDERAUTOCOMPLETE */}
        <Field
          name="userId"
          dataSource={this.state.dataSource.map(item => item.username)}
          component={RenderAutoComplete}
          label="UserName"
          value={values.userId}
          onSearch={this.handleSearch}
        />
        <Button color="primary" type="submit" disabled={submitting}>
          Submit
          <Icon type="enter" />
        </Button>
      </Form>
    );
  }
}

UserDemoView.propTypes = {
  props: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object
};

const ListingFormWithFormik = withFormik({
  mapPropsToValues: props => ({
    // FOR RENDERAUTOCOMPLETE
    userId: null
  }),
  handleSubmit(values) {
    console.log(values);
  },
  enableReinitialize: true,
  displayName: "ListingForm" // helps with React DevTools
});

export default ListingFormWithFormik(UserDemoView);
