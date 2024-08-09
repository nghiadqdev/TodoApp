import { ColorValue, NativeMethods, StyleSheet, Text, TouchableMixin, TouchableOpacity, TouchableOpacityComponent, TouchableOpacityProps, View, ViewProps } from 'react-native'
import React from 'react'
import { AViewType } from './Types'
import { normalize, scaleHeight, scaleWidth } from '@/common'
import { Constructor } from 'react-native/types/private/Utilities'
import { TimerMixin } from 'react-native/types/private/TimerMixin'

const ATouch = (props: TouchableOpacityProps & AViewType) => {
    const {
        testID,
        children,
        w, h, bg = 'transparent',
        f1 = false, f2 = false, r = false, center = false,
        p, ph, pv, pl, pr, pb, pt, aStyle
    } = props

    return (
        <TouchableOpacity
            style={[
                { backgroundColor: bg, },
                f1 && { flex: 1 },
                f2 && { flex: 2 },
                !!w && { width: scaleWidth(w) },
                !!h && { width: scaleHeight(h) },
                !!r && { flexDirection: 'row' },
                center && { justifyContent: 'center', alignItems: 'center' },
                !!p && { padding: normalize(p) },
                !!ph && { paddingHorizontal: normalize(ph) },
                !!pv && { paddingVertical: normalize(pv) },
                !!pl && { paddingLeft: normalize(pl) },
                !!pr && { paddingRight: normalize(pr) },
                !!pb && { paddingBottom: normalize(pb) },
                !!pt && { paddingTop: normalize(pt) },
                { ...aStyle }
            ]}
            testID={testID}
            accessibilityLabel={testID}
            {...props}>
            {children}
        </TouchableOpacity>
    )
}

export default ATouch

const styles = StyleSheet.create({})
