import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  loading: false,
  error: "",
};
const api = axios.create({ baseURL: "http://localhost:5000" });

export const getAsyncTodo = createAsyncThunk(
  "todo/getAsyncTodo",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("todos");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addAsyncTodo = createAsyncThunk(
  "todo/addAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("todos", {
        title: payload.title,
        id: Date.now(),
        complete: false,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(getAsyncTodo.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getAsyncTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
        state.error = "";
      }),
      builder.addCase(getAsyncTodo.rejected, (state, action) => {
        state.loading = false;
        state.todos = [];
        state.error = action.payload;
      });
    builder.addCase(addAsyncTodo.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(addAsyncTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      }),
      builder.addCase(addAsyncTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addTodo, deleteTodo, actionTodo } = todoSlice.actions;
export default todoSlice.reducer;
