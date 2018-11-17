import React from 'react';
import { Dimensions } from 'react-native';
import Utils from '@modules/Utils';

jest.mock('Dimensions')

describe('calculateSetting', () => {

  it('should calculate correct settings', () => {
    const testData = [
      {temp: 20, setting: 2.8},
      {temp: 15, setting: 3},
      {temp: 10, setting: 3.3},
      {temp: 5, setting: 3.5},
      {temp: 0, setting: 3.8},
      {temp: -5, setting: 4.0},
      {temp: -10, setting: 4.3},
      {temp: -15, setting: 4.5}
    ]

    for (var i = 0; i < testData.length; i++) {
      const setting = Utils.calculateSetting(testData[i].temp)
      expect(setting).toBeCloseTo(testData[i].setting)
    }
  })

})

describe('formatUnixTimestamp', () => {

  it('should display right date', () => {
    const timestamp = "1542412800"
    const format = "D/M HH:mm"
    expect(Utils.formatUnixTimestamp(timestamp,format)).toBe("17/11 00:00")
  })

})

const resp = { width: 100, height: 100 }
Dimensions.get.mockReturnValue(resp)

describe('heightPercentage', () => {

  it('returns correct calculated height', () => {
    for (var i = 0; i <= 100; i++) {
      expect(Utils.hp(i)).toBe(i);
    }
  })

})

describe('widthPercentage', () => {

  it('returns correct calculated width', () => {
    for (var i = 0; i <= 100; i++) {
      expect(Utils.wp(i)).toBe(i);
    }
  })

})

describe('calculateChillFactor', () => {

  it('should calculate correct chills', () => {
    const testData = [
      {temp: -10, wind: 9, chill: -28},
      {temp: -15, wind: 4.5, chill: -25},
      {temp: 0, wind: 6.5, chill: -11},
      {temp: -20, wind: 2, chill: -23},
      {temp: -5, wind: 18, chill: -27},
      {temp: -30, wind: 6.5, chill: -52}
    ]

    for (var i = 0; i < testData.length; i++) {
      const calculated = Utils.calculateChillFactor(testData[i].temp, testData[i].wind)
      const chill = testData[i].chill
      expect(calculated).toBeGreaterThan(chill - 5)
      expect(calculated).toBeLessThan(chill + 5)
    }
  })

})
