import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout } from '@gqlapp/look-client-react';
// import { TranslateFunction } from '@gqlapp/i18n-client-react';
import { Row, Col, Icon, Radio } from 'antd';
import settings from '../../../../settings';
import CheckoutSteps from './CheckoutSteps';
import OrderCard from './OrderCard';
import SavedAddress from './SavedAddress';
import naruto2 from '../resources/naruto2.jpg';
import AddNewAddress from './AddNewAddress';

const renderMetaData = () => (
  <Helmet
    title={`${settings.app.name} - Bill`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${'meta'}` }]}
  />
);

export default class CheckoutBillView extends React.Component {
  state = {
    product: {
      name: 'Canon EOS 70D DSLR Camera Bundle with Canon EF-S 18-55mm f/3.5- 5.6 IS ',
      image: naruto2,
      days: 4,
      date: {
        start: "04 Jan'19",
        end: "07 Jan'19"
      },
      refund: 5000,
      totalRent: 1300
    },
    address: [],
    visible: false,
    value: []
  };

  //Storing values in state.
  componentDidMount() {
    const address = this.state.address;
    const obj = {};
    const obj1 = {};
    obj.id = 1;
    obj.name = 'Ankit Jain';
    obj.streetAddress1 = 'Room A308, Manas Hostel, IITG';
    obj.streetAddress2 = 'Guwahati, North Guwahati';
    obj.city = 'Guwahati';
    obj.state = 'Assam';
    obj.pinCode = '7810390';
    address.push(obj);

    obj1.id = 2;
    obj1.name = 'Ankit Jain-2';
    obj1.streetAddress1 = 'Room A308, Manas Hostel, IITG-2';
    obj1.streetAddress2 = 'Guwahati, North Guwahati-2';
    obj1.city = 'Guwahati-2';
    obj1.state = 'Assam-2';
    obj1.pinCode = '7810390-2';
    address.push(obj1);

    this.setState({ address });
  }

  showModal = adres => {
    if (adres) {
      this.setState({ visible: true, value: adres });
    } else {
      this.setState({ visible: true });
      this.handleAddAddress;
    }
  };

  hideModal = () => {
    this.setState({ visible: false });
  };

  handleSave = value => {
    const form = this.formRef.props.form;
    const address = this.state.address;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      //Adding new/ Updating address on the db.
      let addressInDb = address.find(a => a.id === values.id) || {};

      // Dont write "addressInDb = values;" coz addressInDb.id would be undefined which will break the futher code.
      addressInDb.name = values.name;
      addressInDb.streetAddress1 = values.streetAddress1;
      addressInDb.streetAddress2 = values.streetAddress2;
      addressInDb.city = values.city;
      addressInDb.state = values.state;
      addressInDb.pinCode = values.pinCode;

      this.handleAddressPush(addressInDb, address, form, value);
    });
  };

  handleAddressPush = (addressInDb, address, form, value) => {
    if (!addressInDb.id && !value.id) {
      addressInDb.id = Date.now().toString();
      address.push(addressInDb);
    } else {
      const index = address.indexOf(value);
      addressInDb.id = value.id;
      address[index] = { ...addressInDb };
    }
    this.setState({ address });
    console.log('Received values from state/server: ', this.state.address);
    form.resetFields();
    this.setState({ visible: false });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleDelete = adres => {
    const address = this.state.address;
    const newAddress = address.filter(m => m.id !== adres.id);
    this.setState({ address: newAddress });
    console.log('This address has been deleted');
  };

  handleChange = data => {
    const address = this.state.address;
    address[data.id] = data;
    this.setState({ address });
  };

  handleAddAddress = () => {
    <AddNewAddress
      wrappedComponentRef={this.saveFormRef}
      visible={this.state.visible}
      onCancel={this.hideModal}
      onSave={this.handleSave}
      value=""
      onChange={this.handleChange}
      onSelect={this.handleSelected}
    />;
  };

  handleSelected = adres => {
    this.setState({ value: adres });
    console.log('selected value', adres);
  };

  render() {
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="checkoutDiv">
          <Row>
            <Col lg={{ span: 22, offset: 2 }} xs={{ span: 24, offset: 0 }}>
              <CheckoutSteps step={1} />
            </Col>
            <Col span={24}>
              <h3 className="billingAddress">Billing Address</h3>
              <br />
            </Col>
            <Col lg={14} sm={24}>
              <Row gutter={32}>
                <Col
                  xs={{ span: 18, offset: 3 }}
                  sm={{ span: 12, offset: 0 }}
                  md={{ span: 10, offset: 0 }}
                  className="PadB30"
                >
                  <Radio.Group defaultValue={this.state.address[0]}>
                    <SavedAddress
                      address={this.state.address}
                      onDelete={this.handleDelete}
                      visible={this.state.visible}
                      onCancel={this.hideModal}
                      onSave={this.handleSave}
                      onShowModal={this.showModal}
                      saveFormRef={this.saveFormRef}
                      value={this.state.value}
                      onChange={this.handleChange}
                      onSelect={this.handleSelected}
                    />
                  </Radio.Group>
                </Col>
                <Col
                  xs={{ span: 14, offset: 5 }}
                  sm={{ span: 10, offset: 0 }}
                  md={{ span: 6, offset: 0 }}
                  className="PadB30"
                >
                  <div className="AddNewAddressBlock" onClick={this.showModal}>
                    <div className="AddNewAddress">
                      <Icon type="plus" />
                    </div>
                    <h5>Add a new address</h5>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={{ span: 8, offset: 0 }} xs={{ span: 24, offset: 0 }}>
              <OrderCard product={this.state.product} paid={false} buttonText={'Continue'} />
            </Col>
          </Row>
        </div>
      </PageLayout>
    );
  }
}
