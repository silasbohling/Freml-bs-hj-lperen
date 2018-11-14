import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Moment from 'moment';

export default class ForecastCell extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      time: "",
      temp: "",
      setting: ""
    }
  }

  componentDidMount(){
    this.configureCell(this.props.forecast);
  }

  configureCell = (forecast) => {
    const date = Moment.unix(forecast.time).utc();
    const time = date.format("D/M HH:mm");
    const temp = Math.round(forecast.temp*10)/10 + ' C°';
    const setting = Math.round(forecast.setting*10)/10;
    this.setState({ time, temp, setting });
  }

  render () {
    return(
      <View style={styles.container}>
        <Text style={[ styles.text]}>{ this.state.time }</Text>
        <View style={styles.valueContainer}>
          <Text style={[ styles.text, styles.temp]}>{ this.state.temp }</Text>
          <Text style={[ styles.text]}>({ this.state.setting })</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    paddingVertical: 7
  },
  valueContainer: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 16
  },
  temp: {
    fontWeight: '600',
    marginRight: 5
  }
});
