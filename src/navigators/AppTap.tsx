import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard, Task } from '@/screens';
import { Routes } from '@/common';
import AppFooter from './AppFooter';

const StackDashboard = createNativeStackNavigator();
const StackTask = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DashboardTap() {
    return (
        <StackDashboard.Navigator initialRouteName={Routes.Dashboard}>
            <StackDashboard.Screen
                name={Routes.Dashboard}
                component={Dashboard}
                options={{
                    headerShown: false,
                }}
            />
        </StackDashboard.Navigator>
    );
}

function TaskTap() {
    return (
        <StackTask.Navigator initialRouteName={Routes.Task}>
            <StackTask.Screen
                name={Routes.Task}
                component={Task}
                options={{
                    headerShown: false,
                }}
            />
        </StackTask.Navigator>
    );
}


function BottomTab(props: BottomTabBarProps) {
    const { state, descriptors, navigation } = props;
    const tabIndex = state.index || 0;
    const currentRoute = state.routes[tabIndex];
    let isHide = false;
    if (currentRoute && currentRoute.state) {
        isHide = !!currentRoute.state.index;
    }
    return (
        <>
            {!isHide ? <AppFooter state={state} descriptors={descriptors} navigation={navigation} /> : <></>}
        </>
    )
}
const AppTap = () => {
    return (
        <>
            <Tab.Navigator
                initialRouteName='Task'
                screenOptions={{ headerShown: false }}
                tabBar={(props: BottomTabBarProps) => <BottomTab {...props}
                />}>
                <Tab.Screen name="Dashboard" component={DashboardTap} />
                <Tab.Screen name="Task" component={TaskTap} />
            </Tab.Navigator>
        </>
    )
}

export default AppTap

const styles = StyleSheet.create({})