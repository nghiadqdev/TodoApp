import { LIST_TAG_TASK } from '@/common';
import { atom, RecoilState } from 'recoil';

export type TaskType = {
  name: string;
  date: Date,
  timeStart?: Date,
  timeEnd?: Date,
  tag?: keyof typeof LIST_TAG_TASK,
  index: number,
  description?: string,
  isSecurity?: boolean,
  isDone: boolean
};
// Atom quản lý danh sách các todo
export const todoList_atom: RecoilState<{[key in string]: TaskType[]}> = atom({
  key: 'todoListState',
  default: {}, // Danh sách ban đầu trống
});
