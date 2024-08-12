import { NavigationProp } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

export interface IScreenProps {
    navigation?: NavigationProp<any>,
    route?: {
        name?: string,
        params?: any
    }
}

export type RootStackParamList = {
	Dashboard: IScreenProps;
	Task: IScreenProps;
};

export type RootScreenProps<
	S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;
