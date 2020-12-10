import React from 'react';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native';
import HomeTabs from './HomeTabs';
// import ArVrScreen from '../screens/ArVrScreen';
import CameraScreen from '../screens/CameraScreen';
import {HomeScreenTabs} from './HomeTabs';
import PhotoPreviewScreen from '../screens/PhotoPreviewScreen';
import SettingsScreen from './SettingsScreen';
import {DrawerScreenProps} from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';

type RootStackType = {
  HomeTabs: undefined;
  CameraScreen: undefined;
  PhotoPreviewScreen: {path: string};
  SettingsScreen: undefined;
  LoginScreen: undefined;
};

export type AppScreens = RootStackType & HomeScreenTabs;

export interface AppScreenProps extends StackScreenProps<AppScreens> {}

export interface DrawerScreenProps extends DrawerScreenProps<AppScreens> {}

const Stack = createStackNavigator<RootStackType>();

const AppNavigation = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator keyboardHandlingEnabled={false}>
        <Stack.Screen
          name="LoginScreen"
          options={{
            header: () => null,
          }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="CameraScreen"
          options={{
            header: () => null,
          }}
          component={CameraScreen}
        />
        <Stack.Screen
          name="PhotoPreviewScreen"
          options={{
            header: () => null,
          }}
          component={PhotoPreviewScreen}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AppNavigation;
