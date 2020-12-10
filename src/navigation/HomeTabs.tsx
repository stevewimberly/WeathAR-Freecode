import React, {FunctionComponent} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FONTS, primaryColor} from '../styles/styles';
import HomeScreen from '../screens/HomeScreen';
import RadarScreen from '../screens/RadarScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import SettingsScreen from './SettingsScreen';

export type HomeScreenTabs = {
  Home: undefined;
  Radar: undefined;
  SettingsTab: undefined;
};

const Tab = createBottomTabNavigator();

const HomeTabs: FunctionComponent = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: primaryColor,
        inactiveTintColor: '#999',
        labelStyle: {
          fontSize: 11,
          fontFamily: FONTS.bold,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'HOME',
          tabBarIcon: ({color, size}) => {
            return <Entypo name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Radar"
        component={RadarScreen}
        options={{
          tabBarLabel: 'RADAR',
          tabBarIcon: ({color, size}) => {
            return (
              <FontAwesome5 name="satellite-dish" size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'PROFILE',
          tabBarIcon: ({color, size}) => {
            return (
              <FontAwesome5 name="user-circle" size={size} color={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
