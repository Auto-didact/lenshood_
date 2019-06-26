import React from 'react';
import { Row, Col, Icon, Button, Form, Radio, Modal } from 'antd';
import { RenderField } from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

export default class RenderAddress extends React.Component {
  state = {
    visible: []
  };

  componentDidMount() {
    const visible = this.state.visible;
    this.props.addresses.map((a, indexa) => {
      visible[indexa] = false;
    });
    this.setState({ visible });
    console.log('state.visible', this.state.visible);
  }

  modalControl = (index, visiblity) => {
    console.log('index, visiblity', index, visiblity);
    let visible = this.state.visible;
    visible[index] = visiblity;
    this.setState({ visible });
    console.log('state.visible', this.state.visible);
  };

  handleAddAddress = () => {
    const { arrayHelpers, addresses } = this.props;
    const obj = {};
    // const keys = ['name', 'streetAddress1', 'streetAddress2', 'city', 'state', 'pinCode', 'mobile'];
    const keys = [
      { key: 'streetAddress1' },
      { key: 'streetAddress2' },
      { key: 'city' },
      { key: 'state' },
      { key: 'pinCode' }
    ];
    keys.map(k => (obj[k.key] = ''));
    arrayHelpers.push(obj);

    //Setting the visiblity
    const visible = this.state.visible;
    visible[addresses.length] = true;
    this.setState({ visible });
  };

  render() {
    const { arrayHelpers, name, addresses } = this.props;

    const isSelectable = this.props.isSelectable || false;
    //Form field Section-->>
    const keys = ['streetAddress1', 'streetAddress2', 'city', 'state', 'pinCode'];
    // const keys = [
    //   { key: 'streetAddress1', label: 'Street Address 1' },
    //   { key: 'streetAddress2', label: 'Street Address 2' },
    //   { key: 'city', label: 'City' },
    //   { key: 'state', label: 'State' },
    //   { key: 'pinCode', label: 'Pin Code' }
    // ];
    let formItems = [];
    let addressCard = [];
    {
      //Geting all the fields for the form.
      this.props.addresses.map(
        (address, indexa) => (
          (formItems[indexa] = keys.map((k, indexk) => (
            <FormItem style={{ display: 'inline-block', margin: '0px 5px', width: '75%' }} key={indexk}>
              <Field
                name={`${name}[${indexa}].${k}`}
                component={RenderField}
                placeholder={k}
                type="text"
                label={`${k}`}
                value={address[k]}
              />
            </FormItem>
          ))),
          //Geting all the addressCard.
          (addressCard[indexa] = (
            <div style={{ marginTop: 16 }} className="HomeAddress" key={indexa}>
              <div className="HomeAddressBlock">Home Address {/* <Icon type="home" className="homeicon" /> */}</div>
              <br />
              <div className="addressLines">
                <h4>{address.streetAddress1 && address.streetAddress1 + ','}</h4>
                <h4>{address.streetAddress2 && address.streetAddress2 + ','}</h4>
                <h4>{address.city && address.city + ','}</h4>
                <h4>{address.state && address.state + ','}</h4>
                <h4>{address.pinCode && address.pinCode + ','}</h4>
              </div>
              <Button className="addressIcons" ghost onClick={() => arrayHelpers.remove(indexa)}>
                <Icon type="delete" />
              </Button>
              <Button className="addressIcons" onClick={() => this.modalControl(indexa, true)} ghost>
                <Icon type="edit" />
              </Button>
              <Modal
                visible={this.state.visible[indexa]}
                title="Address"
                okText="Ok"
                onCancel={() => this.modalControl(indexa, false)}
                onOk={() => this.modalControl(indexa, false)}
              >
                <div>
                  <FormItem>{formItems[indexa]}</FormItem>
                </div>
              </Modal>
            </div>
          ))
        )
      );
    }

    return (
      <>
        <Row gutter={32} align="top">
          <Col span={24}>
            <h3 className="Addresses">Address</h3>
            <br />
          </Col>
          <Col lg={14} sm={24} align="top">
            <Row gutter={32} align="top">
              <Col
                xs={{ span: 18, offset: 3 }}
                sm={{ span: 12, offset: 0 }}
                md={{ span: 10, offset: 0 }}
                className="PadB30"
              >
                {addresses.map((address, indexas) =>
                  isSelectable ? (
                    <Radio.Button
                      key={indexas}
                      value={address}
                      // onClick={() => onSelect(address)}
                    >
                      addressCard[indexas]
                    </Radio.Button>
                  ) : (
                    addressCard[indexas]
                  )
                )}
              </Col>
              <Col
                xs={{ span: 14, offset: 5 }}
                sm={{ span: 10, offset: 0 }}
                md={{ span: 8, offset: 0 }}
                className="PadB30"
              >
                <div className="AddNewAddressBlock" onClick={this.handleAddAddress}>
                  <div className="AddNewAddress">
                    <Icon type="plus" />
                  </div>
                  <h5>Add a new address</h5>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }

  // render() {
  //   return <Button style={{ width: '30%' }} onClick={this.add} />;
  // }
}

RenderAddress.propTypes = {
  addresses: PropTypes.any,
  name: PropTypes.any,
  keys: PropTypes.any,
  isSelectable: PropTypes.bool,
  arrayHelpers: PropTypes.object
};
