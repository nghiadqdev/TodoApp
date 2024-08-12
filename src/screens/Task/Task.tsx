import { useEffect, useState } from 'react';
import {
	View,
	ActivityIndicator,
	Text,
	TouchableOpacity,
	ScrollView,
	Alert,
} from 'react-native';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { ImageVariant } from '@/components/atoms';
import { Brand } from '@/components/molecules';
import { AText, SafeScreen, Timeline } from '@/components/template';
import { useTheme } from '@/theme';
import { fetchOne } from '@/services/users';

import { isImageSourcePropType } from '@/types/guards/image';

import SendImage from '@/theme/assets/images/send.png';
import ColorsWatchImage from '@/theme/assets/images/colorswatch.png';
import TranslateImage from '@/theme/assets/images/translate.png';
import Wrapper from '@/components/template/SafeScreen/Wraper';
import { storage } from '@/App';
import moment from 'moment';
import { loadDate } from '@/common';
import { useRecoilState, } from 'recoil';
import { todoList_atom } from '@/recoils';

function Task() {
	const { t } = useTranslation(['example', 'welcome']);
	const {
		colors,
		variant,
		changeTheme,
		layout,
		gutters,
		fonts,
		components,
		backgrounds,
	} = useTheme();
	const [currentId, setCurrentId] = useState(-1);
	const [todoListAtom, setTodoListAtom] = useRecoilState(todoList_atom)

	// EFFECT
	const { isSuccess, data, isFetching } = useQuery({
		queryKey: ['example', currentId],
		queryFn: () => {
			return fetchOne(currentId);
		},
		enabled: currentId >= 0,
	});
	useEffect(() => {
		if (isSuccess) {
			Alert.alert(t('example:helloUser', { name: data.name }));
		}
	}, [isSuccess, data]);
	useEffect(() => {
		let listTask = loadDate()
		setTodoListAtom(listTask)
	}, []);

	// ACTION
	const onChangeTheme = () => {
		changeTheme(variant === 'default' ? 'dark' : 'default');
	};

	const onChangeLanguage = (lang: 'vi' | 'en') => {
		void i18next.changeLanguage(lang);
	};

	if (
		!isImageSourcePropType(SendImage) ||
		!isImageSourcePropType(ColorsWatchImage) ||
		!isImageSourcePropType(TranslateImage)
	) {
		throw new Error('Image source is not valid');
	}

	return (
		<Wrapper>
			<Timeline />
			{/* <View
				style={[
					layout.row,
					layout.justifyBetween,
					layout.fullWidth,
					gutters.marginTop_16,
				]}
			>
				<TouchableOpacity
					testID="fetch-user-button"
					style={[components.buttonCircle, gutters.marginBottom_16]}
					onPress={() => setCurrentId(Math.ceil(Math.random() * 10 + 1))}
				>
					{isFetching ? (
						<ActivityIndicator />
					) : (
						<ImageVariant
							source={SendImage}
							style={{ tintColor: colors.purple500 }}
						/>
					)}
				</TouchableOpacity>

				<TouchableOpacity
					testID="change-theme-button"
					style={[components.buttonCircle, gutters.marginBottom_16]}
					onPress={() => onChangeTheme()}
				>
					<ImageVariant
						source={ColorsWatchImage}
						style={{ tintColor: colors.purple500 }}
					/>
				</TouchableOpacity>

				<TouchableOpacity
					testID="change-language-button"
					style={[components.buttonCircle, gutters.marginBottom_16]}
					onPress={() =>
						onChangeLanguage(i18next.language === 'vi' ? 'en' : 'vi')
					}
				>
					<ImageVariant
						source={TranslateImage}
						style={{ tintColor: colors.purple500 }}
					/>
				</TouchableOpacity>
			</View> */}
		</Wrapper>
	);
}

export default Task;
