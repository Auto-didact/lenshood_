import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { FormGroup, Label } from 'reactstrap';
import { Form, RenderField, Button, Alert } from '../../common/components/web';

const required = value => (value ? undefined : 'Required');

class SubscriptionCardForm extends React.Component {
  static defaultProps = {
    submitting: false,
    action: '',
    error: '',
    handleSubmit: () => {},
    onSubmit: () => {}
  };

  static propTypes = {
    submitting: PropTypes.bool,
    action: PropTypes.string.isRequired,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func
  };

  onSubmit = async ({ name }) => {
    const { stripe } = this.props;
    const { token, error } = await stripe.createToken({ name });
    if (error) return;

    const { id, card: { exp_month, exp_year, last4, brand } } = token;

    await this.props.onSubmit({
      token: id,
      expiryMonth: exp_month,
      expiryYear: exp_year,
      last4,
      brand
    });
  };

  render() {
    const { handleSubmit, submitting, action, error } = this.props;
    return (
      <Form name="subscription" onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="name" component={RenderField} type="text" label="Name On Card" validate={required} />
        <FormGroup>
          <Label>Payment Info</Label>
          <div>
            <CardElement className="form-control" style={{ base: { lineHeight: '30px' } }} />
          </div>
        </FormGroup>
        {error && <Alert color="error">{error}</Alert>}
        <Button color="primary" type="submit" disabled={submitting}>
          {action}
        </Button>
      </Form>
    );
  }
}

export default injectStripe(
  reduxForm({
    form: 'subscription'
  })(SubscriptionCardForm)
);
