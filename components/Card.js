import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import ForecastCell from './ForecastCell';
import Moment from 'moment';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit';

export default class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chartData: {}
    }
  }

  componentDidMount() {
    this.configureChart(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    console.log('props');
    this.configureChart(nextProps.data);
  }

  configureChart = (temperatures) => {
    const labels = temperatures.map((forecast, index) => {
      if (index%2 == 0) {
        return "";
      }
      const date = Moment.unix(forecast.time).utc();
      return date.format('HH:mm');
    });
    const tempData = temperatures.map((forecast) => forecast.temp);
    const settingData = temperatures.map((forecast) => forecast.setting);
    console.log({labels, tempData, settingData});
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
          { this.state.chartData.datasets != undefined &&
            <LineChart
              data={this.state.chartData}
              width={Dimensions.get('window').width*0.9} // from react-native
              height={160}
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              bezier
            />
          }
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
    backgroundColor: '#fff',
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
