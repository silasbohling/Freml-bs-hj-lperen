import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Utils from '@modules/Utils'

export default class ForecastCell extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      time: '',
      temp: '',
      setting: '',
      chillFactor: '',
      chillFactorSetting: ''
    }
  }

  componentDidMount(){
    this.configureCell(this.props.forecast)
  }

  configureCell = (forecast) => {
    const time = Utils.formatUnixTimestamp(forecast.time, 'D/M HH:mm')
    const temp = Math.round(forecast.temp*10)/10 + ' C°'
    const setting = Math.round(forecast.setting*10)/10
    const chillFactor = Math.round(forecast.chillFactor*10)/10 + ' C°'
    const chillFactorSetting = Math.round(forecast.chillFactorSetting*10)/10
    this.setState({ time, temp, setting, chillFactor, chillFactorSetting })
  }

  render () {
    return(
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={[ styles.text]}>{ this.state.time }</Text>
          <View style={styles.valueContainer}>
            <Text style={[ styles.text, styles.temp]}>{ this.state.temp }</Text>
            <Text style={[ styles.text]}>({ this.state.setting })</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={[ styles.text]}></Text>
          <View style={styles.valueContainer}>
            <Text style={[ styles.text]}>{ this.state.chillFactor }</Text>
            <Text style={[ styles.text]}>({ this.state.chillFactorSetting })</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 2,
    paddingVertical: 7
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
})
