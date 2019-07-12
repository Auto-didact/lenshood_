import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import ResetPasswordFormComponent from '../components/ResetPasswordFormComponent';

const ResetPasswordView = ({ onSubmit }) => (
  <View style={styles.container}>
    <ResetPasswordFormComponent onSubmit={onSubmit} />
  </View>
);

ResetPasswordView.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1
  }
});

export default ResetPasswordView;
