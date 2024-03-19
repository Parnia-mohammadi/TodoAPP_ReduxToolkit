import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        complete: false,
      };
      state.todos.push(newTodo);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id != action.payload.id);
    },
    actionTodo: (state, action) => {
      const selectedId = state.todos.find(
        (todo) => todo.id == action.payload.id
      );
      selectedId.complete = !selectedId.complete;
    },
  },
});

export const { addTodo, deleteTodo, actionTodo } = todoSlice.actions;
export default todoSlice.reducer;
