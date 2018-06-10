/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-05 22:04:50
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-06-10 21:30:44
 */
import { message as openMessage } from 'antd';
import md5 from 'js-md5';
import moment from 'moment';
// Config
import { API_DOMAIN, SECRETKEY_USER, URL_PREFIX } from '../config';
// 省份/城市
import { CITY_JSON } from './city';

// unix(13位)时间戳格式化 eg.
export const unixFormatter = (timestamp, format = 'YYYY年MM月DD日 HH:mm:ss') => {
  const newTimeStamp = `${timestamp}${timestamp.length === 10 ? '000' : ''}`;
  return moment(parseInt(`${newTimeStamp}`, 10)).format(format);
};

// md5处理
export const setMd5 = pwd => md5(md5(pwd + SECRETKEY_USER) + SECRETKEY_USER);

// 格式化数字
const twoDecimal = (num) => {
  // 显示数字，保留小数点后两位
  // 返回值的类型为String
  const f = parseFloat(num);

  if (!f) {
    return '0.00';
  }

  return (Math.floor(f * 100) / 100).toFixed(2);
};
export const parseNum = value => twoDecimal(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// 解析URL地址
export const parseUrl = (url) => {
  let newUrl = url;
  const httpIndexOf = newUrl && newUrl.indexOf('http');
  if (httpIndexOf === -1) {
    newUrl = `${API_DOMAIN}${newUrl}`;
  }
  return newUrl;
};

/**
 * 无限级数菜单
 * --- START ---
 * @description 生成无限级数菜单
 * @param {Array} firstMenus 一级菜单
 * @param {Array} [data=[]]  菜单数据
 */
export const getMenus = (firstMenus, data = []) =>
  firstMenus.reduce((arr, current) => {
    const children = [];
    const obj = { ...current };
    children.push(...getChildMenus(current.sortId, data));
    if (children.length > 0) {
      obj.children = children;
    }
    arr.push(obj);
    return arr;
  }, []);
/**
 * @description 生成一级菜单
 * @param {Array} [data=[]]  菜单数据
 */
export const getFirstMenu = (data = []) =>
  data.reduce((arr, current) => {
    if (parseInt(current.sortPid, 10) === 0) {
      return arr.concat(current);
    }
    return arr;
  }, []);
/**
 * @description 生成下级菜单
 * @param {Array} [data=[]]  菜单数据
 */
export const getChildMenus = (sortId, data = []) =>
  data.reduce((arr, current) => {
    const children = [];
    if (sortId === current.sortPid) {
      const obj = { ...current };
      children.push(...getChildMenus(current.sortId, data));
      if (children.length > 0) {
        obj.children = children;
      }
      arr.push(obj);
    }
    return arr;
  }, []);

/**
 * 省份/城市级联
 * --- START ---
 * @description 生成无限级数菜单
 * @param {Array} provinces 一级菜单
 * @param {Array} [data=[]]  数据
 */
export const getProvinceCity = (provinces, data = []) =>
  provinces.reduce((arr, current) => {
    const children = [];
    const obj = { ...current };
    children.push(...getCitys(`${current.value.slice(0, 2)}`, data));
    if (children.length > 0) {
      obj.children = children;
    }
    arr.push(obj);
    return arr;
  }, []);
/**
 * @description 生成省份
 * @param {Array} [data=[]]  数据
 */
export const getProvinces = (data = []) => {
  const covertData = covertFormat(data);
  return covertData.reduce((arr, current) => {
    if (`${current.value.slice(2)}` === '0000') {
      return arr.concat(current);
    }
    return arr;
  }, []);
};
/**
 * @description 生成城市
 * @param {String} provinceCode 省份Code
 * @param {Array} [data=[]]  数据
 */
export const getCitys = (provinceCode, data = []) => {
  const covertData = covertFormat(data);
  return covertData.reduce((arr, current) => {
    if (`${current.value.slice(0, 2)}` === provinceCode && `${current.value.slice(2)}` !== '0000') {
      arr.push(current);
    }
    return arr;
  }, []);
};
// 转换格式 结果: eg. { label: '北京市', value: '110000' }
export const covertFormat = (data = []) =>
  data.map(current => ({
    label: current.item_name,
    value: current.item_code,
  }));
// 获取级联菜单: cityOptions
export const getCityOptions = () => {
  const data = CITY_JSON; // 元数据
  const provinces = getProvinces(data); // 省份
  // console.log(getProvinceCity(provinces, data), 'getProvinceCity(provinces, data)');
  return getProvinceCity(provinces, data);
};
// 字符串转换成大写
export const strToUpper = str => str.toString().toUpperCase();
// 获取图片Base64编码内容
export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
// base64 to Blob
export const base64UrlToBlob = (urlData) => {
  // 去掉url的头，并转换为byte
  const bytes = window.atob(urlData.split(',')[1]);
  // 处理异常,将ascii码小于0的转换为大于0
  const ab = new ArrayBuffer(bytes.length);
  const ia = new Uint8Array(ab);
  ia.forEach((i, index) => {
    ia[index] = bytes.charCodeAt(index);
  });
  return new Blob([ia], {
    type: urlData
      .split(',')[0]
      .split(':')[1]
      .split(';')[0],
  });
};
// 过滤react-quill getContent()的内容，获取待上传的图片
export const getUploadImgs = (passArr = []) => {
  if (passArr.length === 0) return passArr;

  const newArr = passArr;

  const uploadImages = newArr.reduce((arr, current) => {
    if (current.insert.image) {
      const { image } = current.insert;
      // console.log(image, 'image');
      // 过滤掉网络图片的url
      if (image.indexOf('data:image') !== -1) {
        return arr.concat(base64UrlToBlob(image));
      }
    }
    return arr;
  }, []);

  // console.log(uploadImages, 'uploadImages');
  return uploadImages;
};
// 使用图片url 替换 Delta中base64 image
export const covertBase64toUrl = (params) => {
  const { data, contentOps } = params;
  // console.log(data, 'data');
  // console.log(contentOps, 'contentOps');

  let n = 0;
  for (const i of contentOps) {
    const { image } = contentOps[i].insert;
    if (image && image.indexOf('data:image') !== -1) {
      // console.log(image, 'image');
      contentOps[i].insert.image = URL_PREFIX + data[n].url;
      n += 1;
    }
  }

  // console.log(contentOps, 'new contentOps');
  return contentOps;
};
// 图片上传前
export const beforeUpload = (file) => {
  const isIMG =
    file.type.indexOf('image/jpeg') !== -1 ||
    file.type.indexOf('image/gif') !== -1 ||
    file.type.indexOf('image/png') !== -1;
  const isLt = file.size / 1024 / 1024 < 1000;

  if (!isIMG) {
    openMessage.error('请上传格式为：JPG/GIF/PNG的图片!');
  }
  if (!isLt) {
    openMessage.error('请上传小于1000M的图片!');
  }

  return isIMG && isLt;
};
// 视频上传前
export const beforeUploadVideo = (file) => {
  const isMp4 = file.type.indexOf('video/mp4') !== -1;
  const isLt = file.size / 1024 / 1024 < 50;

  if (!isMp4) {
    openMessage.error('请上传格式为：MP4的视频!');
  }
  if (!isLt) {
    openMessage.error('请上传小于50M的视频!');
  }

  return isMp4 && isLt;
};
// --- END ---
// Dispatch Action
// opts: { type: string; payload?: any }
export const dispatchAction = (props, opts) => {
  const { dispatch } = props;
  dispatch(opts.payload ? { type: opts.type, payload: opts.payload } : { type: opts.type });
};
