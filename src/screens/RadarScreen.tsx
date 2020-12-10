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
import {appStyles, primaryColor} from '../styles/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ButtonIndicator from '../components/Buttons/ButtonIndicator';
import Slider from '@react-native-community/slider';
import EditButton from '../components/Buttons/EditButton';
import Button from '../components/Buttons/Button';

interface MapImagesDataProps {
  source: ImageRequireSource;
}

type MapImages = MapImagesDataProps[];

const heatMapData: MapImages = [
  {
    source: require('../assets/images/heat_map_seven.png'),
  },
  {
    source: require('../assets/images/heat_map_six.png'),
  },
  {
    source: require('../assets/images/heat_map_two.png'),
  },
  {
    source: require('../assets/images/heat_map_three.png'),
  },
  {
    source: require('../assets/images/heat_map_four.png'),
  },
  {
    source: require('../assets/images/heat_map_five.png'),
  },
];

const RadarScreen: FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currImageIndex, setcurrImageIndex] = useState<number>(0);
  const [heatMaps, setHeatMaps] = useState<MapImages>(heatMapData);
  const [playingWeather, setPlayingWeather] = useState<boolean>(false);

  const playWeather = () => {
    setPlayingWeather(true);
    setcurrImageIndex(0);
    let currIndex = 0;
    let time = 0;

    if (time >= 5) {
      setPlayingWeather(false);
    } else {
      setPlayingWeather(true);
      const interval = setInterval(() => {
        if (currIndex < 5) {
          currIndex = currIndex + 1;
          time = time + 1;
          setcurrImageIndex(currIndex);
        } else {
          setPlayingWeather(false);
          clearInterval(interval);
        }
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[appStyles.headerOneStyle]}>Radar</Text>
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
        <View style={styles.buttonIndicatorsContainer}>
          <ButtonIndicator text="Home" iconName="home" />
          <ButtonIndicator
            text="Work"
            iconName="briefcase"
            iconSize={16}
            customStyle={{marginHorizontal: 15}}
          />
        </View>
      </View>
      <View style={styles.mapContainer}>
        <Image
          style={styles.heatMapImageStyle}
          source={heatMaps[currImageIndex].source}
        />
      </View>
      <View style={styles.weatherNavContainer}>
        <TouchableOpacity
          style={styles.playContainer}
          disabled={playingWeather}
          onPress={() => playWeather()}>
          <FontAwesome name="play-circle" color={primaryColor} size={35} />
        </TouchableOpacity>
        <View style={styles.sliderContainer}>
          <View style={styles.indicatorTextContainer}>
            <Text style={styles.indicatorText}>8.45</Text>
            <Text style={styles.indicatorText}>9.00</Text>
            <Text style={styles.indicatorText}>9.15</Text>
            <Text style={styles.indicatorText}>9.30</Text>
            <Text style={styles.indicatorText}>9.45</Text>
            <Text style={styles.indicatorText}>Now</Text>
          </View>
          <Slider
            style={{width: '100%', height: 40}}
            minimumValue={0}
            maximumValue={5}
            minimumTrackTintColor="#D0D0D0"
            maximumTrackTintColor="#D0D0D0"
            thumbTintColor="#707070"
            step={1}
            onValueChange={(val) => {
              setcurrImageIndex(val);
            }}
            value={currImageIndex}
            disabled={playingWeather}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
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
    marginVertical: 20,
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
  weatherNavContainer: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 5,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
  },
  sliderContainer: {
    flex: 1,
  },
  playContainer: {
    marginHorizontal: 10,
  },
  indicatorTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  indicatorText: {
    fontSize: 11,
  },
  heatMapImageStyle: {
    flex: 1,
  },
});

export default RadarScreen;
