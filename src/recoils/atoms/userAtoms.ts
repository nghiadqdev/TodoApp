import { RecoilState, atom } from "recoil";
import { TaskType } from "./todolistAtoms";

type UserType = {
    name: string;
    gender: string,
    sizeText: number,
    isAddTask: string,
    isEditTask: TaskType | any,
};
export const user_atom: RecoilState<UserType> = atom({
    key: 'user_atom',
    default: {
        name: '',
        gender: 'Male',
        sizeText: 1,
        isAddTask: '',
        isEditTask: null
    },
});
