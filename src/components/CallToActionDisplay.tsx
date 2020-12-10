import React, {FunctionComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FONTS, primaryColor} from '../styles/styles';

const CallToActionDisplay: FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.googleAdsText}>CALL TO ACTION</Text>
      <Text style={styles.infoText}>Don't want to see this message?</Text>
      <Text style={styles.infoText}>Go Ad-Free</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(219, 219, 219, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 204 / 2,
  },
  googleAdsText: {
    color: primaryColor,
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
  infoText: {
    color: primaryColor,
  },
});

export default CallToActionDisplay;
