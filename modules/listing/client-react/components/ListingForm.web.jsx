import React, { Component } from "react";
import PropTypes from "prop-types";
import { withFormik } from "formik";
import { translate } from "@gqlapp/i18n-client-react";
import { required, validate } from "@gqlapp/validation-common-react";

import { Form, Button } from "@gqlapp/look-client-react";
// Abstract Out
import { Row, Col, Icon, message } from "antd";

import ProductDetails from "./components/ListingForm/ProductDetails";
import RentalDetails from "./components/ListingForm/RentalDetails";
import ListYGSteps from "./components/ListYGSteps";
import { UserDetails } from "@gqlapp/user-client-react";

const ProductDetailsSchema = {
  gearCategory: [required],
  gearSubcategory: [required]
};

class ListingForm extends Component {
  constructor(props) {
    super(props);
    this.state = { step: 0 };

    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.secondstep = this.secondstep.bind(this);
  }

  nextStep = async () => {
    let errors = await this.props.validateForm(this.props.values);
    var isErrorsEmpty = !Object.keys(errors).length;
    // console.log(errors);
    // console.log(this.props.values);
    if (isErrorsEmpty) this.setState(state => ({ step: state.step + 1 }));
    else message.info("Fill in the Required details before moving on!");

    // set errors and touched
  };
  prevStep = () => {
    this.setState(state => ({ step: state.step - 1 }));
  };

  secondstep = () => {
    this.setState(state => ({ step: state.step + 1 }));
  };

  isAdminFunction = role => {
    if (role === "admin") {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { values, handleSubmit, submitting, t, currentUser } = this.props;
    const isAdmin = this.isAdminFunction(
      currentUser && currentUser.role ? currentUser.role : null
    );
    // console.log("currentUser Listings", this.props.listing);
    // const userRole = currentUser.role;
    this.steps = [
      <UserDetails />,
      <ProductDetails
        values={values}
        t={t}
        User={currentUser}
        users={this.props.users}
        isAdmin={isAdmin}
      />,
      <RentalDetails values={values} t={t} isAdmin={isAdmin} />
    ];

    return (
      <div className="Listyourgearcards">
        <Row>
          <Col
            md={{ span: 14, offset: 5 }}
            sm={{ span: 20, offset: 2 }}
            className="LYGcol1"
          >
            <ListYGSteps step={this.state.step} />

            <Form name="listing" layout="vertical" onSubmit={handleSubmit}>
              {this.steps[this.state.step]}

              {this.state.step == 0 ? (
                <Button
                  color="primary"
                  onClick={this.secondstep}
                  style={{ float: "right" }}
                >
                  {t("listing.btn.next")}
                  <Icon type="right-circle" />
                </Button>
              ) : this.state.step == this.steps.length - 1 ? (
                <>
                  <Button color="secondary" onClick={this.prevStep}>
                    <Icon type="left-circle" />
                    {t("listing.btn.prev")}
                  </Button>

                  {/* abstract out styles To Do, and arrows to button */}
                  <Button
                    color="primary"
                    type="submit"
                    disabled={submitting}
                    style={{ float: "right" }}
                  >
                    {t("listing.btn.submit")}
                    <Icon type="enter" />
                  </Button>
                </>
              ) : (
                <>
                  <Button color="secondary" onClick={this.prevStep}>
                    <Icon type="left-circle" />
                    {t("listing.btn.prev")}
                  </Button>

                  {/* abstract out styles To Do, and arrows to button */}
                  <Button
                    color="primary"
                    onClick={this.nextStep}
                    style={{ float: "right" }}
                  >
                    {t("listing.btn.next")}
                    <Icon type="right-circle" />
                  </Button>
                </>
              )}
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

ListingForm.propTypes = {
  validateForm: PropTypes.func,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  listing: PropTypes.object,
  currentUser: PropTypes.object,
  t: PropTypes.func
};

const ListingFormWithFormik = withFormik({
  mapPropsToValues: props => ({
    // FOR RENDERAUTOCOMPLETE
    // userId: props.listing && props.listing.user.id,
    //
    gearCategory: props.listing && props.listing.gearCategory,
    gearSubcategory: props.listing && props.listing.gearSubcategory,
    description: props.listing && props.listing.description,
    status: (props.listing && props.listing.status) || "Idle",
    isActive: (props.listing && props.listing.isActive) || true,
    listingImages: props.listing && props.listing.listingImages,
    listingDetail: (props.listing && props.listing.listingDetail) || {},
    listingRental: (props.listing && props.listing.listingRental) || {},
    listingContent: (props.listing && props.listing.listingContent) || []
  }),
  validate: values => validate(values, ProductDetailsSchema),
  handleSubmit(
    values,
    {
      props: { onSubmit }
    }
  ) {
    console.log(values);
    onSubmit(values);
  },
  enableReinitialize: true,
  displayName: "ListingForm" // helps with React DevTools
});

export default translate("listing")(ListingFormWithFormik(ListingForm));
