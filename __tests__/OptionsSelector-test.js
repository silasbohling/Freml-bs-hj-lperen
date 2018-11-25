import React from 'react';
import OptionSelector from '@components/OptionSelector';

import Renderer from 'react-test-renderer';

describe( 'OptionSelector', () => {

  it('render correctly', () => {
    const options = [
      { label:"24 timer", value:9 },
      { label:"48 timer", value:17 },
      { label:"3 døgn", value:25 },
      { label:"4 døgn", value:33 }
    ]

    const component = <OptionSelector options={ options } optionPressed={null} />
    const three = Renderer.create(component).toJSON()

    expect(three).toMatchSnapshot()
  })
})
