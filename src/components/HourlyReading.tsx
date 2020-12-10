import React, {FunctionComponent, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {appStyles, FONTS} from '../styles/styles';
import {Dropdown, DropDownData} from 'react-native-material-dropdown';

export interface HourlyReading {
  time: string;
  readingValue: string;
  pmValue: string;
}

export interface HourlyData {
  data: Array<HourlyReading>;
}

export type HourlyReadingArray = Array<HourlyReading>;

type DropDownValue =
  | 'temp'
  | 'prepProb'
  | 'prepRate'
  | 'wind'
  | 'windGusts'
  | 'humidity'
  | '';

const dropDownData: DropDownData[] = [
  {
    value: 'temp',
    label: 'Temp',
  },
  {
    value: 'prepProb',
    label: 'Precip Prob %',
  },
  {
    value: 'prepRate',
    label: 'Precip Rate',
  },
  {
    value: 'wind',
    label: 'Wind',
  },
  {
    value: 'windGusts',
    label: 'Precip Gusts',
  },
  {
    value: 'humidity',
    label: 'Humidity',
  },
];

const HourlyReading: FunctionComponent<HourlyData> = (props) => {
  const {data = []} = props;
  const [dropDownValue, setDropDownValue] = useState<DropDownValue>('');
  const [dropDownIndex, setDropDownIndex] = useState(0);

  const renderWidth = (val: DropDownValue): number => {
    if (val === 'prepProb') {
      return 130;
    } else if (val === 'prepRate') {
      return 120;
    } else if (val === 'windGusts') {
      return 120;
    } else if (val === 'humidity') {
      return 120;
    } else {
      return 100;
    }
  };

  const renderReadings = (readings: HourlyReadingArray): Array<JSX.Element> => {
    const mappedData = readings.map((item: HourlyReading, index: number) => {
      return (
        <View style={styles.contentContainer} key={`${index}`}>
          <View style={styles.precipIconContainer}>
            <Image
              style={styles.precipIcon}
              source={require('../assets/icons/icon_weather_raindrops.png')}
              resizeMode="contain"
            />
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {item.time}
              <Text style={styles.amPmText}>{item.pmValue}</Text>
            </Text>
          </View>
          <View style={styles.indicatorContainer}>
            <View
              style={[
                styles.indicator,
                {width: `${parseInt(item.readingValue) - 20}%`},
              ]}
            />
            <View style={styles.degreeContainer}>
              <Text style={styles.timeText}>{item.readingValue}&#xb0;</Text>
            </View>
          </View>
        </View>
      );
    });

    return mappedData;
  };

  console.log(dropDownValue);
  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer]}>
        <Text style={[appStyles.headerOneStyle, styles.headerText]}>
          Hourly
        </Text>
        <View style={styles.dropdownContainer}>
          <Dropdown
            useNativeDriver
            data={dropDownData}
            label={
              dropDownValue ? dropDownData[dropDownIndex].label : 'Feels Like'
            }
            containerStyle={[
              styles.dropdownContainerStyle,
              {width: renderWidth(dropDownValue)},
            ]}
            inputContainerStyle={styles.dropDownInputContainerStyle}
            labelTextStyle={styles.labelTextStyle}
            baseColor="#000"
            onChangeText={(text: DropDownValue, index: number) => {
              setDropDownValue(text);
              setDropDownIndex(index);
            }}
            pickerStyle={{
              minHeight: 270,
              minWidth: 150,
            }}
            lineWidth={0}
          />
        </View>
      </View>
      <View>{renderReadings(data)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    marginRight: 15,
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginBottom: 15,
  },
  timeContainer: {
    marginRight: 15,
    width: 50,
  },
  timeText: {
    fontFamily: FONTS.bold,

    fontSize: 17,
    color: '#515151',
  },
  amPmText: {
    fontWeight: 'normal',
    fontSize: 14,
  },
  indicatorContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    height: 11,
    backgroundColor: '#DEDEDE',
    width: '50%',
  },
  degreeContainer: {
    height: 25,
    width: 50,
    borderRadius: 100,
    backgroundColor: '#EBEBEB',
    marginLeft: -5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    paddingHorizontal: 10,
    borderRadius: 100,
    height: 35,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
  },
  dropdownContainerStyle: {
    width: 100,
    marginTop: -10,
    margin: 0,
  },
  dropDownInputContainerStyle: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  labelTextStyle: {
    fontFamily: FONTS.bold,
  },
  precipIconContainer: {
    marginRight: 20,
    justifyContent: 'flex-start',
  },
  precipIcon: {
    height: 15,
    width: 20,
  },
});

export default HourlyReading;
