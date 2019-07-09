import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import RegisterFormComponent from '../components/RegisterFormComponent';

class RegisterView extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func
  };

  render() {
    const { onSubmit } = this.props;
    return (
      <View style={styles.container}>
        <RegisterFormComponent onSubmit={onSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1
  }
});

export default RegisterView;
