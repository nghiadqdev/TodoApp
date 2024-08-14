import { ImageBackground, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode, useEffect, useState } from 'react'
import { Colors, fullHeight, fullWidth, normalize, scaleHeight, scaleWidth } from '@/common'
import Animated, { SlideInUp, SlideOutDown } from 'react-native-reanimated'
import { AModalType } from './types';
import { useTheme } from '@/theme';

const AModal = (props: AModalType) => {
    const { isOpent = false, children, animationTypeIn = SlideInUp, animationTypeOut = SlideOutDown, onClose = () => { } } = props
    const [isModal, setisModal] = useState(false);
	const { layout } = useTheme();

    return (
        <Modal
            visible={isOpent}
            transparent={true}
            animationType='fade'
            supportedOrientations={["portrait", "portrait-upside-down", "landscape", "landscape-left", "landscape-right"]}
        >
            <View style={{ flex: 1, flexGrow: 1 }}>
                <Pressable onPress={onClose} style={{ flex: 1, flexGrow: 1, }}>
                    <ImageBackground source={{}} style={styles.modalStyle} />
                </Pressable>
                <Animated.View  style={[styles.contantEdit, layout.shadow]}>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    )
}

export default AModal

const styles = StyleSheet.create({
    contantEdit: {
        position: 'absolute',
        alignSelf: 'center',
        top: scaleHeight(90),
        padding: scaleHeight(12),
        paddingHorizontal: scaleWidth(20),
        borderRadius: normalize(20),
        backgroundColor: Colors.white,
    },
    modalStyle: {
        flex: 1,
        opacity: 0.6,
        backgroundColor: Colors.black
    }

})
