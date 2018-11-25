import React from 'react'
import ForeCastCell from '@components/ForeCastCell'

import Renderer from 'react-test-renderer'

describe( 'ForeCastCell', () => {

  it('render correctly', () => {
    const forecast = {
      time: 389485,
      temp: 3.5,
      setting: 6,
      chillFactor: 12.3,
      chillFactorSetting: 8
    }

    const component = <ForeCastCell forecast={ forecast } />
    const three = Renderer.create(component).toJSON()

    expect(three).toMatchSnapshot()
  })
})
