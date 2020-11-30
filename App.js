import React from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import Api from '@services/Api'
import Card from '@components/Card'
import Utils from '@modules/Utils'
import Colors from '@modules/Colors'
import Config from './app/Config'
import OptionSelector from '@components/OptionSelector'

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      city: '...',
      averageTemp: '...',
      settingTemp: '...',
      averageChillFactor: '...',
      chillFactorSetting: '...',
      temperatures: [],
      dataCount: 9,
      loading: false
    }
  }

  componentDidMount(){
    this.loadSetting()
  }

  loadSetting = () => {
    this.setState({ loading: true })

    Api.currentCityWeather(Config.cityId).then( (data) => {
      console.log({data})
      if (data.cod === 200) {
        const temperatures = []
        for (let i = 0; i < this.state.dataCount; i++) {
          const time = data.list[i].dt
          const temp = data.list[i].main.temp
          const setting = Utils.calculateSetting(temp)
          const wind = data.list[i].wind.speed
          const chillFactor = Utils.calculateChillFactor(temp, wind)
          const chillFactorSetting = Utils.calculateSetting(chillFactor)
          temperatures.push({ time, temp, setting, chillFactor, chillFactorSetting })
        }
        let averageTemp = this.average('temp', temperatures)
        const settingTemp = Utils.calculateSetting(averageTemp)
        let averageChillFactor = this.average('chillFactor', temperatures)
        const chillFactorSetting = Utils.calculateSetting(averageChillFactor)
        const city = data.city.name
        averageTemp = Math.round(averageTemp*10)/10 + ' C°'
        averageChillFactor = Math.round(averageChillFactor*10)/10 + ' C°'
        this.setState({
          averageTemp,
          settingTemp,
          averageChillFactor,
          chillFactorSetting,
          temperatures,
          city,
          loading: false
        })
      } else {
        const error = {
          status: data.cod,
          message: data.message
        }
        console.log({ error })
      }

    })
      .catch( (error) => {
        console.log({error})
        this.setState({ loading: false })
      })
  }

  setDataInterval = (dataCount) => {
    this.setState({ dataCount })
    this.loadSetting()
  }

  average = (key, list) => {
    let sum = 0
    list.forEach( item => sum += item[key])
    return sum/list.length
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.primary}>
          <Image  style={styles.logo} source={ require('./app/assets/fjernvarme-logo.png') } />
          <View style={styles.dataContainer}>
            <View style={styles.dataBlock}>
              <Text style={styles.label}>{ this.state.city }</Text>
              <Text style={styles.value}>{ this.state.averageTemp }</Text>
              <Text style={[styles.value, styles.normalWeight]}>{ this.state.averageChillFactor }</Text>
            </View>
            <View style={styles.dataBlock}>
              <Text style={styles.label}>Indstilling</Text>
              <Text style={styles.value}>{ this.state.settingTemp }</Text>
              <Text style={[styles.value, styles.normalWeight]}>{ this.state.chillFactorSetting }</Text>
            </View>
          </View>

          <ActivityIndicator animating={this.state.loading} size="large" color={Colors.primary} style={styles.activityIndicator} />

          <OptionSelector
            options={[{ label:'24 timer', value:9 }, { label:'48 timer', value:17 }, { label:'3 døgn', value:25 }, { label:'4 døgn', value:33 }]}
            optionPressed={ this.setDataInterval }
          />
        </View>

        <View style={styles.carouselContainer}>
          <Carousel
            data={['chart', 'list']}
            renderItem={({item}) => <Card view={item} data={this.state.temperatures}/> }
            sliderWidth={Utils.wp(100)}
            itemWidth={Utils.wp(90)}
          />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    padding: 5,
    paddingTop: 20
  },
  primary: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logo: {
    width: 175,
    height: 86.1,
  },
  dataContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dataBlock: {
    width: '50%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  normalWeight: {
    fontWeight: 'normal'
  },
  carouselContainer: {
    flex: 0.4,
  },
  activityIndicator: {
    position: 'absolute',
    top: Utils.hp(41)
  }
})
