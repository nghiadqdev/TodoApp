import { ColorValue, LayoutAnimation, StyleSheet, Text, View, ViewProps } from 'react-native'
import React from 'react'
import { AViewType } from './types'
import { normalize, scaleHeight, scaleWidth } from '@/common'
import Animated from 'react-native-reanimated'

const AView = (props: React.JSX.IntrinsicAttributes & React.JSX.IntrinsicClassAttributes<View> & Readonly<ViewProps> & AViewType) => {
    const {
        testID,
        children,
        w, h, bg = 'transparent',
        f1 = false, f2 = false, r = false, center = false,
        p, ph, pv, pl, pr, pb, pt, aStyle
    } = props

	const toggleAnimation = (duration: number) => {
		return {
			duration: duration,
			update: {
				property: LayoutAnimation.Properties.scaleXY,
				type: LayoutAnimation.Types.easeInEaseOut,
			},
			delete: {
				property: LayoutAnimation.Properties.opacity,
				type: LayoutAnimation.Types.easeInEaseOut,
			},
		};
	};
	LayoutAnimation.configureNext(toggleAnimation(300))

    return (
        <Animated.View
            style={[
                { backgroundColor: bg, },
                f1 && { flex: 1 },
                f2 && { flex: 2 },
                !!w && { width: scaleWidth(w) },
                !!h && { height: h == 'auto' ? 'auto' : scaleHeight(h) },
                r && { flexDirection: 'row', alignItems: 'center' },
                center && { justifyContent: 'center', alignItems: 'center' },
                !!p && { padding: normalize(p) },
                !!ph && { paddingHorizontal: normalize(ph) },
                !!pv && { paddingVertical: normalize(pv) },
                !!pl && { paddingLeft: normalize(pl) },
                !!pr && { paddingRight: normalize(pr) },
                !!pb && { paddingBottom: normalize(pb) },
                !!pt && { paddingTop: normalize(pt) },
                aStyle
            ]}
            testID={testID}
            accessibilityLabel={testID}
            {...props}>
            {children}
        </Animated.View>
    )
}

export default AView

const styles = StyleSheet.create({})