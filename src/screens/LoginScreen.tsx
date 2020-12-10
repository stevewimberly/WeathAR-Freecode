import React, {FunctionComponent, useState} from 'react';
import auth from '@react-native-firebase/auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
GoogleSignin.configure({
  webClientId: '1015876228112-n2qfeh9ntckgikvtmecjsgvmtpk5jv6o.apps.googleusercontent.com',
});

import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AuthButtons from '../components/Buttons/AuthButtons';
import Button from '../components/Buttons/Button';
import {AppScreenProps} from '../navigation/AppNavigation';
import {FONTS, primaryColor} from '../styles/styles';

const LoginScreen: FunctionComponent<AppScreenProps> = (props) => {
  const {navigation} = props;
  const [email, setEmail] = useState<string>('');
  
  const onGoogleButtonPress = async() => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const onAppleButtonPress = async () => {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
  
    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned';
    }
  
    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
  
    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
  }

  const onFacebookButtonPress = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  return (
    <ImageBackground
      style={styles.container}
      blurRadius={2}
      source={require('../assets/images/city_thumb.png')}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={require('../assets/icons/weathAR.png')}
          resizeMode="contain"
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}> Log in to continue </Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email Address"
          style={styles.textInput}
        />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Button
            text="Continue"
            onPress={() => {}}
            buttonContainerStyle={styles.buttonContainerStyle}
            textStyle={{fontSize: 15, textTransform: 'capitalize'}}
          />
        </View>
        <Text style={styles.headerText}> - OR - </Text>
        <AuthButtons
          text="Continue with Google"
          onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
          type="google"
          buttonContainerStyle={styles.buttonContainerStyle}
        />
        {Platform.OS === 'ios' && (
          <AuthButtons
            text="Continue with Apple"
            onPress={() => onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))}
            type="apple"
            buttonContainerStyle={styles.buttonContainerStyle}
          />
        )}
        <AuthButtons
          text="Continue with Facebook"
          onPress={() => {}}
          type="facebook"
          color="#1778F2"
          textColor="#fff"
          buttonContainerStyle={styles.buttonContainerStyle}
        />
        <View style={styles.otherAuthButtonsContainer}>
          <TouchableOpacity>
            <Text style={styles.otherAuthButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.otherAuthButtonText}>|</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.otherAuthButtonText}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate('HomeTabs')}>
          <Text style={styles.skipButtonText}> Skip log in</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoImage: {
    height: 50,
  },
  buttonContainerStyle: {
    paddingVertical: 18,
    marginVertical: 10,
  },
  otherAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  otherAuthButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 18,
  },
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    textAlign: 'center',
  },
  textInput: {
    paddingVertical: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 13,
    paddingHorizontal: 10,
    color: '#B8B8B8',
    fontSize: 15,
  },
  skipButton: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  skipButtonText: {
    color: primaryColor,
    fontFamily: FONTS.bold,
    fontSize: 15,
  },
});

export default LoginScreen;
