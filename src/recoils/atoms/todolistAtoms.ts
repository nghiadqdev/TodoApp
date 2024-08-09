import { atom } from 'recoil';

// Atom quản lý danh sách các todo
export const todoList_atom = atom({
  key: 'todoListState',
  default: [], // Danh sách ban đầu trống
});
