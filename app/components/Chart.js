import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import PureChart from 'react-native-pure-chart'
import Colors from '@modules/Colors'
import Utils from '@modules/Utils'

export default class Chart extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      chartData: []
    }
  }

  componentDidMount() {
    if (this.props.data.length > 0) {
      this.configureChart(this.props.data)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.configureChart(this.props.data)
    }
  }

  configureChart = (temperatures) => {
    const chartData = [
      { seriesName: 'temperature', data: [], color: Colors.temperature },
      { seriesName: 'setting', data: [], color: Colors.setting }
    ]
    temperatures.forEach((forecast) => {
      const label = Utils.formatUnixTimestamp(forecast.time, 'HH:mm D/M')
      chartData[0].data.push({ x: label, y: forecast.temp })
      chartData[1].data.push({ x: label, y: forecast.setting })
    })
    this.setState({ chartData })
  }

  render() {
    return(
      <View style={styles.container}>
        <PureChart
          data={ this.state.chartData }
          type='line'
          height={ Utils.hp(20) }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})
