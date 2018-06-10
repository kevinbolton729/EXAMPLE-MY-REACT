/*
 * @Author: Kevin Bolton
 * @Date: 2018-06-10 21:37:04
 * @Last Modified by:   Kevin Bolton
 * @Last Modified time: 2018-06-10 21:37:04
 */

// 省份/城市
import { CITY_JSON } from '../city';
// 方法
import { covertFormat } from '../';

// 获取省份城市 传入参数 eg. '510000,510100' '四川,成都'
export const covertCity = city => city.split(',');
// 获取省份/城市的显示数据 eg. 四川省 / 成都市
export const getCitys = (city) => {
  const result = [];
  const cityData = covertFormat(CITY_JSON);
  const arr = city.split(',');

  // 获取省份
  const provinceLabel = [];
  for (const item of cityData) {
    if (arr[0] === item.value) {
      provinceLabel.push(item.label);
      break;
    }
  }
  // 获取城市
  const cityLabel = [];
  for (const item of cityData) {
    if (arr[1] === item.value) {
      cityLabel.push(item.label);
      break;
    }
  }

  // console.log(provinceLabel[0] && provinceLabel[0].label, 'provinceLabel');
  // console.log(cityLabel[0] && cityLabel[0].label, 'cityLabel');

  if (provinceLabel[0] && cityLabel[0]) {
    result.push(`${provinceLabel[0]} / ${cityLabel[0]}`);
  }

  return result[0] || '';
};
