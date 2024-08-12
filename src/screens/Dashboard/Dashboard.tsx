import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { PieChart, PieChartPro } from "react-native-gifted-charts";

import { useTheme } from '@/theme';
import { Brand } from '@/components/molecules';
import { AText, AView, SafeScreen } from '@/components/template';

import type { RootScreenProps } from '@/types/navigation';
import moment from 'moment';
import { storage } from '@/App';
import { useRecoilState } from 'recoil';
import { todoList_atom } from '@/recoils';
import { fullWidth, LIST_TAG_TASK, normalize } from '@/common';

function Dashboard({ navigation }: RootScreenProps<'Dashboard'>) {
	const { layout, gutters, fonts } = useTheme();
	const { t } = useTranslation(['startup']);
	let dayKey = moment(new Date()).format('YYYY-MM-DD')
	const [todoListAtom, setTodoListAtom] = useRecoilState(todoList_atom)
	const [totalTask, settotalTask] = useState(0);
	const [fofularTask, setfofularTask] = useState(null);
	const [listTask, setlistTask] = useState<any[]>([]);

	useEffect(() => {
		loadChart()

	}, []);

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
		let listChart: any[] = [] // item 0 is low, 1 is medium, 2 is hight,...
		list.forEach(element => {
			switch (element.tag) {
				case 'Low':
					db.set('Low', { value: (db.get('Low')?.value || 0) + 1, color: LIST_TAG_TASK.Low.color })
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
		let total = 0
		let max = 0
		db.forEach((value, key) => {
			console.log(key, '----+++-----', value)
			if (value) {
				listChart.push(value)
				total += value.value
				max = Math.max(max, value.value)
			}
			// switch (key) {
			// 	case 'Low':

			// 		break;
			// 	case 'Medium':
			// 		listChart.push(value)
			// 		total += value.value
			// 		max = Math.max(max, value.value)
			// 		break;
			// 	case 'Hight':
			// 		listChart[2] = value
			// 		total += value.value
			// 		max = Math.max(max, value.value)
			// 		break;
			// 	case 'Urgency':
			// 		listChart[3] = value
			// 		total += value.value
			// 		max = Math.max(max, value.value)
			// 		break;
			// 	default:
			// 		break;
			// }
			console.log('-------', listChart)
		})
		settotalTask(total)
		// setfofularTask(max)
		setlistTask(listChart)
	}
	return (
		<SafeScreen>
			<AView r h={200} >
				<AView f1 center>
					<PieChartPro
						data={listTask}
						donut
						sectionAutoFocus
						radius={90}
						innerRadius={60}
						isAnimated
						animationDuration={300}
						centerLabelComponent={() => <AView p={40}><AText h16>{'100% task complete'}</AText></AView>}
					/>
				</AView>
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
			<Brand />
			{isFetching && (
				<ActivityIndicator size="large" style={[gutters.marginVertical_24]} />
			)}
			{isError && (
				<Text style={[fonts.size_16, fonts.red500]}>
					{t('startup:error')}
				</Text>
			)}
		</SafeScreen>
	);
}

export default Dashboard;
