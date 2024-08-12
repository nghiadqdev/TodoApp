import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Dashboard, Task } from '@/screens';
import { useTheme } from '@/theme';

import type { RootStackParamList } from '@/types/navigation';
import useAddTask from '@/common/hook';
import AppTap from './AppTap';

const Stack = createStackNavigator();

function ApplicationNavigator() {
	const { variant, navigationTheme, layout } = useTheme();
	const modalTask = useAddTask()

	const forFade = ({ current }: StackCardInterpolationProps) => ({
        cardStyle: {
          opacity: current.progress,
        },
      });
	return (
		<SafeAreaProvider>
			<NavigationContainer theme={navigationTheme}>
				{modalTask()}
				<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
					<Stack.Screen
						name="MainApp"
						component={AppTap}
						options={{
							headerShown: false,
							animationEnabled: true,
							transitionSpec: {
								close: {
									animation: 'timing',
									config: {
										duration: 300,
									}
								},
								open: {
									animation: 'spring',
									config: {
										damping: 300,
									}
								}
							},
							cardStyleInterpolator: forFade
						}}
					/>
					{/* <Stack.Screen name="Task" component={Task} /> */}
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

export default ApplicationNavigator;
