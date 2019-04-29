import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { translate } from '@gqlapp/i18n-client-react';
import { required, validate } from '@gqlapp/validation-common-react';

import { Form, Button } from '@gqlapp/look-client-react';
// Abstract Out
import { Row, Col } from 'antd';

import ProductDetails from './components/ListingForm/ProductDetails';
import RentalDetails from './components/ListingForm/RentalDetails';
import ListYGSteps from './components/ListYGSteps';

const listingFormSchema = {
  gearCategory: [required],
  gearSubcategory: [required],
  description: [required]
};

class ListingForm extends Component {
  constructor(props) {
    super(props);
    this.state = { step: 0 };

    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
  }

  nextStep = () => {
    this.setState(state => ({ step: state.step + 1 }));
  };
  prevStep = () => {
    this.setState(state => ({ step: state.step - 1 }));
  };

  render() {
    const { values, handleSubmit, submitting, t } = this.props;
    this.steps = [<ProductDetails values={values} t={t} />, <RentalDetails values={values} t={t} />];

    return (
      <div className="Listyourgearcards">
        <Row>
          <Col md={{ span: 14, offset: 5 }} sm={{ span: 20, offset: 2 }} className="LYGcol1">
            <ListYGSteps step={this.state.step + 1} />

            <Form name="listing" layout="vertical" onSubmit={handleSubmit}>
              {this.steps[this.state.step]}

              {this.state.step === this.steps.length - 1 ? (
                <>
                  <Button color="secondary" onClick={this.prevStep}>
                    {t('listing.btn.prev')}
                  </Button>

                  {/* abstract out styles To Do, and arrows to button */}
                  <Button color="primary" type="submit" disabled={submitting} style={{ float: 'right' }}>
                    {t('listing.btn.submit')}
                  </Button>
                </>
              ) : (
                <Button color="primary" onClick={this.nextStep} style={{ float: 'right' }}>
                  {t('listing.btn.next')}
                </Button>
              )}
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

ListingForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  listing: PropTypes.object,
  t: PropTypes.func
};

const ListingFormWithFormik = withFormik({
  mapPropsToValues: props => ({
    gearCategory: props.listing && props.listing.gearCategory,
    gearSubcategory: props.listing && props.listing.gearSubcategory,
    description: props.listing && props.listing.description,
    status: (props.listing && props.listing.status) || 'idle',
    isActive: (props.listing && props.listing.isActive) || false,
    listingImages: props.listing && props.listing.listingImages,
    listingDetail: (props.listing && props.listing.listingDetail) || {},
    listingRental: (props.listing && props.listing.listingRental) || {},
    listingContent: (props.listing && props.listing.listingContent) || []
  }),
  validate: values => validate(values, listingFormSchema),
  handleSubmit(
    values,
    {
      props: { onSubmit }
    }
  ) {
    // console.log(values);
    onSubmit(values);
  },
  enableReinitialize: true,
  displayName: 'ListingForm' // helps with React DevTools
});

export default translate('listing')(ListingFormWithFormik(ListingForm));
