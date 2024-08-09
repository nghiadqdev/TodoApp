import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv';

import { ThemeProvider } from '@/theme';

import ApplicationNavigator from './navigators/Application';
import './translations';
import { RecoilRoot } from 'recoil';

export const queryClient = new QueryClient();

export const storage = new MMKV();

function App() {
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider storage={storage}>
					<ApplicationNavigator />
				</ThemeProvider>
			</QueryClientProvider>
		</RecoilRoot>
	);
}

export default App;
