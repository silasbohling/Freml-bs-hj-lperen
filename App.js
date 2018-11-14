import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import Api from './components/Api';
import Card from './components/Card';
import Carousel from 'react-native-snap-carousel';

const cityId = "6543938";

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

    Api.currentCityWeather(cityId).then( (data) => {
      console.log({data});
      if (data.cod == 200) {
        var temperatures = [];
        for (var i = 0; i < 9; i++) {
          const temp = data.list[i].main.temp;
          const time = data.list[i].dt;
          const setting = this.calculateSetting(data.list[i].main.temp);
          temperatures.push({ temp, time, setting });
        }
        var averageTemp = this.average(temperatures);
        const settingTemp = this.calculateSetting(averageTemp);
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

  average = (list) => {
    var sum = 0;
    list.forEach( item => sum += item.temp);
    return sum/list.length;
  }

  calculateSetting = (x) => {
    const y = 0*Math.pow(x,2)-0.05*x+3.78;
    return Math.round(y*10)/10;
  }

  wp = (percentage) => {
    const { width: viewportWidth } = Dimensions.get('window');
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  }
  hp = (percentage) => {
    const { height: viewportHeight } = Dimensions.get('window');
    const value = (percentage * viewportHeight) / 100;
    return Math.round(value);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.primary}>
          <Image  style={styles.logo} source={ require('./assets/fjernvarme-logo.png') } />
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
          <TouchableOpacity style={styles.btn} onPress={ this.loadSetting }>
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
            sliderWidth={this.wp(100)}
            itemWidth={this.wp(90)}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: 'rgb(183,32,33)',
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
