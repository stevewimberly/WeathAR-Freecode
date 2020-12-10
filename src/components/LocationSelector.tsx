import React, {FunctionComponent, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ImageRequireSource,
} from 'react-native';
import {appStyles, FONTS} from '../styles/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ButtonIndicator from '../components/Buttons/ButtonIndicator';
import EditButton from './Buttons/EditButton';

interface LocationSelectorProps {
  height: number;
}

const LocationSelector: FunctionComponent<LocationSelectorProps> = (props) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <View style={[styles.container, {height: props.height}]}>
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            value={searchQuery}
            placeholder="Search by name, city, or ZIP"
            onChangeText={(text: string) => {
              setSearchQuery(text);
            }}
            style={styles.textInputStyle}
          />
          <FontAwesome name="search" color="#8F8F8F" size={18} />
        </View>

        <View style={styles.homeContainer}>
          <ButtonIndicator
            text="Current Location"
            iconName="map-marker"
            iconSize={16}
          />
          <View style={styles.addressContainer}>
            <View style={styles.addressTextContainer}>
              <Text style={[appStyles.headerTwoStyle, styles.addressBold]}>
                123456 West Broad Street
              </Text>
              <Text style={[appStyles.headerTwoStyle, styles.addressNormal]}>
                20007 Washington, DC
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.homeContainer}>
          <ButtonIndicator text="Home" iconName="home" />
          <View style={styles.addressContainer}>
            <View style={styles.addressTextContainer}>
              <Text style={[appStyles.headerTwoStyle, styles.addressBold]}>
                123456 West Broad Street
              </Text>
              <Text style={[appStyles.headerTwoStyle, styles.addressNormal]}>
                20007 Washington, DC
              </Text>
            </View>
            <EditButton />
          </View>
        </View>
        <View style={styles.workContainer}>
          <ButtonIndicator text="Work" iconName="briefcase" iconSize={16} />
          <View style={styles.addressContainer}>
            <View style={styles.addressTextContainer}>
              <Text style={[appStyles.headerTwoStyle, styles.addressBold]}>
                123456 West Broad Street
              </Text>
              <Text style={[appStyles.headerTwoStyle, styles.addressNormal]}>
                20007 Washington, DC
              </Text>
            </View>
            <EditButton />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  searchContainer: {
    borderRadius: 100,
    backgroundColor: '#ECECEC',
    height: 40,
    paddingHorizontal: 15,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputStyle: {
    fontSize: 15,
    flex: 1,
  },
  buttonIndicatorsContainer: {
    flexDirection: 'row',
  },

  homeContainer: {
    marginBottom: 25,
  },
  workContainer: {
    // marginHorizontal: 13,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 13,
  },
  addressTextContainer: {},
  addressBold: {
    color: '#3D3D3D',
    fontFamily: FONTS.bold,
  },
  addressNormal: {
    fontWeight: 'normal',
  },
});

export default LocationSelector;
