import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ForecastCell from '@components/ForecastCell';
import Utils from '@modules/Utils';
import Colors from '@modules/Colors';
import Chart from '@components/Chart';

export default class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
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
      console.log(this.state.chartData);
      return(
        <View style={styles.forecast}>
          <Text style={styles.forecastTitle}>Temperature de næste 24 timer:</Text>
          <Chart data={this.props.data} />
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
