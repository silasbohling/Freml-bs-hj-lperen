import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Api from '@services/Api';
import Card from '@components/Card';
import Utils from '@modules/Utils';
import Colors from '@modules/Colors';
import Config from './app/Config';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      averageTemp: '...',
      city: "...",
      settingTemp: "...",
      temperatures: [],
      error: null,
      loading: false
    }
  }

  componentDidMount(){
    this.loadSetting();
  }

  loadSetting = () => {
    this.setState({ loading: true });

    Api.currentCityWeather(Config.cityId).then( (data) => {
      console.log({data});
      if (data.cod == 200) {
        var temperatures = [];
        for (var i = 0; i < 9; i++) {
          const temp = data.list[i].main.temp;
          const time = data.list[i].dt;
          const setting = Utils.calculateSetting(data.list[i].main.temp);
          temperatures.push({ temp, time, setting });
        }
        var averageTemp = this.averageTemp(temperatures);
        const settingTemp = Utils.calculateSetting(averageTemp);
        const city = data.city.name;
        averageTemp = Math.round(averageTemp*10)/10 + ' C°';
        this.setState({
          error: null,
          averageTemp,
          settingTemp,
          temperatures,
          city,
          loading: false
        });
      } else {
        const error = {
          status: data.cod,
          message: data.message
        }
        this.setState({ error, loading: false });
      }

    })
    .catch( (error) => {
      console.log({error});
      this.setState({ loading: false });
    });
  }

  averageTemp = (list) => {
    var sum = 0;
    list.forEach( item => sum += item.temp);
    return sum/list.length;
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
            </View>
            <View style={styles.dataBlock}>
              <Text style={styles.label}>Indstilling</Text>
              <Text style={styles.value}>{ this.state.settingTemp }</Text>
            </View>
          </View>
          { this.state.loading &&
            <ActivityIndicator animating={this.state.loading} size="large" color="rgb(183,32,33)"/>
          }
          <TouchableOpacity style={styles.btn} onPress={this.loadSetting}>
            <Text style={styles.btnText}>OPDATER</Text>
          </TouchableOpacity>
          { this.state.error &&
            <View>
              <Text>Status kode: { this.state.error.status }</Text>
              <Text>Error: { this.state.error.message }</Text>
            </View>
          }
        </View>

        <View style={styles.carouselContainer}>
          <Carousel
            data={["list", "chart"]}
            renderItem={({item}) => <Card view={item} data={this.state.temperatures}/> }
            sliderWidth={Utils.wp(100)}
            itemWidth={Utils.wp(90)}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    padding: 5,
  },
  primary: {
    flex: 0.65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 175,
    height: 86.1,
    marginBottom: 30,
  },
  dataContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 0,
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
  btn: {
    width: 150,
    height: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  carouselContainer: {
    flex: 0.35,
  }
});
