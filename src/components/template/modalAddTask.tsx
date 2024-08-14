import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { AModal, ATouch, AView } from './AView'
import AInput from './AInput'
import { addTask, Colors, editTask, fullWidth, LIST_TAG_TASK, normalize, scaleHeight, scaleWidth } from '@/common'
import AText from './AText'
import moment from 'moment'
import { useRecoilState } from 'recoil'
import { todoList_atom, user_atom } from '@/recoils'
import { useTheme } from '@/theme'
import DatePicker from 'react-native-date-picker'

const modalAddTask = () => {
    const [user, setUser] = useRecoilState(user_atom)
    const [taskTitle, settaskTitle] = useState('');
    const [tagSelect, settagSelect] = useState('Low');
    const [timePicker, settimePicker] = useState(new Date());
    const [showTimePicker, setshowTimePicker] = useState(false);
    const [isDisable, setDisable] = useState(true);
    const [loadding, setloadding] = useState(false);
    const { layout } = useTheme();
    const [todoListAtom, setTodoListAtom] = useRecoilState(todoList_atom)

    useEffect(() => {
        setDisable(taskTitle == '')
    }, [taskTitle]);
    useEffect(() => {
        if (!!user.isEditTask) {
            let task = user.isEditTask
            settaskTitle(task.name)
            settimePicker(task.time)
            settagSelect(task.tag)
        }
    }, [JSON.stringify(user.isEditTask)]);

    const handleSaveTask = () => {
        setDisable(true)
        setloadding(true)
        let item = todoListAtom[user.isAddTask] // list task today
        let task = {
            name: taskTitle,
            time: timePicker,
            tag: tagSelect as keyof typeof LIST_TAG_TASK,
            date: new Date(user.isAddTask),
            index: item[0].index
        }
        let newTask
        if (!!user.isEditTask) {
            newTask = editTask(user.isEditTask, task)

        } else
            newTask = addTask(new Date(user.isAddTask), task)
        setTodoListAtom({ ...todoListAtom, [user.isAddTask]: newTask })
        setDisable(false)
        setloadding(false)
        setUser({ ...user, isAddTask: '', isEditTask: null })
    }

    const renderTimePicker = useCallback(() => {
        return (
            <DatePicker
                date={timePicker ? new Date(timePicker) : new Date()}
                mode="time"
                open={showTimePicker}
                modal={true}
                // minimumDate={new Date()}
                title={'Select time picker'}
                confirmText={'Comfirm'}
                cancelText={'Cancel'}
                onConfirm={(issuedDate) => {
                    setshowTimePicker(false);
                    settimePicker(issuedDate);
                }}
                onCancel={() => {
                    setshowTimePicker(false);
                }}
            />
        );
    }, [showTimePicker, timePicker]);

    return (
        <AModal
            isOpent={!!user.isAddTask}
            onClose={() => setUser({ ...user, isAddTask: '' })}
        >
            <AView p={12} bg={Colors.white} w={fullWidth - 80}>
                <AText h18 title color={Colors.tim7543d2}>{'Create a new task'}</AText>
                <AInput
                    title={'Title task'}
                    titleStyle={styles.titleStyle}
                    aStyle={styles.inputStyle}
                    value={taskTitle}
                    onChangeText={settaskTitle}
                />
                <AView>
                    <AText h12 aStyle={styles.titleStyle}>{'Time Select'}</AText>
                    <ATouch aStyle={styles.inputStyle} onPress={() => setshowTimePicker(true)}>
                        <AText>{moment(timePicker).format('hh:mm')}</AText>
                    </ATouch>
                </AView>
                <AView>
                    <AText h12 aStyle={styles.titleStyle}>{'Select title'}</AText>
                    <AView r aStyle={{ flexWrap: 'wrap' }}>
                        {Object.values(LIST_TAG_TASK).map((item, index) => (
                            <ATouch
                                key={item.title}
                                style={[styles.tagStyle, { backgroundColor: tagSelect == item.title ? item.color : Colors.white }]}
                                onPress={() => settagSelect(item.title)}>
                                <AText h12 color={tagSelect == item.title ? Colors.white : Colors.black}>{item.title}</AText>
                            </ATouch>
                        ))}
                    </AView>
                </AView>
                <ATouch disabled={isDisable} onPress={handleSaveTask} style={styles.btnSave}>
                    {loadding ? <ActivityIndicator color={Colors.tim8c50ea} size={'large'} /> : <AText h12 color='white'>{'Save'}</AText>}
                </ATouch>
                {renderTimePicker()}
            </AView>
        </AModal>
    )
}

export default modalAddTask

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: normalize(16),
        lineHeight: normalize(20),
        fontWeight: '500',
        color: Colors.tim8c50ea,
        marginBottom: normalize(5)
    },
    inputStyle: {
        height: scaleHeight(35),
        borderRadius: normalize(10),
        width: scaleWidth(200),
        borderWidth: normalize(1),
        backgroundColor: Colors.white,
        borderColor: Colors.tim7543d2,
        shadowColor: Colors.black,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 5,
        shadowOpacity: 0.35,
        elevation: 4,
        justifyContent: 'center',
        paddingHorizontal: normalize(10),
        marginBottom: normalize(15)
    },
    tagStyle: {
        padding: normalize(8),
        paddingHorizontal: normalize(12),
        borderRadius: normalize(12),
        marginRight: normalize(15),
        marginBottom: normalize(12),
        borderColor: Colors.tim7543d2,
        shadowColor: Colors.black,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 5,
        shadowOpacity: 0.35,
        elevation: 4,
    },
    btnSave: {
        marginTop: normalize(15),
        alignSelf: 'center',
        width: scaleWidth(150),
        height: scaleHeight(40),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.tim8c50ea,
        borderRadius: normalize(8)
    }
})