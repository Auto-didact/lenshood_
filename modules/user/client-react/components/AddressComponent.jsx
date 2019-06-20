import React from 'react';
import AddressForm from './AddressForm';

class AddressComponent extends React.Component {
  state = {
    visible: []
    // addressCount: null,
  };

  modalControl = (index, visiblity) => {
    let visible = this.state.visible;
    console.log('visible in showModal', visible);
    visible[index] = visiblity;
    this.setState({ visible });
    console.log('state visible in showModal', this.state);
  };

  // hideModal = index => {
  //   let visible = this.state.visible;
  //   console.log('visible in hideModal', visible);
  //   visible[index] = false;
  //   this.setState({ visible });
  //   console.log('state visible in hideModal', this.state);
  // };

  handleSave = (address, addresses) => {
    // let { address } = this.state;

    //Adding new/Updating address on the db.
    var addressInDb = addresses.find(v => v.id === address.id) || {};
    {
      address.name && (addressInDb.name = address.name);
    }
    {
      address.streetAddress1 && (addressInDb.streetAddress1 = address.streetAddress1);
    }
    {
      address.streetAddress2 && (addressInDb.streetAddress2 = address.streetAddress2);
    }
    {
      address.state && (addressInDb.state = address.state);
    }
    {
      address.city && (addressInDb.city = address.city);
    }
    {
      address.pinCode && (addressInDb.pinCode = address.pinCode);
    }

    if (!addressInDb.id) {
      addressInDb.id = Date.now().toString();
      address.push(addressInDb);
    }
    console.log('addressInDb.id', addressInDb.id);
    this.setState({ address, visible: false });
    console.log('Received values from state/server: ', this.state.address);
  };

  // handleDelete = (address, addresses) => {
  //   const newAddress = addresses.filter(m => m.id !== address.id);
  //   this.setState({ address: newAddress });
  //   console.log('This address has been deleted');
  // };

  addAddress = (arrayHelpers, key) => {
    let obj = {};

    key.map(k => (obj[k] = ''));

    arrayHelpers.push(obj);
    // this.modalControl(this.state.addressCount + 1, true);
    return obj;
  };

  handleAddAddress = (arrayHelpers, visiblity, count, key) => {
    const obj = this.addAddress(arrayHelpers, key);
    // console.log('visible in handleAddAddress', visible);
    // console.log('visible after adding address', this.state.visible);
    let visible = this.state.visible;
    //    const key = this.state.key;
    visible[count] = visiblity;
    this.setState({ visible });
    return (
      <AddressForm
        visible={this.state.visible[count]}
        onCancel={() => this.modalControl(count, false)}
        onSave={this.handleSave}
        address={obj}
        // onSelect={this.handleSelected}
      />
    );
  };
}

export default AddressComponent;
