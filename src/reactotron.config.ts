import Reactotron, { ReactotronReactNative } from 'reactotron-react-native';
import mmkvPlugin from 'reactotron-react-native-mmkv';
import {
	QueryClientManager,
	reactotronReactQuery,
} from 'reactotron-react-query';

import { storage, queryClient } from './App';
import config from '../app.json';

const queryClientManager = new QueryClientManager({
	queryClient,
});

Reactotron.configure({
	name: config.name,
	onDisconnect: () => {
		queryClientManager.unsubscribe();
	},
}) 								// Cấu hình Reactotron
	.useReactNative() 			// Sử dụng các plugin mặc định cho React Native
	.use(mmkvPlugin<ReactotronReactNative>({ storage }))
	.use(reactotronReactQuery(queryClientManager))
	.connect();							// Kết nối với Reactotron app
