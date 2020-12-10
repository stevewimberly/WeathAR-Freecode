import React, {FunctionComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FONTS, primaryColor} from '../styles/styles';

const GoogleAdsDisplay: FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.googleAdsText}> Google Display Ad</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(219, 219, 219, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 204,
  },
  googleAdsText: {
    color: primaryColor,
    fontFamily: FONTS.bold,

    fontSize: 16,
  },
});

export default GoogleAdsDisplay;
