import { Platform, View, ViewStyle } from 'react-native';
import React, { FC, ReactElement } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, isIOS } from '@/common';
import AText from '../AText';

type wrapperType = {
  wStyle?: ViewStyle,
  children?: Array<ReactElement> | ReactElement,
  safeAreaBgColor?: string,
  barStyle?: 'default' | 'light-content' | 'dark-content';
  bgStatusBarColor?: string,
  isSafe?: boolean,
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
}

const Wrapper: FC<wrapperType> = props => {
  const {
    wStyle={},
    children,
    barStyle = 'dark-content',
    bgStatusBarColor = 'transparent',
    isSafe = true,
    safeAreaBgColor
  } = props;
  const insets = useSafeAreaInsets();
  const defaultStyle = {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingBottom: isIOS ? 0 : 10,
  };

  return (
    <View
      style={[defaultStyle, wStyle]}
      pointerEvents={props.pointerEvents || 'auto'}>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={bgStatusBarColor}
        translucent={true}
      />
      {isSafe ? (
        <SafeAreaView
          style={{
            backgroundColor: safeAreaBgColor ?? Colors.white,
            flex: 1,
            paddingTop: isIOS ? 0 : insets.top,
            marginBottom: insets.bottom
          }}>
          {children}
        </SafeAreaView>
      ) : (
        <View
          style={{
            flex: 1,
          }}>
          {children}
        </View>
      )}
    </View>
  );
};

export default Wrapper;
