import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ForecastCell from './ForecastCell';
import Utils from '@modules/Utils';
import Colors from '@modules/Colors';

export default class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chartData: {}
    }
  }

  configureChart = (temperatures) => {
    const labels = temperatures.map((forecast) => Utils.formatUnixTimestamp(forecast.time, 'HH:mm'));
    const tempData = temperatures.map((forecast) => forecast.temp);
    const settingData = temperatures.map((forecast) => forecast.setting);
    this.setState({
      chartData: {
        labels,
        datasets: [
          {data: tempData},
          {data: settingData}
        ]
      }
    })
  }

  render() {
    console.log(this.props);
    if (this.props.view == 'list'){
      return(
        <View style={styles.forecast}>
          <Text style={styles.forecastTitle}>Temperature de næste 24 timer:</Text>
          <FlatList
            data={ this.props.data }
            keyExtractor={ (item) => item.time.toString() }
            renderItem={ ({item}) => <ForecastCell forecast={item}/> }
          />
        </View>
      );
    } else if (this.props.view == 'chart'){
      return(
        <View style={styles.forecast}>
          <Text style={styles.forecastTitle}>Temperature de næste 24 timer:</Text>

        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  forecast: {
    width: '100%',
    flex: 1,
    marginVertical: 10,
    backgroundColor: Colors.background,
    borderRadius: 5,
    padding: 10,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 6
  },
  forecastTitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 5
  }
});
