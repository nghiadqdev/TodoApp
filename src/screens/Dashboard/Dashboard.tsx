import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, LayoutAnimation, StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { PieChart, PieChartPro } from "react-native-gifted-charts";

import { useTheme } from '@/theme';
import { Brand } from '@/components/molecules';
import { AFlastlist, AIcon, AText, ATouch, AView, SafeScreen } from '@/components/template';

import type { RootScreenProps } from '@/types/navigation';
import moment from 'moment';
import { storage } from '@/App';
import { useRecoilState } from 'recoil';
import { todoList_atom, user_atom } from '@/recoils';
import { Colors, deleteTask, fullWidth, LIST_TAG_TASK, normalize } from '@/common';
import { TaskType } from '@/recoils/atoms/todolistAtoms';
import { ICON_TYPE } from '@/components/template/AIcon/AIcon';
import modalAddTask from '@/components/template/modalAddTask';

function Dashboard({ navigation }: RootScreenProps<'Dashboard'>) {
	const { layout, gutters, fonts } = useTheme();
	const { t } = useTranslation(['startup']);
	let dayKey = moment(new Date()).format('YYYY-MM-DD')
	const [todoListAtom, setTodoListAtom] = useRecoilState(todoList_atom)
	const [percentTask, setpercentTask] = useState(0);
	const [fofularTask, setfofularTask] = useState(null);
	const [listTask, setlistTask] = useState<any[]>([]);
	const [listShowItem, setlistShowItem] = useState<any>({});
	const itemShowMoreRef = useRef(new Animated.Value(1)).current;
	const [user, setUser] = useRecoilState(user_atom)

	useEffect(() => {
		loadChart()
	}, [todoListAtom]);

	const { isSuccess, isFetching, isError } = useQuery({
		queryKey: ['startup'],
		queryFn: () => {
			return Promise.resolve(true);
		},
	});

	useEffect(() => {
		if (isSuccess) {
		}
	}, [isSuccess]);

	// ACTION
	const loadChart = () => {
		let list = todoListAtom[dayKey]
		let db = new Map()
		let listChart: any[] = []
		let total = 0
		let totalDone = 0
		let max = 0
		list.forEach(element => {
			if (element.isDone)
				totalDone++
			switch (element.tag) {
				case 'Low':
					db.set('Low', { value: (db.get('Low')?.value || 0) + 1, color: LIST_TAG_TASK.Low.color, })
					break;
				case 'Medium':
					db.set('Medium', { value: (db.get('Medium')?.value || 0) + 1, color: LIST_TAG_TASK.Medium.color })
					break;
				case 'Hight':
					db.set('Hight', { value: (db.get('Hight')?.value || 0) + 1, color: LIST_TAG_TASK.Hight.color })
					break;
				case 'Urgency':
					db.set('Urgency', { value: (db.get('Urgency')?.value || 0) + 1, color: LIST_TAG_TASK.Urgency.color })
					break;
				default:
					break;
			}
		})
		db.forEach((value, key) => {
			if (value) {
				listChart.push({ ...value, status: key })
				total += value.value
				max = Math.max(max, value.value)
			}
			// console.log(list, '---list===========listChart----', listChart)
		})
		setpercentTask(Math.round(((totalDone * 100)/total) * 100) / 100)
		// setfofularTask(max)
		setlistTask(listChart)
	}
	const handleShowTask = (item: TaskType) => {
		let status = !!listShowItem?.[item.name]
		setlistShowItem((val: any) => ({ ...val, [item.name]: !status }))
	}
	const handleEditTask = (item: TaskType) => {
		setUser({ ...user, isAddTask: moment(new Date(item.date)).format('YYYY-MM-DD'), isEditTask: item })
	}
	const handleDeleteTask = (item: TaskType) => {
		let newTask = deleteTask(item)
		setTodoListAtom({ ...todoListAtom, [moment(new Date(newTask[0].date)).format('YYYY-MM-DD')]: newTask })
	}
	const handleDoneTask = (item: TaskType) => {
		let listTaskToday = todoListAtom[moment(new Date(item.date)).format('YYYY-MM-DD')]
		listTaskToday = listTaskToday.filter(i => i.name != item.name)
		let newList = [...listTaskToday, { ...item, isDone: true }]
		storage.set(moment(new Date(item.date)).format('YYYY-MM-DD'), JSON.stringify(newList))
		setTodoListAtom({ ...todoListAtom, [moment(new Date(item.date)).format('YYYY-MM-DD')]: newList })
	}
	// RENDER
	const renderChart = () => {
		if (listTask.length < 2) {
			let data = listTask.length == 0 ? { color: '#DBDBDB', text: '0% task' } : { color: listTask[0].color, text: '0% task' }
			return (
				<AView f1 center>
					<PieChartPro
						data={[{ color: data.color, value: 1 }, { color: data.color, value: 1 }]}
						donut
						sectionAutoFocus
						radius={normalize(90)}
						innerRadius={normalize(60)}
						centerLabelComponent={() => <AView p={40}><AText h16>{data.text}</AText></AView>}
					/>
				</AView>
			)
		}
		return (
			<AView f1 center>
				<PieChartPro
					data={listTask.length == 0 ? [{ color: "#DBDBDB", value: 1 }, { color: "#DBDBDB", value: 1 }] : listTask}
					donut
					sectionAutoFocus
					radius={normalize(90)}
					innerRadius={normalize(60)}
					centerLabelComponent={() => <AView p={40}><AText h16>{`${percentTask}% task complete`}</AText></AView>}
				/>
			</AView>
		)
	}
	const renderItem = useCallback((props: { item: TaskType; index: number; }) => {
		const { item, index } = props
		let isShow = !!listShowItem?.[item.name] && !!item.description
		let isDone = item.isDone
		return (
			<ATouch
				activeOpacity={0.7}
				onPress={() => handleShowTask(item)}
				w={fullWidth - 22}
				bg={isDone ? Colors.gray757575 : Colors.timf3eefb}
				aStyle={[layout.shadow, styles.itemStyle]}>
				<AView r f1>
					<AView w={2} h={38} bg={LIST_TAG_TASK[item.tag || 'Low'].color} aStyle={{ marginHorizontal: normalize(6) }} />
					<AView f1>
						<AText h16 w500 >{item.name}</AText>
						<AView r>
							<AText h12>{moment(item?.timeStart).format('hh:mm')} - {moment(item?.timeStart).format('hh:mm')}</AText>
							<AView p={6} ph={12} bg={LIST_TAG_TASK[item.tag || 'Low'].color} aStyle={styles.labelStyle}>
								<AText h12 color='white'>{LIST_TAG_TASK[item.tag || 'Low'].title}</AText>
							</AView>
						</AView>
					</AView>
					<AView>
						<AView r aStyle={{ justifyContent: 'space-between', marginBottom: normalize(5) }}>
							<AIcon
								name='edit'
								origin={ICON_TYPE.ANT_ICON}
								size={normalize(30)}
								onPress={() => handleEditTask(item)}
							/>
							<AIcon
								name='close-box-outline'
								origin={ICON_TYPE.MATERIAL_COMMUNITY}
								size={normalize(30)}
								onPress={() => handleDeleteTask(item)}
							/>
						</AView>
						<ATouch disabled={isDone} onPress={() => handleDoneTask(item)} bg={isDone ? Colors.gray4D4D4D : Colors.success} p={12} pv={4} aStyle={{ borderRadius: normalize(6) }}>
							<AText h12 color={isDone ? Colors.black : Colors.white}>{isDone ? 'Done' : 'Make done'}</AText>
						</ATouch>
					</AView>
				</AView>
				{isShow && <AView p={12} h={'auto'}>
					<AText h16>{item.description}</AText>
				</AView>}
			</ATouch>
		)
	}, [listShowItem])

	return (
		<SafeScreen>
			<AView r h={200} >
				{renderChart()}
				<AView f1 center r aStyle={{ flexWrap: 'wrap', alignSelf: 'center' }} >
					{Object.values(LIST_TAG_TASK).map((item, index) => {
						return (
							<AView key={index} r center h={20} w={fullWidth / 4.5} aStyle={{ marginBottom: normalize(20) }}>
								<AView w={10} h={10} bg={item.color} />
								<AText h12 aStyle={{ flex: 1, marginLeft: 12 }}>{item.title}</AText>
							</AView>
						)
					})}
				</AView>
			</AView>
			<AView f1>
				<AText h22 w500 aStyle={{ margin: normalize(12) }}>{'List task today'}</AText>
				<AFlastlist
					data={todoListAtom[dayKey].filter(i => i.name != 'Empty')}
					renderItem={renderItem}
					ListEmptyComponent={() => (
						<AView f1 center>
							<ATouch
								p={16}
								pv={8}
								bg={Colors.tim7543d2}
								aStyle={{ borderRadius: normalize(10) }}
								onPress={() => { setUser({ ...user, isAddTask: moment(new Date()).format('YYYY-MM-DD') }) }}>
								<AText h14 color='white'>{`Let's create a new Task today`}</AText>
							</ATouch>
						</AView>
					)}
				/>
			</AView>
			{/* <Brand /> */}
			{isFetching && (
				<ActivityIndicator size="large" style={[gutters.marginVertical_24]} />
			)}
			{isError && (
				<Text style={[fonts.size_16, fonts.red500]}>
					{t('startup:error')}
				</Text>
			)}
            {modalAddTask()}
		</SafeScreen>
	);
}

const styles = StyleSheet.create({
	labelStyle: {
		borderRadius: normalize(10), marginHorizontal: normalize(10), marginLeft: normalize(8)
	},
	itemStyle: {
		marginBottom: normalize(12),
		padding: normalize(10),
		paddingLeft: 0,
		borderRadius: normalize(10),
		alignSelf: 'center'
	},
	titleListTask: {
		margin: normalize(12),
	}
})

export default Dashboard;
