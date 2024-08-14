import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

import AppTap from './AppTap';

const Stack = createStackNavigator();

function ApplicationNavigator() {
	const { variant, navigationTheme, layout } = useTheme();

	const forFade = ({ current }: StackCardInterpolationProps) => ({
        cardStyle: {
          opacity: current.progress,
        },
      });
	return (
		<SafeAreaProvider>
			<NavigationContainer theme={navigationTheme}>
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
