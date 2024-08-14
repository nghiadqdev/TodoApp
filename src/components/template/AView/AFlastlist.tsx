import { FlatListProps, StyleSheet, FlatList, View, ViewStyle } from 'react-native'
import React, { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react'

const AFlastlist = forwardRef((props: FlatListProps<any> & { contantStyle?: ViewStyle }, ref) => {
  const { contantStyle = {} } = props
  const _ref = useRef<FlatList<any>>(null);

  useImperativeHandle(
    ref,
    () => ({
      scrollToIndex: (params: { animated?: boolean | null | undefined; index: number; viewOffset?: number | undefined; viewPosition?: number | undefined; }) => _ref.current?.scrollToIndex(params),
      scrollToOffset: (params: { animated?: boolean | null | undefined; offset: number; }) => _ref.current?.scrollToOffset(params),
      scrollToEnd: (params: { animated?: boolean | null | undefined; } | undefined) => _ref.current?.scrollToEnd(params),
      // Add other FlatList methods you need here
    }),
    [],
  );

  return (
    <View style={contantStyle}>
      <FlatList
        ref={_ref}
        keyExtractor={(item, _) => _.toString()}
        scrollEventThrottle={16}
        {...props}
      />
    </View>
  )
})

export default AFlastlist

const styles = StyleSheet.create({})
