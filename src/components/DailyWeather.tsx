import React, {FunctionComponent, useState, useCallback} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {appStyles, FONTS} from '../styles/styles';

export interface DailyWeatherReading {
  day: string;
  reading: string;
  precipitation: string;
}

export interface DailyWeatherData {
  data: Array<DailyWeatherReading>;
}

export type WeatherArray = Array<DailyWeatherReading>;

const DailyWeather: FunctionComponent<DailyWeatherData> = (props) => {
  const {data} = props;

  const renderDailyReading = (readings: WeatherArray): JSX.Element[] => {
    const dailyReadings = readings.map(
      (val: DailyWeatherReading, index: number) => {
        const splitedReading = val.reading.split('/');
        return (
          <View style={styles.weatherDaysContainer} key={`${index}`}>
            <View style={styles.dayTextContainer}>
              <Text style={styles.dayText}>{val.day}</Text>
            </View>
            <View style={styles.tempReadingContainer}>
              <Text style={styles.tempReadingText}>
                <Text>
                  {splitedReading[0]}
                  <Text style={{fontWeight: 'normal'}}>
                    /{splitedReading[1]}
                  </Text>
                </Text>
              </Text>
            </View>
            <View style={styles.weatherTypeContainer}>
              <Image
                source={require('../assets/icons/cloud_icon.png')}
                style={styles.cloudImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.weatherConditionContainer}>
              <Image
                source={require('../assets/icons/water_drop_icon.png')}
                style={[styles.weatherConditionImageStyle]}
                resizeMode="contain"
              />
              <Text style={styles.precipitationText}>{val.precipitation}</Text>
            </View>
          </View>
        );
      },
    );

    return dailyReadings;
  };

  return (
    <View style={styles.container}>
      <Text style={[appStyles.headerOneStyle]}>Daily</Text>
      <View style={{}}>{renderDailyReading(data)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  dayTextContainer: {
    flex: 1.8,
  },
  dayText: {
    color: '#464646',
    fontSize: 17,
  },
  tempReadingContainer: {
    flex: 1,
  },
  weatherTypeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherDaysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: '#707070',
    paddingVertical: 10,
  },
  cloudImage: {
    height: 45,
  },
  weatherConditionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  weatherConditionImageStyle: {
    height: 20,
    marginBottom: 2,
  },
  tempReadingText: {
    fontSize: 17,
    fontFamily: FONTS.bold,
  },
  precipitationText: {
    textAlign: 'center',
  },
});

export default DailyWeather;
