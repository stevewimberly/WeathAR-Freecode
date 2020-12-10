import React, {FunctionComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';
import {appStyles, FONTS} from '../styles/styles';
import Button from './Buttons/Button';

interface WeatherModalProps {
  onPress(): void;
  data: ModalData;
}

export interface WeatherModalData {
  title: string;
  subTitle: string;
  customImageStyle?: ImageStyle;
  imageSource: ImageSourcePropType;
  extraData?: string;
  index?: number;
}

export type ModalData = Array<WeatherModalData>;

const WeatherDetailModal: FunctionComponent<WeatherModalProps> = (props) => {
  const {onPress, customImageStyle = {}, data} = props;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, appStyles.headerOneStyle]}>
          Current Conditions
        </Text>
      </View>
      <View style={styles.subHeaderContainer}>
        <View style={styles.subHeaderIconContainer}>
          <Text style={styles.subHeaderIconContainerText}>H</Text>
        </View>
        <View style={styles.subHeaderContainerTextContainer}>
          <Text style={styles.subHeaderContainerTextContainerMajor}>
            Forecast Assurance
          </Text>
          <Text style={styles.subHeaderContainerTextContainerMinor}>
            High Adherance
          </Text>
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.title}
        numColumns={3}
        contentContainerStyle={styles.flatListContainerStyle}
        renderItem={({item}) => {
          return (
            <View style={styles.itemContainer}>
              <Image
                style={styles.imageStyle}
                source={item.imageSource}
                resizeMode="contain"
              />
              <Text style={styles.subTitleStyle}>{item.subTitle}</Text>
              {item.extraData === 'temp' ? (
                <Text style={styles.titleStyle}>{item.title}&#xb0;</Text>
              ) : item.extraData === 'quote' ? (
                <Text style={styles.titleStyle}>
                  {item.title}
                  &#x22;
                </Text>
              ) : item.extraData === 'dew' ? (
                <Text style={styles.titleStyle}>{item.title}&#x2109;</Text>
              ) : item.extraData === 'humidity' ? (
                <Text style={styles.titleStyle}>{item.title}%</Text>
              ) : (
                <Text style={styles.titleStyle}>{item.title}</Text>
              )}
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <View style={styles.buttonContainer}>
        <Button type="primary" text="DONE" onPress={onPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DBDBDB',
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {},
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    minHeight: 130,
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    marginVertical: 15,
  },
  flatListContainerStyle: {
    marginBottom: 30,
  },
  imageStyle: {
    height: 40,
    marginBottom: 5,
  },
  titleStyle: {
    fontFamily: FONTS.bold,

    color: '#383838',
    fontSize: 14,
  },
  subTitleStyle: {
    color: '#767676',
    fontSize: 12,
    marginBottom: 5,
  },
  subHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  subHeaderIconContainer: {
    marginRight: 10,
    backgroundColor: '#3B8D35',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  subHeaderIconContainerText: {
    color: '#fff',
    fontFamily: FONTS.bold,
  },
  subHeaderContainerTextContainer: {},
  subHeaderContainerTextContainerMajor: {
    fontFamily: FONTS.bold,
    marginBottom: 3,
    fontSize: 17,
  },
  subHeaderContainerTextContainerMinor: {
    fontWeight: 'normal',
    fontSize: 16,
    color: '#8D8D8D',
  },
});

export default WeatherDetailModal;
