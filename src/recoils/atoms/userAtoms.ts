import { RecoilState, atom } from "recoil";

type UserType = {
    name: string;
    gender: string,
    sizeText: number,
    isAddTask: string,
};
export const user_atom: RecoilState<UserType> = atom({
    key: 'user_atom',
    default: {
        name: '',
        gender: 'Male',
        sizeText: 1,
        isAddTask: ''
    },
});
