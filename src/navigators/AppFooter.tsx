import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ATouch, AView } from '@/components/template';
import { AIcon, ICON_TYPE } from '@/components/template/AIcon/AIcon';
import { NavigationHelpers, NavigationState, ParamListBase, PartialState, TabNavigationState } from '@react-navigation/native';
import { Colors, fullWidth, isIOS, normalize, scaleHeight, scaleWidth } from '@/common';
import { BottomTabDescriptorMap, BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';

interface AppFooterType {
    state: TabNavigationState<ParamListBase>;
    descriptors: BottomTabDescriptorMap;
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>
}
const AppFooter = (props: AppFooterType) => {
    const { t, i18n } = useTranslation();
    const { state, descriptors, navigation } = props

    // const dispatch = useDispatch();
    const renderItem = (route: Readonly<{ key: string; name: string; path?: string; }> & Readonly<{ params?: Readonly<object | undefined>; }> & { state?: NavigationState | PartialState<NavigationState>; }, index: React.Key | null | undefined) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true
            });
            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
            }
        };

        const onLongPress = () => {
            navigation.emit({
                type: 'tabLongPress',
                target: route.key,
            });
        };
        let IMAGE = 'home';
        let TAB_NAME = 'Dashboard'
        let origin = ''
        switch (index) {
            case 0:
                IMAGE = 'home';
                TAB_NAME = 'Dashboard'
                origin = isFocused ? ICON_TYPE.ICONICONS : ICON_TYPE.ANT_ICON
                break;
            case 1:
                IMAGE = !isFocused ? 'setting' : 'settings';
                TAB_NAME = 'Task'
                origin = !isFocused ? ICON_TYPE.ANT_ICON : ICON_TYPE.ICONICONS
                break;
            default:
                IMAGE = 'home';
                TAB_NAME = 'Dashboard'
                origin = isFocused ? ICON_TYPE.ICONICONS : ICON_TYPE.ANT_ICON
                break;
        }
        return (
            <ATouch
                key={index}
                activeOpacity={0.5}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={styles.containerItem}
                onLongPress={onLongPress}>
                <View style={[styles.btnItem, isFocused && { borderTopWidth: normalize(2), borderTopColor: Colors.white }]}>
                    <AView h={32} center>
                        <AIcon
                            origin={origin}
                            name={IMAGE}
                            size={30}
                            color={isFocused ? Colors.white : Colors.grayD8D8D8}
                        />
                    </AView>
                </View>
            </ATouch>
        );
    };

    return <View style={styles.content}>{state.routes.map((route, index) => renderItem(route, index))}</View>;
};

export default AppFooter;
const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        width: fullWidth,
        alignItems: 'center',
        height: isIOS ? scaleHeight(84) : scaleHeight(64),
        backgroundColor: Colors.white,
        shadowColor: Colors.tim8c50ea,
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 5,
        shadowOpacity: isIOS ? 0.23 : 0.45,
        elevation: 3,
        borderTopLeftRadius: normalize(20),
        borderTopRightRadius: normalize(20),
        overflow: 'hidden'
    },
    containerItem: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: isIOS ? 'flex-start' : 'center',
        alignItems: 'center',
        backgroundColor: Colors.tim8c50ea,
    },
    btnItem: {
        height: scaleHeight(51),
        flexDirection: 'column',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: scaleHeight(15),
    },
    iconItem: {
        width: scaleWidth(32),
        height: scaleHeight(32),
        marginBottom: normalize(3),
    },
});
