import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@modules/Colors.js';

export default class OptionSelector extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
    }
  }

  _optionSelected = (selected, value) => {
    this.setState({ selected })
    this.props.optionPressed(value)
  }

  render() {
    const renderedOptions = this.props.options.map( (option, index) => {
      return(
        <TouchableOpacity
          style={[styles.option, (this.state.selected == index) ? styles.selected : null]}
          onPress={ () => this._optionSelected(index, option.value) }
          key={index}>
          <Text style={styles.label}>{ option.label }</Text>
        </TouchableOpacity>
      )
    })


    return(
      <View style={styles.container}>
        {renderedOptions}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    flexDirection: 'row'
  },
  option: {
    borderRadius: 10,
    padding: 10
  },
  label: {
    color: Colors.btnText,
    fontSize: 12,
    fontWeight: '500'
  },
  selected: {
    backgroundColor: Colors.primary,
  }
})
