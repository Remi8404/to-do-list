import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface IToDo {
  id: string;
  name: string;
  description: string;
  isDone: boolean;
}
const initialState: IToDo[] = JSON.parse(localStorage.getItem("todos") || "[]");

export const toDoSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    add: (state, action: PayloadAction<Omit<IToDo, "id">>) => {
      const newToDo: IToDo = {
        id: uuidv4(),
        name: action.payload.name,
        description: action.payload.description,
        isDone: action.payload.isDone,
      };
      state.push(newToDo);
      localStorage.setItem("todos", JSON.stringify(state));
      return state;
    },
    remove: (state, action: PayloadAction<string>) => {
      const newState = state.filter((toDo) => toDo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(newState));
      return newState;
    },
    reset: (state) => {
      state = [];
      localStorage.setItem("todos", "[]");
      return state;
    },
  },
});

export const { add, remove, reset } = toDoSlice.actions;

export default toDoSlice.reducer;
