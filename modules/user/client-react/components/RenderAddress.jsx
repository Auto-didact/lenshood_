import React from 'react';
import { Icon, Button, Radio } from 'antd';
import PropTypes from 'prop-types';
import AddressComponent from './AddressComponent';
import AddressForm from './AddressForm';

export default class SavedAddress extends AddressComponent {
  static get propTypes() {
    return {
      addresses: PropTypes.any,
      arrayHelpers: PropTypes.object,
      onShowModal: PropTypes.func
      // onDelete: PropTypes.func,
      // onCancel: PropTypes.func,
      // onSelect: PropTypes.func,
      // value: PropTypes.any,
      // onSave: PropTypes.func,
      // visible: PropTypes.any,
      // onChange: PropTypes.func
    };
  }

  componentDidMount() {
    // console.log('CMD called');
    const visible = this.state.visible;
    // console.log('visible', visible);
    this.props.addresses.map((ad, index) => {
      // console.log('ad', ad);
      visible[index] = false;
      // visible.push(index);
      // this.state.addressCount++;
    });
    console.log('count after map inside cmd', this.props.addresses.length);
    // console.log('this.state.visible before', this.state.visible);
    this.setState({ visible });
    // console.log('this.state.visible after', this.state.visible);
  }

  render() {
    const {
      arrayHelpers,
      //  onCancel,
      onSelect,
      onSave
    } = this.props;
    const key = ['name', 'streetAddress1', 'streetAddress2', 'city', 'state', 'pinCode', 'mobile'];
    // const key = this.state.key;
    // console.log('key in renderAddress', key);
    const addresses = this.props.addresses;
    // console.log('state in render with index 0', this.state.visible[0]);
    // console.log('state in render with index 1', this.state.visible[1]);

    return (
      <React.Fragment>
        {addresses.map((address, index) => (
          <Radio.Button key={index} value={address} onClick={() => onSelect(address)}>
            {/* {console.log('this.state.visible[index]', this.state.visible[index])} */}
            <div style={{ marginTop: 16 }} className="HomeAddress">
              <div className="HomeAddressBlock">
                Home Address <Icon type="home" className="homeicon" />
              </div>
              <br />
              <div className="addressLines">
                <h4>{address.name && address.name + ','}</h4>
                <h4>{address.streetAddress1 && address.streetAddress1 + ','}</h4>
                <h4>{address.streetAddress2 && address.streetAddress2}</h4>
                <h4>{address.state && address.state + ','}</h4>
                <h4>{address.pinCode && address.pinCode + ','}</h4>
                <h4>Mobile: {address.mobile && address.mobile}</h4>
              </div>
              <Button className="addressIcons" ghost onClick={() => arrayHelpers.remove(index)}>
                <Icon type="delete" />
              </Button>
              <Button className="addressIcons" onClick={() => this.modalControl(index, true)} ghost>
                <Icon type="edit" />
              </Button>
              {/* {console.log('addressform key', key)} */}
              <AddressForm
                visible={this.state.visible[index]}
                onCancel={() => this.modalControl(index, false)}
                onSave={onSave}
                address={address}
                // key={key}
              />
            </div>
          </Radio.Button>
        ))}
        <div
          className="AddNewAddressBlock"
          onClick={() => this.handleAddAddress(arrayHelpers, true, addresses.length, key)}
        >
          <div className="AddNewAddress">
            <Icon type="plus" />
          </div>
          <h5>Add a new address</h5>
        </div>
      </React.Fragment>
    );
  }
}
