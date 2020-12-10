import React, {FunctionComponent, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Switch} from 'react-native-switch';
import {primaryColor} from '../styles/styles';

const CustomeDrawerContent: FunctionComponent<DrawerContentComponentProps> = (
  props,
) => {
  const [temperature, setTemperature] = useState(true);
  const [distance, setDistance] = useState(true);
  const [speed, setSpeed] = useState(true);

  return (
    <View style={styles.drawerContentContainer}>
      <View style={styles.topContentContainer}>
        <TouchableOpacity style={styles.optionContainer}>
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer}>
          <Text style={styles.optionText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer}>
          <Text style={styles.optionText}>Send Feedback</Text>
        </TouchableOpacity>
        <View style={styles.settingsContainer}>
          <View style={styles.settingsContentContainer}>
            <Text style={styles.settingsContentText}>Temperature</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchOptionText}>F</Text>
              <View style={styles.switch}>
                <Switch
                  value={temperature}
                  onValueChange={(val) => setTemperature(val)}
                  circleSize={30}
                  activeText={''}
                  inActiveText={''}
                  circleBorderWidth={0}
                  backgroundActive={primaryColor}
                  backgroundInactive={'gray'}
                  circleActiveColor={'#fff'}
                  changeValueImmediately={true}
                  switchLeftPx={2.6}
                  switchRightPx={2.6}
                  switchWidthMultiplier={2}
                  switchBorderRadius={30}
                />
              </View>
              <Text style={styles.switchOptionText}>C</Text>
            </View>
          </View>
          <View style={styles.settingsContentContainer}>
            <Text style={styles.settingsContentText}>DISTANCE</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchOptionText}>Miles</Text>
              <View style={styles.switch}>
                <Switch
                  value={distance}
                  onValueChange={(val) => setDistance(val)}
                  circleSize={30}
                  activeText={''}
                  inActiveText={''}
                  circleBorderWidth={0}
                  backgroundActive={primaryColor}
                  backgroundInactive={'gray'}
                  circleActiveColor={'#fff'}
                  changeValueImmediately={true}
                  switchLeftPx={2.6}
                  switchRightPx={2.6}
                  switchWidthMultiplier={2}
                  switchBorderRadius={30}
                />
              </View>
              <Text style={styles.switchOptionText}>KM</Text>
            </View>
          </View>
          <View style={styles.settingsContentContainer}>
            <Text style={styles.settingsContentText}>Speed</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchOptionText}>MPH</Text>
              <View style={styles.switch}>
                <Switch
                  value={speed}
                  onValueChange={(val) => setSpeed(val)}
                  circleSize={30}
                  activeText={''}
                  inActiveText={''}
                  circleBorderWidth={0}
                  backgroundActive={primaryColor}
                  backgroundInactive={'gray'}
                  circleActiveColor={'#fff'}
                  changeValueImmediately={true}
                  switchLeftPx={2.6}
                  switchRightPx={2.6}
                  switchWidthMultiplier={2}
                  switchBorderRadius={30}
                />
              </View>
              <Text style={styles.switchOptionText}>KM/H</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomContentContainer}>
        <TouchableOpacity style={styles.addInfoContainer}>
          <FontAwesome
            style={styles.addInfoIcon}
            color={primaryColor}
            size={35}
            name="cloud-upload"
          />
          <Text style={styles.addInfoText}>
            Go Pro to unlock exclusive content
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Drawer = createDrawerNavigator();

const SettingsScreen: FunctionComponent = () => {
  return (
    <Drawer.Navigator
      screenOptions={{swipeEnabled: false}}
      drawerPosition="right"
      drawerStyle={styles.drawerStyle}
      overlayColor="transparent"
      drawerContent={(props) => <CustomeDrawerContent {...props} />}>
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerStyle: {
    borderTopLeftRadius: 30,
    // borderBottomLeftRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  drawerContentContainer: {
    flex: 1,
  },
  topContentContainer: {
    flex: 2,
    marginVertical: 40,
    paddingHorizontal: 25,
  },
  optionContainer: {
    marginVertical: 12,
  },
  optionText: {
    fontSize: 17,
  },
  bottomContentContainer: {
    flex: 1,
    marginVertical: 25,
    overflow: 'hidden',
  },
  settingsContainer: {
    marginVertical: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsContentContainer: {
    marginVertical: 7,
  },
  settingsContentText: {
    fontSize: 12,
    marginBottom: 3,
    textTransform: 'uppercase',
    color: '#696969',
  },
  switchOptionText: {
    fontSize: 17,
    flex: 1,
    textAlign: 'center',
  },
  switch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addInfoContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
    marginHorizontal: 25,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  addInfoIcon: {
    marginBottom: 5,
  },
  addInfoText: {
    textAlign: 'center',
    color: primaryColor,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
export default SettingsScreen;
