import React from 'react';
import { Dimensions } from 'react-native';
import Moment from 'moment';

const Utils = {
  hp: (percentage) => {
    const { height: viewportHeight } = Dimensions.get('window');
    const value = (percentage * viewportHeight) / 100;
    return Math.round(value);
  },
  wp: (percentage) => {
    const { width: viewportWidth } = Dimensions.get('window');
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  },
  calculateSetting: (x) => {
    const y = 0*Math.pow(x,2)-0.05*x+3.78;
    return Math.round(y*10)/10;
  },
  formatUnixTimestamp: (timestamp, format) => {
    const date = Moment.unix(timestamp).utc();
    return date.format("D/M HH:mm");
  }
}

export default Utils;
