import { StyleSheet, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import { normalize } from '@/common';
import { AView } from '../AView';
import AText from '../AText';

interface AInput {
    contentStyle?: ViewStyle | ViewStyle[],
    aStyle?: ViewStyle | ViewStyle[],
    title?: string,
    titleStyle?: TextStyle
}

const AInput = (props: React.JSX.IntrinsicAttributes & React.JSX.IntrinsicClassAttributes<TextInput> & Readonly<TextInputProps> & AInput) => {
    const { contentStyle = {}, aStyle = {}, testID = '', title = '', titleStyle={} } = props
    return (
        <AView aStyle={contentStyle}>
            {!!title && <AText h12 aStyle={titleStyle} >{title}</AText>}
            <TextInput
                testID={testID}
                accessibilityLabel={testID}
                style={{
                    padding: 0,
                    height: normalize(30),
                    ...aStyle
                }}
                {...props}

            />
        </AView>
    )
}

export default AInput

const styles = StyleSheet.create({})