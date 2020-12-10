import _ from 'lodash';
import moment from 'moment';

const Daily = {
  temp: {
    data: [],
  },
  prepProb: {
    data: [],
  },
  prepRate: {data: []},
  wind: {data: []},
  windGusts: {data: []},
  humidity: {data: []},
};

const tempSort = () => {
  const mulitplier = 1.6
};

export const sortDailyWeatherData = (data): Array => {
  const temperatureData = data.temperature
  const preciPropData = data.precipChance
  const preciPropData = data.precipChance
};
