import React from 'react';
import { Row, Col, Icon, Button, Form, Radio, Modal, Popconfirm, message } from 'antd';
import { RenderField } from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
// const RadioButton = Radio.Button;

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
    const { arrayHelpers, name, addresses, t } = this.props;
    const label = 'profile.card.group.addresses';
    function cancel(e) {
      console.log(e);
      message.error('Click on No');
    }

    const isSelectable = this.props.isSelectable || false;

    //Form field Section-->>
    const keys = [
      { key: 'streetAddress1', label: 'streetAddress' },
      { key: 'streetAddress2', label: 'streetAddress' },
      { key: 'city', label: 'city' },
      { key: 'state', label: 'state' },
      { key: 'pinCode', label: 'pinCode' }
    ];
    let formItems = [];
    let addressCard = [];
    {
      //Geting all the fields for the form.
      this.props.addresses.map(
        (address, indexa) => (
          (formItems[indexa] = keys.map((k, indexk) => (
            <FormItem style={{ display: 'inline-block', margin: '0px 5px', width: '75%' }} key={indexk}>
              <Field
                name={`${name}[${indexa}].${k.key}`}
                component={RenderField}
                placeholder={k.label}
                type="text"
                label={t(`${label}.${k.label}`)}
                value={address[k.key]}
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

              <Row style={{ marginBottom: '8px' }}>
                <Col
                  span={12}
                  align="left"
                  // style={{ paddingRight: '20px' }}
                >
                  <Button shape="circle" size="large" onClick={() => this.modalControl(indexa, true)}>
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
                </Col>
                <Col
                  span={12}
                  align="right"
                  //  style={{ paddingRight: '20px' }}
                >
                  <Popconfirm
                    title="Are you sure to delete this address?"
                    onConfirm={() => arrayHelpers.remove(indexa)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="danger" shape="circle" size="large">
                      <Icon type="delete" />
                    </Button>
                  </Popconfirm>
                </Col>
              </Row>
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
                <Radio.Group>
                  {addresses.map((address, indexas) =>
                    isSelectable ? (
                      <Radio
                        key={indexas}
                        value={address}
                        // onClick={() => onSelect(address)}
                      >
                        {addressCard[indexas]}
                      </Radio>
                    ) : (
                      addressCard[indexas]
                    )
                  )}
                </Radio.Group>
              </Col>
              <Col
                xs={{ span: 14, offset: 5 }}
                sm={{ span: 10, offset: 0 }}
                md={{ span: 8, offset: 0 }}
                className="PadB30"
              >
                <div style={{ marginTop: 16 }} className="AddNewAddressBlock" onClick={this.handleAddAddress}>
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
  t: PropTypes.func,
  addresses: PropTypes.any,
  name: PropTypes.any,
  label: PropTypes.any,
  keys: PropTypes.any,
  isSelectable: PropTypes.bool,
  arrayHelpers: PropTypes.object
};
