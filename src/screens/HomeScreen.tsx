import React, {FunctionComponent, useState, useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  Button,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {AppScreenProps} from '../navigation/AppNavigation';
import BottomSheet from 'reanimated-bottom-sheet';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {appStyles, FONTS} from '../styles/styles';
import WeatherCirlce from '../components/WeatherCircle';
import DailyWeather from '../components/DailyWeather';
import {WeatherArray} from '../components/DailyWeather';
import HourlyReading from '../components/HourlyReading';
import {HourlyReadingArray} from '../components/HourlyReading';
import GoogleAdsDisplay from '../components/GoogleAdsDisplay';
import CallToActionDisplay from '../components/CallToActionDisplay';
import Modal from 'react-native-modal';
import WeatherDetailModal from '../components/WeatherDetailModal';
import {ModalData, WeatherModalData} from '../components/WeatherDetailModal';
import CameraButton from '../components/Buttons/CameraButton';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import {
  GET_CURR_WEATHER_CONDITION,
  GET_FEELS_LIKE_DATA,
} from '../constants/apis';
import _ from 'lodash';
import LocationSelector from '../components/LocationSelector';

interface AppProps extends AppScreenProps {
  name: string;
}

const dailyReading: WeatherArray = [
  {day: 'Monday', reading: '50/100', precipitation: '50%'},
  {day: 'Tuesday', reading: '20/100', precipitation: '70%'},
  {day: 'Wednesday', reading: '55/80', precipitation: '40%'},
  {day: 'Thursday', reading: '50/70', precipitation: '20%'},
  {day: 'Friday', reading: '70/100', precipitation: '10%'},
  {day: 'Saturday', reading: '22/60', precipitation: '90%'},
  {day: 'Sunday', reading: '32/70', precipitation: '100%'},
];

const hourlyReading: HourlyReadingArray = [
  {time: '5', pmValue: 'PM', readingValue: '100'},
  {time: '6', pmValue: 'PM', readingValue: '53'},
  {time: '7', pmValue: 'PM', readingValue: '51'},
  {time: '8', pmValue: 'PM', readingValue: '50'},
  {time: '9', pmValue: 'PM', readingValue: '50'},
  {time: '10', pmValue: 'PM', readingValue: '45'},
  {time: '11', pmValue: 'PM', readingValue: '40'},
  {time: '12', pmValue: 'AM', readingValue: '40'},
  {time: '1', pmValue: 'AM', readingValue: '40'},
  {time: '2', pmValue: 'AM', readingValue: '40'},
  {time: '3', pmValue: 'AM', readingValue: '36'},
  {time: '4', pmValue: 'AM', readingValue: '34'},
  {time: '5', pmValue: 'AM', readingValue: '32'},
];

interface ConditionType {
  key: string;
  class: string;
  expire_time_gmt: number;
  obs_id: string;
  obs_name: string;
  valid_time_gmt: number;
  day_ind: string;
  temp: number;
  wx_icon: number;
  icon_extd: number;
  wx_phrase: string;
  pressure_tend: string;
  pressure_desc: string;
  dewPt: number;
  heat_index: number;
  rh: number;
  pressure: number;
  vis: number;
  wc: number;
  wdir: string;
  wdir_cardinal: string;
  gust: string;
  wspd: number;
  max_temp: string;
  min_temp: string;
  precip_total: string;
  precip_hrly: number;
  snow_hrly: string;
  uv_desc: string;
  feels_like: number;
  uv_index: number;
  qualifier: string;
  qualifier_svrty: string;
  blunt_phrase: string;
  terse_phrase: string;
  clds: string;
  water_temp: string;
  primary_wave_period: string;
  primary_wave_height: string;
  primary_swell_period: string;
  primary_swell_height: string;
  primary_swell_direction: string;
  secondary_swell_period: string;
  secondary_swell_height: string;
  secondary_swell_direction: string;
}

const HomeScreen: FunctionComponent<AppProps> = (props) => {
  const {navigation} = props;
  const [
    cuWeatherCondition,
    setCuWeatherCondition,
  ] = useState<ConditionType | null>(null);
  const [modalData, setModalData] = useState<ModalData | null>([]);
  const [currLocation, setCurrLocation] = useState<GeolocationResponse | null>(
    null,
  );
  const [loadingWeathCond, setLoadingWeathCond] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [greetingsHeight, setGreetingsHeight] = useState<number>(105 + 50);
  const [canScroll, setCanScroll] = useState<boolean>(true);
  const sheetRef = useRef<BottomSheet>(null);
  const locationSheet = useRef<BottomSheet>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const screenHeight = Dimensions.get('screen').height / 1.16;

  const showModal = (): void => {
    setModalVisible(true);
  };

  useFocusEffect(
    useCallback(() => {
      Geolocation.getCurrentPosition(
        (info) => {
          setCurrLocation(info);
          getCurrWeatherCondition(info);
        },
        (error) => {
          // console.log(error, 'error');
        },{enableHighAccuracy: true}
      );
    }, []),
  );

  const getCurrWeatherCondition = useCallback(
    async (locationIfno: GeolocationResponse): Promise<void> => {
      try {
        const weatherConditionData = await axios.post(
          GET_CURR_WEATHER_CONDITION,
          {
            lat: locationIfno?.coords.latitude,
            lng: locationIfno?.coords.longitude,
            postalCode: '',
          },
        );

        const feelsLikeData = await axios.post(GET_FEELS_LIKE_DATA, {
          lat: locationIfno?.coords.latitude,
          lng: locationIfno?.coords.longitude,
          postalCode: '',
        });

        const weatherCondModalData = _.map(
          weatherConditionData.data.observation,
          (dataVal: string, dataKey: string) => {
            switch (dataKey) {
              case 'temp':
                return {
                  title: dataVal,
                  subTitle: 'Temperature',
                  imageSource: require('../assets/icons/temp_icon.png'),
                  extraData: 'temp',
                  index: 1,
                };

              case 'clds':
                return {
                  title: 'Cloud Cover',
                  subTitle: dataVal,
                  imageSource: require('../assets/icons/cloud_cover_icon.png'),
                  index: 2,
                };

              case 'uv_index':
                return {
                  title: dataVal,
                  subTitle: 'UV Index',
                  imageSource: require('../assets/icons/sun_icon.png'),
                  index: 3,
                };

              case 'wspd':
                return {
                  title: dataVal,
                  subTitle: 'Wind',
                  imageSource: require('../assets/icons/black_wind_mill.png'),
                  index: 4,
                };

              case 'dewPt':
                return {
                  title: dataVal,
                  subTitle: 'Dew Point',
                  imageSource: require('../assets/icons/dew_icon.png'),
                  extraData: 'dew',
                  index: 5,
                };

              case 'rh':
                return {
                  title: dataVal,
                  subTitle: 'Humidity',
                  imageSource: require('../assets/icons/humidity_icon.png'),
                  extraData: 'humidity',
                  index: 6,
                };

              case 'pressure':
                return {
                  title: dataVal,
                  subTitle: 'Pressure',
                  imageSource: require('../assets/icons/pressure_icon.png'),
                  extraData: 'quote',
                  index: 7,
                };

              case 'valid_time_gmt':
                return {
                  title: '8.14PM',
                  subTitle: 'Sunset',
                  imageSource: require('../assets/icons/sunset_icon.png'),
                  index: 8,
                };

              case 'precip_total':
                return {
                  title: dataVal,
                  subTitle: 'Precipitation',
                  imageSource: require('../assets/icons/precip_icon.png'),
                  extraData: 'quote',
                  index: 9,
                };

              default:
                break;
            }
          },
        );

        const filteredData = _.filter(
          weatherCondModalData,
          (dataToFil: ModalData) => {
            return dataToFil && dataToFil;
          },
        );

        const sortedData = _.sortBy(
          filteredData,
          (dataToSort: WeatherModalData) => {
            return dataToSort.index;
          },
        );

        if (sortedData) {
          setCuWeatherCondition(weatherConditionData.data.observation);
          setModalData(sortedData);
          console.log(weatherConditionData, 'sortedData');
          setLoadingWeathCond(false);
        }
      } catch (error) {}
    },
    [],
  );

  return (
    <ImageBackground
      source={require('../assets/images/home_background_image.png')}
      blurRadius={10}
      style={styles.container}>
      {loadingWeathCond ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      ) : (
        <View style={styles.scrollContentContainerStyle}>
          <View style={[styles.topContainer, {height: screenHeight - 450}]}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                style={styles.headerLeft}
                onPress={() => locationSheet.current?.snapTo(screenHeight)}>
                <Entypo name="location-pin" color="#fff" size={22} />
                <Text style={styles.headerText}>
                  {/* {cuWeatherCondition?.obs_name} */}
                  Current Location
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="camera" color="#fff" size={25} />
              </TouchableOpacity>
            </View>
            <View style={styles.weatherHeaderStyle}>
              <View style={styles.cloudContainer}>
                <Image
                  source={{
                    uri: `https://firebasestorage.googleapis.com/v0/b/weathar-9073c.appspot.com/o/${cuWeatherCondition?.wx_icon}.png?alt=media`,
                  }}
                  style={styles.cloudImage}
                  resizeMode="contain"
                />
                <Text style={appStyles.titleStyle}>
                  {cuWeatherCondition?.wx_phrase}
                </Text>
              </View>
              <View>
                <View>
                  <Text style={styles.tempText}> FEELS LIKE</Text>
                  <Text style={styles.tempBig}>
                    {cuWeatherCondition?.feels_like}&#xb0;
                    <Text style={styles.tempSmall}>
                      {cuWeatherCondition?.min_temp && '/'}
                      {cuWeatherCondition?.min_temp}
                    </Text>
                  </Text>
                </View>
                <Text style={appStyles.titleStyle}>
                  Humidity: {cuWeatherCondition?.rh}%
                </Text>
              </View>
            </View>
            <View style={styles.weatherHeaderDetailsContainer}>
              <WeatherCirlce
                name="Precip:"
                weatherValue={`${
                  cuWeatherCondition?.precip_total
                    ? cuWeatherCondition?.precip_total
                    : 0
                }%`}
                source={require('../assets/icons/water_drop_icon.png')}
                onPress={showModal}
              />
              <WeatherCirlce
                name="Wind:"
                weatherValue={`${cuWeatherCondition?.wspd}mph ${cuWeatherCondition?.wdir_cardinal}`}
                source={require('../assets/icons/windmill_icon.png')}
                customStyle={{height: 25}}
                onPress={showModal}
              />
              <WeatherCirlce
                name="UV:"
                weatherValue={`${
                  cuWeatherCondition?.uv_index
                    ? cuWeatherCondition?.uv_index
                    : 0
                }`}
                source={require('../assets/icons/glass_icon.png')}
                customStyle={{height: 15}}
                onPress={showModal}
              />
            </View>
          </View>

          <BottomSheet
            ref={sheetRef}
            snapPoints={[450, screenHeight, screenHeight]}
            borderRadius={30}
            initialSnap={0}
            onCloseEnd={() => {
              setCanScroll(false);
              scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: true});
            }}
            onOpenEnd={() => {
              setCanScroll(true);
            }}
            renderContent={() => {
              return (
                <View style={[styles.bottomContainer, {height: screenHeight}]}>
                  <ScrollView
                    ref={scrollViewRef}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={canScroll}>
                    <View style={styles.scrollIndicator} />
                    <View
                      onLayout={({
                        nativeEvent: {
                          layout: {height},
                        },
                      }) => {
                        setGreetingsHeight(height + 50);
                      }}
                      style={[
                        styles.greetingContainer,
                        appStyles.bottomMarginMedium,
                      ]}>
                      <Image
                        source={require('../assets/images/greeting_image.png')}
                        style={styles.greetingImageStyle}
                      />
                      <View style={styles.greetingTextContainer}>
                        <Text
                          style={[
                            appStyles.headerTwoStyle,
                            appStyles.bottomMarginSmall,
                          ]}>
                          Good Morning!
                        </Text>
                        <Text style={styles.greetingStyle}>
                          Today will be partly cloudy with a light breeze from
                          the NW. Enjoy your day.
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.hourlyWeatherContainer,
                        appStyles.bottomMarginMedium,
                      ]}>
                      <HourlyReading data={hourlyReading} />
                    </View>
                    <View
                      style={[
                        styles.googleAdsContainer,
                        appStyles.bottomMarginMedium,
                      ]}>
                      <GoogleAdsDisplay />
                    </View>
                    <View
                      style={[
                        styles.dailyWeatherContainer,
                        appStyles.bottomMarginMedium,
                      ]}>
                      <DailyWeather data={dailyReading} />
                    </View>
                    <View
                      style={[
                        styles.callToActionContainer,
                        appStyles.bottomMarginMedium,
                      ]}>
                      <CallToActionDisplay />
                    </View>
                  </ScrollView>
                </View>
              );
            }}
          />

          <BottomSheet
            ref={locationSheet}
            snapPoints={[0, screenHeight, screenHeight]}
            borderRadius={30}
            renderContent={() => {
              return (
                <View style={{}}>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      height: screenHeight,
                      paddingVertical: 5,
                    }}>
                    <View style={styles.scrollIndicator} />
                    <LocationSelector height={screenHeight} />
                  </View>
                </View>
              );
            }}
          />
          <Modal
            isVisible={modalVisible}
            onBackButtonPress={() => {
              setModalVisible(false);
            }}
            onBackdropPress={() => {
              setModalVisible(false);
            }}>
            <WeatherDetailModal
              data={modalData}
              weatherData={cuWeatherCondition}
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </Modal>
        </View>
      )}
      {!loadingWeathCond && (
        <CameraButton
          onPress={() => {
            navigation.navigate('CameraScreen');
          }}
          customStyle={styles.cameraButtonStyle}
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButtonStyle: {
    position: 'absolute',
    bottom: 15,
    right: 30,
  },
  scrollContentContainerStyle: {
    flexGrow: 1,
    backgroundColor: 'rgba(255,255,255,.1)',
  },
  scrollIndicator: {
    height: 4,
    width: '30%',
    backgroundColor: '#C9C9C9',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 100,
  },
  topContainer: {
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  weatherHeaderStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  cloudContainer: {},
  cloudImage: {
    height: 70,
    width: 100,
  },
  tempBig: {
    color: '#000',
    fontSize: 50,
    fontFamily: FONTS.bold,

    marginTop: -10,
  },
  tempSmall: {
    fontSize: 25,
    fontWeight: 'normal',
  },
  tempText: {
    color: '#000',
    fontFamily: FONTS.bold,
  },
  weatherHeaderDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  greetingContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginTop: 10,
  },
  greetingImageStyle: {
    height: '100%',
    flex: 1,
    marginRight: 20,
    borderRadius: 20,
  },
  greetingTextContainer: {
    flex: 1,
  },
  greetingStyle: {
    color: '#000',
    fontSize: 15,
  },
  dailyWeatherContainer: {},
  hourlyWeatherContainer: {},
  googleAdsContainer: {},
  callToActionContainer: {},
});

export default HomeScreen;
