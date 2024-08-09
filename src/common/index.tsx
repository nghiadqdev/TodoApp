import { Alert, Dimensions, PermissionsAndroid, Platform, StatusBar } from 'react-native';
import { Colors } from './colors'
import { Fonts } from './fonts'

const isIOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');

function isIphoneX() {
  const dim = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    (dim.height === 780 ||
      dim.width === 780 ||
      dim.height === 812 || //iphone X, 12 mini, iphone 11 pro,
      dim.width === 812 ||
      dim.height === 844 || //12 pro
      dim.width === 844 ||
      dim.height === 896 || //iphone 11 pro max
      dim.width === 896 ||
      dim.height === 926 || //iphone 12 pro max
      dim.width === 926)
  );
}

function isEmptyObj(obj: object | any) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
}

const isEmptyArray = (array: object | any) => {
  return !Array.isArray(array) || !array.length;
};

function replaceSpace(str: string) {
  return str.replace(/\u0020/, "\u00a0");
}
// standar is iphone 12: 844 x 390  6.1 inch
const normalize = (fontSize: number, fontScale = 1): number => {
  const standarHeight = height;
  const standarWidth = width;
  const inch = Math.sqrt(standarHeight * standarHeight + standarWidth * standarWidth)
  const defaultInch = Math.sqrt(844 * 844 + 390 * 390)
  let resoultNum = Math.floor(fontSize * inch / defaultInch) * 100 * fontScale
  return parseFloat((resoultNum / 100).toFixed(2));
};

const scaleHeight = (number: number, standardLength = 844) => {
  let heightS = (isIOS ? number : number + 0.4) * (height) / standardLength
  return Math.floor(heightS)
}

const scaleWidth = (number: number, standardLength = 390) => {
  let widthS = (isIOS ? number : number + .4) * (width) / standardLength
  return Math.floor(widthS)
}

const convertSecond = (time: string) => {
  var a = time.split(':'); // split it at the colons
  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
  return seconds
}

function shuffleArray(n: number) { // n is length of array
  let array = Array.from({ length: n }, (_, index) => index)
  for (let i = array.length - 1; i > Math.floor(array.length / 2); i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export {
  width as fullWidth,
  height as fullHeight,
  isIOS,
  isIphoneX,
  Colors,
  Fonts,
  isEmptyArray,
  isEmptyObj,
  replaceSpace,
  normalize,
  scaleHeight,
  scaleWidth,
  convertSecond,
  shuffleArray,
};
