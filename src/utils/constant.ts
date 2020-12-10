import {Alert} from 'react-native';

export const appAlertMessage = (message: string, onPress?: () => {}): void => {
  Alert.alert('Weath AR', message, [{text: 'Ok', onPress}]);
};
