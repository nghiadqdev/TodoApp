import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, Agenda, LocaleConfig } from 'react-native-calendars';
import AView from './AView';
import AText from '../AText';
import i18next from 'i18next';
import { Colors, LIST_TAG_TASK, normalize, scaleWidth } from '@/common';
import moment from 'moment';
import { storage } from '@/App';
import { useRecoilState } from 'recoil';
import { todoList_atom, user_atom } from '@/recoils';
import { TaskType } from '@/recoils/atoms/todolistAtoms';
import AIcon from '../AIcon';
import { ICON_TYPE } from '../AIcon/AIcon';
import modalAddTask from '../modalAddTask';

const Timeline = () => {
    const [todoListAtom, setTodoListAtom] = useRecoilState(todoList_atom)
    const [user, setUser] = useRecoilState(user_atom)

    // RENDER
    const DotPoin = () => <AView w={6} h={6} bg={Colors.tim8c50ea} aStyle={{ borderRadius: normalize(3) }} />
    const renderItemTask = (item: TaskType, firstItemInDay: boolean) => {
        let index = item.index
        let color = index % 2 == 0 ? Colors.timf3eefb : Colors.white
        if (firstItemInDay && item.name == 'Empty') {
            return (
                <AView r h={80} center bg={color} aStyle={styles.itemCalendarStyle}>
                    <AText h14>{`Let's create a new task for this day`}</AText>
                    <AIcon onPress={() => setUser({ ...user, isAddTask: moment(new Date(item.date)).format('YYYY-MM-DD') })} name={'plus'} origin={ICON_TYPE.ANT_ICON} size={20} />
                </AView>
            )
        } else {
            let label = LIST_TAG_TASK[item.tag || 'Low']
            let bg = index % 2 == 0 ? Colors.timf3eefb : Colors.white
            return (
                <AView bg={bg} h={firstItemInDay ? 80 : 50} aStyle={firstItemInDay ? styles.itemCalendarStyle : {}}>
                    {firstItemInDay &&
                        <AView h={30} r center bg={bg}>
                            <AText h14 color={Colors.tim8c50ea}>{'Add orther task'}</AText>
                            <AIcon
                                onPress={() => setUser({ ...user, isAddTask: moment(new Date(item.date)).format('YYYY-MM-DD') })}
                                name={'plus'}
                                origin={ICON_TYPE.ANT_ICON}
                                color={Colors.tim8c50ea}
                                size={20} />
                        </AView>
                    }
                    <AView r h={50} bg={color} aStyle={{ alignItems: 'center' }}>
                        {!firstItemInDay && <AView w={60} bg={bg} center><AView w={1} h={50} center bg={Colors.tim8c50ea}><DotPoin /></AView></AView>}
                        <AView r f1>
                            <AView p={6}>
                                <AView r >
                                    <AText h12>{moment(item?.timeStart).format('hh:mm a')} - {moment(item?.timeEnd).format('hh:mm a')}</AText>
                                    <AView p={2} ph={12} bg={label.color} aStyle={styles.labelStyle}>
                                        <AText h12 color='white'>{label.title}</AText>
                                    </AView>
                                </AView>
                                <AText h16 w500>{item.name}</AText>
                            </AView>
                        </AView>
                    </AView>
                </AView>
            )
        }
    }
    let dayKey = moment(new Date()).format('YYYY-MM-DD')
    return (
        <View style={styles.container}>
            <AView p={15}>
                <AText h22 color={Colors.tim7543d2}>{moment(new Date()).format('ll')}</AText>
                <AText h16 color={Colors.tim7543d2}>{`${(todoListAtom[dayKey] || []).length} tasks today`}</AText>
            </AView>
            <Agenda
                items={todoListAtom}
                renderItem={renderItemTask}
                renderDay={(day: any, item: any) => {
                    let index = item.index
                    let color = index % 2 == 0 ? Colors.timf3eefb : Colors.white
                    let tasks = moment(new Date(day)).format('YYYY-MM-DD')
                    let checkTask = JSON.parse(storage.getString(tasks) || '[]').length > 0
                    if (!!day)
                        return (
                            <AView w={60} h={80} bg={color} aStyle={{ borderTopWidth: 1, borderTopColor: Colors.tim7543d2 }}>
                                <AView f1 center>
                                    <AText h18 color={Colors.tim8c50ea}>{moment(new Date(day)).format('DD')}</AText>
                                    <AText h12 color={Colors.tim8c50ea}>{moment(day).format('ddd')}</AText>
                                </AView>
                                {checkTask && <AView bg={color} aStyle={{ alignItems: 'center' }}>
                                    <DotPoin />
                                    <AView w={1} h={14} bg={Colors.tim8c50ea} />
                                </AView>}
                            </AView>
                        )
                }}
                renderEmptyData={() => {
                    return (
                        <AView>
                            <AText>{'you have not plan yet'}</AText>
                        </AView>
                    )
                }}
            />
            {modalAddTask()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 100
    },
    header: {
        fontSize: 24,
        color: 'white',
    },
    subHeader: {
        fontSize: 18,
        color: 'white',
        marginBottom: 10,
    },
    itemCalendarStyle: {
        borderTopColor: Colors.tim7543d2,
        borderTopWidth: normalize(1),
    },
    labelStyle: {
        borderRadius: normalize(10), marginHorizontal: normalize(10), marginLeft: normalize(8)
    }
});

export default Timeline;
