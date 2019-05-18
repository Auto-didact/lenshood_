import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import DLVerificationModal from '../../components/verification/DLVerificationModal';
import DLVerificationForm from '../../components/verification/DLVerificationForm';

import ADD_DL from '../../graphql/AddDrivingLicense.graphql';

const onSubmit = addDL => values => {
  addDL(values.dlId, values.dob);
};

class DLAdd extends React.Component {
  constructor(props) {
    super(props);
    this.subscription = null;
  }

  render() {
    return (
      <DLVerificationModal vStatus={this.props.vStatus}>
        <DLVerificationForm onSubmit={onSubmit(this.props.addDL)} />
      </DLVerificationModal>
    );
  }
}

DLAdd.propTypes = {
  vStatus: PropTypes.bool,
  addDL: PropTypes.func.isRequired
};

export default graphql(ADD_DL, {
  props: ({ ownProps: { history, navigation }, mutate }) => ({
    addDL: async (dlId, dob) => {
      let DLData = await mutate({
        variables: { input: { dlId: dlId.trim(), dob: dob.trim() } }
      });

      if (history) {
        return history.push('/DL/' + DLData.data.addDL.id, {
          DL: DLData.data.addDL
        });
      } else if (navigation) {
        return navigation.navigate('DLEdit', { id: DLData.data.addDL.id });
      }
    }
  })
})(DLAdd);
