import React from 'react';
import Utils from '@modules/Utils';

describe('calculateSetting utility', () => {

  it('should calculate correct setting', () => {
    expect(Utils.calculateSetting(10)).toBeCloseTo(3.3);
    expect(Utils.calculateSetting(6.9)).toBeCloseTo(3.4);
  })

})

describe('formatUnixTimestamp utility', () => {

  it('should display right date', () => {
    const timestamp = "1542412800";
    const format = "D/M HH:mm"
    expect(Utils.formatUnixTimestamp(timestamp,format)).toBe("17/11 00:00");
  })

})
