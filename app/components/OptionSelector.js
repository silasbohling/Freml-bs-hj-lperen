import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import Colors from '@modules/Colors.js'
import Utils from '@modules/Utils'

export default class OptionSelector extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      offset: new Animated.Value(0)
    }

    this.width = Utils.wp(80)
  }

  _optionSelected = (selected, value) => {
    Animated.timing( this.state.offset, {
      toValue: this.width/this.props.options.length*selected,
      duration: 300
    }).start( () => {
      this.props.optionPressed(value)
    })
  }

  render() {
    const renderedOptions = this.props.options.map( (option, index) => {
      return(
        <TouchableOpacity
          style={ styles.option }
          onPress={ () => this._optionSelected(index, option.value) }
          key={index}>
          <Text style={styles.label}>{ option.label }</Text>
        </TouchableOpacity>
      )
    })

    return(
      <View style={[styles.container, { width: this.width }]}>
        <Animated.View
          style={[ styles.selected, { width: this.width/this.props.options.length, left: this.state.offset } ]}
        />
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
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center'
  },
  label: {
    color: Colors.btnText,
    fontSize: 12,
    fontWeight: '500'
  },
  selected: {
    backgroundColor: Colors.primary,
    position: 'absolute',
    top: 0,
    bottom: 0,
    borderRadius: 10,
  }
})
