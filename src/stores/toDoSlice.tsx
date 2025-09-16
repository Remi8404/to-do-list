import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface IToDo {
  id: string;
  name: string;
  description: string;
  limitDate: string;
  otherInfo?: string[];
  isDone: boolean;
  lat: number;
  lng: number;
  address: string;
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
        description: action.payload.description
          ? action.payload.description
          : "",
        limitDate: action.payload.limitDate ? action.payload.limitDate : "",
        otherInfo: action.payload.otherInfo ? action.payload.otherInfo : [],
        isDone: action.payload.isDone ? action.payload.isDone : false,
        lat: action.payload.lat ? action.payload.lat : 0,
        lng: action.payload.lng ? action.payload.lng : 0,
        address: action.payload.address ? action.payload.address : "",
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
    update: (state, action: PayloadAction<Partial<IToDo>>) => {
      if (!action.payload.id) return state;
      const indexOfUpdated = state.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (indexOfUpdated === -1) return state;
      const newToDo = { ...state[indexOfUpdated], ...action.payload };
      state[indexOfUpdated] = newToDo;
      localStorage.setItem("todos", JSON.stringify(state));
      return state;
    },
    reorder: (state, action: PayloadAction<IToDo[]>) => {
      localStorage.setItem("todos", JSON.stringify(action.payload));
      state = [...action.payload];
      return state;
    },
  },
});

export const { add, remove, reset, update, reorder } = toDoSlice.actions;

export default toDoSlice.reducer;
